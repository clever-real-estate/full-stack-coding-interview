from pydantic import BaseModel
import uuid


class PhotoResponse(BaseModel):
    """Schema for photo response"""

    id: uuid.UUID
    photographer_name: str
    photographer_url: str
    avg_color: str
    alt: str
    image_url: str
    liked: bool = False

    class Config:
        from_attributes = True


class PhotoLike(BaseModel):
    """Schema for photo like/unlike"""

    id: uuid.UUID
    user_id: uuid.UUID
    photo_id: uuid.UUID
