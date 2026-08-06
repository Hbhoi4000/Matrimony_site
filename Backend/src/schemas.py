from pydantic import BaseModel, EmailStr
from typing import Optional

class WindowProfileResponse(BaseModel):
    id: int
    full_name: str
    sex: str
    age: int
    education: Optional[str]
    address: Optional[str]
    is_job: str
    job_name: Optional[str]
    job_designation: Optional[str]
    blood_group: Optional[str]
    image_url: Optional[str]

    class Config:
        from_attributes = True
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

    sex: str
    age: int
    education: Optional[str] = None

    address: Optional[str] = None

    is_job: str
    job_name: Optional[str] = None
    job_designation: Optional[str] = None

    maternal_uncle_name: Optional[str] = None
    maternal_uncle_address: Optional[str] = None

    brothers: int = 0
    sisters: int = 0

    brother_spouse_name: Optional[str] = None
    sister_husband_name: Optional[str] = None

    mother_full_name: str
    father_full_name: str

    blood_group: Optional[str] = None

    image_url: Optional[str] = None




class UserResponse(BaseModel):

    id: int

    full_name: str
    email: str

    sex: str
    age: int
    education: Optional[str]

    address: Optional[str]

    is_job: str
    job_name: Optional[str]
    job_designation: Optional[str]

    maternal_uncle_name: Optional[str]
    maternal_uncle_address: Optional[str]

    brothers: int
    sisters: int

    brother_spouse_name: Optional[str]
    sister_husband_name: Optional[str]

    mother_full_name: str
    father_full_name: str

    blood_group: Optional[str]

    image_url: Optional[str]


    class Config:
        from_attributes = True

class ProfileCountResponse(BaseModel):
    total_users: int
    total_brides: int
    total_grooms: int
    total_window_profiles: int