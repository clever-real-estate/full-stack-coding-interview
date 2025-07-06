from typing import List

from app.models import Photo
from app.schemas import PhotoResponse
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

    def map_to_response(self, photo: Photo, user_id: str) -> PhotoResponse:
        return PhotoResponse(
            **photo.model_dump(),
            liked=any(like.user_id == user_id for like in photo.likes),
        )

    def get_all(self, user_id: str) -> List[PhotoResponse]:
        photos = self.photo_repository.find_all()

        return [self.map_to_response(photo, user_id) for photo in photos]

    def get_by_id(self, photo_id: str) -> Photo | None:
        return self.photo_repository.find_by_id(photo_id)

    def toggle_like(self, photo_id: str, user_id: str) -> PhotoResponse | None:
        photo = self.get_by_id(photo_id)
        if photo is None:
            return None

        like = self.photo_like_repository.find(photo_id, user_id)
        if like is not None:
            self.photo_like_repository.remove(photo_id, user_id)
        else:
            self.photo_like_repository.add(photo_id, user_id)

        return self.map_to_response(photo, user_id)
