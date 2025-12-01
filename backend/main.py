from fastapi import FastAPI
from database import create_db_and_tables

app = FastAPI(title="Questionnaire Backend API")


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def hello_world():
    return {"message": "Hello World"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}