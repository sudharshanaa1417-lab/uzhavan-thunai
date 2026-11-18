import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, MicOff, Volume2, X, Sparkles, Send } from 'lucide-react';

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

// Comprehensive multilingual Agri Q&A Knowledgebase responding in the exact language asked
const KNOWLEDGE_BASE = {
  ta: {
    welcome: "வணக்கம்! நான் உங்கள் உழவன் துணை குரல் உதவியாளர். தக்காளி, வெங்காயம், ஆடு, மாடு விலை அல்லது மருத்துவ சிகிச்சை பற்றி கேளுங்கள்.",
    answers: {
      tomato: "இன்று ஒட்டன்சத்திரத்தில் தக்காளி கிலோ ₹38, கோயம்பேட்டில் ₹44 ஆக உள்ளது. அடுத்த 3 நாட்களில் விலை மேலும் ₹6 உயரும் வாய்ப்புள்ளது, எனவே 3 நாட்கள் காத்திருந்து விற்கவும்!",
      onion: "சின்ன வெங்காயம் தற்போதைய சந்தை விலை கிலோ ₹66-74. உள்ளூர் வியாபாரியிடம் விற்காமல் ஒட்டன்சத்திரத்திற்கு அனுப்பினால் ஒரு கிலோவுக்கு ₹12 கூடுதல் லாபம் கிடைக்கும்.",
      goat: "ஆடுகளுக்கு காலில் காயம் அல்லது புண் இருந்தால்: நாட்டு வைத்தியமாக மஞ்சள் பொடி, வேப்பெண்ணெய், கற்பூரம் ஆகியவற்றை சம அளவில் கலந்து காயத்தில் தடவவும். புழுக்கள் வராமல் 3 நாட்களில் ஆறும்.",
      cow: "காங்கேயம் கறவை மாடுகளுக்கு சந்தையில் நல்ல கிராக்கி உள்ளது. தற்போதைய சராசரி மதிப்பு ₹72,000 முதல் ₹85,000 வரை. அந்தியூர் மற்றும் பொள்ளாச்சி சந்தையில் அதிக லாபம் கிடைக்கும்.",
      storage: "உங்கள் திண்டுக்கல் பகுதிக்கு மிக அருகில் ஒட்டன்சத்திரம் ஒழுங்குமுறை விற்பனைக்கூட குளிர்பதன கிடங்கு உள்ளது (தொலைவு 18 கி.மீ). ஒரு மாதத்திற்கு கிலோவுக்கு ₹1.10 மட்டுமே கட்டணம்.",
      paddy: "பொன்னி நெல் தமிழ்நாடு அரசு நேரடி நெல் கொள்முதல் நிலையங்களில் (DPC) குவிண்டால் ₹2,560க்கு வாங்கப்படுகிறது. அரசு ஊக்கத்தொகை ₹100 கூடுதலாக வழங்கப்படுகிறது.",
      default: "உங்கள் கேள்வி பதிவு செய்யப்பட்டது. இன்றைய சந்தை நிலவரப்படி விளைபொருட்களை குழுவாக வாகனப் பகிர்வு மூலம் ஒட்டன்சத்திரம் அல்லது கோயம்பேட்டிற்கு அனுப்பினால் 35% கூடுதல் நிகர லாபம் பெறலாம்."
    }
  },
  en: {
    welcome: "Hello! I am your Uzhavan Voice Assistant. Ask me about crop mandi rates, livestock prices, or crop/animal remedies.",
    answers: {
      tomato: "Today's tomato rate is ₹38/kg in Oddanchatram and ₹44/kg in Koyambedu. Prices are forecast to rise by ₹6 over the next 3 days. We advise waiting 3-4 days to sell!",
      onion: "Small shallots are trading at ₹66-74/kg. Shipping to Oddanchatram instead of local middlemen yields ₹12/kg extra take-home profit.",
      goat: "For livestock wounds and hoof sores: Apply a paste of pure turmeric powder, cold-pressed neem oil, and camphor twice daily. It prevents fly-strike and heals within 3 days.",
      cow: "Kangayam milking cows command strong market demand right now at ₹72,000 to ₹85,000. Peak valuations are seen at Anthiyur and Pollachi markets.",
      storage: "The nearest facility is the Dindigul Regulated Market Cold Storage at Oddanchatram (18 km away). Storage rate is just ₹1.10/kg/month with 420 tonnes vacant capacity.",
      paddy: "Ponni Paddy is being procured at TN Govt Direct Purchase Centres (DPCs) at ₹2,560/quintal with a ₹100 state incentive over the Central MSP.",
      default: "Under current Tamil Nadu market trends, pooling transport freight with neighbor farmers will save you 60% on logistics and boost net profit by 28%."
    }
  },
  hi: {
    welcome: "नमस्ते! मैं आपका उझवन आवाज़ सहायक हूँ। टमाटर, प्याज भाव, बकरी, गाय की कीमत या देसी इलाज के बारे में पूछें।",
    answers: {
      tomato: "आज ओड्डनचत्रम में टमाटर ₹38/किग्रा और कोयम्बेडु में ₹44/किग्रा है। अगले 3 दिनों में भाव ₹6 बढ़ने का अनुमान है, अतः 3 दिन रुककर बेचें!",
      onion: "छोटे प्याज का भाव ₹66-74/किग्रा है। स्थानीय बिचौलियों के बजाय सीधे ओड्डनचत्रम भेजने पर ₹12/किग्रा का अतिरिक्त शुद्ध मुनाफा होगा।",
      goat: "बकरी के पैर या शरीर के घाव के लिए: हल्दी पाउडर, नीम का तेल और थोड़ा कपूर मिलाकर लेप लगाएं। 3 दिन में घाव भर जाएगा और कीड़े नहीं पड़ेंगे।",
      cow: "कांगायम देसी गाय की मांग बहुत तेज है। औसत भाव ₹72,000 से ₹85,000 तक मिल रहा है।",
      storage: "निकटतम कोल्ड स्टोरेज ओड्डनचत्रम रेगुलेटेड मार्केट में है (दूरी 18 किमी)। शुल्क केवल ₹1.10 प्रति किलो प्रति माह है।",
      paddy: "तमिलनाडु में पोन्नी धान सरकारी खरीद केंद्रों पर ₹2,560 प्रति क्विंटल के समर्थन मूल्य पर खरीदा जा रहा है।",
      default: "वर्तमान मंडी रुझान के अनुसार, पड़ोसी किसानों के साथ मिलकर वाहन साझा करने से भाड़े में 60% बचत होगी और मुनाफा बढ़ेगा।"
    }
  },
  te: {
    welcome: "నమస్కారం! నేను మీ ఉళవన్ వాయిస్ అసిస్టెంట్‌ని. టమోటా, ఉల్లిపాయల ధరలు, ఆవులు, మేకల చికిత్స గురించి అడగండి.",
    answers: {
      tomato: "ఈరోజు ఒడ్డన్ ఛత్రంలో టమోటా కిలో ₹38, కోయంబేడులో ₹44 గా ఉంది. రాబోయే 3 రోజుల్లో ధర ₹6 పెరిగే అవకాశం ఉంది, కాబట్టి 3 రోజులు ఆగి అమ్మడం మంచిది!",
      onion: "చిన్న ఉల్లిపాయల ధర కిలో ₹66-74. స్థానిక దళారులకు కాకుండా ఒడ్డన్ ఛత్రం మార్కెట్‌కు పంపితే కిలోకు ₹12 అదనపు లాభం వస్తుంది.",
      goat: "మేక కాలు లేదా చర్మ గాయాలకు: పసుపు పొడి, వేపనూనె, కర్పూరం కలిపి పేస్ట్‌లా చేసి రాయండి. పురుగులు పట్టకుండా 3 రోజుల్లో మానుతుంది.",
      cow: "కాంగేయం ఆవులకు మార్కెట్‌లో మంచి గిరాకీ ఉంది. ప్రస్తుత ధర ₹72,000 నుండి ₹85,000 వరకు పలుకుతోంది.",
      storage: "మీకు సమీపంలోని కోల్డ్ స్టోరేజ్ ఒడ్డన్ ఛత్రం మార్కెట్ యార్డ్‌లో ఉంది (18 కి.మీ). నెలకు కిలోకు కేవలం ₹1.10 ఛార్జ్ మాత్రమే.",
      paddy: "పొన్ని ధాన్యం కొనుగోలు కేంద్రాలలో క్వింటాల్‌కు ₹2,560 చొప్పున ప్రభుత్వం కొనుగోలు చేస్తోంది.",
      default: "సమీప మార్కెట్లలో వాహనాన్ని ఇతర రైతులతో పంచుకోవడం ద్వారా రవాణా ఖర్చులో 60% ఆదా చేసుకోవచ్చు."
    }
  },
  kn: {
    welcome: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಉಳವನ್ ಧ್ವನಿ ಸಹಾಯಕ. ಟೊಮೆಟೊ, ಈರುಳ್ಳಿ ದರ, ಹಸು, ಮೇಕೆಗಳ ನಾಟಿ ಔಷಧದ ಬಗ್ಗೆ ಕೇಳಿ.",
    answers: {
      tomato: "ಇಂದು ಒಡ್ಡನ್‌ಛತ್ರಂನಲ್ಲಿ ಟೊಮೆಟೊ ಬೆಲೆ ಕೆಜಿಗೆ ₹38, ಕೋಯಂಬೇಡಿನಲ್ಲಿ ₹44 ಆಗಿದೆ. ಮುಂದಿನ 3 ದಿನಗಳಲ್ಲಿ ₹6 ಏರಿಕೆಯಾಗಲಿದೆ, 3 ದಿನ ಕಾಯ್ದು ಮಾರಿ!",
      onion: "ಸಣ್ಣ ಈರುಳ್ಳಿ ಮಾರುಕಟ್ಟೆ ದರ ಕೆಜಿಗೆ ₹66-74. ಸ್ಥಳೀಯ ದಲ್ಲಾಳಿಗಳ ಬದಲಿಗೆ ಮಂಡಿಗೆ ಕಳುಹಿಸಿದರೆ ಕೆಜಿಗೆ ₹12 ಹೆಚ್ಚಿನ ಲಾಭ ಸಿಗುತ್ತದೆ.",
      goat: "ಮೇಕೆ ಅಥವಾ ಕುರಿಗಳ ಗಾಯಕ್ಕೆ: ಅರಿಶಿನ ಪುಡಿ, ಬೇವಿನ ಎಣ್ಣೆ ಮತ್ತು ಕರ್ಪೂರ ಬೆರೆಸಿ ಲೇಪ ಹಚ್ಚಿ. 3 ದಿನಗಳಲ್ಲಿ ಗಾಯ ಗುಣವಾಗುತ್ತದೆ.",
      cow: "ಕಾಂಗೇಯಂ ಹಸುಗಳಿಗೆ ಉತ್ತಮ ಬೇಡಿಕೆಯಿದ್ದು, ಪ್ರಸ್ತುತ ಮೌಲ್ಯ ₹72,000 ದಿಂದ ₹85,000 ರಷ್ಟಿದೆ.",
      storage: "ಹತ್ತಿರದ ಶೀತಲ ಸಂಗ್ರಹಾಗಾರ ಒಡ್ಡನ್‌ಛತ್ರಂನಲ್ಲಿದೆ (18 ಕಿ.ಮೀ ದೂರ). ತಿಂಗಳಿಗೆ ಕೆಜಿಗೆ ಕೇವಲ ₹1.10 ವೆಚ್ಚ.",
      paddy: "ಪೊನ್ನಿ ಭತ್ತವನ್ನು ಸರ್ಕಾರಿ ಖರೀದಿ ಕೇಂದ್ರಗಳಲ್ಲಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹2,560 ದರದಲ್ಲಿ ಖರೀದಿಸಲಾಗುತ್ತಿದೆ.",
      default: "ಸರಕು ಸಾಗಣೆ ವಾಹನವನ್ನು ಇತರ ರೈತರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳುವುದರಿಂದ ಸಾರಿಗೆ ವೆಚ್ಚದಲ್ಲಿ 60% ಉಳಿತಾಯವಾಗುತ್ತದೆ."
    }
  },
  ml: {
    welcome: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ഉഴവൻ വോയ്‌സ് അസിസ്റ്റന്റാണ്. തക്കാളി, ഉള്ളി വിലകൾ, മൃഗചികിത്സ എന്നിവ ചോദിക്കാം.",
    answers: {
      tomato: "ഇന്ന് ഒട്ടൻഛത്രത്തിൽ തക്കാളി കിലോയ്ക്ക് ₹38, കോയമ്പേടിൽ ₹44 ആണ്. അടുത്ത 3 ദിവസത്തിൽ വില ₹6 കൂടും, 3 ദിവസം കഴിഞ്ഞ് വിൽക്കൂ!",
      onion: "ചെറിയ ഉള്ളിക്ക് കിലോയ്ക്ക് ₹66-74 വിലയുണ്ട്. ഒട്ടൻഛത്രത്തിലേക്ക് അയച്ചാൽ കിലോയ്ക്ക് ₹12 അധിക ലാഭം ലഭിക്കും.",
      goat: "ആടുകളുടെ മുറിവുകൾക്ക്: മഞ്ഞൾപ്പൊടിയും വേപ്പെണ്ണയും കർപ്പൂരവും ചേർത്ത് പുരട്ടുക. പുഴുക്കൾ വരാതെ 3 ദിവസത്തിൽ ഭേദമാകും.",
      cow: "കാങ്കേയം നാടൻ പശുക്കൾക്ക് വിപണിയിൽ നല്ല ഡിമാൻഡുണ്ട്. നിലവിൽ ₹72,000 മുതൽ ₹85,000 വരെ ലഭിക്കും.",
      storage: "അടുത്തുള്ള കോൾഡ് സ്റ്റോറേജ് ഒട്ടൻഛത്രത്തിലാണ് (18 കി.മീ). മാസം കിലോയ്ക്ക് ₹1.10 മാത്രമേ വാടകയുള്ളൂ.",
      paddy: "പൊന്നി നെല്ലിന് സർക്കാർ സംഭരണ കേന്ദ്രങ്ങളിൽ ക്വിന്റലിന് ₹2,560 താങ്ങുവില ലഭിക്കുന്നു.",
      default: "അയൽ കർഷകരുമായി ചേർന്ന് വാഹനം പങ്കുവെച്ചാൽ യാത്രാക്കൂലിയിൽ 60% വരെ ലാഭിക്കാം."
    }
  },
  mr: {
    welcome: "नमस्कार! मी तुमचा उझवन व्हॉईस असिस्टंट आहे. टोमॅटो, कांदा भाव, शेळी, गायींचे उपचार विचारा.",
    answers: {
      tomato: "आज ओड्डनचत्रममध्ये टोमॅटो ₹३८/किलो आणि कोयंबेडूमध्ये ₹४४/किलो आहे. पुढील ३ दिवसांत भाव वाढणार असल्याने ३ दिवस थांबा!",
      onion: "लहान कांद्याचा भाव ₹६६-७४/किलो आहे. थेट मंडईत पाठवल्यास प्रति किलो ₹१२ जास्त नफा मिळेल.",
      goat: "शेळीच्या जखमेवर हळद, कडुनिंबाचे तेल आणि कापूर एकत्र करून लावा. ३ दिवसांत जखम पूर्ण बरी होईल.",
      cow: "कांगायम देशी गायीला बाजारात मोठी मागणी असून ₹७२,००० ते ₹८५,००० पर्यंत भाव मिळत आहे.",
      storage: "जवळचे कोल्ड स्टोरेज ओड्डनचत्रम येथे १८ किमी अंतरावर उपलब्ध आहे.",
      paddy: "तांदूळ खरेदी केंद्रांवर पोन्नी भाताला ₹२,५६० हमीभाव दिला जात आहे.",
      default: "इतर शेतकऱ्यांसोबत मिळून वाहन शेअर केल्यास वाहतूक खर्चात ६०% बचत होईल."
    }
  },
  bn: {
    welcome: "নমস্কার! আমি আপনার উঝভন ভয়েস অ্যাসিস্ট্যান্ট। টমেটো, পেঁয়াজের দর, গবাদি পশুর চিকিৎসা সম্পর্কে জিজ্ঞেস করুন।",
    answers: {
      tomato: "আজ ওড্ডানছত্রমে টমেটো ₹৩৮/কেজি এবং কোয়াম্বেডুতে ₹৪৪/কেজি। আগামী ৩ দিনে দাম ₹৬ বাড়বে, তাই ৩ দিন অপেক্ষা করে বিক্রি করুন!",
      onion: "ছোট পেঁয়াজ ₹৬৬-৭৪/কেজি দরে বিক্রি হচ্ছে। সরাসরি মান্ডিতে পাঠালে কেজিতে ₹১২ বাড়তি লাভ পাবেন।",
      goat: "ছাগলের ক্ষতের জন্য: হলুদ গুঁড়ো, নিম তেল এবং কর্পূর মিশিয়ে ক্ষতে লাগান। ৩ দিনে সেরে উঠবে।",
      cow: "কাঙ্গায়ম দেশি গরুর ভালো চাহিদা রয়েছে, দাম ₹৭২,০০০ থেকে ₹৮৫,০০০ পর্যন্ত চলছে।",
      storage: "কাছের কোল্ড স্টোরেজ ওড্ডানছত্রমে ১৮ কিমি দূরে অবস্থিত।",
      paddy: "সরকারি সংগ্রহ কেন্দ্রে পোন্নি ধানের দর কুইন্টাল প্রতি ₹২,৫৬০ মিলছে।",
      default: "অন্যান্য কৃষকদের সাথে গাড়ি শেয়ার করলে ভাড়ায় ৬০% পর্যন্ত সাশ্রয় হবে।"
    }
  },
  gu: {
    welcome: "નમસ્તે! હું તમારો ઉઝવન વૉઇસ સહાયક છું. ટામેટાં, ડુંગળીના ભાવ, ગાય-બકરાંની દવા વિશે પૂછો.",
    answers: {
      tomato: "આજે ટામેટાં ઓડનછત્રમમાં ₹૩૮/કિલો અને કોયમ્બેડુમાં ₹૪૪/કિલો છે. ૩ દિવસ રાહ જોઈને વેચવાથી વધુ નફો મળશે!",
      onion: "નાની ડુંગળીનો ભાવ ₹૬૬-૭૪/કિલો છે. સીધા મંડીમાં મોકલવાથી કિલો દીઠ ₹૧૨ નો વધારાનો નફો થશે.",
      goat: "બકરાંના ઘા માટે: હળદર પાવડર, લીમડાનું તેલ અને કપૂર મિક્સ કરી લગાવો. ૩ દિવસમાં ઘા રુઝાઈ જશે.",
      cow: "કાંગાયમ ગાયની બજારમાં ભારે માંગ છે, કિંમત ₹૭૨,૦૦૦ થી ₹૮૫,૦૦૦ સુધી બોલાય છે.",
      storage: "નજીકનું કોલ્ડ સ્ટોરેજ ઓડનછત્રમ ખાતે ૧૮ કિમી દૂર છે.",
      paddy: "સરકારી કેન્દ્રો પર પોન્ની ડાંગરનો ભાવ ક્વિન્ટલ દીઠ ₹૨,૫૬૦ મળી રહ્યો છે.",
      default: "સાથી ખેડૂતો સાથે વાહન શેર કરવાથી ભાડામાં ૬૦% સુધીની બચત થશે."
    }
  },
  pa: {
    welcome: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਉਝਵਨ ਵੌਇਸ ਅਸਿਸਟੈਂਟ ਹਾਂ। ਟਮਾਟਰ, ਪਿਆਜ਼ ਦੇ ਭਾਅ, ਗਾਂ-ਬੱਕਰੀਆਂ ਦੇ ਦੇਸੀ ਇਲਾਜ ਬਾਰੇ ਪੁੱਛੋ।",
    answers: {
      tomato: "ਅੱਜ ਟਮਾਟਰ ਦਾ ਭਾਅ ₹੩੮/ਕਿੱਲੋ ਹੈ ਅਤੇ ਕੋਇੰਬੇਡੂ ਵਿੱਚ ₹੪੪ ਹੈ। ਅਗਲੇ ੩ ਦਿਨਾਂ ਵਿੱਚ ਭਾਅ ਵਧੇਗਾ, ਇਸ ਲਈ ੩ ਦਿਨ ਰੁਕ ਕੇ ਵੇਚੋ!",
      onion: "ਛੋਟੇ ਪਿਆਜ਼ ਦਾ ਭਾਅ ₹੬੬-੭੪/ਕਿੱਲੋ ਹੈ। ਮੰਡੀ ਵਿੱਚ ਸਿੱਧਾ ਭੇਜਣ 'ਤੇ ₹੧੨/ਕਿੱਲੋ ਵਾਧੂ ਮੁਨਾਫ਼ਾ ਹੋਵੇਗਾ।",
      goat: "ਬੱਕਰੀਆਂ ਦੇ ਜ਼ਖ਼ਮ 'ਤੇ ਹਲਦੀ, ਨਿੰਮ ਦਾ ਤੇਲ ਅਤੇ ਕਪੂਰ ਮਿਲਾ ਕੇ ਲਗਾਓ। ੩ ਦਿਨਾਂ ਵਿੱਚ ਜ਼ਖ਼ਮ ਠੀਕ ਹੋ ਜਾਵੇਗਾ।",
      cow: "ਕਾਂਗਾਇਮ ਦੇਸੀ ਗਾਂ ਦੀ ਚੰਗੀ ਮੰਗ ਹੈ, ਕੀਮਤ ₹੭੨,੦੦੦ ਤੋਂ ₹੮੫,੦੦੦ ਤੱਕ ਚੱਲ ਰਹੀ ਹੈ।",
      storage: "ਨੇੜਲਾ ਕੋਲਡ ਸਟੋਰੇਜ ਓਡਨਛਤਰਮ ਵਿੱਚ ੧੮ ਕਿਲੋਮੀਟਰ ਦੂਰ ਹੈ।",
      paddy: "ਸਰਕਾਰੀ ਖ਼ਰੀਦ ਕੇਂਦਰਾਂ ਵਿੱਚ ਝੋਨੇ ਦਾ ਸਮਰਥਨ ਮੁੱਲ ₹੨,੫੬੦ ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਦਿੱਤਾ ਜਾ ਰਿਹਾ ਹੈ।",
      default: "ਹੋਰ ਕਿਸਾਨਾਂ ਨਾਲ ਰਲ ਕੇ ਗੱਡੀ ਸਾਂਝੀ ਕਰਨ ਨਾਲ ਕਿਰਾਏ ਵਿੱਚ ੬੦% ਬੱਚਤ ਹੋਵੇਗੀ।"
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

  // Initialize Web Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = LOCALE_VOICE_MAP[language] || 'ta-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processVoiceQuery(text);
      };

      recognition.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

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
          console.log('Error starting speech recognition:', e);
        }
      } else {
        // Fallback simulate voice input on browsers without SpeechRecognition
        simulateVoiceInput();
      }
    }
  };

  const simulateVoiceInput = (sampleText) => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const query = sampleText || (language === 'ta' ? "தக்காளி விலை என்ன?" : "What is today's tomato rate?");
      setTranscript(query);
      processVoiceQuery(query);
    }, 1200);
  };

  const processVoiceQuery = (queryText) => {
    const q = queryText.toLowerCase();
    let reply = langPack.answers.default;

    if (q.includes('tomato') || q.includes('தக்காளி') || q.includes('टमाटर') || q.includes('టమోటా') || q.includes('ಟೊಮೆಟೊ') || q.includes('തക്കാളി') || q.includes('ટામેટા')) {
      reply = langPack.answers.tomato;
    } else if (q.includes('onion') || q.includes('வெங்காயம்') || q.includes('प्याज') || q.includes('ఉల్లి') || q.includes('ಈರುಳ್ಳಿ') || q.includes('ഉള്ളി') || q.includes('ડુંਗળી')) {
      reply = langPack.answers.onion;
    } else if (q.includes('goat') || q.includes('ஆடு') || q.includes('बकरी') || q.includes('మేక') || q.includes('ಮೇಕೆ') || q.includes('ആട്') || q.includes('বকরি') || q.includes('ਬੱਕਰੀ') || q.includes('wound') || q.includes('காயம்') || q.includes('घाव')) {
      reply = langPack.answers.goat;
    } else if (q.includes('cow') || q.includes('மாடு') || q.includes('गाय') || q.includes('ఆవు') || q.includes('ಹಸು') || q.includes('പശു') || q.includes('ગાય') || q.includes('ਗਾਂ')) {
      reply = langPack.answers.cow;
    } else if (q.includes('storage') || q.includes('குளிர்பதன') || q.includes('कोल्ड') || q.includes('స్టోరేజ్') || q.includes('ശീതള')) {
      reply = langPack.answers.storage;
    } else if (q.includes('paddy') || q.includes('நெல்') || q.includes('धान') || q.includes('వరి') || q.includes('ಭತ್ತ') || q.includes('നെല്ല്') || q.includes('ਝੋਨਾ')) {
      reply = langPack.answers.paddy;
    }

    setAiResponse(reply);
    speakResponse(reply);
  };

  const speakResponse = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LOCALE_VOICE_MAP[language] || 'ta-IN';
      utterance.rate = 0.95; // Farmer friendly natural pace
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cream dark:bg-night-card border border-sage dark:border-night-border rounded-2xl max-w-lg w-full p-5 shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sage-light dark:border-night-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center text-harvest shadow">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-forest dark:text-leaf">
                {t('voice.responseTitle')}
              </h3>
              <p className="text-[11px] text-soil dark:text-stone-400">
                {LOCALE_VOICE_MAP[language]} · AI4Bharat / Whisper Architecture
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              setIsVoiceAssistantOpen(false);
            }}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="py-4 space-y-4 overflow-y-auto">
          
          {/* Welcome greeting card */}
          <div className="p-3.5 rounded-xl bg-forest/5 dark:bg-leaf/10 border border-sage/40 dark:border-night-border">
            <p className="text-sm font-medium text-forest dark:text-leaf-light leading-relaxed">
              {langPack.welcome}
            </p>
          </div>

          {/* User query if any */}
          {transcript && (
            <div className="flex justify-end">
              <div className="bg-forest text-white px-3.5 py-2 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-sm">
                "{transcript}"
              </div>
            </div>
          )}

          {/* AI Response output */}
          {aiResponse && (
            <div className="flex flex-col space-y-2">
              <div className="bg-white dark:bg-night border border-sage-light dark:border-night-border p-4 rounded-2xl rounded-tl-none shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-forest dark:text-leaf">
                  <span>உழவன் துணை AI பதில் / Voice Response</span>
                  {isSpeaking && (
                    <button
                      onClick={stopSpeaking}
                      className="flex items-center text-rose-600 hover:text-rose-700 font-semibold"
                    >
                      <Volume2 className="w-3.5 h-3.5 mr-1 animate-pulse" />
                      நிறுத்து (Stop)
                    </button>
                  )}
                </div>
                <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
                  {aiResponse}
                </p>
              </div>
            </div>
          )}

          {/* Sample quick question chips in active language */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-soil dark:text-stone-400">
              {t('voice.sampleCommands')}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[t('voice.q1'), t('voice.q2'), t('voice.q3'), t('voice.q4')].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscript(sample);
                    processVoiceQuery(sample);
                  }}
                  className="text-xs text-left px-3 py-1.5 rounded-full bg-cream-paper dark:bg-night border border-sage/60 dark:border-night-border hover:border-forest text-stone-700 dark:text-stone-300 font-medium transition"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Big Mic Button (Centerpiece) */}
        <div className="pt-3 border-t border-sage-light dark:border-night-border flex flex-col items-center justify-center">
          <button
            onClick={toggleListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl ${
              isListening
                ? 'bg-rose-600 text-white animate-bounce ring-4 ring-rose-300'
                : 'bg-gradient-to-r from-forest to-leaf hover:scale-105 text-white ring-4 ring-leaf/20'
            }`}
            title="Press to Speak"
          >
            {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>
          <span className="text-xs font-semibold mt-2 text-stone-600 dark:text-stone-300">
            {isListening ? t('voice.listening') : t('voice.speakPrompt')}
          </span>
        </div>

      </div>
    </div>
  );
}
