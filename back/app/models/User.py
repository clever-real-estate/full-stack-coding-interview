import sqlalchemy as sa
import uuid

from pydantic import EmailStr
from sqlmodel import Field, SQLModel, Relationship
from typing import List


class User(SQLModel, table=True):
    id: uuid.UUID = Field(
        primary_key=True,
        nullable=False,
        sa_column_kwargs={"server_default": sa.text("gen_random_uuid()")},
    )
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    hashed_password: str

    liked_photos: List["PhotoLike"] = Relationship(back_populates="user")  # type: ignore  # noqa: F821
