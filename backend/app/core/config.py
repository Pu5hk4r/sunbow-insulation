"""
================================================================
  SETTINGS / CONFIGURATION
  Reads from .env file using pydantic-settings
================================================================

  NEVER hardcode secrets. All secrets go in .env
  .env is in .gitignore — never commit it to GitHub!
================================================================
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # ── App ───────────────────────────────────────────────────
    APP_NAME: str = "Sunbow Insulation API"
    DEBUG: bool = True          # TODO: set False in production

    # ── Database ──────────────────────────────────────────────
    # Local dev: postgresql+asyncpg://user:pass@localhost:5432/sunbow
    # GCP Cloud SQL: update host to Cloud SQL IP in production
    DATABASE_URL: str = "postgresql+asyncpg://sunbow:sunbow123@localhost:5432/sunbow_db"

    # ── JWT Auth (for admin panel) ────────────────────────────
    SECRET_KEY: str = "CHANGE_THIS_IN_PRODUCTION_USE_RANDOM_256BIT_KEY"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 8   # 8 hours

    # ── WhatsApp (Meta Cloud API) ─────────────────────────────
    # TODO: Get these from Meta Developer Console
    # https://developers.facebook.com/apps/
    WHATSAPP_TOKEN: str = ""           # your permanent token
    WHATSAPP_PHONE_NUMBER_ID: str = "" # your WhatsApp number ID
    WHATSAPP_VERIFY_TOKEN: str = "sunbow_verify_2024"  # webhook verify

    # Client's WhatsApp number (receives new enquiry alerts)
    # TODO: Get actual WhatsApp number from client
    CLIENT_WHATSAPP: str = "918048970649"  # +91 80489 70649

    # ── Email (SendGrid) ─────────────────────────────────────
    # TODO: Set up SendGrid account, get API key
    SENDGRID_API_KEY: str = ""
    CLIENT_EMAIL: str = "info@sunbowinsulation.in"

    # ── CORS ──────────────────────────────────────────────────
    # TODO: Replace with actual domain in production
    ALLOWED_ORIGINS: list = ["http://localhost:3000", "https://sunbowinsulation.in"]

    class Config:
        env_file = ".env"          # reads from backend/.env
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings():
    """Cached settings — reads .env only once"""
    return Settings()


# Single instance used everywhere
settings = get_settings()