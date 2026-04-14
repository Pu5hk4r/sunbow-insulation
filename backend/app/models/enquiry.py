"""
================================================================
  ENQUIRY MODEL
  Database table: enquiries
================================================================

  Every time someone fills the contact form on the website,
  a row is created here.

  Columns you can add later:
  - assigned_to (staff member handling it)
  - follow_up_date
  - order_value (when converted to order)
================================================================
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from app.core.database import Base
import enum


class EnquiryStatus(str, enum.Enum):
    """
    Lifecycle of an enquiry:
    NEW → CONTACTED → QUOTE_SENT → ORDER_CONFIRMED → DISPATCHED → CLOSED
    Client can update this from the admin panel (Phase 4)
    """
    NEW             = "new"              # just submitted
    CONTACTED       = "contacted"        # team has called/WhatsApp'd
    QUOTE_SENT      = "quote_sent"       # quotation email sent
    ORDER_CONFIRMED = "order_confirmed"  # client confirmed order
    DISPATCHED      = "dispatched"       # goods shipped
    CLOSED          = "closed"           # deal done
    SPAM            = "spam"             # mark as spam


class EnquirySource(str, enum.Enum):
    """Where did this enquiry come from?"""
    WEBSITE   = "website"    # contact form
    WHATSAPP  = "whatsapp"   # direct WhatsApp
    INSTAGRAM = "instagram"  # Instagram DM / link
    REFERRAL  = "referral"   # word of mouth
    OTHER     = "other"


class Enquiry(Base):
    """
    Main enquiry table.
    One row = one customer enquiry.
    """
    __tablename__ = "enquiries"

    # ── Primary Key ───────────────────────────────────────────
    id = Column(Integer, primary_key=True, index=True)

    # ── Customer Info ─────────────────────────────────────────
    name        = Column(String(100), nullable=False)
    company     = Column(String(150), nullable=True)
    phone       = Column(String(20),  nullable=False, index=True)
    email       = Column(String(150), nullable=True)

    # ── Enquiry Details ───────────────────────────────────────
    product     = Column(String(200), nullable=True)   # which product
    quantity    = Column(String(100), nullable=True)   # how much
    message     = Column(Text,        nullable=True)   # additional notes

    # ── Meta ──────────────────────────────────────────────────
    status      = Column(
        Enum(EnquiryStatus),
        default=EnquiryStatus.NEW,
        nullable=False,
        index=True
    )
    source      = Column(
        Enum(EnquirySource),
        default=EnquirySource.WEBSITE,
        nullable=False
    )

    # ── Tracking ──────────────────────────────────────────────
    # TODO: Add staff_notes column for admin to add internal notes
    # staff_notes = Column(Text, nullable=True)

    # ── Timestamps ────────────────────────────────────────────
    created_at  = Column(DateTime(timezone=True), server_default=func.now())
    updated_at  = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Enquiry #{self.id} — {self.name} — {self.status}>"