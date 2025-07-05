from uuid import uuid4

from unittest.mock import MagicMock

from app.schemas.user import UserLogin
from app.models import User
from app.services.user_service import UserService


def test_login():
    user = User(
        id=uuid4(), email="test@test.com", hashed_password="password", liked_photos=[]
    )
    user_login = UserLogin(email=user.email, password=user.hashed_password)

    mock_user_repository = MagicMock()
    mock_user_repository.find_by_email.return_value = user

    mock_security = MagicMock()
    mock_security.verify_password.return_value = True
    mock_security.create_access_token.return_value = "token"

    user_service = UserService(mock_user_repository, mock_security)
    token = user_service.login(user_login)

    assert token is not None
    assert token.access_token == "token"
    assert token.token_type == "bearer"


def test_login_with_invalid_email():
    user = User(
        id=uuid4(), email="test@test.com", hashed_password="password", liked_photos=[]
    )
    user_login = UserLogin(email=user.email, password=user.hashed_password)

    mock_user_repository = MagicMock()
    mock_user_repository.find_by_email.return_value = None

    mock_security = MagicMock()
    mock_security.verify_password.return_value = True
    mock_security.create_access_token.return_value = "token"

    user_service = UserService(mock_user_repository, mock_security)
    token = user_service.login(user_login)

    assert token is None


def test_login_with_invalid_password():
    user = User(
        id=uuid4(), email="test@test.com", hashed_password="password", liked_photos=[]
    )
    user_login = UserLogin(email=user.email, password=user.hashed_password)

    mock_user_repository = MagicMock()
    mock_user_repository.find_by_email.return_value = user

    mock_security = MagicMock()
    mock_security.verify_password.return_value = False
    mock_security.create_access_token.return_value = "token"

    user_service = UserService(mock_user_repository, mock_security)
    token = user_service.login(user_login)

    assert token is None
