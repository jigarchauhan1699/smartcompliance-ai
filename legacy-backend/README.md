# SmartCompliance AI

MVP foundation for the SmartCompliance AI project plan. This repository starts with a backend service that covers:

- customer onboarding records
- sanctions and PEP screening
- explainable risk scoring
- case creation and analyst disposition
- immutable-style audit event capture

## Tech stack

- Python 3.12+
- FastAPI
- SQLAlchemy
- SQLite for local development

## Local setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -e .[dev]
uvicorn app.main:app --reload
```

The service seeds a local watchlist and writes a SQLite database to `smartcompliance.db` in the repo root.

## API overview

- `GET /health`
- `POST /api/v1/customers`
- `POST /api/v1/screenings`
- `GET /api/v1/customers/{customer_id}`
- `GET /api/v1/cases`
- `PATCH /api/v1/cases/{case_id}`
- `GET /api/v1/audit-events`

## MVP workflow

1. Create a customer with onboarding and profile details.
2. Screen the customer against sanctions and PEP watchlists.
3. Review the generated risk score and screening matches.
4. Investigate the generated case and update its disposition.
5. Inspect the audit trail for every state-changing action.
