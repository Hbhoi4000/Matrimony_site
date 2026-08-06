from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

try:
    from . import crud, models, schemas
    from .database import Base, engine, get_db
except ImportError:
    import crud
    import models
    import schemas
    from database import Base, engine, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sant Bhima Bhoi Matrimony API")



origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # or ["*"] during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "API Running Successfully"}


@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)


@app.post("/login", response_model=schemas.UserResponse)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = crud.get_user_by_email_and_password(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return user


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
        db,
        sex,
        min_age,
        max_age,
        education,
        address,
        is_job,
    )

@app.get(
    "/profiles/{user_id}",
    response_model=schemas.UserResponse
)
def get_profile(
    user_id: int,
    db: Session = Depends(get_db)
):

    profile = crud.get_profile_by_id(db, user_id)

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return profile

@app.get(
    "/window",
    response_model=List[schemas.UserResponse]
)
def window_profiles(db: Session = Depends(get_db)):
    return crud.get_window_profiles(db)


@app.get(
    "/window/brides",
    response_model=List[schemas.UserResponse]
)
def window_brides(db: Session = Depends(get_db)):
    return crud.get_window_brides(db)


@app.get(
    "/window/grooms",
    response_model=List[schemas.UserResponse]
)
def window_grooms(db: Session = Depends(get_db)):
    return crud.get_window_grooms(db)

@app.get("/profile-counts",
    response_model=schemas.ProfileCountResponse
)
def profile_counts(db: Session = Depends(get_db)):

    return crud.get_profile_counts(db)