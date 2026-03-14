from app.models import Customer, RiskLevel


HIGH_RISK_COUNTRIES = {"IR", "KP", "SY", "RU"}


def score_customer(customer: Customer, matches: list[dict]) -> tuple[float, RiskLevel, list[str]]:
    score = 5.0
    explanation: list[str] = []

    if customer.country.upper() in HIGH_RISK_COUNTRIES:
        score += 35
        explanation.append(f"Customer country {customer.country.upper()} is in the enhanced monitoring set.")

    if customer.pep_declared:
        score += 25
        explanation.append("Customer self-declared as a politically exposed person.")

    if customer.expected_monthly_volume_usd >= 50_000:
        score += 20
        explanation.append("Expected transaction volume exceeds enhanced due diligence threshold.")

    if customer.annual_income_usd and customer.expected_monthly_volume_usd > customer.annual_income_usd / 6:
        score += 15
        explanation.append("Projected monthly volume is materially high relative to declared income.")

    if matches:
        score += min(50, 20 * len(matches))
        explanation.append(f"{len(matches)} watchlist match(es) detected during screening.")

    score = min(score, 100)

    if score >= 75:
        level = RiskLevel.high
    elif score >= 40:
        level = RiskLevel.medium
    else:
        level = RiskLevel.low

    if not explanation:
        explanation.append("No major onboarding risk factors were triggered.")

    return score, level, explanation
