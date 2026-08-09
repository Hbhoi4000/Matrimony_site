from typing import List, Optional
import os
import shutil
import random
from datetime import datetime, timedelta
from pydantic import BaseModel, EmailStr
from uuid import uuid4
from fastapi import Depends, FastAPI, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi import FastAPI, Depends, Form, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
import schemas, crud
try:
    from . import crud, models, schemas
    from .database import Base, engine, get_db
except ImportError:
    import crud
    import models
    import schemas
    from database import Base, engine, get_db
from fastapi.staticfiles import StaticFiles
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from dotenv import load_dotenv

Base.metadata.create_all(bind=engine)

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI(title="Sant Bhima Bhoi Matrimony API")

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create a directory to store uploaded images if it doesn't exist
UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Mount the static directory so images can be served over HTTP
app.mount("/static", StaticFiles(directory="static"), name="static")

# Structure: { "email@example.com": {"otp": "123456", "expires_at": datetime} }
otp_storage = {}
load_dotenv()  # Load environment variables from .env file

# conf = ConnectionConfig(
#     MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
#     MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
#     MAIL_FROM=os.getenv("MAIL_FROM"),
#     MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
#     MAIL_SERVER=os.getenv("MAIL_SERVER"),
#     MAIL_STARTTLS=True,
#     MAIL_SSL_TLS=False,
#     USE_CREDENTIALS=True,
#     VALIDATE_CERTS=True
# )
# SMTP Configuration (Using the exact working credentials from test.py)
conf = ConnectionConfig(
    MAIL_USERNAME="hbhoi4000@gmail.com",
    MAIL_PASSWORD="mqxvtjfqepzhqalf", # Paste the exact 16-char password string used in test.py
    MAIL_FROM="hbhoi4000@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",                  # Fixed SMTP host
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)
# Pydantic Schemas for Input Validation
class EmailRequest(BaseModel):
    email: EmailStr

class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str

@app.post("/send-otp")
async def send_otp(request: EmailRequest):
    print(f"Received OTP request for email: {request.email}")  # Debugging log
    # 1. Generate a 6-digit random string OTP
    generated_otp = f"{random.randint(100000, 999999)}"
    
    # 2. Set an expiration threshold (e.g., 5 minutes)
    expiration_time = datetime.utcnow() + timedelta(minutes=5)
    otp_storage[request.email] = {
        "otp": generated_otp,
        "expires_at": expiration_time
    }
    
    # 3. Formulate the email message
    message = MessageSchema(
        subject="Your Email Verification Code",
        recipients=[request.email],
        body=f"Your OTP code is: {generated_otp}. It expires in 5 minutes.",
        subtype=MessageType.plain
    )
    
    # 4. Dispatch the email asynchronously
    fm = FastMail(conf)
    print("fm", fm)
    print(f"Sending OTP {generated_otp} to {request.email}")  # Debugging log
    try:
        await fm.send_message(message)
        return {"message": "OTP sent successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to send email: {str(e)}"
        )

@app.post("/verify-otp")
async def verify_otp(request: VerifyOTPRequest):
    stored_data = otp_storage.get(request.email)
    
    # 1. Check if OTP exists for the specific email address
    if not stored_data:
        raise HTTPException(status_code=400, detail="No OTP requested for this email.")
        
    # 2. Check if the code has expired
    if datetime.utcnow() > stored_data["expires_at"]:
        del otp_storage[request.email]
        raise HTTPException(status_code=400, detail="OTP has expired.")
        
    # 3. Check if input matches the recorded token
    if stored_data["otp"] != request.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP code.")
        
    # Clear OTP records from state memory upon verification success
    del otp_storage[request.email]
    return {"message": "Email verified successfully!"}
def save_uploaded_file(upload_file: UploadFile) -> str:
    """Saves an UploadFile to disk and returns its accessible static URL path."""
    if not upload_file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    # Generate a unique filename using UUID to prevent collisions
    file_extension = os.path.splitext(upload_file.filename)[1]
    unique_filename = f"{uuid4().hex}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    # Save file contents to disk
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)

    # Return relative URL path (e.g. "/static/uploads/a1b2c3d4.jpg")
    return f"/static/uploads/{unique_filename}"
