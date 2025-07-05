from typing import Optional

from sqlmodel import Session, select

from app.models import User
from app.schemas.user import UserCreate


class UserRepository:
    def __init__(self, session: Session):
        self.session = session

    def find_by_email(self, email: str) -> Optional[User]:
        return self.session.exec(select(User).where(User.email == email)).first()

    def find_by_id(self, id: str) -> Optional[User]:
        return self.session.exec(select(User).where(User.id == id)).first()

    def insert(self, user_create: UserCreate) -> User:
        user = User(**user_create.model_dump())
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user
