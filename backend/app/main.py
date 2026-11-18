from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .database import engine, Base
from .routers import auth, listings, prices, advisor, doctor, marketplace, fpo, voice

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="""
    ## Uzhavan Thunai (உழவன் துணை) REST API
    Production-quality Agricultural & Livestock Market Intelligence, Quality Grading, 
    and Fair-Price Recommender System for Tamil Nadu Farmers.
    
    ### Core Capabilities:
    * **Price Intelligence & Forecast**: Agmarknet live sync + Quantile Regression bands (LightGBM/LSTM)
    * **Smart Sell Advisor (Hero Feature)**: Net Take-Home Profit engine across Koyambedu, Oddanchatram, Mettupalayam, Uzhavar Sandhais
    * **AI Crop & Animal Doctor**: MobileNetV3 edge grading (A/B/C), rot diagnosis, livestock wound care (Nattu Vaithiyam & Vet Medicines)
    * **Marketplace & UPI Escrow**: Zero middleman direct trading with trust layer and fair-price meter
    * **Multilingual Voice AI**: Speech-to-Text & Text-to-Speech intent engine across 10 Indian languages
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(auth.router)
app.include_router(listings.router)
app.include_router(prices.router)
app.include_router(advisor.router)
app.include_router(doctor.router)
app.include_router(marketplace.router)
app.include_router(fpo.router)
app.include_router(voice.router)

@app.get("/", tags=["Health Check"])
def root():
    return {
        "status": "healthy",
        "app": "Uzhavan Thunai (உழவன் துணை) API",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT,
        "docs": "/docs"
    }

@app.get("/health", tags=["Health Check"])
def health_check():
    return {"status": "ok", "service": "Uzhavan Thunai Backend"}
