from fastapi import APIRouter, HTTPException, status

from app.infra.db import db
from app.repositories.user_repository import UserRepository
from app.schemas import UserInput, UserLogin, UserResponse
from app.services.user_service import UserService
from app.schemas.token import Token

router = APIRouter(prefix="/users", tags=["users"])

user_repository = UserRepository(session=next(db.get_session()))
user_service = UserService(user_repository=user_repository)


@router.post("/store", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def store(user: UserInput):
    result = user_service.create(user)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    return result


@router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
def login(user_login: UserLogin):
    result = user_service.login(user_login)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    return result


# @router.get("/auth", response_model=UserResponse, status_code=status.HTTP_200_OK)
# def authenticate(token: str):
#     payload = verify_access_token(token)
#     if payload is None:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
#         )
#     return payload
