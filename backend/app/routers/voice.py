from fastapi import APIRouter
from ..schemas import VoiceQueryRequest, VoiceQueryResponse

router = APIRouter(prefix="/api/voice", tags=["Multilingual Voice Assistant"])

RESPONSES = {
    "ta": {
        "tomato": "இன்று ஒட்டன்சத்திரத்தில் தக்காளி கிலோ ₹38, கோயம்பேட்டில் ₹44 ஆக உள்ளது. அடுத்த 3 நாட்களில் விலை மேலும் ₹6 உயரும், எனவே 3 நாட்கள் காத்திருந்து விற்கவும்!",
        "goat": "ஆடுகளுக்கு காலில் காயம் இருந்தால்: மஞ்சள் பொடி, வேப்பெண்ணெய், கற்பூரம் கலந்து காயத்தில் தடவவும். 3 நாட்களில் ஆறும்.",
        "default": "உங்கள் கேள்வி பதிவானது. இன்றைய சந்தை நிலவரப்படி விளைபொருட்களை ஒட்டன்சத்திரத்திற்கு அனுப்பினால் அதிக லாபம் பெறலாம்."
    },
    "en": {
        "tomato": "Today's tomato rate is ₹38/kg in Oddanchatram and ₹44/kg in Koyambedu. Holding for 3-4 days will earn you ₹6/kg extra profit.",
        "goat": "For goat hoof sores: Apply a paste of pure turmeric powder, cold-pressed neem oil, and camphor twice daily.",
        "default": "Based on current Tamil Nadu mandi trends, pooling shared transport gives you 35% higher take-home profit."
    },
    "hi": {
        "tomato": "आज ओड्डनचत्रम में टमाटर ₹38/किग्रा और कोयम्बेडु में ₹44/किग्रा है। 3 दिन रुककर बेचें!",
        "goat": "बकरी के घाव पर हल्दी पाउडर, नीम का तेल और थोड़ा कपूर मिलाकर लेप लगाएं।",
        "default": "मंडी भाव विश्लेषण के अनुसार, वाहन साझा करके सीधे बड़ी मंडी में माल भेजने से अधिक लाभ होगा।"
    },
    "te": {
        "tomato": "ఈరోజు ఒడ్డన్ ఛత్రంలో టమోటా కిలో ₹38, కోయంబేడులో ₹44 గా ఉంది. 3 రోజులు ఆగి అమ్మడం మంచిది!",
        "goat": "మేక గాయాలకు పసుపు పొడి, వేపనూనె, కర్పూరం కలిపి పేస్ట్‌లా చేసి రాయండి.",
        "default": "వాహనాన్ని ఇతర రైతులతో పంచుకోవడం ద్వారా రవాణా ఖర్చులో 60% ఆదా చేసుకోవచ్చు."
    }
}

@router.post("/query", response_model=VoiceQueryResponse)
def process_voice_query(req: VoiceQueryRequest):
    q = req.query_text.lower()
    lang = req.language if req.language in RESPONSES else "ta"
    pack = RESPONSES[lang]

    intent = "market_price"
    commodity = "tomato"
    spoken_answer = pack["default"]

    if "tomato" in q or "தக்காளி" in q or "टमाटर" in q or "టమోటా" in q:
        commodity = "tomato"
        intent = "price_forecast"
        spoken_answer = pack.get("tomato", pack["default"])
    elif "goat" in q or "ஆடு" in q or "बकरी" in q or "మేక" in q or "wound" in q or "காயம்" in q:
        commodity = "goat"
        intent = "animal_doctor"
        spoken_answer = pack.get("goat", pack["default"])

    return VoiceQueryResponse(
        query=req.query_text,
        language=req.language,
        spoken_answer=spoken_answer,
        detected_intent=intent,
        target_commodity=commodity
    )
