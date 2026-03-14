from __future__ import annotations

from datetime import UTC, datetime
from enum import Enum
from uuid import uuid4

from sqlalchemy import JSON, DateTime, Enum as SqlEnum, Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base


def utc_now() -> datetime:
    return datetime.now(UTC)


def generate_id() -> str:
    return str(uuid4())


class RiskLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class CaseStatus(str, Enum):
    open = "open"
    in_review = "in_review"
    escalated = "escalated"
    closed = "closed"


class Customer(Base):
    __tablename__ = "customers"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_id)
    full_name: Mapped[str] = mapped_column(String(255), index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    country: Mapped[str] = mapped_column(String(2), index=True)
    date_of_birth: Mapped[str] = mapped_column(String(10))
    onboarding_channel: Mapped[str] = mapped_column(String(50))
    annual_income_usd: Mapped[float] = mapped_column(Float)
    expected_monthly_volume_usd: Mapped[float] = mapped_column(Float)
    pep_declared: Mapped[bool]
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    screenings: Mapped[list["Screening"]] = relationship(back_populates="customer", cascade="all, delete-orphan")
    cases: Mapped[list["CaseRecord"]] = relationship(back_populates="customer", cascade="all, delete-orphan")


class Screening(Base):
    __tablename__ = "screenings"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_id)
    customer_id: Mapped[str] = mapped_column(ForeignKey("customers.id"), index=True)
    screening_type: Mapped[str] = mapped_column(String(50), default="onboarding")
    matches: Mapped[list[dict]] = mapped_column(JSON, default=list)
    risk_score: Mapped[float] = mapped_column(Float)
    risk_level: Mapped[RiskLevel] = mapped_column(SqlEnum(RiskLevel))
    explanation: Mapped[list[str]] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)

    customer: Mapped["Customer"] = relationship(back_populates="screenings")


class CaseRecord(Base):
    __tablename__ = "cases"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_id)
    customer_id: Mapped[str] = mapped_column(ForeignKey("customers.id"), index=True)
    screening_id: Mapped[str] = mapped_column(ForeignKey("screenings.id"), index=True)
    status: Mapped[CaseStatus] = mapped_column(SqlEnum(CaseStatus), default=CaseStatus.open)
    queue: Mapped[str] = mapped_column(String(50), default="triage")
    assigned_to: Mapped[str | None] = mapped_column(String(255), nullable=True)
    notes: Mapped[str] = mapped_column(Text, default="")
    disposition: Mapped[str | None] = mapped_column(String(50), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    customer: Mapped["Customer"] = relationship(back_populates="cases")


class AuditEvent(Base):
    __tablename__ = "audit_events"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=generate_id)
    actor: Mapped[str] = mapped_column(String(255), default="system")
    action: Mapped[str] = mapped_column(String(100), index=True)
    entity_type: Mapped[str] = mapped_column(String(50))
    entity_id: Mapped[str] = mapped_column(String(36), index=True)
    payload: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utc_now)
