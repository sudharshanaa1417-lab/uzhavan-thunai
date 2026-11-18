import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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

@app.get("/api/health", tags=["Health Check"])
def api_health():
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

# Path to static frontend files
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")

if os.path.isdir(STATIC_DIR):
    assets_dir = os.path.join(STATIC_DIR, "assets")
    if os.path.isdir(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/", include_in_schema=False)
    def serve_root():
        index_file = os.path.join(STATIC_DIR, "index.html")
        if os.path.isfile(index_file):
            return FileResponse(index_file)
        return api_health()

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        # Do not intercept API calls or API documentation
        if full_path.startswith("api/") or full_path in ["docs", "redoc", "openapi.json", "health", "api"]:
            raise HTTPException(status_code=404, detail="Not Found")
        
        file_path = os.path.join(STATIC_DIR, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        
        index_file = os.path.join(STATIC_DIR, "index.html")
        if os.path.isfile(index_file):
            return FileResponse(index_file)
        raise HTTPException(status_code=404, detail="Not Found")
else:
    @app.get("/", tags=["Health Check"])
    def root():
        return api_health()
