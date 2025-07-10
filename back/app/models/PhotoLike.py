import sqlalchemy as sa
import uuid

from sqlmodel import Field, SQLModel, Relationship

from app.models.User import User
from app.models.Photo import Photo


class PhotoLike(SQLModel, table=True):
    id: uuid.UUID = Field(
        primary_key=True,
        nullable=False,
        sa_column_kwargs={"server_default": sa.text("gen_random_uuid()")},
    )
    user_id: uuid.UUID = Field(foreign_key="user.id", nullable=False)
    photo_id: uuid.UUID = Field(foreign_key="photo.id", nullable=False)

    user: User = Relationship(back_populates="liked_photos")
    photo: Photo = Relationship(back_populates="likes")
