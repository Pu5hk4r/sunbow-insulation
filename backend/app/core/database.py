"""
================================================================
  DATABASE CONNECTION
  Uses SQLAlchemy async + PostgreSQL (via asyncpg)
================================================================

  LOCAL DEV:   PostgreSQL running via Docker
  PRODUCTION:  GCP Cloud SQL (PostgreSQL)

  Connection string is read from .env file
  Never hardcode credentials here!
================================================================
"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings


# ── Engine ────────────────────────────────────────────────────
# async engine = non-blocking DB calls (FastAPI loves this)
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,       # logs SQL queries in dev mode
    pool_size=10,              # max connections in pool
    max_overflow=20,           # extra connections if pool is full
)


# ── Session factory ───────────────────────────────────────────
AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,    # don't expire objects after commit
)


# ── Base class for all models ─────────────────────────────────
class Base(DeclarativeBase):
    pass


# ── Dependency: get DB session per request ────────────────────
async def get_db():
    """
    FastAPI dependency injection.
    Usage in router:
        async def my_route(db: AsyncSession = Depends(get_db)):
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


# ── Create all tables on startup ──────────────────────────────
async def create_tables():
    """
    Called from main.py lifespan on startup.
    Creates tables if they don't exist yet.
    In production use Alembic migrations instead.
    TODO: Set up Alembic for production migrations
    """
    async with engine.begin() as conn:
        # Import all models so Base knows about them
        from app.models import enquiry, product   # noqa: F401
        await conn.run_sync(Base.metadata.create_all)