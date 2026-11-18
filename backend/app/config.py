import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Uzhavan Thunai (உழவன் துணை) API"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./uzhavan_thunai.db")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "uzhavan-thunai-secret-key-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    AGMARKNET_API_KEY: str = os.getenv("AGMARKNET_API_KEY", "demo-agmarknet-key")
    CORS_ORIGINS: list = ["*"]

    class Config:
        env_file = ".env"

settings = Settings()
