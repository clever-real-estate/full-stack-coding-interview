from app.extensions import db
from marshmallow import Schema, fields, validate

class BaseModel(db.Model):
    __abstract__ = True
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

from .user import User
from .photo import Photo
from .like import Like

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=1, max=80))
    password = fields.Str(required=True, load_only=True, validate=validate.Length(min=1, max=128))
    token = fields.Str(dump_only=True)

class PhotoSchema(Schema):
    id = fields.Int(dump_only=True)
    width = fields.Int()
    height = fields.Int()
    url = fields.Str(required=True, validate=validate.Length(min=1, max=255))
    photographer = fields.Str()
    photographer_url = fields.Str()
    photographer_id = fields.Int()
    avg_color = fields.Str()
    src_original = fields.Str()
    src_large2x = fields.Str()
    src_large = fields.Str()
    src_medium = fields.Str()
    src_small = fields.Str()
    src_portrait = fields.Str()
    src_landscape = fields.Str()
    src_tiny = fields.Str()
    alt = fields.Str()
    user_id = fields.Int()

class LikeSchema(Schema):
    user_id = fields.Int(required=True)
    photo_id = fields.Int(required=True)
