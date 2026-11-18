from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import UserCreate, UserResponse

router = APIRouter(prefix="/api/auth", tags=["Authentication & Profile"])

@router.post("/login-otp", response_model=UserResponse)
def login_or_register_otp(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Mobile OTP Login and instant onboarding.
    Creates farmer profile if first time or returns existing record.
    """
    user = db.query(User).filter(User.phone == user_in.phone).first()
    if not user:
        user = User(
            phone=user_in.phone,
            name=user_in.name,
            role=user_in.role,
            district=user_in.district,
            village=user_in.village,
            land_acres=user_in.land_acres or 0.0,
            crops_grown=user_in.crops_grown,
            livestock_owned=user_in.livestock_owned,
            preferred_language=user_in.preferred_language,
            extra_earnings_total=18450.0 # Initial baseline
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

@router.get("/profile/{phone}", response_model=UserResponse)
def get_user_profile(phone: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.phone == phone).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
