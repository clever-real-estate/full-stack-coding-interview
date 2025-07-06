from fastapi import APIRouter, HTTPException, status, Form

from app.schemas import UserInput, UserLogin, UserResponse
from app.services import AuthService, UserService
from app.schemas.token import Token

router = APIRouter(prefix="/auth", tags=["auth"])

user_service = UserService()
auth_service = AuthService()


@router.post("/", response_model=UserResponse, status_code=status.HTTP_200_OK)
def authenticate(token: str):
    result = auth_service.authenticate(token)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )
    return result


@router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
def login(
    username: str = Form(..., description="Email"),
    password: str = Form(..., description="Password"),
):
    user_login = UserLogin(
        email=username, password=password
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
def register(user: UserInput):
    result = user_service.create(user)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    return result
