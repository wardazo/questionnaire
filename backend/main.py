from fastapi import FastAPI, Depends, HTTPException, Security
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select, func
from database import create_db_and_tables, get_session
from models import QuestionnaireSubmission, QuestionnaireAnswer
from datetime import datetime
from typing import List, Dict
from pydantic import BaseModel, Field, validator
import os
from dotenv import load_dotenv
import logging

load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('api_debug.log')
    ]
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Questionnaire Backend API")

# API Key configuration
API_KEY = os.getenv("API_KEY", "your-secret-api-key-change-this")
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=True)

# CORS origins from environment variable
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:8080").split(",")

def verify_api_key(api_key: str = Security(api_key_header)):
    """Verify the API key from the request header"""
    logger.debug(f"API key verification initiated")
    logger.debug(f"Received API key length: {len(api_key) if api_key else 0}")

    if api_key != API_KEY:
        logger.warning(f"API key verification failed - Invalid key provided")
        raise HTTPException(
            status_code=403,
            detail="Invalid API key"
        )

    logger.debug("API key verification successful")
    return api_key

# Comparison set mapping for results endpoint
COMPARISON_SETS = {
    "vivity-puresee": {
        "product1": {"type": "vivity", "displayName": "Vivity<sup>®</sup>"},
        "product2": {"type": "puresee", "displayName": "PureSee<sup>*</sup>"}
    },
    "panoptix-odyssey": {
        "product1": {"type": "panoptix1", "displayName": "PanOptix<sup>®</sup>"},
        "product2": {"type": "odyssey", "displayName": "Odyssey<sup>*</sup>"}
    },
    "panoptix-galaxy": {
        "product1": {"type": "panoptix2", "displayName": "PanOptix<sup>®</sup>"},
        "product2": {"type": "galaxy", "displayName": "Galaxy<sup>*</sup>"}
    }
}

