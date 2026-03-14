from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import settings
from app.db import Base, engine, get_db
from app.models import AuditEvent, CaseRecord, CaseStatus, Customer, Screening
from app.schemas import (
    AuditEventRead,
    CaseRead,
    CaseUpdate,
    CustomerCreate,
    CustomerDetail,
    CustomerRead,
    ScreeningRead,
    ScreeningRequest,
)
from app.services.audit import write_audit_event
from app.services.risk import score_customer
from app.services.screening import load_watchlist, screen_customer


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    load_watchlist()
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.post(f"{settings.api_prefix}/customers", response_model=CustomerRead, status_code=status.HTTP_201_CREATED)
def create_customer(payload: CustomerCreate, db: Session = Depends(get_db)) -> Customer:
    existing = db.scalar(select(Customer).where(Customer.email == payload.email))
    if existing:
        raise HTTPException(status_code=409, detail="Customer email already exists.")

    customer_data = payload.model_dump()
    customer_data['country'] = payload.country.upper()
    customer = Customer(**customer_data)
    db.add(customer)
    db.flush()
    write_audit_event(
        db,
        action="customer.created",
        entity_type="customer",
        entity_id=customer.id,
        payload={"email": customer.email, "country": customer.country},
    )
    db.commit()
    db.refresh(customer)
    return customer


@app.get(f"{settings.api_prefix}/customers/{{customer_id}}", response_model=CustomerDetail)
def get_customer(customer_id: str, db: Session = Depends(get_db)) -> CustomerDetail:
    customer = db.get(Customer, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found.")

    screenings = db.scalars(
        select(Screening).where(Screening.customer_id == customer_id).order_by(Screening.created_at.desc())
    ).all()
    cases = db.scalars(select(CaseRecord).where(CaseRecord.customer_id == customer_id).order_by(CaseRecord.created_at.desc())).all()
    return CustomerDetail(customer=customer, screenings=screenings, cases=cases)


@app.post(f"{settings.api_prefix}/screenings", response_model=ScreeningRead, status_code=status.HTTP_201_CREATED)
def create_screening(payload: ScreeningRequest, db: Session = Depends(get_db)) -> Screening:
    customer = db.get(Customer, payload.customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found.")

    matches = screen_customer(customer)
    score, risk_level, explanation = score_customer(customer, matches)

    screening = Screening(
        customer_id=customer.id,
        screening_type=payload.screening_type,
        matches=matches,
        risk_score=score,
        risk_level=risk_level,
        explanation=explanation,
    )
    db.add(screening)
    db.flush()

    case = CaseRecord(
        customer_id=customer.id,
        screening_id=screening.id,
        status=CaseStatus.open if risk_level != "low" else CaseStatus.closed,
        queue="enhanced_due_diligence" if risk_level == "high" else "triage",
        disposition="auto_clear" if risk_level == "low" else None,
        notes="Auto-created from onboarding screening.",
    )
    db.add(case)
    db.flush()

    write_audit_event(
        db,
        action="screening.completed",
        entity_type="screening",
        entity_id=screening.id,
        payload={"customer_id": customer.id, "risk_level": risk_level.value, "match_count": len(matches)},
    )
    write_audit_event(
        db,
        action="case.created",
        entity_type="case",
        entity_id=case.id,
        payload={"customer_id": customer.id, "screening_id": screening.id, "status": case.status.value},
    )

    db.commit()
    db.refresh(screening)
    return screening


@app.get(f"{settings.api_prefix}/cases", response_model=list[CaseRead])
def list_cases(db: Session = Depends(get_db), status_filter: CaseStatus | None = None) -> list[CaseRecord]:
    query = select(CaseRecord).order_by(CaseRecord.created_at.desc())
    if status_filter:
        query = query.where(CaseRecord.status == status_filter)
    return list(db.scalars(query).all())


@app.patch(f"{settings.api_prefix}/cases/{{case_id}}", response_model=CaseRead)
def update_case(case_id: str, payload: CaseUpdate, db: Session = Depends(get_db)) -> CaseRecord:
    case = db.get(CaseRecord, case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found.")

    changes = payload.model_dump(exclude_unset=True)
    if not changes:
        raise HTTPException(status_code=400, detail="No changes supplied.")

    for field, value in changes.items():
        setattr(case, field, value)

    write_audit_event(
        db,
        action="case.updated",
        entity_type="case",
        entity_id=case.id,
        payload=changes,
        actor="analyst",
    )
    db.commit()
    db.refresh(case)
    return case


@app.get(f"{settings.api_prefix}/audit-events", response_model=list[AuditEventRead])
def list_audit_events(db: Session = Depends(get_db)) -> list[AuditEvent]:
    return list(db.scalars(select(AuditEvent).order_by(AuditEvent.created_at.desc())).all())
