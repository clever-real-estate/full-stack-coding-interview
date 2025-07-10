from unittest.mock import MagicMock
from uuid import uuid4

from app.models import Photo, PhotoLike
from app.services import PhotoService


def test_toggle_like_add():
    photo_id = uuid4()
    photo = Photo(
        id=photo_id,
        photographer_name="Test",
        photographer_url="https://test.com",
        avg_color="Test",
        alt="Test",
        image_url="https://test.com",
    )

    mock_photo_repository = MagicMock()
    mock_photo_repository.find_by_id.return_value = photo

    mock_photo_like_repository = MagicMock()
    mock_photo_like_repository.find.return_value = None

    photo_service = PhotoService(
        photo_repository=mock_photo_repository,
        photo_like_repository=mock_photo_like_repository,
    )

    photo = photo_service.toggle_like(photo_id="1", user_id="1")
    assert photo is not None
    assert photo.id == photo_id
    # assert photo.liked is True


def test_toggle_like_remove():
    photo_id = uuid4()
    photo = Photo(
        id=photo_id,
        photographer_name="Test",
        photographer_url="https://test.com",
        avg_color="Test",
        alt="Test",
        image_url="https://test.com",
    )

    mock_photo_repository = MagicMock()
    mock_photo_repository.find_by_id.return_value = photo

    mock_photo_like_repository = MagicMock()
    mock_photo_like_repository.find.return_value = PhotoLike(
        id=uuid4(),
        photo_id=photo_id,
        user_id=uuid4(),
    )

    photo_service = PhotoService(
        photo_repository=mock_photo_repository,
        photo_like_repository=mock_photo_like_repository,
    )

    photo = photo_service.toggle_like(photo_id="1", user_id="1")
    assert photo is not None
    assert photo.id == photo_id
    # assert photo.liked is False


def test_toggle_like_not_found():
    mock_photo_repository = MagicMock()
    mock_photo_repository.find_by_id.return_value = None

    photo_service = PhotoService(
        photo_repository=mock_photo_repository,
    )

    photo = photo_service.toggle_like(photo_id="1", user_id="1")
    assert photo is None
