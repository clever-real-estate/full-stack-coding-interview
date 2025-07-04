from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.infra.db import db
from app.schemas import UserCreate, UserResponse
from app.models import User
from app.utils.security import get_password_hash

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserResponse)
def register_user(user: UserCreate, session: Session = Depends(db.get_session)):
    """Register a new user"""
    # TODO: Implement email uniqueness check
    hashed_password = get_password_hash(user.password)
    db_obj = User(email=user.email, hashed_password=hashed_password, liked_photos=[])  # type: ignore
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return UserResponse(
        id=db_obj.id,
        email=db_obj.email,
    )


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
