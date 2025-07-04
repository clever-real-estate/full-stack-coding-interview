from sqlmodel import Session
from app.models import User
from app.schemas.user import UserCreate, UserResponse
from typing import Optional
from app.utils.security import get_password_hash
from app.repositories.user_repository import UserRepository


class UserService:
    @staticmethod
    def get_user_by_email(session: Session, email: str) -> Optional[User]:
        return UserRepository.get_user_by_email(session, email)

    @staticmethod
    def create_user(session: Session, user: UserCreate) -> UserResponse | None:
        # Return None if email already exists (let controller handle HTTP response)
        if UserService.get_user_by_email(session, user.email):
            return None

        db_obj = User(
            email=user.email,
            hashed_password=get_password_hash(user.password),
            liked_photos=[],  # type: ignore
        )

        UserRepository.create_user(session, db_obj)

        return UserResponse(
            id=db_obj.id,
            email=db_obj.email,
        )
