from sqlmodel import Session, select


from app.models import PhotoLike
from app.infra.db import db


class PhotoLikeRepository:
    def __init__(self, session: Session = next(db.get_session())):
        self.session = session

    def add(self, photo_id: str, user_id: str) -> None:
        self.session.add(
            PhotoLike(photo_id=photo_id, user_id=user_id)  # type: ignore
        )
        self.session.commit()

    def find(self, photo_id: str, user_id: str) -> PhotoLike | None:
        return self.session.exec(
            select(PhotoLike).where(
                PhotoLike.photo_id == photo_id, PhotoLike.user_id == user_id
            )
        ).first()

    def remove(self, photo_id: str, user_id: str) -> None:
        self.session.delete(self.find(photo_id, user_id))
        self.session.commit()
