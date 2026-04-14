"""
================================================================
  ENQUIRY SCHEMAS (Pydantic)
================================================================

  Schemas = what data looks like going IN and OUT of the API.
  Pydantic auto-validates — if phone is missing, it rejects
  the request automatically. No manual if-checks needed.

  3 schemas:
  - EnquiryCreate  → what frontend sends (input)
  - EnquiryUpdate  → what admin sends to update status
  - EnquiryOut     → what API returns (output)
================================================================
"""

from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime
from app.models.enquiry import EnquiryStatus, EnquirySource
import re


class EnquiryCreate(BaseModel):
    """
    What the frontend contact form sends.
    Required fields: name, phone
    Everything else is optional.
    """
    name:     str
    company:  Optional[str] = None
    phone:    str
    email:    Optional[str] = None
    product:  Optional[str] = None
    quantity: Optional[str] = None
    message:  Optional[str] = None
    source:   EnquirySource = EnquirySource.WEBSITE

    # ── Validators ────────────────────────────────────────────
    @field_validator("name")
    @classmethod
    def name_must_not_be_empty(cls, v):
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        return v

    @field_validator("phone")
    @classmethod
    def phone_must_be_valid(cls, v):
        """
        Accept Indian mobile numbers in any format:
        +91XXXXXXXXXX, 91XXXXXXXXXX, 0XXXXXXXXXX, XXXXXXXXXX
        """
        # Remove spaces, dashes, brackets
        cleaned = re.sub(r"[\s\-\(\)]", "", v)
        # Remove country code if present
        cleaned = re.sub(r"^(\+91|91|0)", "", cleaned)
        if not re.match(r"^[6-9]\d{9}$", cleaned):
            raise ValueError("Enter a valid Indian mobile number")
        return cleaned

    @field_validator("message")
    @classmethod
    def sanitize_message(cls, v):
        """Basic sanitization — strip HTML tags"""
        if v:
            v = re.sub(r"<[^>]+>", "", v)  # remove HTML
            return v.strip()[:2000]          # max 2000 chars
        return v

    class Config:
        # Example shown in /docs
        json_schema_extra = {
            "example": {
                "name": "Rajesh Kumar",
                "company": "Kumar Electricals Pvt Ltd",
                "phone": "9876543210",
                "email": "rajesh@kumarelectricals.com",
                "product": "Fiberglass Braided Sleeve 10mm",
                "quantity": "5000 meters",
                "message": "Need for motor winding application, Class F grade"
            }
        }


class EnquiryUpdate(BaseModel):
    """
    Admin updates enquiry status from dashboard.
    All fields optional — admin may update one at a time.
    """
    status:       Optional[EnquiryStatus] = None
    # TODO: Add staff_notes when column is added to model
    # staff_notes:  Optional[str] = None


class EnquiryOut(BaseModel):
    """
    What the API sends back.
    Never expose internal fields like raw DB IDs to frontend.
    """
    id:         int
    name:       str
    company:    Optional[str]
    phone:      str
    email:      Optional[str]
    product:    Optional[str]
    quantity:   Optional[str]
    message:    Optional[str]
    status:     EnquiryStatus
    source:     EnquirySource
    created_at: datetime

    class Config:
        from_attributes = True   # allows reading from SQLAlchemy model