# Matrimony App

This project contains a React frontend and a FastAPI backend.

## Project structure

- Frontend: santbhimabhoi-matrimony/
- Backend: Backend/

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm

# Backend Setup

## 1. Open a terminal

Navigate to the backend source folder:

```bash
cd Backend/src
```

## 2. Create a virtual environment (recommended)

### Windows (PowerShell)

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### macOS/Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

## 3. Install Python dependencies

Make sure `requirements.txt` is located inside `Backend/src`.

```bash
pip install -r requirements.txt
```

## 4. Start the FastAPI server

Run the following command from the `Backend/src` directory:

```bash
uvicorn main:app --reload
```

The backend will start at:

```
http://127.0.0.1:8000
```

Swagger API documentation:

```
http://127.0.0.1:8000/docs
```

ReDoc documentation:

```
http://127.0.0.1:8000/redoc
```


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
