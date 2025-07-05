from typing import Final
from sqlmodel import create_engine, Session

from app.infra.config import settings


class Database:
    _instance = None
    _initialized = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if not self._initialized:
            self._engine: Final = create_engine(settings.DATABASE_URL, echo=True)
            self._initialized = True

    @property
    def engine(self):
        return self._engine

    def get_session(self):
        with Session(self.engine) as session:
            yield session


db = Database()
