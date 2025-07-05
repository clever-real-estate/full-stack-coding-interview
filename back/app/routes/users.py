from fastapi import APIRouter, HTTPException, status

from app.infra.db import db
from app.models import User
from app.repositories.user_repository import UserRepository
from app.schemas import UserInput, UserResponse
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])

user_repository = UserRepository(session=next(db.get_session()))
user_service = UserService(user_repository=user_repository)


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: UserInput):
    result = user_service.create_user(user)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    return result


@router.post("/login", response_model=User)
def login_user(user: User):
    # TODO: Implement login user
    pass
