import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_38_TN_DISTRICTS } from '../data/marketsData';
import { 
  Globe, 
  Sparkles, 
  User, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  KeyRound, 
  CheckCircle2, 
  ShoppingBag, 
  Building2, 
  Tractor,
  Layers,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

const POPULAR_CROPS = [
  "Tomato", "Small Onion", "Paddy (Ponni)", "Banana", 
  "Tender Coconut", "Mango", "Jasmine (Malli)", "Sugarcane", "Drumstick"
];

const POPULAR_ANIMALS = [
  "Salem Black Goat", "Kangayam Cow", "Mecheri Sheep", 
  "Country Hen / Aseel Cock", "Fresh A2 Milk", "Country Eggs"
];

export default function LoginScreen() {
  const { t, language, setLanguage, setIsLanguageModalOpen, loginUser } = useApp();

  // Mode: 'otp' (Fast Phone OTP) vs 'profile' (Custom Onboarding Form)
  const [authMode, setAuthMode] = useState('otp');

  // Form Fields
  const [phone, setPhone] = useState('9842199014');
  const [otp, setOtp] = useState(['8', '4', '2', '1']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [name, setName] = useState('Muthuvel Karuppasamy');
  const [district, setDistrict] = useState('Dindigul');
  const [village, setVillage] = useState('Oddanchatram South');
  const [role, setRole] = useState('farmer');
  const [selectedCrops, setSelectedCrops] = useState(['Tomato', 'Small Onion', 'Paddy (Ponni)']);
  const [selectedAnimals, setSelectedAnimals] = useState(['Salem Black Goat', 'Country Hen / Aseel Cock']);
  const [landAcres, setLandAcres] = useState(4.5);

  const toggleCrop = (crop) => {
    setSelectedCrops(prev => 
      prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop]
    );
  };

  const toggleAnimal = (animal) => {
    setSelectedAnimals(prev => 
      prev.includes(animal) ? prev.filter(a => a !== animal) : [...prev, animal]
    );
  };

  // Demo Persona Fast Logins
  const handlePersonaLogin = (personaType) => {
    let profileData = {};

    if (personaType === 'farmer') {
      profileData = {
        name: "Muthuvel Karuppasamy",
        phone: "+91 98421 99014",
        district: "Dindigul",
        village: "Oddanchatram South",
        role: "farmer",
        crops: ["Tomato", "Small Onion", "Paddy (Ponni)"],
        livestock: ["Salem Black Goat", "Kangayam Cow", "Country Hen / Aseel Cock"],
        landAcres: 4.5
      };
    } else if (personaType === 'buyer') {
      profileData = {
        name: "Chennai Mega Traders & Processors",
        phone: "+91 94440 12345",
        district: "Chennai",
        village: "Koyambedu Wholesale Terminal",
        role: "buyer",
        crops: ["Tomato", "Small Onion", "Banana", "Tender Coconut"],
        livestock: ["Salem Black Goat", "Fresh A2 Milk"],
        landAcres: 0
      };
    } else if (personaType === 'fpo') {
      profileData = {
        name: "Kongu Uzhavar Producer Company (FPO)",
        phone: "+91 98430 88219",
        district: "Tiruppur",
        village: "Kangayam Agro Cluster",
        role: "fpo",
        crops: ["Paddy (Ponni)", "Coconut", "Tomato"],
        livestock: ["Kangayam Cow", "Country Eggs"],
        landAcres: 120.0
      };
    }

    loginUser(profileData);
    triggerCelebration();
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch(err){}
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    loginUser({
      name: name.trim() || "Farmer Muthuvel",
      phone: `+91 ${phone.replace('+91', '').trim()}`,
      district: district || "Dindigul",
      village: village || "Oddanchatram",
      role: role || "farmer",
      crops: selectedCrops.length > 0 ? selectedCrops : ["Tomato", "Paddy (Ponni)"],
      livestock: selectedAnimals.length > 0 ? selectedAnimals : ["Salem Black Goat"],
      landAcres: Number(landAcres) || 4.5
    });
    triggerCelebration();
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    loginUser({
      name: name.trim(),
      phone: phone.trim() ? `+91 ${phone.replace('+91', '').trim()}` : "+91 98421 99014",
      district,
      village: village || `${district} Town`,
      role,
      crops: selectedCrops.length > 0 ? selectedCrops : ["Tomato", "Paddy (Ponni)"],
      livestock: selectedAnimals.length > 0 ? selectedAnimals : ["Salem Black Goat"],
      landAcres: Number(landAcres) || 3.0
    });
    triggerCelebration();
  };

  return (
    <div className="min-h-screen bg-glass-nature flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Language Bar */}
      <div className="w-full max-w-md flex justify-between items-center mb-4 z-10">
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-stone-900/70 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-sm text-xs font-semibold text-emerald-900 dark:text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Tamil Nadu Agri Hackathon Edition</span>
        </div>

        <button
          onClick={() => setIsLanguageModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-sm text-xs font-bold text-stone-700 dark:text-stone-200 hover:bg-white transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
          <span className="uppercase">{language}</span>
          <span className="text-[10px] text-stone-400">Change</span>
        </button>
      </div>

      {/* Main Glassmorphic Login Card */}
      <div className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 border border-white/70 dark:border-white/10">
        
        {/* Brand & 3D Logo Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block mx-auto mb-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500/15 via-white/80 to-amber-400/20 dark:from-emerald-950/40 dark:to-stone-900/80 p-2 shadow-xl border border-emerald-500/30 dark:border-emerald-400/20 flex items-center justify-center backdrop-blur-md group">
              <img 
                src="/logo.png" 
                alt="Uzhavan Thunai (UT) 3D Logo" 
                className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
              UT Official
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-300 tracking-tight">
            Uzhavan Thunai
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium mt-1">
            Right Time · Right Market · Right Price
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-3">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
              📊 38 District Mandis
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
              🌿 AI Crop Doctor
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-800 dark:text-blue-300 border border-blue-500/20">
              🐐 Livestock Trading
            </span>
          </div>
        </div>

        {/* Login Style Tabs */}
        <div className="flex p-1 rounded-2xl bg-stone-200/60 dark:bg-stone-800/60 mb-5">
          <button
            type="button"
            onClick={() => setAuthMode('otp')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              authMode === 'otp'
                ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Fast Phone OTP</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('profile')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              authMode === 'profile'
                ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Custom Profile Setup</span>
          </button>
        </div>

        {/* Mode 1: Fast OTP Login */}
        {authMode === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-black text-stone-500">
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="98421 99014"
                  className="w-full pl-16 pr-4 py-3 rounded-2xl glass-input text-sm font-semibold tracking-wide text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  4-Digit Verification OTP
                </label>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Auto-sent
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-full h-12 text-center text-lg font-black rounded-xl glass-input text-emerald-800 dark:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                ))}
              </div>
            </div>

            {/* Quick District selection for OTP */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Select Your Tamil Nadu District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl glass-input text-xs font-semibold text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {ALL_38_TN_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist} className="text-stone-900">
                    {dist} District
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-800 hover:from-emerald-700 hover:to-green-900 text-white font-black text-sm tracking-wide shadow-lg shadow-emerald-700/25 flex items-center justify-center space-x-2 transition-all transform active:scale-98"
            >
              <span>Verify OTP & Enter App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Mode 2: Detailed Custom Onboarding */}
        {authMode === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            {/* Role Selector Cards */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'farmer', label: 'Farmer', icon: Tractor },
                  { id: 'buyer', label: 'Buyer', icon: ShoppingBag },
                  { id: 'fpo', label: 'FPO Leader', icon: Building2 },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setRole(id)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all ${
                      role === id
                        ? 'border-emerald-500 bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 font-bold'
                        : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 mx-auto mb-1 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[11px] block">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Muthuvel"
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs font-semibold"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9842199014"
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs font-semibold"
                  required
                />
              </div>
            </div>

            {/* District & Village */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">
                  District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl glass-input text-xs font-semibold text-stone-800 dark:text-stone-100"
                >
                  {ALL_38_TN_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist} className="text-stone-900">
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Village / Town
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="Oddanchatram South"
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs font-semibold"
                />
              </div>
            </div>

            {/* Crops Grown */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Key Crops (Tap to select)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_CROPS.map((crop) => {
                  const isSelected = selectedCrops.includes(crop);
                  return (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => toggleCrop(crop)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                      }`}
                    >
                      {crop}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Livestock Owned */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Livestock / Animals Owned
              </label>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_ANIMALS.map((animal) => {
                  const isSelected = selectedAnimals.includes(animal);
                  return (
                    <button
                      key={animal}
                      type="button"
                      onClick={() => toggleAnimal(animal)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-all ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                      }`}
                    >
                      {animal}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-800 text-white font-black text-xs tracking-wide shadow-lg shadow-emerald-700/25 flex items-center justify-center space-x-2 transition-all active:scale-98"
            >
              <span>Save Profile & Enter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 1-Click Demo Persona Shortcuts for Judges */}
        <div className="mt-6 pt-5 border-t border-stone-200/60 dark:border-stone-800/60">
          <p className="text-[10px] uppercase font-black text-stone-400 dark:text-stone-500 tracking-wider text-center mb-2.5">
            ⚡ 1-Click Demo Personas (Instant Test)
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handlePersonaLogin('farmer')}
              className="px-2 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-[10px] font-bold transition-all text-center"
            >
              👨‍🌾 Farmer Demo
            </button>
            <button
              type="button"
              onClick={() => handlePersonaLogin('buyer')}
              className="px-2 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-900 dark:text-blue-300 text-[10px] font-bold transition-all text-center"
            >
              🛒 Buyer Demo
            </button>
            <button
              type="button"
              onClick={() => handlePersonaLogin('fpo')}
              className="px-2 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-900 dark:text-amber-300 text-[10px] font-bold transition-all text-center"
            >
              🏛️ FPO Leader
            </button>
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="mt-4 text-center z-10">
        <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
          Govt Agmarknet & eNAM Data Integrated · 100% Free for Tamil Nadu Farmers
        </p>
      </div>
    </div>
  );
}
