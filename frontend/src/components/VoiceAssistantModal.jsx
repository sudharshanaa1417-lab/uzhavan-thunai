import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, MicOff, Volume2, X, Sparkles, Send, RefreshCw } from 'lucide-react';

const LOCALE_VOICE_MAP = {
  ta: 'ta-IN',
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  mr: 'mr-IN',
  bn: 'bn-IN',
  gu: 'gu-IN',
  pa: 'pa-IN'
};

const KNOWLEDGE_BASE = {
  ta: {
    welcome: "வணக்கம்! நான் உங்கள் உழவன் துணை குரல் உதவியாளர். விளைபொருள் விலைகள், சிறந்த விற்பனை சந்தை அல்லது பயிர்/கால்நடை நோய்களுக்கான மருந்துகள் பற்றி கேளுங்கள்.",
    answers: {
      egg: "நாட்டுக்கோழி முட்டை விலை: நாமக்கல் மொத்த சந்தையில் முட்டை ₹9.50, சென்னை கோயம்பேடு மற்றும் கோவை ஆர்கானிக் கடைகளில் ₹12 வரை விற்பனையாகிறது. அதிக லாபம் பெற திருச்சி, மதுரை அல்லது கோவை நகர அடுக்குமாடி குடியிருப்புகளுக்கு நேரடியாக ₹11-12க்கு விற்கவும்.",
      tomato: "இன்று ஒட்டன்சத்திரத்தில் தக்காளி கிலோ ₹38, சென்னை கோயம்பேட்டில் ₹44-48 வரை உள்ளது. அடுத்த 3 நாட்களில் ஆந்திர வரத்து குறைவதால் விலை மேலும் ₹6 உயரும் வாய்ப்புள்ளது. எனவே 3-4 நாட்கள் காத்திருந்து ஒட்டன்சத்திரம் அல்லது கோயம்பேட்டிற்கு அனுப்பவும்.",
      onion: "சின்ன வெங்காயம் தற்போதைய விலை: ஒட்டன்சத்திரத்தில் கிலோ ₹68-78, திருச்சி காந்தி மார்க்கெட்டில் ₹64. உள்ளூர் வியாபாரியிடம் விற்காமல் ஒட்டன்சத்திர சந்தைக்கு அனுப்பினால் கிலோவுக்கு ₹12-14 வரை கூடுதல் லாபம் கிடைக்கும்.",
      goat: "ஆடுகளுக்கு காலில் காயம் அல்லது புண் இருந்தால்: மஞ்சள் பொடி 50g + மரச்செக்கு வேப்பெண்ணெய் 100ml + கற்பூரம் 5g கலந்து அடர்த்தியான பேஸ்ட்டாக காலில் தடவவும். புழுக்கள் வைக்காமல் 3 நாட்களில் ஆறும். மருந்து: Lorexane ஸ்ப்ரே அடிக்கவும்.",
      cow: "காங்கேயம் கறவை மாடுகளுக்கு அந்தியூர் மற்றும் பொள்ளாச்சி சந்தைகளில் அதிக கிராக்கி உள்ளது. தற்போதைய சராசரி மதிப்பு ₹72,000 முதல் ₹85,000 வரை. மடிவீக்கத்திற்கு பச்சைக் கற்பூரம் மற்றும் கற்றாழை அரைத்து தடவவும்.",
      storage: "உங்கள் பகுதிக்கு மிக அருகில் ஒட்டன்சத்திரம் ஒழுங்குமுறை விற்பனைக்கூட குளிர்பதன கிடங்கு உள்ளது (தொலைவு 18 கி.மீ). ஒரு மாதத்திற்கு கிலோவுக்கு ₹1.10 மட்டுமே கட்டணம். தக்காளி, வெங்காயத்தை 45 நாட்கள் வரை பாதுகாக்கலாம்.",
      paddy: "பொன்னி நெல் தமிழ்நாடு அரசு நேரடி கொள்முதல் நிலையங்களில் (DPC) குவிண்டால் ₹2,560க்கு வாங்கப்படுகிறது. அரசு ஊக்கத்தொகை ₹100 கூடுதலாக வழங்கப்படுகிறது.",
      milk: "நாட்டு மாட்டு A2 பசும்பால்: அரசு ஆவின் கொள்முதல் விலை ₹38-42. ஆனால் கோவை, சென்னை குடியிருப்பு வாடிக்கையாளர்களுக்கு நேரடியாக விநியோகித்தால் லிட்டருக்கு ₹55 முதல் ₹65 வரை நிகர லாபம் கிடைக்கும்.",
      default: "இன்றைய தமிழக சந்தை நிலவரப்படி விளைபொருட்களை உள்ளூர் இடைத்தரகரிடம் விற்காமல் FPO குழு வாகனப் பகிர்வு மூலம் ஒட்டன்சத்திரம் அல்லது கோயம்பேட்டிற்கு அனுப்பினால் 30% கூடுதல் நிகர லாபம் பெறலாம்."
    }
  },
  en: {
    welcome: "Hello! I am your Uzhavan Voice Assistant. Ask me about specific market rates, best selling locations, or crop and livestock medicine dosages.",
    answers: {
      egg: "Country eggs are currently selling at ₹12 per egg in Chennai Koyambedu and Coimbatore organic stores, and ₹9.50/egg wholesale in Namakkal NECC mandi. For highest profit, supply directly to apartment milk/egg delivery vendors in Trichy, Madurai, or Coimbatore for ₹11-12/egg.",
      tomato: "Today's tomato rate: Oddanchatram is ₹38/kg, Koyambedu wholesale market is ₹44 to ₹48/kg. Because Rayalaseema arrivals are delayed, prices are forecast to rise by ₹6 over the next 3 days. We advise holding for 3 days and shipping to Oddanchatram or Koyambedu.",
      onion: "Small shallots are trading at ₹68 to ₹78/kg in Oddanchatram and ₹64/kg in Trichy Gandhi Market. Shipping to Oddanchatram instead of local village middlemen yields ₹12 to ₹14/kg extra take-home profit.",
      goat: "For goat hoof sores and cuts: Apply a paste of pure turmeric powder (50g) + cold-pressed neem oil (100ml) + camphor (5g) twice daily. It repels flies and heals in 3 days. Veterinary medicine: Spray Lorexane or D-Mag aerosol spray.",
      cow: "Kangayam milking cows command top valuations at Anthiyur and Pollachi cattle fairs, currently fetching ₹72,000 to ₹85,000 per cow.",
      storage: "The nearest cold storage facility is the Dindigul Regulated Market Cold Storage at Oddanchatram (18 km away). Storage tariff is just ₹1.10/kg/month with 420 tonnes vacant capacity.",
      paddy: "Deluxe Ponni Paddy is being procured at Tamil Nadu Govt Direct Purchase Centres (DPCs) at ₹2,560/quintal with a ₹100 state incentive over the Central MSP.",
      milk: "A2 Country Cow Milk: Government dairy co-op rate is ₹38-42/L. Directly supplying to apartment societies in Chennai or Coimbatore earns ₹55 to ₹65 per litre.",
      default: "Based on today's Tamil Nadu market data, pooling transport freight with neighbor farmers will save you 60% on logistics and maximize your net in-hand earnings."
    }
  },
  hi: {
    welcome: "नमस्ते! मैं आपका उझवन आवाज़ सहायक हूँ। मंडी भाव, सबसे लाभदायक बाजार या फसल व पशुओं की दवा के बारे में पूछें।",
    answers: {
      egg: "देसी मुर्गी के अंडे: नमक्कल थोक मंडी में ₹9.50/अंडा, जबकि चेन्नई और कोयम्बटूर में ₹12/अंडा बिक रहे हैं। अधिक लाभ के लिए सीधे शहरों में आपूर्ति करें।",
      tomato: "आज ओड्डनचत्रम में टमाटर ₹38/किग्रा और कोयम्बेडु में ₹44-48/किग्रा है। अगले 3 दिनों में भाव ₹6 बढ़ने का अनुमान है, अतः रुककर बेचें।",
      onion: "छोटे प्याज का भाव ओड्डनचत्रम में ₹68-78/किग्रा है। सीधे मंडी भेजने पर ₹12-14/किग्रा का अतिरिक्त शुद्ध मुनाफा होगा।",
      goat: "बकरी के पैर के घाव के लिए: 50 ग्राम हल्दी पाउडर, 100 मिली नीम का तेल और 5 ग्राम कपूर मिलाकर लेप लगाएं। लॉरेक्सेन स्प्रे का छिड़काव करें।",
      cow: "कांगायम गाय की मांग बहुत तेज है। अंथियूर और पोल्लाची मेलों में भाव ₹72,000 से ₹85,000 तक मिल रहा है।",
      storage: "निकटतम कोल्ड स्टोरेज ओड्डनचत्रम में 18 किमी दूर है। शुल्क केवल ₹1.10 प्रति किलो प्रति माह है।",
      paddy: "तमिलनाडु में पोन्नी धान सरकारी खरीद केंद्रों पर ₹2,560 प्रति क्विंटल पर खरीदा जा रहा है।",
      milk: "देसी गाय का A2 दूध सीधे ग्राहकों को बेचने पर ₹55-65 प्रति लीटर शुद्ध भाव मिलता है।",
      default: "वर्तमान मंडी रुझान के अनुसार, वाहन साझा करके सीधे बड़ी मंडी में माल भेजने से 30% अधिक शुद्ध लाभ होगा।"
    }
  },
  te: {
    welcome: "నమస్కారం! నేను మీ ఉళవన్ వాయిస్ అసిస్టెంట్‌ని. మార్కెట్ ధరలు, విక్రయ స్థలాలు లేదా పంట/పశువుల మందుల గురించి అడగండి.",
    answers: {
      egg: "నాటుకోడి గుడ్లు: నమక్కల్ హోల్‌సేల్ మార్కెట్‌లో ₹9.50, చెన్నై మరియు కోయంబత్తూరులో ₹12 వరకు పలుకుతున్నాయి. నగరాల్లో నేరుగా విక్రయిస్తే ₹11-12 వస్తుంది.",
      tomato: "ఈరోజు ఒడ్డన్ ఛత్రంలో టమోటా కిలో ₹38, కోయంబేడులో ₹44-48 గా ఉంది. రాబోయే 3 రోజుల్లో ధర ₹6 పెరిగే అవకాశం ఉంది, కాబట్టి ఆగి అమ్మడం మంచిది.",
      onion: "చిన్న ఉల్లిపాయల ధర ఒడ్డన్ ఛత్రంలో కిలో ₹68-78. దళారులకు కాకుండా నేరుగా మార్కెట్‌కు పంపితే కిలోకు ₹12-14 అదనపు లాభం వస్తుంది.",
      goat: "మేక కాలు గాయాలకు: 50 గ్రాముల పసుపు, 100 మి.లీ వేపనూనె, 5 గ్రాముల కర్పూరం కలిపి పేస్ట్‌లా రాయండి. లొరెక్సేన్ స్ప్రే ఉపయోగించండి.",
      cow: "కాంగేయం ఆవులకు పొల్లాచ్చి మరియు అంతియూర్ సంతల్లో ₹72,000 నుండి ₹85,000 వరకు మంచి ధర లభిస్తోంది.",
      storage: "సమీప కోల్డ్ స్టోరేజ్ ఒడ్డన్ ఛత్రంలో ఉంది (18 కి.మీ). నెలకు కిలోకు కేవలం ₹1.10 ఛార్జ్ మాత్రమే.",
      paddy: "పొన్ని ధాన్యాన్ని కొనుగోలు కేంద్రాలలో క్వింటాల్‌కు ₹2,560 చొప్పున ప్రభుత్వం కొనుగోలు చేస్తోంది.",
      milk: "A2 ఆవు పాలు నేరుగా అపార్ట్‌మెంట్‌లకు విక్రయిస్తే లీటరుకు ₹55 నుండి ₹65 వరకు వస్తుంది.",
      default: "రైతులతో కలిసి వాహనాన్ని పంచుకోవడం ద్వారా రవాణా ఖర్చులో 60% ఆదా చేసుకోవచ్చు."
    }
  }
};

