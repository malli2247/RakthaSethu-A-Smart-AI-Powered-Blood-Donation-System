from datetime import date
from math import asin, cos, radians, sin, sqrt
from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="RakthaSethu AI Service", version="0.1.0")

COMPATIBILITY = {
    "O-": {"O-"},
    "O+": {"O-", "O+"},
    "A-": {"O-", "A-"},
    "A+": {"O-", "O+", "A-", "A+"},
    "B-": {"O-", "B-"},
    "B+": {"O-", "O+", "B-", "B+"},
    "AB-": {"O-", "A-", "B-", "AB-"},
    "AB+": {"O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"},
}


class Coordinate(BaseModel):
    lat: float = Field(ge=-90, le=90)
    lng: float = Field(ge=-180, le=180)


class DonorCandidate(BaseModel):
    donor_id: str
    blood_group: str
    available: bool
    last_donation_date: Optional[date] = None
    response_rate: float = Field(default=0.5, ge=0, le=1)
    location: Optional[Coordinate] = None


class MatchRequest(BaseModel):
    required_blood_group: str
    emergency_level: str = Field(default="MEDIUM")
    required_location: Optional[Coordinate] = None
    donors: List[DonorCandidate]


class RankedDonor(BaseModel):
    donor_id: str
    score: float
    distance_km: Optional[float]
    reasons: List[str]


class MatchResponse(BaseModel):
    strategy: str
    ranked_donors: List[RankedDonor]


def haversine_km(origin: Coordinate, destination: Coordinate) -> float:
    lat1, lon1, lat2, lon2 = map(radians, [origin.lat, origin.lng, destination.lat, destination.lng])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    step = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    return 6371 * 2 * asin(sqrt(step))


def donation_recency_bonus(last_donation_date: Optional[date]) -> float:
    if not last_donation_date:
        return 5
    days = (date.today() - last_donation_date).days
    if days >= 120:
        return 15
    if days >= 90:
        return 10
    if days >= 60:
        return 5
    return -20


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "rakthasethu-ai"}


@app.post("/match", response_model=MatchResponse)
def match_donors(payload: MatchRequest) -> MatchResponse:
    compatible_groups = COMPATIBILITY.get(payload.required_blood_group, set())
    urgency_weight = {"LOW": 0.8, "MEDIUM": 1.0, "HIGH": 1.2, "CRITICAL": 1.4}.get(
        payload.emergency_level.upper(), 1.0
    )

    ranked: List[RankedDonor] = []
    for donor in payload.donors:
        if donor.blood_group not in compatible_groups or not donor.available:
            continue

        score = 60.0
        reasons = ["Compatible blood group", "Donor marked available"]
        distance_km: Optional[float] = None

        if payload.required_location and donor.location:
            distance_km = haversine_km(payload.required_location, donor.location)
            proximity_bonus = max(0.0, 30 - (distance_km * 0.75))
            score += proximity_bonus
            reasons.append(f"Distance considered ({distance_km:.1f} km)")

        score += donation_recency_bonus(donor.last_donation_date)
        score += donor.response_rate * 20
        score *= urgency_weight

        ranked.append(
            RankedDonor(
                donor_id=donor.donor_id,
                score=round(score, 2),
                distance_km=round(distance_km, 2) if distance_km is not None else None,
                reasons=reasons,
            )
        )

    ranked.sort(key=lambda donor: donor.score, reverse=True)
    return MatchResponse(strategy="rule_based_v1", ranked_donors=ranked)
