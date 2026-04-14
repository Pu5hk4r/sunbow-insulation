from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_products():
    # Phase 4
    return [{"id": 1, "name": "Acoustic Panel"}]
