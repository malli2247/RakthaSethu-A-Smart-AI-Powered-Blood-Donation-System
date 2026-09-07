from app.engines.rule_based import rank_donors
from app.schemas.matching import MatchRequest, MatchResult


def generate_matches(request: MatchRequest) -> list[MatchResult]:
    """
    Rule-based matching for Phase 1 foundation.
    Future ML models can replace this service while keeping API contract stable.
    """
    return rank_donors(request)
