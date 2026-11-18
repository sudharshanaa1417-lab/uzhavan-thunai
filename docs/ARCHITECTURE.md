# System Architecture: Uzhavan Thunai (உழவன் துணை)

```mermaid
flowchart TD
    subgraph Client["📱 Frontend (Mobile-First Web / PWA / Flutter)"]
        UI["React 19 / Tailwind / Noto Sans"]
        VoiceEngine["Web Speech / AI4Bharat Indic Voice Engine"]
        OfflineCache["Service Worker + IndexedDB / LocalStorage"]
        TFLiteEngine["TFLite WebAssembly Edge Vision"]
    end

    subgraph CDN["⚡ Deployment Edge (Vercel)"]
        VercelEdge["Vercel Global CDN (PWA & Static Bundles)"]
    end

    subgraph Backend["🚀 Backend API Gateway (Render Cloud)"]
        FastAPI["FastAPI Python Async Core"]
        AuthRouter["/api/auth (Mobile OTP & Profiles)"]
        AdvisorEngine["/api/advisor (Smart Sell Net Profit Engine)"]
        PriceRouter["/api/prices (Mandi Intel & Forecast)"]
        DoctorRouter["/api/doctor (Crop & Animal AI Vision)"]
        MarketRouter["/api/marketplace (Bidding & UPI Escrow)"]
        FPORouter["/api/fpo (Shared Logistics Pooling)"]
    end

    subgraph DataML["🧠 Data Intelligence & ML Services"]
        LightGBM["LightGBM Quantile Regressors (p10, p50, p90)"]
        MobileNet["MobileNetV3 Edge Grading (A/B/C)"]
        VetModel["Livestock Wound Infection Classifier"]
        SQLiteDB[("PostgreSQL / SQLite Database")]
    end

    subgraph External["🌐 External Tamil Nadu Data Feeds"]
        Agmarknet["Agmarknet / eNAM Mandi Feeds"]
        IMDWeather["IMD Weather & Precipitation API"]
        UPISandbox["Simulated UPI Escrow Payment Gateway"]
        VetSurgeons["TN Animal Husbandry Veterinary Registry"]
    end

    Client -->|HTTPS / PWA Request| VercelEdge
    Client -->|REST API Calls| FastAPI
    FastAPI --> AuthRouter
    FastAPI --> AdvisorEngine
    FastAPI --> PriceRouter
    FastAPI --> DoctorRouter
    FastAPI --> MarketRouter
    FastAPI --> FPORouter

    AdvisorEngine --> LightGBM
    DoctorRouter --> MobileNet
    DoctorRouter --> VetModel
    PriceRouter --> Agmarknet
    AdvisorEngine --> IMDWeather
    MarketRouter --> UPISandbox
    DoctorRouter --> VetSurgeons

    FastAPI --> SQLiteDB
    OfflineCache -.->|Sync when online| FastAPI
```

---

## Technical Architecture Stack Summary
1. **Frontend**: React 19, Vite, TailwindCSS (Deep Forest Green, Leaf Green, Harvest Gold, Soil Brown, Cream Paper), Lucide Icons, Canvas Confetti.
2. **Offline First**: Service Worker caching, optimistic UI updates, background synchronization.
3. **Multilingual i18n Engine**: 10 Indian Languages (Tamil, English, Hindi, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi) with zero hardcoded strings.
4. **Backend Service**: High-performance Python FastAPI with Pydantic v2 schemas and SQLAlchemy 2.0 ORM.
5. **AI Inference Pipeline**:
   - Time-series price prediction with Quantile Regression (p10, p50, p90 confidence bounds).
   - Computer Vision MobileNetV3 edge quantization for produce freshness and livestock wound diagnosis.