# CORS middleware configured from environment variable
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
    salesforceContactId: str
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

    @validator('salesforceContactId')
    def validate_contact_id(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError("Salesforce contact ID is required")
        if len(v) > 50:
            raise ValueError("Contact ID too long (max 50 chars)")
        return v.strip()

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
def get_questionnaire_counts(
    contact_id: str,
    session: Session = Depends(get_session),
    api_key: str = Depends(verify_api_key)
):
    """
    Get counts of completed questionnaires grouped by type for a specific contact.
    Returns a dictionary with questionnaire types as keys and counts as values.
    """
    logger.info(f"GET /api/questionnaires/counts - Request received - contact_id={contact_id}")

    # Validate contact_id
    if not contact_id or len(contact_id.strip()) == 0:
        logger.warning("GET /api/questionnaires/counts - Missing or empty contact_id parameter")
        raise HTTPException(status_code=400, detail="contact_id query parameter is required")

    try:
        logger.debug(f"Building SQL query to count submissions by type for contact: {contact_id}")
        # Query to count submissions grouped by questionnaire_type, filtered by contact_id
        statement = (
            select(
                QuestionnaireSubmission.questionnaire_type,
                func.count(QuestionnaireSubmission.id).label('count')
            )
            .where(QuestionnaireSubmission.salesforce_contact_id == contact_id)
            .group_by(QuestionnaireSubmission.questionnaire_type)
        )

        logger.debug("Executing database query")
        results = session.exec(statement).all()
        logger.debug(f"Database query returned {len(results)} result rows")

        # Convert to dictionary
        counts = {row[0]: row[1] for row in results}
        logger.debug(f"Raw counts from database: {counts}")

        # Ensure all questionnaire types are present (even if count is 0)
        all_types = ['vivity', 'puresee', 'panoptix1', 'odyssey', 'panoptix2', 'galaxy']
        for qtype in all_types:
            if qtype not in counts:
                counts[qtype] = 0

        logger.info(f"GET /api/questionnaires/counts - Success - Returning counts: {counts}")
        return counts
    except Exception as e:
        logger.error(f"GET /api/questionnaires/counts - Database error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.post(
    "/api/questionnaires/submit",
    response_model=QuestionnaireSubmissionResponse,
    status_code=201,
    tags=["questionnaires"]
)
def submit_questionnaire(
    request: QuestionnaireSubmissionRequest,
    session: Session = Depends(get_session),
    api_key: str = Depends(verify_api_key)
):
    """
    Submit a completed questionnaire.
    Creates one submission record + multiple answer records in a transaction.
    """
    logger.info(f"POST /api/questionnaires/submit - Request received")
    logger.debug(f"Questionnaire type: {request.questionnaireType}")
    logger.debug(f"Salesforce contact ID: {request.salesforceContactId}")
    logger.debug(f"Random number: {request.randomNumber}")
    logger.debug(f"Number of answers: {len(request.answers)}")
    logger.debug(f"Start time: {request.startedAt}, Completed time: {request.completedAt}")

    try:
        logger.debug("Parsing timestamps")
        # Parse timestamps
        started_at = datetime.fromisoformat(request.startedAt.replace('Z', '+00:00'))
        completed_at = datetime.fromisoformat(request.completedAt.replace('Z', '+00:00'))
        logger.debug(f"Timestamps parsed - Started: {started_at}, Completed: {completed_at}")

        logger.debug("Creating submission record")
        # Create submission record
        submission = QuestionnaireSubmission(
            questionnaire_type=request.questionnaireType,
            salesforce_contact_id=request.salesforceContactId,
            started_at=started_at,
            completed_at=completed_at,
            random_number=request.randomNumber
        )

        logger.debug("Adding submission to session and flushing")
        session.add(submission)
        session.flush()  # Get submission.id before creating answers
        logger.debug(f"Submission created with ID: {submission.id}")

        # Create answer records
        logger.debug(f"Creating {len(request.answers)} answer records")
        for idx, answer_item in enumerate(request.answers):
            logger.debug(f"Answer {idx+1}: questionId={answer_item.questionId}, value={answer_item.value}")
            answer = QuestionnaireAnswer(
                submission_id=submission.id,
                question_id=answer_item.questionId,
                answer_value=answer_item.value
            )
            session.add(answer)

        # Commit transaction
        logger.debug("Committing transaction")
        session.commit()
        session.refresh(submission)
        logger.info(f"POST /api/questionnaires/submit - Success - Submission ID: {submission.id}")

        response = QuestionnaireSubmissionResponse(
            id=submission.id,
            message="Questionnaire submitted successfully",
            questionnaire_type=submission.questionnaire_type,
            completed_at=request.completedAt,
            random_number=submission.random_number,
            answers_count=len(request.answers)
        )
        logger.debug(f"Response prepared: {response.dict()}")
        return response

    except ValueError as e:
        logger.error(f"POST /api/questionnaires/submit - Validation error: {str(e)}", exc_info=True)
        session.rollback()
        raise HTTPException(status_code=400, detail=f"Validation error: {str(e)}")
    except Exception as e:
        logger.error(f"POST /api/questionnaires/submit - Database error: {str(e)}", exc_info=True)
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.get(
    "/api/questionnaires/results/{comparison_set}",
    tags=["questionnaires"]
)
def get_results(
    comparison_set: str,
    contact_id: str,
    session: Session = Depends(get_session),
    api_key: str = Depends(verify_api_key)
):
    """
    Get aggregated results for a comparison set, filtered by contact ID.
    Returns count frequencies for all questions grouped by answer value.
    """
    logger.info(f"GET /api/questionnaires/results/{comparison_set} - Request received - contact_id={contact_id}")

    # Validate contact_id
    if not contact_id or len(contact_id.strip()) == 0:
        logger.warning("GET /api/questionnaires/results - Missing or empty contact_id parameter")
        raise HTTPException(status_code=400, detail="contact_id query parameter is required")

    # Validate comparison set
    if comparison_set not in COMPARISON_SETS:
        logger.warning(f"Invalid comparison set requested: {comparison_set}")
        raise HTTPException(status_code=400, detail=f"Invalid comparison set: {comparison_set}")

    config = COMPARISON_SETS[comparison_set]
    logger.debug(f"Using comparison set config: {config}")

    def aggregate_for_type(questionnaire_type, product_key):
        logger.debug(f"Aggregating data for {product_key}: type={questionnaire_type}, contact={contact_id}")

        # Count submissions for this contact
        logger.debug(f"Counting submissions for {questionnaire_type} and contact {contact_id}")
        count_stmt = select(func.count(QuestionnaireSubmission.id)).where(
            QuestionnaireSubmission.questionnaire_type == questionnaire_type,
            QuestionnaireSubmission.salesforce_contact_id == contact_id
        )
        count = session.exec(count_stmt).one()
        logger.debug(f"Found {count} submissions for {questionnaire_type} and contact {contact_id}")

        # Aggregate answers: GROUP BY (question_id, answer_value) and COUNT, filtered by contact
        logger.debug(f"Aggregating answers for {questionnaire_type} and contact {contact_id}")
        agg_stmt = (
            select(
                QuestionnaireAnswer.question_id,
                QuestionnaireAnswer.answer_value,
                func.count(QuestionnaireAnswer.id).label('count')
            )
            .join(QuestionnaireSubmission)
            .where(
                QuestionnaireSubmission.questionnaire_type == questionnaire_type,
                QuestionnaireSubmission.salesforce_contact_id == contact_id
            )
            .group_by(
                QuestionnaireAnswer.question_id,
                QuestionnaireAnswer.answer_value
            )
        )

        results = session.exec(agg_stmt).all()
        logger.debug(f"Answer aggregation returned {len(results)} rows for {questionnaire_type}")

        # Transform to nested dict
        aggregated = {}
        for question_id, answer_value, ans_count in results:
            if question_id not in aggregated:
                aggregated[question_id] = {}
            aggregated[question_id][answer_value] = ans_count

        logger.debug(f"Aggregated data for {questionnaire_type}: {len(aggregated)} questions")

        result = {
            "type": questionnaire_type,
            "displayName": config[product_key]["displayName"],
            "count": count,
            "aggregatedData": aggregated
        }
        return result

    try:
        logger.debug("Aggregating data for both products in comparison set")
        product1_data = aggregate_for_type(config["product1"]["type"], "product1")
        product2_data = aggregate_for_type(config["product2"]["type"], "product2")

        response = {
            "comparisonSet": comparison_set,
            "products": {
                "product1": product1_data,
                "product2": product2_data
            }
        }

        logger.info(f"GET /api/questionnaires/results/{comparison_set} - Success - Product1 count: {product1_data['count']}, Product2 count: {product2_data['count']}")
        return response
    except Exception as e:
        logger.error(f"GET /api/questionnaires/results/{comparison_set} - Database error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")