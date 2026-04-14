"""
================================================================
  ENQUIRIES ROUTER
  All API endpoints related to customer enquiries
================================================================

  ENDPOINTS:
  POST   /api/enquiries          → Submit new enquiry (public)
  GET    /api/enquiries          → List all enquiries (admin only)
  GET    /api/enquiries/{id}     → Get single enquiry (admin only)
  PATCH  /api/enquiries/{id}     → Update status (admin only)
  DELETE /api/enquiries/{id}     → Delete enquiry (admin only)

  TODO Phase 4:
  - Add JWT auth to all admin routes
  - Add pagination to list endpoint
  - Add filters (by status, date, product)
================================================================
"""

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List

from app.core.database import get_db
from app.models.enquiry import Enquiry, EnquiryStatus
from app.schemas.enquiry import EnquiryCreate, EnquiryUpdate, EnquiryOut
from app.services.whatsapp import notify_client_new_enquiry, notify_customer_confirmation


router = APIRouter(tags=["Enquiries"])


# ── POST /api/enquiries ───────────────────────────────────────
@router.post(
    "/enquiries",
    response_model=EnquiryOut,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a new enquiry from the website contact form",
)
async def create_enquiry(
    data: EnquiryCreate,
    background_tasks: BackgroundTasks,          # runs WhatsApp async
    db: AsyncSession = Depends(get_db),
):
    """
    Called when customer clicks "Submit Enquiry" on website.

    Steps:
    1. Validate input (Pydantic does this automatically)
    2. Save to PostgreSQL
    3. Send WhatsApp to client (background task — non-blocking)
    4. Send WhatsApp confirmation to customer (background task)
    5. Return saved enquiry
    """
    # Step 1+2: Create and save enquiry
    enquiry = Enquiry(**data.model_dump())
    db.add(enquiry)
    await db.flush()    # get the ID without full commit
    await db.refresh(enquiry)

    # Step 3+4: Send WhatsApp messages in background
    # BackgroundTasks = runs AFTER response is sent, non-blocking
    # Customer gets instant response, WhatsApp sends in background
    background_tasks.add_task(notify_client_new_enquiry, enquiry)
    background_tasks.add_task(
        notify_customer_confirmation,
        enquiry.phone,
        enquiry.name,
        enquiry.product,
    )

    return enquiry


# ── GET /api/enquiries ────────────────────────────────────────
@router.get(
    "/enquiries",
    response_model=List[EnquiryOut],
    summary="Get all enquiries — admin only",
)
async def list_enquiries(
    skip: int = 0,          # pagination offset
    limit: int = 50,        # max results per page
    status: EnquiryStatus = None,   # filter by status
    db: AsyncSession = Depends(get_db),
    # TODO Phase 4: add → current_user = Depends(get_current_admin)
):
    """
    Returns all enquiries, newest first.
    Used by admin dashboard to show enquiry table.

    Query params:
    - skip=0&limit=50  → pagination
    - status=new       → filter by status
    """
    query = select(Enquiry).order_by(desc(Enquiry.created_at))

    # Apply status filter if provided
    if status:
        query = query.where(Enquiry.status == status)

    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


# ── GET /api/enquiries/{id} ───────────────────────────────────
@router.get(
    "/enquiries/{enquiry_id}",
    response_model=EnquiryOut,
    summary="Get a single enquiry by ID — admin only",
)
async def get_enquiry(
    enquiry_id: int,
    db: AsyncSession = Depends(get_db),
    # TODO Phase 4: add → current_user = Depends(get_current_admin)
):
    enquiry = await db.get(Enquiry, enquiry_id)
    if not enquiry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Enquiry #{enquiry_id} not found"
        )
    return enquiry


# ── PATCH /api/enquiries/{id} ─────────────────────────────────
@router.patch(
    "/enquiries/{enquiry_id}",
    response_model=EnquiryOut,
    summary="Update enquiry status — admin only",
)
async def update_enquiry(
    enquiry_id: int,
    data: EnquiryUpdate,
    db: AsyncSession = Depends(get_db),
    # TODO Phase 4: add → current_user = Depends(get_current_admin)
):
    """
    Admin updates enquiry status from dashboard.
    e.g. NEW → CONTACTED → QUOTE_SENT → ORDER_CONFIRMED
    """
    enquiry = await db.get(Enquiry, enquiry_id)
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")

    # Update only fields that were provided
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(enquiry, field, value)

    await db.flush()
    await db.refresh(enquiry)
    return enquiry


# ── DELETE /api/enquiries/{id} ────────────────────────────────
@router.delete(
    "/enquiries/{enquiry_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete an enquiry — admin only",
)
async def delete_enquiry(
    enquiry_id: int,
    db: AsyncSession = Depends(get_db),
    # TODO Phase 4: add → current_user = Depends(get_current_admin)
):
    enquiry = await db.get(Enquiry, enquiry_id)
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    await db.delete(enquiry)


# ── GET /api/enquiries/stats/summary ─────────────────────────
@router.get(
    "/enquiries/stats/summary",
    summary="Get enquiry counts by status — for dashboard",
)
async def enquiry_stats(db: AsyncSession = Depends(get_db)):
    """
    Returns count of enquiries per status.
    Used by admin dashboard for overview cards.
    e.g. { "new": 5, "contacted": 3, "order_confirmed": 2 }
    """
    from sqlalchemy import func

    result = await db.execute(
        select(Enquiry.status, func.count(Enquiry.id))
        .group_by(Enquiry.status)
    )
    rows = result.all()
    return {row[0]: row[1] for row in rows}