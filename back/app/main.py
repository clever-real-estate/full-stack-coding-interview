from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import api_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health-check")
def health_check():
    return {"message": "Welcome to the Clever Photos API!"}


app.include_router(api_router)
