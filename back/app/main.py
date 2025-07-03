from fastapi import FastAPI
from sqlmodel import Session, select
from app.models import Photo
from app.db import engine

app = FastAPI()


@app.get("/health-check")
def health_check():
    return {"message": "Welcome to the Clever Photos API!"}


@app.get("/photos/all", response_model=list[Photo])
def get_all_photos():
    with Session(engine) as session:
        photos_statement = select(Photo)
        photos = session.exec(photos_statement).all()
        return photos