def authenticate_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return None
    
    # Retrieve stored password string from model
    stored_password = getattr(user, "password", None) or getattr(user, "hashed_password", None)
    if not stored_password:
        return None

    try:
        # Try verifying as a passlib bcrypt hash
        is_valid = pwd_context.verify(password, stored_password)
    except ValueError:
        # Fallback if stored password is plain text
        is_valid = (password == stored_password)

    if not is_valid:
        return None
        
    return user

@app.get("/")
def home():
    return {"message": "API Running Successfully"}

@app.post("/register", response_model=schemas.UserResponse)
def register(
    full_name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),  # <-- ADDED PASSWORD FORM FIELD
    sex: str = Form(...),
    age: int = Form(...),
    mother_full_name: str = Form(...),
    father_full_name: str = Form(...),
    education: Optional[str] = Form(None),
    address: Optional[str] = Form(None),
    is_job: str = Form("no"),
    job_name: Optional[str] = Form(None),
    job_designation: Optional[str] = Form(None),
    maternal_uncle_name: Optional[str] = Form(None),
    maternal_uncle_address: Optional[str] = Form(None),
    brothers: int = Form(0),
    sisters: int = Form(0),
    brother_spouse_name: Optional[str] = Form(None),
    sister_husband_name: Optional[str] = Form(None),
    blood_group: Optional[str] = Form(None),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Save image
    image_url = save_uploaded_file(image)

    # Instantiate UserCreate schema including password
    user_data = schemas.UserCreate(
        full_name=full_name,
        email=email,
        password=password,  # <-- PASS PASSWORD TO PYDANTIC
        sex=sex,
        age=age,
        education=education,
        address=address,
        is_job=is_job,
        job_name=job_name,
        job_designation=job_designation,
        maternal_uncle_name=maternal_uncle_name,
        maternal_uncle_address=maternal_uncle_address,
        brothers=brothers,
        sisters=sisters,
        brother_spouse_name=brother_spouse_name,
        sister_husband_name=sister_husband_name,
        mother_full_name=mother_full_name,
        father_full_name=father_full_name,
        blood_group=blood_group,
        image_url=image_url
    )

    return crud.create_user(db, user_data)

@app.post("/login")
async def login(credentials: schemas.UserLogin = Body(...), db: Session = Depends(get_db)):
    # Authenticate user using the database session
    user = authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    return {
        "access_token": "your_jwt_token", 
        "token_type": "bearer",
        "user": user
    }

@app.get("/users", response_model=List[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@app.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/profiles", response_model=List[schemas.UserResponse])
def get_profiles(db: Session = Depends(get_db)):
    return crud.get_all_profiles(db)

@app.get("/profiles/brides", response_model=List[schemas.UserResponse])
def brides(db: Session = Depends(get_db)):
    return crud.get_brides(db)

@app.get("/profiles/grooms", response_model=List[schemas.UserResponse])
def grooms(db: Session = Depends(get_db)):
    return crud.get_grooms(db)

@app.get("/profiles/search", response_model=List[schemas.UserResponse])
def search(
    sex: Optional[str] = None,
    min_age: Optional[int] = None,
    max_age: Optional[int] = None,
    education: Optional[str] = None,
    address: Optional[str] = None,
    is_job: Optional[str] = None,
    db: Session = Depends(get_db),
):
    return crud.search_profiles(
        db, sex, min_age, max_age, education, address, is_job
    )

@app.get("/profiles/{user_id}", response_model=schemas.UserResponse)
def get_profile(user_id: int, db: Session = Depends(get_db)):
    profile = crud.get_profile_by_id(db, user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@app.get("/window", response_model=List[schemas.UserResponse])
def window_profiles(db: Session = Depends(get_db)):
    return crud.get_window_profiles(db)

@app.get("/window/brides", response_model=List[schemas.UserResponse])
def window_brides(db: Session = Depends(get_db)):
    return crud.get_window_brides(db)

@app.get("/window/grooms", response_model=List[schemas.UserResponse])
def window_grooms(db: Session = Depends(get_db)):
    return crud.get_window_grooms(db)

@app.get("/profile-counts", response_model=schemas.ProfileCountResponse)
def profile_counts(db: Session = Depends(get_db)):
    return crud.get_profile_counts(db)

@app.put("/profiles/{user_id}", response_model=schemas.UserResponse)
def update_profile(
    user_id: int, 
    profile_data: schemas.UserUpdate, 
    db: Session = Depends(get_db)
):
    updated_user = crud.update_user_profile(db, user_id, profile_data)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user