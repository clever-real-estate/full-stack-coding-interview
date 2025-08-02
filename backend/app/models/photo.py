from app.extensions import db
from app.models import BaseModel

class Photo(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    url = db.Column(db.String(255), nullable=False)
    photographer = db.Column(db.String(255))
    photographer_url = db.Column(db.String(255))
    photographer_id = db.Column(db.Integer)
    avg_color = db.Column(db.String(32))
    src_original = db.Column(db.String(255))
    src_large2x = db.Column(db.String(255))
    src_large = db.Column(db.String(255))
    src_medium = db.Column(db.String(255))
    src_small = db.Column(db.String(255))
    src_portrait = db.Column(db.String(255))
    src_landscape = db.Column(db.String(255))
    src_tiny = db.Column(db.String(255))
    alt = db.Column(db.String(255))
    likes = db.relationship("Like", back_populates="photo")
