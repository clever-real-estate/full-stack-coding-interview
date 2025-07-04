from sqlmodel import Session, select
from app.models import User
from typing import Optional


class UserRepository:
    @staticmethod
    def get_user_by_email(session: Session, email: str) -> Optional[User]:
        return session.exec(select(User).where(User.email == email)).first()

    @staticmethod
    def create_user(session: Session, user: User) -> User:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user
