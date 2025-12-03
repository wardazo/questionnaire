from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select, func
from database import create_db_and_tables, get_session
from models import QuestionnaireSubmission, QuestionnaireAnswer
from datetime import datetime
from typing import List, Dict
from pydantic import BaseModel, Field, validator

app = FastAPI(title="Questionnaire Backend API")

# Comparison set mapping for results endpoint
COMPARISON_SETS = {
    "vivity-puresee": {
        "product1": {"type": "vivity", "displayName": "Vivity®"},
        "product2": {"type": "puresee", "displayName": "PureSee*"}
    },
    "panoptix-odyssey": {
        "product1": {"type": "panoptix1", "displayName": "PanOptix®"},
        "product2": {"type": "odyssey", "displayName": "Odyssey*"}
    },
    "panoptix-galaxy": {
        "product1": {"type": "panoptix2", "displayName": "PanOptix®"},
        "product2": {"type": "galaxy", "displayName": "Galaxy*"}
    }
}

# CORS middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Schemas
class AnswerItem(BaseModel):
    """Single answer item"""
    questionId: str
    value: str


class QuestionnaireSubmissionRequest(BaseModel):
    """Request payload for submitting a questionnaire"""
    questionnaireType: str
    startedAt: str
    completedAt: str
    randomNumber: int
    answers: List[AnswerItem]

    @validator('questionnaireType')
    def validate_type(cls, v):
        valid_types = ['vivity', 'puresee', 'panoptix1', 'odyssey', 'panoptix2', 'galaxy']
        if v not in valid_types:
            raise ValueError(f"Invalid questionnaire type. Must be one of: {valid_types}")
        return v

    @validator('startedAt', 'completedAt')
    def validate_timestamp(cls, v):
        try:
            datetime.fromisoformat(v.replace('Z', '+00:00'))
        except ValueError:
            raise ValueError(f"Invalid ISO timestamp format: {v}")
        return v

    @validator('randomNumber')
    def validate_random_number(cls, v):
        if v < 0 or v > 999999999:
            raise ValueError("Random number must be between 0 and 999999999")
        return v

    @validator('answers')
    def validate_answers(cls, v):
        if len(v) == 0:
            raise ValueError("At least one answer is required")
        return v


class QuestionnaireSubmissionResponse(BaseModel):
    """Response after successful submission"""
    id: int
    message: str
    questionnaire_type: str
    completed_at: str
    random_number: int
    answers_count: int


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def hello_world():
    return {"message": "Hello World"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get(
    "/api/questionnaires/counts",
    response_model=Dict[str, int],
    tags=["questionnaires"]
)
def get_questionnaire_counts(session: Session = Depends(get_session)):
    """
    Get counts of completed questionnaires grouped by type.
    Returns a dictionary with questionnaire types as keys and counts as values.
    """
    try:
        # Query to count submissions grouped by questionnaire_type
        statement = (
            select(
                QuestionnaireSubmission.questionnaire_type,
                func.count(QuestionnaireSubmission.id).label('count')
            )
            .group_by(QuestionnaireSubmission.questionnaire_type)
        )

        results = session.exec(statement).all()

        # Convert to dictionary
        counts = {row[0]: row[1] for row in results}

        # Ensure all questionnaire types are present (even if count is 0)
        all_types = ['vivity', 'puresee', 'panoptix1', 'odyssey', 'panoptix2', 'galaxy']
        for qtype in all_types:
            if qtype not in counts:
                counts[qtype] = 0

        return counts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.post(
    "/api/questionnaires/submit",
    response_model=QuestionnaireSubmissionResponse,
    status_code=201,
    tags=["questionnaires"]
)
def submit_questionnaire(
    request: QuestionnaireSubmissionRequest,
    session: Session = Depends(get_session)
):
    """
    Submit a completed questionnaire.
    Creates one submission record + multiple answer records in a transaction.
    """
    try:
        # Parse timestamps
        started_at = datetime.fromisoformat(request.startedAt.replace('Z', '+00:00'))
        completed_at = datetime.fromisoformat(request.completedAt.replace('Z', '+00:00'))

        # Create submission record
        submission = QuestionnaireSubmission(
            questionnaire_type=request.questionnaireType,
            started_at=started_at,
            completed_at=completed_at,
            random_number=request.randomNumber
        )

        session.add(submission)
        session.flush()  # Get submission.id before creating answers

        # Create answer records
        for answer_item in request.answers:
            answer = QuestionnaireAnswer(
                submission_id=submission.id,
                question_id=answer_item.questionId,
                answer_value=answer_item.value
            )
            session.add(answer)

        # Commit transaction
        session.commit()
        session.refresh(submission)

        return QuestionnaireSubmissionResponse(
            id=submission.id,
            message="Questionnaire submitted successfully",
            questionnaire_type=submission.questionnaire_type,
            completed_at=request.completedAt,
            random_number=submission.random_number,
            answers_count=len(request.answers)
        )

    except ValueError as e:
        session.rollback()
        raise HTTPException(status_code=400, detail=f"Validation error: {str(e)}")
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.get(
    "/api/questionnaires/results/{comparison_set}",
    tags=["questionnaires"]
)
def get_results(comparison_set: str, session: Session = Depends(get_session)):
    """
    Get aggregated results for a comparison set.
    Returns count frequencies for all questions grouped by answer value.
    """
    # Validate comparison set
    if comparison_set not in COMPARISON_SETS:
        raise HTTPException(status_code=400, detail=f"Invalid comparison set: {comparison_set}")

    config = COMPARISON_SETS[comparison_set]

    def aggregate_for_type(questionnaire_type, product_key):
        # Count submissions
        count_stmt = select(func.count(QuestionnaireSubmission.id)).where(
            QuestionnaireSubmission.questionnaire_type == questionnaire_type
        )
        count = session.exec(count_stmt).one()

        # Aggregate answers: GROUP BY (question_id, answer_value) and COUNT
        agg_stmt = (
            select(
                QuestionnaireAnswer.question_id,
                QuestionnaireAnswer.answer_value,
                func.count(QuestionnaireAnswer.id).label('count')
            )
            .join(QuestionnaireSubmission)
            .where(QuestionnaireSubmission.questionnaire_type == questionnaire_type)
            .group_by(
                QuestionnaireAnswer.question_id,
                QuestionnaireAnswer.answer_value
            )
        )

        results = session.exec(agg_stmt).all()

        # Transform to nested dict
        aggregated = {}
        for question_id, answer_value, ans_count in results:
            if question_id not in aggregated:
                aggregated[question_id] = {}
            aggregated[question_id][answer_value] = ans_count

        return {
            "type": questionnaire_type,
            "displayName": config[product_key]["displayName"],
            "count": count,
            "aggregatedData": aggregated
        }

    try:
        return {
            "comparisonSet": comparison_set,
            "products": {
                "product1": aggregate_for_type(config["product1"]["type"], "product1"),
                "product2": aggregate_for_type(config["product2"]["type"], "product2")
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")