from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import Listing, User
from ..schemas import ListingCreate, ListingResponse

router = APIRouter(prefix="/api/listings", tags=["Marketplace Listings"])

@router.get("/", response_model=List[ListingResponse])
def get_listings(
    category: Optional[str] = None,
    district: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Listing).filter(Listing.is_sold == False)
    if category and category != 'all':
        query = query.filter(Listing.category == category)
    if district:
        query = query.filter(Listing.district == district)
    return query.order_by(Listing.id.desc()).all()

@router.post("/", response_model=ListingResponse)
def create_listing(listing_in: ListingCreate, seller_id: int = 1, db: Session = Depends(get_db)):
    listing = Listing(
        seller_id=seller_id,
        title=listing_in.title,
        category=listing_in.category,
        crop_type=listing_in.crop_type,
        quantity=listing_in.quantity,
        unit=listing_in.unit,
        price_per_unit=listing_in.price_per_unit,
        govt_approved_price=listing_in.govt_approved_price or round(listing_in.price_per_unit * 0.92, 1),
        quality_grade=listing_in.quality_grade,
        harvest_date=listing_in.harvest_date,
        district=listing_in.district,
        village=listing_in.village,
        image_url=listing_in.image_url,
        description=listing_in.description,
        breed=listing_in.breed,
        age=listing_in.age,
        weight=listing_in.weight,
        is_vet_certified=listing_in.is_vet_certified
    )
    db.add(listing)
    db.commit()
    db.refresh(listing)
    return listing
