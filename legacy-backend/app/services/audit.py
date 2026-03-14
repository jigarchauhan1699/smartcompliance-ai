from sqlalchemy.orm import Session

from app.models import AuditEvent


def write_audit_event(
    db: Session,
    *,
    action: str,
    entity_type: str,
    entity_id: str,
    payload: dict,
    actor: str = "system",
) -> AuditEvent:
    event = AuditEvent(
        actor=actor,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        payload=payload,
    )
    db.add(event)
    db.flush()
    return event
