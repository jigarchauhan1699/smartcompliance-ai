from fastapi.testclient import TestClient

from app.db import Base, engine
from app.main import app


def reset_database() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def test_healthcheck() -> None:
    with TestClient(app) as client:
        response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_onboarding_screening_flow() -> None:
    reset_database()

    with TestClient(app) as client:
        create_response = client.post(
            "/api/v1/customers",
            json={
                "full_name": "Fatima Rahman",
                "email": "fatima@example.com",
                "country": "GB",
                "date_of_birth": "1989-06-02",
                "onboarding_channel": "api",
                "annual_income_usd": 120000,
                "expected_monthly_volume_usd": 30000,
                "pep_declared": False,
            },
        )
        assert create_response.status_code == 201
        customer_id = create_response.json()["id"]

        screening_response = client.post(
            "/api/v1/screenings",
            json={"customer_id": customer_id, "screening_type": "onboarding"},
        )
        assert screening_response.status_code == 201
        screening = screening_response.json()
        assert screening["risk_level"] in {"medium", "high"}
        assert screening["matches"][0]["category"] == "pep"

        customer_detail = client.get(f"/api/v1/customers/{customer_id}")
        assert customer_detail.status_code == 200
        detail_payload = customer_detail.json()
        assert len(detail_payload["screenings"]) == 1
        assert len(detail_payload["cases"]) == 1

        case_id = detail_payload["cases"][0]["id"]
        case_update = client.patch(
            f"/api/v1/cases/{case_id}",
            json={"status": "in_review", "assigned_to": "analyst@bank.test", "notes": "Escalated for EDD."},
        )
        assert case_update.status_code == 200
        assert case_update.json()["status"] == "in_review"

        audit_events = client.get("/api/v1/audit-events")
        assert audit_events.status_code == 200
        assert len(audit_events.json()) >= 4
