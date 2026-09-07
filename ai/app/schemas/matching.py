from pydantic import BaseModel, Field


class DonorCandidate(BaseModel):
    donor_id: str
    blood_group: str
    availability: str
    distance_km: float | None = None
    last_donation_days: int | None = None


class MatchRequest(BaseModel):
    requested_blood_group: str = Field(min_length=2, max_length=16)
    emergency_priority: str = Field(default="MEDIUM")
    donors: list[DonorCandidate] = Field(default_factory=list)


class MatchResult(BaseModel):
    donor_id: str
    score: float
    rationale: list[str]
