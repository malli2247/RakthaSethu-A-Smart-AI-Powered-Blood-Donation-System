from fastapi import APIRouter

from app.schemas.matching import MatchRequest
from app.services.matching_service import generate_matches

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "rakthasethu-ai"}


@router.post("/matching/rank")
def match_donors(payload: MatchRequest):
    return {"matches": generate_matches(payload)}
