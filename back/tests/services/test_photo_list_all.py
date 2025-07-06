from unittest.mock import MagicMock
from uuid import uuid4

from app.models import Photo
from app.services import PhotoService


def test_list_all():
    mock_photo_repository = MagicMock()
    mock_photo_repository.find_all.return_value = [
        Photo(
            id=uuid4(),
            photographer_name="Test",
            photographer_url="https://test.com",
            avg_color="Test",
            alt="Test",
            image_url="https://test.com",
        ),
        Photo(
            id=uuid4(),
            photographer_name="Test",
            photographer_url="https://test.com",
            avg_color="Test",
            alt="Test",
            image_url="https://test.com",
        ),
    ]

    photo_service = PhotoService(photo_repository=mock_photo_repository)
    photos = photo_service.list_all()
    assert len(photos) == 2
