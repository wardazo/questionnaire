# PDF Service

Express.js service for generating PDFs using Puppeteer with API key authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update the API key in `.env`:
```
PORT=3001
API_KEY=your-secure-api-key-here
```

## Usage

### Start the service:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### Generate PDF:
```bash
curl -X POST http://localhost:3001/generatePDF \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secure-api-key-here" \
  -d '{
    "html": "<html><body><h1>Hello PDF</h1></body></html>",
    "options": {
      "format": "A4",
      "margin": { "top": "20px" }
    }
  }' \
  --output document.pdf
```

### Health check:
```bash
curl http://localhost:3001/health
```

## API Endpoints

- `GET /health` - Health check (no auth required)
- `POST /generatePDF` - Generate PDF from HTML (requires API key)

## Request Format

```json
{
  "html": "<html content>",
  "options": {
    "format": "A4",
    "printBackground": true,
    "margin": {
      "top": "20px",
      "right": "20px", 
      "bottom": "20px",
      "left": "20px"
    }
  }
}
```