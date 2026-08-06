# Matrimony App

This project contains a React frontend and a FastAPI backend.

## Project structure

- Frontend: santbhimabhoi-matrimony/
- Backend: Backend/

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm

## Backend setup

1. Open a terminal in the Backend folder.
2. Create and activate a virtual environment (recommended):
   - Windows PowerShell:
     - python -m venv .venv
     - .\.venv\Scripts\Activate.ps1
   - macOS/Linux:
     - python3 -m venv .venv
     - source .venv/bin/activate
3. Install Python dependencies:
   - pip install -r requirements.txt
4. Start the backend server:
   - uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

## Frontend setup

1. Open a terminal in the santbhimabhoi-matrimony folder.
2. Install dependencies:
   - npm install
3. Start the frontend development server:
   - npm run dev
4. Open the local URL shown by Vite (usually http://localhost:5173).

## Notes

- The frontend expects the backend at http://127.0.0.1:8000.
- If needed, create a .env file in the frontend folder with:
  - VITE_API_BASE_URL=http://127.0.0.1:8000
