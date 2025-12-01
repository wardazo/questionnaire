from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional, List

class QuestionnaireSubmission(SQLModel, table=True):
    """Stores questionnaire submission metadata"""
    __tablename__ = "questionnaire_submissions"

    id: Optional[int] = Field(default=None, primary_key=True)
    questionnaire_type: str = Field(max_length=20, index=True)
    started_at: datetime = Field(index=True)
    completed_at: datetime = Field(index=True)
    random_number: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to answers
    answers: List["QuestionnaireAnswer"] = Relationship(back_populates="submission")


class QuestionnaireAnswer(SQLModel, table=True):
    """Stores individual question answers"""
    __tablename__ = "questionnaire_answers"

    id: Optional[int] = Field(default=None, primary_key=True)
    submission_id: int = Field(foreign_key="questionnaire_submissions.id", index=True)
    question_id: str = Field(max_length=100, index=True)
    answer_value: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to submission
    submission: Optional[QuestionnaireSubmission] = Relationship(back_populates="answers")
