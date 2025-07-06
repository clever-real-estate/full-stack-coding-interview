from typing import List

from fastapi import APIRouter, Depends, HTTPException

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
def index(user=Depends(auth_service.authenticate)):
    photos = photo_service.get_all(user_id=user.id)
    return photos


@router.post(
    "/{photo_id}/like",
    response_model=PhotoResponse,
    dependencies=[Depends(auth_service.authenticate)],
)
def like(photo_id: str, user=Depends(auth_service.authenticate)):
    result = photo_service.toggle_like(photo_id, user.id)
    photo_service.map_to_response
    if result is None:
        raise HTTPException(status_code=404, detail="Photo not found")
    return result
