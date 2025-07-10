from pydantic import BaseModel, EmailStr
import uuid


class UserInput(BaseModel):
    """Schema for user registration input"""

    email: EmailStr
    password: str


class UserCreate(BaseModel):
    """Schema for user db insert"""

    email: EmailStr
    hashed_password: str
    liked_photos: list[uuid.UUID]


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
