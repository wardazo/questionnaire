# Questionnaire Backend API

A FastAPI backend with PostgreSQL database using SQLModel.

## Features

- FastAPI framework
- PostgreSQL database connection
- SQLModel ORM
- Hello World endpoint
- Health check endpoint

## Setup

### Prerequisites

- Python 3.9+
- PostgreSQL database running

### Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure database:
Edit `.env` file with your PostgreSQL connection details:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/questionnaire_db
```

3. Create the database:
```bash
psql -U postgres
CREATE DATABASE questionnaire_db;
```

### Running the Server

Start the development server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Hello World
- `GET /` - Returns "Hello World" message

### Health Check
- `GET /health` - Returns health status

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── main.py           # FastAPI application and endpoints
├── database.py       # Database connection and session management
├── models.py         # SQLModel database models
├── requirements.txt  # Python dependencies
├── .env             # Environment variables (not in git)
└── README.md        # This file
```

## Example Usage

### Test the Hello World endpoint:
```bash
curl "http://localhost:8000/"
```

Response:
```json
{"message": "Hello World"}
```