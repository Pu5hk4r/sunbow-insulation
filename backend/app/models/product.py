"""
================================================================
  PRODUCT MODEL
  Database table: products
================================================================

  Client can manage products from admin panel (Phase 4).
  For now products are hardcoded in frontend.
  This model lets us move them to DB later.

  TODO Phase 4:
  - Admin uploads product images here
  - Products fetched from API instead of hardcoded in JSX
================================================================
"""

from sqlalchemy import Column, Integer, String, Text, Boolean, Float
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    # ── Primary Key ───────────────────────────────────────────
    id          = Column(Integer, primary_key=True, index=True)

    # ── Basic Info ────────────────────────────────────────────
    name        = Column(String(200), nullable=False)
    tagline     = Column(String(300), nullable=True)
    category    = Column(String(50),  nullable=False, index=True)
    # e.g. FIBERGLASS, SILICONE, ELECTRICAL, YARN, CABLES, TEFLON

    # ── Description ───────────────────────────────────────────
    description = Column(Text, nullable=True)

    # ── Technical Specs ───────────────────────────────────────
    temp_range  = Column(String(50),  nullable=True)   # e.g. "550°C"
    diameter    = Column(String(50),  nullable=True)   # e.g. "Ø 2-100mm"
    voltage     = Column(String(50),  nullable=True)   # e.g. "35kV"
    material    = Column(String(100), nullable=True)
    finish      = Column(String(100), nullable=True)
    standard    = Column(String(100), nullable=True)   # IEC, UL, etc.

    # ── Images ────────────────────────────────────────────────
    # TODO: Use GCP Cloud Storage for images in production
    # Store image URLs here, not actual files
    image_url       = Column(String(500), nullable=True)  # main image
    gallery_urls    = Column(Text, nullable=True)         # JSON array of URLs

    # ── 3D Model ──────────────────────────────────────────────
    # TODO: Store .glb file URL when 3D models are available
    model_3d_url    = Column(String(500), nullable=True)

    # ── Display ───────────────────────────────────────────────
    badge       = Column(String(50),  nullable=True)   # e.g. "BESTSELLER"
    badge_color = Column(String(20),  nullable=True)   # hex color
    is_active   = Column(Boolean,     default=True)    # show/hide product
    sort_order  = Column(Integer,     default=0)       # display order

    # ── Timestamps ────────────────────────────────────────────
    created_at  = Column(DateTime(timezone=True), server_default=func.now())
    updated_at  = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Product #{self.id} — {self.name}>"