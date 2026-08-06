from sqlalchemy import Column, Integer, String

try:
    from .database import Base
except ImportError:
    from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    sex = Column(String, nullable=False)  # Male/Female/Transgender
    age = Column(Integer, nullable=False)
    education = Column(String, nullable=True)

    address = Column(String, nullable=True)

    is_job = Column(String, nullable=False)  # Yes/No
    job_name = Column(String, nullable=True)
    job_designation = Column(String, nullable=True)

    maternal_uncle_name = Column(String, nullable=True)
    maternal_uncle_address = Column(String, nullable=True)

    brothers = Column(Integer, default=0)
    sisters = Column(Integer, default=0)

    brother_spouse_name = Column(String, nullable=True)
    sister_husband_name = Column(String, nullable=True)

    mother_full_name = Column(String, nullable=False)
    father_full_name = Column(String, nullable=False)

    blood_group = Column(String, nullable=True)

    image_url = Column(String, nullable=True)