from typing import List

from fastapi import APIRouter, Depends

from app.schemas import PhotoResponse
from app.services import AuthService, PhotoService


router = APIRouter(prefix="/photos", tags=["photos"])


auth_service = AuthService()
photo_service = PhotoService()


@router.get(
    "/",
    response_model=List[PhotoResponse],
    dependencies=[Depends(auth_service.authenticate)],
)
def index():
    # TODO: Join to get user likes

    photos = photo_service.list()
    return photos
