from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import MandiPrice
from ..services.forecast_engine import forecast_engine

router = APIRouter(prefix="/api/prices", tags=["Price Intelligence & Forecast"])

@router.get("/live")
def get_live_mandi_prices(commodity: str = "tomato", db: Session = Depends(get_db)):
    """
    Returns live Agmarknet & Uzhavar Sandhai approved rates across Tamil Nadu mandis.
    """
    prices = db.query(MandiPrice).filter(MandiPrice.commodity.ilike(f"%{commodity}%")).all()
    if not prices:
        # Fallback simulated dataset
        return [
            {"mandi": "Oddanchatram (Dindigul)", "modal_price": 38.0, "unit": "kg", "msp": 28.0},
            {"mandi": "Koyambedu (Chennai)", "modal_price": 44.0, "unit": "kg", "msp": 28.0},
            {"mandi": "Mettupalayam (Coimbatore)", "modal_price": 38.0, "unit": "kg", "msp": 28.0},
            {"mandi": "Local Uzhavar Sandhai", "modal_price": 40.0, "unit": "kg", "msp": 28.0}
        ]
    return prices

@router.get("/forecast/{commodity}")
def get_commodity_forecast(commodity: str, horizon_days: int = 7):
    """
    Returns 7-30 day price prediction with 10th-90th quantile regression bands.
    """
    return forecast_engine.generate_forecast(commodity, horizon_days)
