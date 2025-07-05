from datetime import datetime, timedelta, timezone
from typing import Any

import jwt
from passlib.context import CryptContext

from app.infra.config import settings
from app.schemas.token import TokenPayload


class Security:
    def __init__(self, algorithm: str = "HS256"):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        self.algorithm = algorithm

    def create_access_token(self, subject: str | Any, expires_delta: timedelta) -> str:
        expire = datetime.now(timezone.utc) + expires_delta
        to_encode = {"exp": expire, "sub": str(subject)}
        encoded_jwt = jwt.encode(
            to_encode, settings.SECRET_KEY, algorithm=self.algorithm
        )
        return encoded_jwt

    def get_password_hash(self, password: str) -> str:
        return self.pwd_context.hash(password)

    def verify_access_token(self, token: str) -> TokenPayload | None:
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=[self.algorithm]
            )
            user_id = payload.get("sub")
            if user_id is None:
                return None
            return TokenPayload(sub=user_id)
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return self.pwd_context.verify(plain_password, hashed_password)
