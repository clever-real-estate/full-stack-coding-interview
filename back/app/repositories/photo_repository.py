from sqlmodel import Session, select
from typing import Sequence

from app.models import Photo
from app.infra.db import db


class PhotoRepository:
    def __init__(self, session: Session = next(db.get_session())):
        self.session = session

    def find_all(self) -> Sequence[Photo]:
        return self.session.exec(select(Photo)).all()
