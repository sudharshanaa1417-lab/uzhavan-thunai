import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_38_TN_DISTRICTS } from '../data/marketsData';
import { Globe, Sparkles, User, Phone, MapPin, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const POPULAR_CROPS = [
  "Tomato", "Small Onion", "Paddy (Ponni)", "Banana", 
  "Tender Coconut", "Mango", "Jasmine (Malli)", "Sugarcane", "Drumstick"
];

const POPULAR_ANIMALS = [
  "Kangayam Cow", "Salem Black Goat", "Mecheri Sheep", 
  "Country Hen / Aseel Cock", "Fresh A2 Milk", "Country Eggs"
];

export default function LoginScreen() {
  const { t, language, setIsLanguageModalOpen, loginUser } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dindigul');
  const [village, setVillage] = useState('Oddanchatram');
  const [role, setRole] = useState('farmer');
  const [selectedCrops, setSelectedCrops] = useState(['Tomato', 'Small Onion']);
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

  const handleDemoFill = () => {
    setName("Muthuvel Karuppasamy");
    setPhone("9842199014");
    setDistrict("Dindigul");
    setVillage("Oddanchatram South");
    setRole("farmer");
    setSelectedCrops(["Tomato", "Small Onion", "Paddy (Ponni)"]);
    setSelectedAnimals(["Kangayam Cow", "Salem Black Goat", "Country Hen / Aseel Cock"]);
    setLandAcres(4.5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    loginUser({
      name: name.trim(),
      phone: phone.trim() ? `+91 ${phone.replace('+91', '').trim()}` : "+91 98421 99014",
      district,
      village: village || `${district} Town`,
      role,
      crops: selectedCrops.length > 0 ? selectedCrops : ["Tomato", "Paddy"],
      livestock: selectedAnimals.length > 0 ? selectedAnimals : ["Salem Black Goat"],
      landAcres: Number(landAcres) || 3.0
    });

    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch(err){}
  };

  return (
    <div className="min-h-screen bg-glass-nature text-stone-900 dark:text-stone-100 flex items-center justify-center p-4 sm:p-6 transition-colors duration-200">
      
      {/* Decorative ambient blurred glass glow bubbles */}
      <div className="fixed top-12 left-10 w-72 h-72 bg-emerald-400/25 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-12 right-10 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="glass-card max-w-lg w-full rounded-3xl p-6 sm:p-8 relative z-10 shadow-2xl border border-white/60 dark:border-white/10">
        
        {/* Top Header with Cute Mascot Logo & Language Switcher */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-100 to-emerald-100 p-1.5 shadow-md border-2 border-white/80 dark:border-white/20 flex items-center justify-center">
              <img 
                src="/favicon.svg" 
                alt="Uzhavan Kutty Cute Mascot" 
                className="w-11 h-11 object-contain drop-shadow"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-emerald-800 dark:text-emerald-400 tracking-tight">
                {t('appName')}
              </h1>
              <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                {t('appTagline')}
              </p>
            </div>
          </div>

          {/* Language Switcher Pill */}
          <button
            type="button"
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full glass-input text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:scale-105 transition shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('langName')}</span>
          </button>
        </div>

        {/* Intro */}
        <div className="mb-5">
          <h2 className="text-base font-bold text-stone-800 dark:text-stone-100">
            {t('auth.loginTitle')}
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
            {t('auth.loginSubtitle')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              {t('auth.fullName')} *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('auth.fullNamePlaceholder')}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs font-semibold text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Mobile Number & District Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {t('auth.phone')} *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98421 99014"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs font-semibold text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {t('auth.selectDistrict')} *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl glass-input text-xs font-bold text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {ALL_38_TN_DISTRICTS.map(d => (
                  <option key={d} value={d} className="dark:bg-stone-900">
                    {d} District
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Village & Land Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {t('auth.village')}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder={t('auth.villagePlaceholder')}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-xs font-semibold text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {t('auth.landSize')}
              </label>
              <input
                type="number"
                step="0.5"
                value={landAcres}
                onChange={(e) => setLandAcres(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl glass-input text-xs font-bold text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* User Role */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              {t('auth.role')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
              {[
                { id: 'farmer', label: t('auth.roleFarmer') },
                { id: 'buyer', label: t('auth.roleBuyer') },
                { id: 'fpo', label: t('auth.roleFPO') },
                { id: 'doctor', label: t('auth.roleDoctor') }
              ].map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`p-2 rounded-xl text-center border font-bold transition line-clamp-1 ${
                    role === r.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'glass-input text-stone-700 dark:text-stone-300 hover:border-emerald-400'
                  }`}
                >
                  {r.label.split(' / ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* What crops do you grow? */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              {t('auth.primaryCrops')}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_CROPS.map(crop => {
                const isSelected = selectedCrops.includes(crop);
                return (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => toggleCrop(crop)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition flex items-center space-x-1 border ${
                      isSelected
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-400 shadow-xs'
                        : 'glass-input text-stone-600 dark:text-stone-400 hover:border-stone-400'
                    }`}
                  >
                    <span>{crop}</span>
                    {isSelected && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* What livestock do you own? */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              {t('auth.primaryLivestock')}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_ANIMALS.map(animal => {
                const isSelected = selectedAnimals.includes(animal);
                return (
                  <button
                    key={animal}
                    type="button"
                    onClick={() => toggleAnimal(animal)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition flex items-center space-x-1 border ${
                      isSelected
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-400 shadow-xs'
                        : 'glass-input text-stone-600 dark:text-stone-400 hover:border-stone-400'
                    }`}
                  >
                    <span>{animal}</span>
                    {isSelected && <Check className="w-3 h-3 text-amber-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleDemoFill}
              className="py-2.5 px-4 rounded-xl glass-input text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-white/80 transition"
            >
              ⚡ Quick Demo Fill
            </button>

            <button
              type="submit"
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-1.5 transition hover:scale-[1.01]"
            >
              <span>{t('auth.startBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
