import os
import sys

# Ensure backend root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.database import SessionLocal, engine, Base
from app.models import User, Listing, MandiPrice, PriceForecast

def seed():
    print("🌱 Initializing Uzhavan Thunai database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # 1. Seed Demo Farmers & Buyers
    if db.query(User).count() == 0:
        print("👤 Seeding initial users...")
        u1 = User(
            phone="+919842199014",
            name="Muthuvel Karuppasamy",
            role="farmer",
            district="Dindigul",
            village="Oddanchatram South",
            land_acres=4.5,
            crops_grown="Tomato, Shallots, Paddy",
            livestock_owned="2 Kangayam Cows, 6 Salem Black Goats, 25 Nattu Kozhi",
            extra_earnings_total=34850.0,
            is_verified=True,
            preferred_language="ta"
        )
        u2 = User(
            phone="+919442188390",
            name="Selvaraj K.",
            role="farmer",
            district="Dindigul",
            village="Oddanchatram North",
            land_acres=6.0,
            crops_grown="Tomato, Drumstick, Chinna Vengayam",
            livestock_owned="Country Hens",
            extra_earnings_total=42100.0,
            is_verified=True,
            preferred_language="ta"
        )
        u3 = User(
            phone="+919842177102",
            name="Murugesan Palanisamy",
            role="farmer",
            district="Tiruppur",
            village="Kangayam East",
            land_acres=8.0,
            crops_grown="Fodder Cholam, Coconut",
            livestock_owned="Kangayam Native Cattle, Mecheri Rams",
            extra_earnings_total=58000.0,
            is_verified=True,
            preferred_language="ta"
        )
        u4 = User(
            phone="+919894467019",
            name="Saraswathi Ammal",
            role="farmer",
            district="Erode",
            village="Perundurai Rural",
            land_acres=3.5,
            crops_grown="Turmeric, Tapioca",
            livestock_owned="A2 Umblachery Dairy Cows",
            extra_earnings_total=26500.0,
            is_verified=True,
            preferred_language="ta"
        )
        db.add_all([u1, u2, u3, u4])
        db.commit()

    # 2. Seed Listings
    if db.query(Listing).count() == 0:
        print("🌾 Seeding Tamil Nadu produce & livestock listings...")
        l1 = Listing(
            seller_id=2,
            title="Oddanchatram Grade-A Hybrid Tomatoes",
            category="vegetables",
            crop_type="Tomato",
            quantity=1200.0,
            unit="kg",
            price_per_unit=38.0,
            govt_approved_price=36.0,
            quality_grade="A",
            harvest_date="2026-11-18",
            district="Dindigul",
            village="Oddanchatram North",
            image_url="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
            description="Vine-ripened tomatoes handpicked and sorted into wooden crates.",
            is_vet_certified=False
        )
        l2 = Listing(
            seller_id=3,
            title="Pure Kangayam Native Milking Cow (8L/day)",
            category="livestock",
            crop_type="Cow",
            quantity=1.0,
            unit="head",
            price_per_unit=72000.0,
            govt_approved_price=65000.0,
            quality_grade="A",
            district="Tiruppur",
            village="Kangayam East",
            image_url="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&auto=format&fit=crop&q=80",
            description="Pure Mayilai variety Kangayam cow. High A2 milk testing with 4.8% fat.",
            breed="Pure Kangayam",
            age="3.5 Years",
            weight="340 kg",
            is_vet_certified=True
        )
        l3 = Listing(
            seller_id=2,
            title="Perambalur Podi Chinna Vengayam (Small Shallots)",
            category="vegetables",
            crop_type="Shallots",
            quantity=800.0,
            unit="kg",
            price_per_unit=68.0,
            govt_approved_price=64.0,
            quality_grade="A",
            district="Perambalur",
            village="Veppanthattai",
            image_url="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
            description="Sun-cured traditional shallots with 45+ days shelf life.",
            is_vet_certified=False
        )
        db.add_all([l1, l2, l3])
        db.commit()

    # 3. Seed Mandi Prices
    if db.query(MandiPrice).count() == 0:
        print("📈 Seeding Tamil Nadu Mandi prices (Agmarknet benchmark)...")
        prices = [
            MandiPrice(commodity="Tomato", mandi_name="Oddanchatram Vegetable Market", district="Dindigul", min_price=34, max_price=42, modal_price=38, msp_price=28, arrivals_quintal=4200),
            MandiPrice(commodity="Tomato", mandi_name="Koyambedu Wholesale Complex", district="Chennai", min_price=40, max_price=48, modal_price=44, msp_price=28, arrivals_quintal=6800),
            MandiPrice(commodity="Small Onion", mandi_name="Oddanchatram Vegetable Market", district="Dindigul", min_price=58, max_price=68, modal_price=64, msp_price=45, arrivals_quintal=1850),
            MandiPrice(commodity="Small Onion", mandi_name="Koyambedu Wholesale Complex", district="Chennai", min_price=68, max_price=80, modal_price=74, msp_price=45, arrivals_quintal=2200),
            MandiPrice(commodity="Paddy Ponni", mandi_name="Direct Purchase Centre (DPC)", district="Thanjavur", min_price=2450, max_price=2600, modal_price=2560, msp_price=2320, arrivals_quintal=9400),
            MandiPrice(commodity="Salem Black Goat", mandi_name="Oddanchatram Cattle Fair", district="Dindigul", min_price=520, max_price=600, modal_price=560, msp_price=480, arrivals_quintal=620)
        ]
        db.add_all(prices)
        db.commit()

    db.close()
    print("✅ Database seeding complete!")

if __name__ == "__main__":
    seed()
