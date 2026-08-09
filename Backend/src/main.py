from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext

try:
    from . import crud, models, schemas
    from .database import Base, engine, get_db
except ImportError:
    import crud
    import models
    import schemas
    from database import Base, engine, get_db

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
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)

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