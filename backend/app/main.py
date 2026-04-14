"""
================================================================
  SUNBOW INSULATION — PHASE 3 BACKEND
  FastAPI Entry Point
================================================================

  DEVELOPER: Pushkar
  PURPOSE:   Receives enquiries from frontend, stores in
             PostgreSQL, triggers WhatsApp notifications

  HOW TO RUN:
    cd backend
    uvicorn app.main:app --reload

  SWAGGER DOCS (auto-generated):
    http://localhost:8000/docs

  PHASE ROADMAP:
    Phase 1 ✅ Website shell
    Phase 2 ✅ 3D viewer + product modal
    Phase 3 ✅ FastAPI backend (YOU ARE HERE)
    Phase 4 🔜 Admin panel dashboard
    Phase 5 🔜 WhatsApp automation
    Phase 6 🔜 Analytics dashboard
================================================================
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.database import create_tables
from app.routers import enquiries, products, health


# ── Startup / Shutdown ────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Runs on startup → creates DB tables if not exist
    Runs on shutdown → cleanup (add later)
    """
    print("🚀 Sunbow Backend starting up...")
    await create_tables()
    print("✅ Database tables ready")
    yield
    print("🛑 Sunbow Backend shutting down...")


# ── App instance ──────────────────────────────────────────────
app = FastAPI(
    title="Sunbow Insulation API",
    description="Backend API for Sunbow Insulation website — enquiries, products, WhatsApp",
    version="1.0.0",
    lifespan=lifespan,
)


# ── CORS (allow frontend to talk to backend) ──────────────────
# TODO: In production, replace "*" with your actual domain
# e.g. ["https://sunbowinsulation.in", "https://www.sunbowinsulation.in"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # ← change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Register routers ──────────────────────────────────────────
app.include_router(health.router)                          # /health
app.include_router(enquiries.router, prefix="/api")        # /api/enquiries
app.include_router(products.router, prefix="/api")         # /api/products


# ── Root ──────────────────────────────────────────────────────
@app.get("/")
async def root():
    return {
        "message": "Sunbow Insulation API is running",
        "docs": "/docs",
        "version": "1.0.0"
    }