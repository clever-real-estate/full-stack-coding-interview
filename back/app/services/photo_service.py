from typing import Sequence

from app.models import Photo
from app.repositories.photo_repository import PhotoRepository
from app.repositories.photo_like_repository import PhotoLikeRepository
from app.repositories.user_repository import UserRepository


class PhotoService:
    def __init__(
        self,
        photo_repository: PhotoRepository = PhotoRepository(),
        photo_like_repository: PhotoLikeRepository = PhotoLikeRepository(),
        user_repository: UserRepository = UserRepository(),
    ):
        self.photo_repository = photo_repository
        self.photo_like_repository = photo_like_repository
        self.user_repository = user_repository

    def get_all(self) -> Sequence[Photo]:
        return self.photo_repository.find_all()

    def get_by_id(self, photo_id: str) -> Photo | None:
        return self.photo_repository.find_by_id(photo_id)

    def toggle_like(self, photo_id: str, user_id: str) -> Photo | None:
        photo = self.get_by_id(photo_id)
        if photo is None:
            return None

        like = self.photo_like_repository.find(photo_id, user_id)
        if like is not None:
            self.photo_like_repository.remove(photo_id, user_id)
        else:
            self.photo_like_repository.add(photo_id, user_id)

        return photo
