from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "SmartCompliance AI"
    api_prefix: str = "/api/v1"
    database_url: str = f"sqlite:///{Path(__file__).resolve().parent.parent / 'smartcompliance.db'}"
    watchlist_path: Path = Path(__file__).resolve().parent / "seed" / "watchlists.json"

    model_config = SettingsConfigDict(env_prefix="SMARTCOMPLIANCE_", extra="ignore")


settings = Settings()
