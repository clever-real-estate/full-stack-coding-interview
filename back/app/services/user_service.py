from typing import Callable, Optional


from app.models import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserInput, UserCreate, UserResponse
from app.utils.security import Security


class UserService:
    def __init__(
        self,
        get_password_hash: Callable[[str], str] = Security().get_password_hash,
        user_repository: UserRepository = UserRepository(),
    ):
        self.get_password_hash = get_password_hash
        self.user_repository = user_repository

    def create(self, user: UserInput) -> UserResponse | None:
        if self.get_by_email(user.email):
            return None

        db_obj = UserCreate(
            email=user.email,
            hashed_password=self.get_password_hash(user.password),
            liked_photos=[],  # type: ignore
        )

        user_created = self.user_repository.insert(db_obj)

        return UserResponse(**user_created.model_dump())

    def get_by_email(self, email: str) -> Optional[User]:
        return self.user_repository.find_by_email(email)

    def get_by_id(self, id: str) -> Optional[User]:
        return self.user_repository.find_by_id(id)
