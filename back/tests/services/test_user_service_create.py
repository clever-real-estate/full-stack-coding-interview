from uuid import uuid4

from unittest.mock import MagicMock

from app.models import User
from app.schemas.user import UserInput
from app.services.user_service import UserService


def test_create():
    user_input = UserInput(email="test@test.com", password="password")

    mock_user_repository = MagicMock()
    mock_user_repository.find_by_email.return_value = None
    mock_user_repository.insert.side_effect = lambda x: User(
        id=uuid4(),
        email=x.email,
        hashed_password=x.hashed_password,
        liked_photos=[],
    )

    user_service = UserService(mock_user_repository)
    user_response = user_service.create(user_input)

    assert user_response is not None
    assert user_response.email == user_input.email
    assert user_response.id is not None


def test_create_with_existing_email():
    user_input = UserInput(email="test@test.com", password="password")

    mock_user_repository = MagicMock()
    mock_user_repository.get_user_by_email.return_value = User(
        id=uuid4(), email="test@test.com", hashed_password="password", liked_photos=[]
    )

    user_service = UserService(mock_user_repository)
    user_response = user_service.create(user_input)

    assert user_response is None
