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


## To generate the Google app code for generation of OTP mail OTP

## Step 1: Turn on 2-Step Verification
1. Go to your Google Account Settings.
2. Click on Security in the left-hand navigation menu.
3. Scroll down to the "How you sign in to Google" section.
4. Click on 2-Step Verification and follow the prompts to enable it if it is not already turned on. [1, 2, 3, 4, 5]

## Step 2: Generate the App Password
5. Once 2-Step Verification is active, return to the Security page.
6. In the search bar at the very top of your Google Account screen, type "App passwords" and select it from the dropdown results.
7. You will be prompted to re-enter your main Google Account password for security.
8. On the App Passwords screen, enter a custom name for your app (e.g., "FastAPI Mailer") in the App name field.
9. Click the Create button. [1, 2, 3, 4, 5]

## Step 3: Copy and Secure Your Password
10. A pop-up window will appear displaying a unique 16-character code (typically displayed in spaces like xxxx xxxx xxxx xxxx).
11. Copy this code immediately. You will not be able to view it again after closing this window.
12. Paste this code directly into your FastAPI MAIL_PASSWORD configuration block without any spaces (e.g., xxxxxxxxxxxxxxxx).
13. Click Done. [1, 2, 3]
