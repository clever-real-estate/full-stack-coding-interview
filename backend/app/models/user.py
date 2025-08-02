from app.extensions import db
from app.models import BaseModel

class User(BaseModel):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    token = db.Column(db.String(128), unique=True, nullable=True)
    likes = db.relationship("Like", back_populates="user")
