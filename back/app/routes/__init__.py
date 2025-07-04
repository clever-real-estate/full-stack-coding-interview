from fastapi import APIRouter

from app.routes import photos, users

api_router = APIRouter()
api_router.include_router(photos.router)
api_router.include_router(users.router)
