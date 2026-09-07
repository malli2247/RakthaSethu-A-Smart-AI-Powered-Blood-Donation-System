from app.schemas.matching import DonorCandidate, MatchRequest, MatchResult


BLOOD_COMPATIBILITY = {
    "O_NEGATIVE": {"O_NEGATIVE"},
    "O_POSITIVE": {"O_NEGATIVE", "O_POSITIVE"},
    "A_NEGATIVE": {"O_NEGATIVE", "A_NEGATIVE"},
    "A_POSITIVE": {"O_NEGATIVE", "O_POSITIVE", "A_NEGATIVE", "A_POSITIVE"},
    "B_NEGATIVE": {"O_NEGATIVE", "B_NEGATIVE"},
    "B_POSITIVE": {"O_NEGATIVE", "O_POSITIVE", "B_NEGATIVE", "B_POSITIVE"},
    "AB_NEGATIVE": {"O_NEGATIVE", "A_NEGATIVE", "B_NEGATIVE", "AB_NEGATIVE"},
    "AB_POSITIVE": {
        "O_NEGATIVE",
        "O_POSITIVE",
        "A_NEGATIVE",
        "A_POSITIVE",
        "B_NEGATIVE",
        "B_POSITIVE",
        "AB_NEGATIVE",
        "AB_POSITIVE",
    },
}


def _score_donor(candidate: DonorCandidate, request: MatchRequest) -> MatchResult | None:
    compatible = BLOOD_COMPATIBILITY.get(request.requested_blood_group, set())
    if candidate.blood_group not in compatible:
        return None

    score = 50.0
    rationale = ["Blood group compatible"]

    if candidate.availability == "AVAILABLE":
        score += 20
        rationale.append("Donor currently available")

    if candidate.distance_km is not None:
        proximity_bonus = max(0, 20 - min(candidate.distance_km, 20))
        score += proximity_bonus
        rationale.append(f"Distance factor applied ({candidate.distance_km:.1f} km)")

    if candidate.last_donation_days is not None:
        if candidate.last_donation_days >= 90:
            score += 10
            rationale.append("Safe interval since last donation")
        else:
            score -= 15
            rationale.append("Recent donation reduces eligibility score")

    if request.emergency_priority == "CRITICAL":
        score += 5
        rationale.append("Critical request priority boost")

    return MatchResult(donor_id=candidate.donor_id, score=round(score, 2), rationale=rationale)


def rank_donors(request: MatchRequest) -> list[MatchResult]:
    ranked = [_score_donor(candidate, request) for candidate in request.donors]
    filtered = [result for result in ranked if result is not None]
    return sorted(filtered, key=lambda item: item.score, reverse=True)
