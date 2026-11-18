from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class UserBase(BaseModel):
    phone: str
    name: str
    role: str = "farmer"
    district: str
    village: Optional[str] = None
    land_acres: Optional[float] = 0.0
    crops_grown: Optional[str] = None
    livestock_owned: Optional[str] = None
    preferred_language: str = "ta"

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    extra_earnings_total: float
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ListingBase(BaseModel):
    title: str
    category: str
    crop_type: str
    quantity: float
    unit: str = "kg"
    price_per_unit: float
    govt_approved_price: Optional[float] = None
    quality_grade: str = "A"
    harvest_date: Optional[str] = None
    district: str
    village: Optional[str] = None
    image_url: Optional[str] = None
    description: Optional[str] = None
    breed: Optional[str] = None
    age: Optional[str] = None
    weight: Optional[str] = None
    is_vet_certified: bool = False

class ListingCreate(ListingBase):
    pass

class ListingResponse(ListingBase):
    id: int
    seller_id: int
    is_sold: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AdvisorRequest(BaseModel):
    commodity_id: str
    quantity: float
    district: str
    use_shared_pool: bool = True

class AdvisorRecommendation(BaseModel):
    best_market_id: str
    best_market_name: str
    recommendation_type: str # sell_now, wait_days
    wait_days: int
    gross_market_value: float
    transport_cost: float
    mandi_deductions: float
    net_in_hand_profit: float
    profit_diff_vs_local: float
    reasoning: str
    market_comparisons: List[Dict[str, Any]]

class CropDoctorRequest(BaseModel):
    image_base64: Optional[str] = None
    commodity: str = "tomato"

class CropDoctorResponse(BaseModel):
    quality_grade: str # A, B, C
    freshness_percent: float
    is_rotten: bool
    diagnosis: str
    action_plan: str
    disease_detected: str
    model_name: str = "MobileNetV3-Small-ProduceGrading"
    latency_ms: float = 42.0

class AnimalDoctorRequest(BaseModel):
    image_base64: Optional[str] = None
    animal_type: str = "goat" # goat, cow, poultry, sheep

class AnimalDoctorResponse(BaseModel):
    wound_detected: bool
    severity: str # mild, moderate, severe
    infection_risk: str
    home_remedies_ta: List[str]
    vet_medicines: List[str]
    emergency_vet_phone: str
    model_name: str = "MobileNetV3-LivestockWound"

class VoiceQueryRequest(BaseModel):
    query_text: str
    language: str = "ta" # ta, en, hi, te, kn, ml, mr, bn, gu, pa

class VoiceQueryResponse(BaseModel):
    query: str
    language: str
    spoken_answer: str
    detected_intent: str
    target_commodity: Optional[str] = None
