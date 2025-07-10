from app.models import User
from unittest.mock import MagicMock
from uuid import uuid4
from app.schemas.token import TokenPayload
from app.services import AuthService


def test_authenticate():
    user = User(
        id=uuid4(), email="test@test.com", hashed_password="password", liked_photos=[]
    )

    mock_user_service = MagicMock()
    mock_user_service.get_by_id.return_value = user

    mock_security = MagicMock()
    mock_security.verify_access_token.return_value = TokenPayload(sub=str(user.id))

    auth_service = AuthService(
        user_service=mock_user_service,
        security=mock_security,
    )
    user = auth_service.authenticate("valid_token")

    assert user is not None
    assert user.id == user.id
    assert user.email == user.email


def test_authenticate_with_invalid_token():
    user = User(
        id=uuid4(), email="test@test.com", hashed_password="password", liked_photos=[]
    )

    mock_user_service = MagicMock()
    mock_user_service.get_by_id.return_value = user

    mock_security = MagicMock()
    mock_security.verify_access_token.return_value = None

    auth_service = AuthService(
        user_service=mock_user_service,
        security=mock_security,
    )
    user = auth_service.authenticate("valid_token")

    assert user is None


def test_authenticate_with_invalid_user():
    user = User(
        id=uuid4(), email="test@test.com", hashed_password="password", liked_photos=[]
    )

    mock_user_service = MagicMock()
    mock_user_service.get_by_id.return_value = None

    mock_security = MagicMock()
    mock_security.verify_access_token.return_value = TokenPayload(sub=str(user.id))

    auth_service = AuthService(
        user_service=mock_user_service,
        security=mock_security,
    )
    user = auth_service.authenticate("valid_token")

    assert user is None
