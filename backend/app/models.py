from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(20), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    role = Column(String(30), default="farmer") # farmer, buyer, fpo, admin
    district = Column(String(100), nullable=False)
    village = Column(String(100), nullable=True)
    land_acres = Column(Float, default=0.0)
    crops_grown = Column(Text, nullable=True) # JSON or comma-separated
    livestock_owned = Column(Text, nullable=True)
    extra_earnings_total = Column(Float, default=0.0)
    is_verified = Column(Boolean, default=True)
    preferred_language = Column(String(10), default="ta")
    created_at = Column(DateTime, default=datetime.utcnow)

    listings = relationship("Listing", back_populates="seller")
    bids = relationship("Bid", back_populates="buyer")
    diagnostics = relationship("AiDiagnostic", back_populates="user")

class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255), nullable=False)
    category = Column(String(50), nullable=False) # vegetables, crops, fruits, livestock, poultry, dairy
    crop_type = Column(String(100), nullable=False)
    quantity = Column(Float, nullable=False)
    unit = Column(String(30), default="kg") # kg, quintal, head, litre, dozen
    price_per_unit = Column(Float, nullable=False)
    govt_approved_price = Column(Float, nullable=True)
    quality_grade = Column(String(10), default="A") # A, B, C
    harvest_date = Column(String(50), nullable=True)
    district = Column(String(100), nullable=False)
    village = Column(String(100), nullable=True)
    image_url = Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    
    # Livestock specific fields
    breed = Column(String(100), nullable=True)
    age = Column(String(50), nullable=True)
    weight = Column(String(50), nullable=True)
    is_vet_certified = Column(Boolean, default=False)
    
    is_sold = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    seller = relationship("User", back_populates="listings")
    bids = relationship("Bid", back_populates="listing")

class MandiPrice(Base):
    __tablename__ = "mandi_prices"

    id = Column(Integer, primary_key=True, index=True)
    commodity = Column(String(100), index=True, nullable=False)
    mandi_name = Column(String(150), index=True, nullable=False)
    district = Column(String(100), nullable=False)
    unit = Column(String(30), default="kg")
    min_price = Column(Float, nullable=False)
    max_price = Column(Float, nullable=False)
    modal_price = Column(Float, nullable=False)
    msp_price = Column(Float, nullable=True)
    arrivals_quintal = Column(Float, default=0.0)
    recorded_date = Column(String(50), default=datetime.utcnow().strftime("%Y-%m-%d"))

class PriceForecast(Base):
    __tablename__ = "price_forecasts"

    id = Column(Integer, primary_key=True, index=True)
    commodity = Column(String(100), index=True, nullable=False)
    horizon_days = Column(Integer, nullable=False)
    predicted_price = Column(Float, nullable=False)
    lower_band = Column(Float, nullable=False)
    upper_band = Column(Float, nullable=False)
    confidence = Column(Float, default=95.0)
    trend = Column(String(20), default="up") # up, down, stable
    reasoning = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow)

class Bid(Base):
    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)
    listing_id = Column(Integer, ForeignKey("listings.id"))
    buyer_id = Column(Integer, ForeignKey("users.id"))
    offer_price = Column(Float, nullable=False)
    fair_meter_status = Column(String(20), default="fair") # low, fair, high
    status = Column(String(30), default="pending") # pending, accepted, rejected, paid
    created_at = Column(DateTime, default=datetime.utcnow)

    listing = relationship("Listing", back_populates="bids")
    buyer = relationship("User", back_populates="bids")

class EscrowTransaction(Base):
    __tablename__ = "escrow_transactions"

    id = Column(Integer, primary_key=True, index=True)
    order_ref = Column(String(100), unique=True, index=True)
    listing_id = Column(Integer, ForeignKey("listings.id"))
    buyer_id = Column(Integer, ForeignKey("users.id"))
    seller_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    status = Column(String(30), default="held") # held, released, disputed
    inspection_passed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    released_at = Column(DateTime, nullable=True)

class AiDiagnostic(Base):
    __tablename__ = "ai_diagnostics"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    diagnostic_type = Column(String(30), nullable=False) # crop, animal
    image_url = Column(Text, nullable=True)
    detected_issue = Column(String(255), nullable=False)
    quality_grade = Column(String(10), nullable=True)
    freshness_percent = Column(Float, nullable=True)
    severity = Column(String(50), nullable=True)
    remedies = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="diagnostics")
