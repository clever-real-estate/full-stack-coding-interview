from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.infra.db import db
from app.schemas import UserCreate, UserResponse
from app.models import User
from app.services import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserResponse)
def register_user(user: UserCreate, session: Session = Depends(db.get_session)):
    result = UserService.create_user(session, user)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    return result


@router.post("/login", response_model=User)
def login_user(user: User, session: Session = Depends(db.get_session)):
    """Login user with email and password"""
    db_obj = session.exec(select(User).where(User.email == user.email)).first()
    if not db_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    # TODO: Implement password verification
    return db_obj
