from fastapi import FastAPI

from app.routes import api_router


app = FastAPI()


@app.get("/health-check")
def health_check():
    return {"message": "Welcome to the Clever Photos API!"}


app.include_router(api_router)