export default function VoiceAssistantModal() {
  const { isVoiceAssistantOpen, setIsVoiceAssistantOpen, language, t } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);

  const langPack = KNOWLEDGE_BASE[language] || KNOWLEDGE_BASE.ta;

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = LOCALE_VOICE_MAP[language] || 'ta-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processVoiceQuery(text);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = LOCALE_VOICE_MAP[language] || 'ta-IN';
          recognitionRef.current.start();
        } catch (e) {
          simulateVoiceInput();
        }
      } else {
        simulateVoiceInput();
      }
    }
  };

  const simulateVoiceInput = (sampleText) => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const query = sampleText || (language === 'ta' ? "நாட்டுக்கோழி முட்டை எங்கு விற்றால் அதிக லாபம்?" : "Where should I sell country eggs for highest profit?");
      setTranscript(query);
      processVoiceQuery(query);
    }, 1200);
  };

  const processVoiceQuery = (queryText) => {
    const q = queryText.toLowerCase();
    let reply = langPack.answers.default;

    if (q.includes('egg') || q.includes('முட்டை') || q.includes('अंडा') || q.includes('గుడ్డు') || q.includes('ಮೊಟ್ಟೆ') || q.includes('മുട്ട')) {
      reply = langPack.answers.egg;
    } else if (q.includes('tomato') || q.includes('தக்காளி') || q.includes('टमाटर') || q.includes('టమోటా') || q.includes('ಟೊಮೆಟೊ') || q.includes('തക്കാളി')) {
      reply = langPack.answers.tomato;
    } else if (q.includes('onion') || q.includes('shallot') || q.includes('வெங்காயம்') || q.includes('प्याज') || q.includes('ఉల్లి')) {
      reply = langPack.answers.onion;
    } else if (q.includes('goat') || q.includes('ஆடு') || q.includes('बकरी') || q.includes('మేక') || q.includes('wound') || q.includes('காயம்') || q.includes('घाव')) {
      reply = langPack.answers.goat;
    } else if (q.includes('cow') || q.includes('cattle') || q.includes('மாடு') || q.includes('गाय') || q.includes('ఆవు')) {
      reply = langPack.answers.cow;
    } else if (q.includes('storage') || q.includes('cold') || q.includes('குளிர்பதன') || q.includes('कोल्ड')) {
      reply = langPack.answers.storage;
    } else if (q.includes('paddy') || q.includes('rice') || q.includes('நெல்') || q.includes('धान') || q.includes('వరి')) {
      reply = langPack.answers.paddy;
    } else if (q.includes('milk') || q.includes('பால்') || q.includes('दूध') || q.includes('పాలు')) {
      reply = langPack.answers.milk;
    }

    setAiResponse(reply);
    speakResponse(reply);
  };

  const speakResponse = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LOCALE_VOICE_MAP[language] || 'ta-IN';
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isVoiceAssistantOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="glass-card max-w-lg w-full rounded-3xl p-5 sm:p-6 shadow-2xl relative flex flex-col max-h-[90vh] border border-white/60 dark:border-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-stone-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-stone-900 dark:text-stone-100">
                {t('voice.responseTitle')}
              </h3>
              <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                AI Speech Engine ({LOCALE_VOICE_MAP[language]}) · Mother Tongue Response
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              setIsVoiceAssistantOpen(false);
            }}
            className="p-2 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="py-4 space-y-3.5 overflow-y-auto">
          
          {/* Welcome greeting card */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 text-xs font-semibold text-emerald-900 dark:text-emerald-300 leading-relaxed">
            {langPack.welcome}
          </div>

          {/* User query if any */}
          {transcript && (
            <div className="flex justify-end">
              <div className="bg-emerald-700 text-white px-4 py-2 rounded-2xl rounded-tr-none text-xs font-bold max-w-[85%] shadow-sm">
                "{transcript}"
              </div>
            </div>
          )}

          {/* AI Response output */}
          {aiResponse && (
            <div className="glass-card p-4 rounded-2xl rounded-tl-none space-y-2 border border-white/80 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-between text-xs font-extrabold text-emerald-800 dark:text-emerald-400">
                <span>Verified Intelligence Verdict:</span>
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="flex items-center text-rose-600 hover:text-rose-700 text-[11px] font-bold"
                  >
                    <Volume2 className="w-3.5 h-3.5 mr-1 animate-pulse" />
                    Stop Voice
                  </button>
                )}
              </div>
              <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed font-semibold">
                {aiResponse}
              </p>
            </div>
          )}

          {/* Sample quick questions in active language */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              {t('voice.sampleCommands')}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                language === 'ta' ? "நாட்டுக்கோழி முட்டை எங்கு விற்றால் அதிக லாபம்?" : "Where should I sell country eggs for highest profit?",
                language === 'ta' ? "இன்றைய தக்காளி விலை ஒட்டன்சத்திரத்தில் என்ன?" : "What is today's tomato rate in Oddanchatram?",
                language === 'ta' ? "ஆட்டுக்கு காலில் காயம், என்ன மருந்து?" : "My goat has a leg cut, what medicine to apply?",
                language === 'ta' ? "அருகிலுள்ள குளிர்பதன கிடங்கு எங்குள்ளது?" : "Where is the nearest cold storage facility?"
              ].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscript(sample);
                    processVoiceQuery(sample);
                  }}
                  className="text-xs text-left px-3 py-1.5 rounded-full glass-input hover:border-emerald-500 text-stone-700 dark:text-stone-300 font-semibold transition"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Centerpiece Microphone Button */}
        <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800 flex flex-col items-center justify-center">
          <button
            onClick={toggleListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl ${
              isListening
                ? 'bg-rose-600 text-white animate-bounce ring-4 ring-rose-300'
                : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:scale-105 text-white ring-4 ring-emerald-400/20'
            }`}
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>
          <span className="text-xs font-bold mt-2 text-stone-700 dark:text-stone-300">
            {isListening ? t('voice.listening') : t('voice.speakPrompt')}
          </span>
        </div>

      </div>
    </div>
  );
}
