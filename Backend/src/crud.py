from sqlalchemy.orm import Session

try:
    from . import models, schemas
except ImportError:
    import models
    import schemas


def create_user(db: Session, user: schemas.UserCreate):

    db_user = models.User(

        full_name=user.full_name,
        email=user.email,
        password=user.password,

        sex=user.sex,
        age=user.age,
        education=user.education,

        address=user.address,

        is_job=user.is_job,
        job_name=user.job_name,
        job_designation=user.job_designation,

        maternal_uncle_name=user.maternal_uncle_name,
        maternal_uncle_address=user.maternal_uncle_address,

        brothers=user.brothers,
        sisters=user.sisters,

        brother_spouse_name=user.brother_spouse_name,
        sister_husband_name=user.sister_husband_name,

        mother_full_name=user.mother_full_name,
        father_full_name=user.father_full_name,

        blood_group=user.blood_group,

        image_url=user.image_url,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def get_all_profiles(db: Session):
    return db.query(models.User).all()


def get_brides(db: Session):
    return (
        db.query(models.User)
        .filter(models.User.sex == "Female")
        .all()
    )


def get_grooms(db: Session):
    return (
        db.query(models.User)
        .filter(models.User.sex == "Male")
        .all()
    )

def search_profiles(
    db: Session,
    sex=None,
    min_age=None,
    max_age=None,
    education=None,
    address=None,
    is_job=None,
):

    query = db.query(models.User)

    if sex:
        query = query.filter(models.User.sex == sex)

    if min_age:
        query = query.filter(models.User.age >= min_age)

    if max_age:
        query = query.filter(models.User.age <= max_age)

    if education:
        query = query.filter(models.User.education.ilike(f"%{education}%"))

    if address:
        query = query.filter(models.User.address.ilike(f"%{address}%"))

    if is_job:
        query = query.filter(models.User.is_job == is_job)

    return query.all()

def get_profile_by_id(db: Session, user_id: int):

    return (
        db.query(models.User)
        .filter(models.User.id == user_id)
        .first()
    )

def get_user_by_email_and_password(db: Session, email: str, password: str):
    return (
        db.query(models.User)
        .filter(models.User.email == email)
        .filter(models.User.password == password)
        .first()
    )

def get_window_profiles(db: Session):
    return db.query(models.User).all()


def get_window_brides(db: Session):
    return (
        db.query(models.User)
        .filter(models.User.sex == "Female")
        .all()
    )


def get_window_grooms(db: Session):
    return (
        db.query(models.User)
        .filter(models.User.sex == "Male")
        .all()
    )

def get_profile_counts(db: Session):

    total_users = db.query(models.User).count()

    total_brides = (
        db.query(models.User)
        .filter(models.User.sex == "Female")
        .count()
    )

    total_grooms = (
        db.query(models.User)
        .filter(models.User.sex == "Male")
        .count()
    )

    total_window_profiles = (
        db.query(models.User)
        .count()
    )

    return {
        "total_users": total_users,
        "total_brides": total_brides,
        "total_grooms": total_grooms,
        "total_window_profiles": total_window_profiles
    }