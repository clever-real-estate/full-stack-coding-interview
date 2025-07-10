from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")

    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    DATABASE_URL: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int
    SECRET_KEY: str


settings = Settings()  # type: ignore
