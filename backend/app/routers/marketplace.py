from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Bid, EscrowTransaction, Listing
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/marketplace", tags=["Bidding, Fair-Price & Escrow"])

@router.post("/bid")
def place_bid(listing_id: int, buyer_id: int, offer_price: float, db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    # Fair price analysis
    modal_price = listing.govt_approved_price or listing.price_per_unit
    ratio = offer_price / (modal_price or 1)
    status = "fair"
    if ratio < 0.85:
        status = "low"
    elif ratio > 1.05:
        status = "high"

    bid = Bid(
        listing_id=listing_id,
        buyer_id=buyer_id,
        offer_price=offer_price,
        fair_meter_status=status
    )
    db.add(bid)
    db.commit()
    db.refresh(bid)

    return {
        "bid_id": bid.id,
        "offer_price": offer_price,
        "fair_meter_status": status,
        "is_warning_low": status == "low",
        "ratio_to_market": round(ratio * 100, 1)
    }

@router.post("/escrow/create")
def create_escrow(listing_id: int, buyer_id: int, seller_id: int, amount: float, db: Session = Depends(get_db)):
    ref = f"ESC-{uuid.uuid4().hex[:8].upper()}"
    escrow = EscrowTransaction(
        order_ref=ref,
        listing_id=listing_id,
        buyer_id=buyer_id,
        seller_id=seller_id,
        amount=amount,
        status="held"
    )
    db.add(escrow)
    db.commit()
    db.refresh(escrow)
    return escrow

@router.post("/escrow/release/{order_ref}")
def release_escrow(order_ref: str, db: Session = Depends(get_db)):
    escrow = db.query(EscrowTransaction).filter(EscrowTransaction.order_ref == order_ref).first()
    if not escrow:
        raise HTTPException(status_code=404, detail="Escrow order not found")
    
    escrow.status = "released"
    escrow.inspection_passed = True
    escrow.released_at = datetime.utcnow()
    db.commit()
    return {
        "message": "Payment released to Farmer UPI VPA successfully!",
        "order_ref": order_ref,
        "amount": escrow.amount,
        "status": "released"
    }
