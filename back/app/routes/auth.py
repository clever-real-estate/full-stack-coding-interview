from fastapi import APIRouter, HTTPException, status, Request

from app.schemas import UserInput, UserLogin, UserResponse
from app.services import AuthService, UserService
from app.schemas.token import Token

router = APIRouter(prefix="/auth", tags=["auth"])

user_service = UserService()
auth_service = AuthService()


@router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
async def login(request: Request):
    body = await request.json()

    user_login = UserLogin(
        email=body["username"], password=body["password"]
    )  # workaround to work with OAuth2
    result = auth_service.login(user_login)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    return result


@router.post(
    "/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED
)
async def register(request: Request):
    body = await request.json()

    user_register = UserInput(email=body["username"], password=body["password"])
    result = user_service.create(user_register)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    return result
