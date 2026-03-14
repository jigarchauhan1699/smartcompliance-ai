import json
from functools import lru_cache
from pathlib import Path
from typing import Any

from app.config import settings
from app.models import Customer


@lru_cache(maxsize=1)
def load_watchlist() -> list[dict[str, Any]]:
    with Path(settings.watchlist_path).open("r", encoding="utf-8") as handle:
        return json.load(handle)


def screen_customer(customer: Customer) -> list[dict[str, Any]]:
    matches: list[dict[str, Any]] = []
    customer_name = customer.full_name.strip().lower()

    for record in load_watchlist():
        aliases = [alias.lower() for alias in record.get("aliases", [])]
        if customer_name == record["name"].lower() or customer_name in aliases:
            matches.append(
                {
                    "name": record["name"],
                    "category": record["category"],
                    "source": record["source"],
                    "match_reason": "exact_name_match",
                }
            )

    if customer.pep_declared and not any(match["category"] == "pep" for match in matches):
        matches.append(
            {
                "name": customer.full_name,
                "category": "pep",
                "source": "self-declared",
                "match_reason": "pep_declaration",
            }
        )

    return matches
