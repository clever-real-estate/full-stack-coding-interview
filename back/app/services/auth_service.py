from datetime import timedelta

from app.services.user_service import UserService
from app.schemas.user import UserResponse, UserLogin
from app.schemas.token import Token
from app.utils.security import Security
from app.infra.config import settings


class AuthService:
    def __init__(
        self,
        security: Security = Security(),
        user_service: UserService = UserService(),
    ):
        self.security = security
        self.user_service = user_service

    def authenticate(self, token: str) -> UserResponse | None:
        payload = self.security.verify_access_token(token)
        if payload is None or payload.sub is None:
            return None
        user = self.user_service.get_by_id(payload.sub)
        if user is None:
            return None
        return UserResponse(**user.model_dump())

    def login(self, user_login: UserLogin) -> Token | None:
        user_db = self.user_service.get_by_email(user_login.email)
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
