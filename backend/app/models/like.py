from app.extensions import db
from app.models import BaseModel

class Like(BaseModel):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    photo_id = db.Column(db.Integer, db.ForeignKey('photo.id'), primary_key=True)
    user = db.relationship("User", back_populates="likes")
    photo = db.relationship("Photo", back_populates="likes")