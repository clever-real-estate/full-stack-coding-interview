from typing import Optional

from datetime import timedelta

from app.models import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserInput, UserCreate, UserResponse, UserLogin
from app.schemas.token import Token
from app.utils.security import Security
from app.infra.config import settings


class UserService:
    def __init__(
        self, user_repository: UserRepository, security: Security = Security()
    ):
        self.user_repository = user_repository
        self.security = security

    def create(self, user: UserInput) -> UserResponse | None:
        if self.get_by_email(user.email):
            return None

        db_obj = UserCreate(
            email=user.email,
            hashed_password=self.security.get_password_hash(user.password),
            liked_photos=[],  # type: ignore
        )

        user_created = self.user_repository.insert(db_obj)

        return UserResponse(**user_created.model_dump())

    def get_by_email(self, email: str) -> Optional[User]:
        return self.user_repository.find_by_email(email)

    def login(self, user_login: UserLogin) -> Token | None:
        user_db = self.get_by_email(user_login.email)
        if not user_db:
            return None

        if not self.security.verify_password(
            user_login.password, user_db.hashed_password
        ):
            return None

        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = self.security.create_access_token(
            user_db.id, expires_delta=access_token_expires
        )
        return Token(access_token=access_token, token_type="bearer")
