from typing import Sequence

from app.models import Photo
from app.repositories.photo_repository import PhotoRepository


class PhotoService:
    def __init__(
        self,
        photo_repository: PhotoRepository = PhotoRepository(),
    ):
        self.photo_repository = photo_repository

    def list_all(self) -> Sequence[Photo]:
        return self.photo_repository.find_all()
