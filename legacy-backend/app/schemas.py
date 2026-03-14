from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.models import CaseStatus, RiskLevel


class CustomerCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    country: str = Field(min_length=2, max_length=2)
    date_of_birth: str = Field(pattern=r"^\d{4}-\d{2}-\d{2}$")
    onboarding_channel: str = Field(min_length=2, max_length=50)
    annual_income_usd: float = Field(gt=0)
    expected_monthly_volume_usd: float = Field(ge=0)
    pep_declared: bool = False


class CustomerRead(CustomerCreate):
    model_config = ConfigDict(from_attributes=True)

    id: str
    created_at: datetime


class ScreeningRequest(BaseModel):
    customer_id: str
    screening_type: str = "onboarding"


class ScreeningRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    customer_id: str
    screening_type: str
    matches: list[dict]
    risk_score: float
    risk_level: RiskLevel
    explanation: list[str]
    created_at: datetime


class CaseRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    customer_id: str
    screening_id: str
    status: CaseStatus
    queue: str
    assigned_to: str | None
    notes: str
    disposition: str | None
    created_at: datetime
    updated_at: datetime


class CaseUpdate(BaseModel):
    status: CaseStatus | None = None
    assigned_to: str | None = None
    notes: str | None = None
    disposition: str | None = None


class AuditEventRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    actor: str
    action: str
    entity_type: str
    entity_id: str
    payload: dict
    created_at: datetime


class CustomerDetail(BaseModel):
    customer: CustomerRead
    screenings: list[ScreeningRead]
    cases: list[CaseRead]
