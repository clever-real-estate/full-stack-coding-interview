import sqlalchemy as sa

import uuid

from sqlmodel import Field, SQLModel, Relationship
from typing import List


class Photo(SQLModel, table=True):
    id: uuid.UUID = Field(
        primary_key=True,
        nullable=False,
        sa_column_kwargs={"server_default": sa.text("gen_random_uuid()")},
    )
    photographer_name: str = Field(max_length=255)
    photographer_url: str = Field(max_length=255)
    avg_color: str = Field(max_length=255)
    alt: str = Field(max_length=255)
    image_url: str = Field(max_length=255)

    likes: List["PhotoLike"] = Relationship(back_populates="photo")  # type: ignore # noqa: F821
