from pydantic import BaseModel, EmailStr
import uuid


class UserCreate(BaseModel):
    """Schema for user registration"""

    email: EmailStr
    password: str


class UserLogin(BaseModel):
    """Schema for user login"""

    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """Schema for user response (without password)"""

    id: uuid.UUID
    email: str

    class Config:
        from_attributes = True
