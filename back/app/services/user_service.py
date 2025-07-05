from typing import Optional

from app.models import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserInput, UserCreate, UserResponse
from app.utils.security import get_password_hash


class UserService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def get_user_by_email(self, email: str) -> Optional[User]:
        return self.user_repository.get_user_by_email(email)

    def create_user(self, user: UserInput) -> UserResponse | None:
        if self.get_user_by_email(user.email):
            return None

        db_obj = UserCreate(
            email=user.email,
            hashed_password=get_password_hash(user.password),
            liked_photos=[],  # type: ignore
        )

        user_created = self.user_repository.create_user(db_obj)

        return UserResponse(**user_created.model_dump())
