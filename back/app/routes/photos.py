from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.schemas import PhotoResponse
from app.models import Photo
from app.infra.db import db

router = APIRouter(prefix="/photos", tags=["photos"])


@router.get("/all", response_model=list[PhotoResponse])
def get_all_photos(session: Session = Depends(db.get_session)):
    # TODO: Implement authentication
    # TODO: Join to get user likes
    photos_statement = select(Photo)
    photos = session.exec(photos_statement).all()
    return photos


@router.post("/{photo_id}/like", response_model=PhotoResponse)
def toggle_like(photo_id: int, session: Session = Depends(db.get_session)):
    """Toggle like status for a photo"""
    # TODO: Implement authentication
    photo = session.exec(
        select(PhotoResponse).where(PhotoResponse.id == photo_id)
    ).first()
    if not photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Photo not found"
        )
    # TODO: Implement liking logic
    return photo
