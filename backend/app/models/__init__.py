from app.extensions import db

class BaseModel(db.Model):
    __abstract__ = True
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

from .user import User
from .photo import Photo
from .like import Like
