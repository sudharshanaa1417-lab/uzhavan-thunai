import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import LanguageModal from './components/LanguageModal';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import SmartSellAdvisorCard from './components/SmartSellAdvisorCard';
import CropDoctorModal from './components/CropDoctorModal';
import AnimalDoctorModal from './components/AnimalDoctorModal';
import ProfitPlannerModal from './components/ProfitPlannerModal';
import GroupSellingModal from './components/GroupSellingModal';
import EscrowPaymentModal from './components/EscrowPaymentModal';
import AddListingModal from './components/AddListingModal';
import VendorDirectoryModal from './components/VendorDirectoryModal';
import PriceForecastChart from './components/PriceForecastChart';
import SpoilageClockCard from './components/SpoilageClockCard';
import FairPriceMeter from './components/FairPriceMeter';
import { COMMODITIES_DATA } from './data/priceIntelligence';
import { 
  TrendingUp, 
  Stethoscope, 
  PlusCircle, 
  Truck, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight, 
  Store,
  UserCheck,
  Award,
  Layers
} from 'lucide-react';

export default function App() {
  const { 
    t, 
    activeTab, 
    setActiveTab, 
    userProfile, 
    listings, 
    setIsCropDoctorOpen, 
    setIsAnimalDoctorOpen, 
    setIsProfitPlannerOpen, 
    setIsAddListingOpen,
    setIsEscrowModalOpen,
    isEscrowModalOpen,
    setIsVendorDirectoryOpen,
    isVendorDirectoryOpen,
    setIsLanguageModalOpen,
    setIsVoiceAssistantOpen
  } = useApp();

  const [selectedCommodity, setSelectedCommodity] = useState(COMMODITIES_DATA[0]);
  const [marketFilter, setMarketFilter] = useState('all');
  const [isGroupSellingOpen, setIsGroupSellingOpen] = useState(false);
  const [selectedOrderForEscrow, setSelectedOrderForEscrow] = useState(null);

  // Filter listings
  const filteredListings = marketFilter === 'all'
    ? listings
    : listings.filter(l => l.category === marketFilter);

  return (
    <div className="min-h-screen bg-organic-pattern text-stone-900 dark:text-night-text pb-24 transition-colors duration-200">
      
      {/* Top App Bar */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-6">
        
        {/* =========================================================================
            TAB 1: HOME
           ========================================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Farmer Welcome & Extra Earnings Banner */}
            <div className="bg-gradient-to-r from-forest via-forest-700 to-soil text-white p-5 rounded-2xl shadow-elevated relative overflow-hidden">
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-harvest text-soil-dark font-extrabold text-[11px] uppercase tracking-wider">
                      {userProfile.district} District
                    </span>
                    <span className="text-xs text-leaf-light font-semibold">
                      {t('home.locationBadge')}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black mt-1">
                    {t('home.greeting')} {userProfile.name}
                  </h1>
                  <p className="text-xs text-cream/90 mt-1">
                    {userProfile.landAcres} Acres · {userProfile.crops.join(", ")} · {userProfile.livestock.join(", ")}
                  </p>
                </div>

                {/* Extra Profit Highlight Badge */}
                <div className="bg-white/15 backdrop-blur-md border border-white/25 p-3.5 rounded-2xl text-left sm:text-right min-w-[200px]">
                  <span className="text-[10px] uppercase font-bold text-harvest block">
                    {t('home.extraEarningsBanner')}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-harvest">
                    +₹{userProfile.extraEarningsTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-cream-paper block mt-0.5">
                    vs Local Middlemen Exploitation
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Grid (Big readable buttons, min 48px targets) */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-soil dark:text-stone-400">
                {t('home.quickActions')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                
                {/* 1. Add Produce / Animal */}
                <button
                  onClick={() => setIsAddListingOpen(true)}
                  className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-night-card border border-sage/60 dark:border-night-border hover:border-forest text-center shadow-soft transition hover:-translate-y-0.5 min-h-[88px]"
                >
                  <div className="w-10 h-10 rounded-full bg-forest/10 dark:bg-leaf/20 flex items-center justify-center text-forest dark:text-leaf mb-2">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-xs text-stone-800 dark:text-stone-100">
                    {t('home.addProduce')}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    Photo, Voice, Form
                  </span>
                </button>

                {/* 2. Smart Sell Advisor */}
                <button
                  onClick={() => setActiveTab('advisor')}
                  className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-night-card border border-sage/60 dark:border-night-border hover:border-forest text-center shadow-soft transition hover:-translate-y-0.5 min-h-[88px]"
                >
                  <div className="w-10 h-10 rounded-full bg-harvest/20 flex items-center justify-center text-soil-dark dark:text-harvest mb-2">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-xs text-stone-800 dark:text-stone-100">
                    {t('home.sellAdvisor')}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    Net Profit Calculator
                  </span>
                </button>

                {/* 3. AI Crop & Vet Doctor */}
                <button
                  onClick={() => setActiveTab('doctor')}
                  className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-night-card border border-sage/60 dark:border-night-border hover:border-forest text-center shadow-soft transition hover:-translate-y-0.5 min-h-[88px]"
                >
                  <div className="w-10 h-10 rounded-full bg-leaf/20 flex items-center justify-center text-forest dark:text-leaf mb-2">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-xs text-stone-800 dark:text-stone-100">
                    {t('home.aiDoctor')}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    Crop & Animal Wound
                  </span>
                </button>

                {/* 4. Group Transport Pool */}
                <button
                  onClick={() => setIsGroupSellingOpen(true)}
                  className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white dark:bg-night-card border border-sage/60 dark:border-night-border hover:border-forest text-center shadow-soft transition hover:-translate-y-0.5 min-h-[88px]"
                >
                  <div className="w-10 h-10 rounded-full bg-soil/15 flex items-center justify-center text-soil dark:text-stone-300 mb-2">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-xs text-stone-800 dark:text-stone-100">
                    {t('home.groupTransport')}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    Save 60% Freight
                  </span>
                </button>

              </div>
            </div>

            {/* HERO FEATURE: Smart Sell Advisor Card */}
            <SmartSellAdvisorCard />

            {/* Perishable Spoilage Clock & Cold Storage Facility Card */}
            <SpoilageClockCard />

            {/* Live Mandi Prices & 7-Day Forecast Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-forest dark:text-leaf">
                    {t('home.liveMandiPrices')}
                  </h3>
                  <p className="text-[11px] text-soil dark:text-stone-400">
                    {t('home.govtApproved')}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('market')}
                  className="text-xs font-bold text-forest dark:text-leaf flex items-center hover:underline"
                >
                  <span>{t('home.viewAll')}</span>
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>

              {/* Commodity Price Pills */}
              <div className="flex space-x-2 overflow-x-auto pb-1">
                {COMMODITIES_DATA.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCommodity(c)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition flex items-center space-x-2 ${
                      selectedCommodity.id === c.id
                        ? 'bg-forest text-white border-forest shadow-sm'
                        : 'bg-white dark:bg-night-card border-sage-light dark:border-night-border text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <span>{c.name.split(" ")[0]}</span>
                    <span className="opacity-90">₹{c.modalPrice}/{c.unit}</span>
                  </button>
                ))}
              </div>

              {/* Interactive 7-Day Forecast Chart for Selected Commodity */}
              <PriceForecastChart commodity={selectedCommodity} />
            </div>

            {/* Registered Sellers & Buyers Discovery Banner */}
            <div className="bg-gradient-to-r from-cream-paper to-white dark:from-night-card dark:to-night border border-sage/60 dark:border-night-border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-soft">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-soil dark:text-harvest tracking-wider">
                  Tamil Nadu Vendor Directory
                </span>
                <h4 className="text-base font-extrabold text-forest dark:text-leaf mt-0.5">
                  {t('market.sellerDirectory')}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                  Discover verified farmers, milk producers, and livestock breeders across all districts.
                </p>
              </div>
              <button
                onClick={() => setIsVendorDirectoryOpen(true)}
                className="px-4 py-2 rounded-xl bg-forest hover:bg-forest-700 text-white font-bold text-xs shadow-sm self-start sm:self-auto whitespace-nowrap"
              >
                View Registered Sellers
              </button>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: SMART SELL ADVISOR (HERO FEATURE FULL VIEW)
           ========================================================================= */}
        {activeTab === 'advisor' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header info */}
            <div className="bg-white dark:bg-night-card border border-sage-light dark:border-night-border p-4 rounded-2xl shadow-soft">
              <h2 className="text-xl font-extrabold text-forest dark:text-leaf">
                {t('advisor.title')}
              </h2>
              <p className="text-xs text-soil dark:text-stone-400 mt-1 leading-relaxed">
                {t('advisor.subtitle')}. Compares Koyambedu, Oddanchatram, Mettupalayam, Uzhavar Sandhais, and South TN mandis with real transport freight and commission rates.
              </p>
            </div>

            <SmartSellAdvisorCard />

            {/* Harvest-Time Advisor (Weather + Crop stage + Price trend) */}
            <div className="bg-gradient-to-br from-cream to-white dark:from-night-card dark:to-night border border-sage/60 dark:border-night-border rounded-2xl p-5 shadow-soft space-y-3">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-full bg-forest text-white text-[10px] font-extrabold uppercase">
                  Harvest Advisor
                </span>
                <h3 className="font-extrabold text-base text-forest dark:text-leaf">
                  அறுவடை நேர வழிகாட்டி (Harvest-Time Optimization Engine)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200">
                  <span className="text-[10px] font-bold uppercase text-sky-800 dark:text-sky-300 block">
                    IMD வானிலை (Weather Forecast)
                  </span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 mt-0.5 block">
                    Light rain expected in 48 hours (12mm)
                  </span>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Pick tomatoes and vegetables now before rain dampens field.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-300 block">
                    பயிர் முதிர்ச்சி (Crop Maturity)
                  </span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 mt-0.5 block">
                    Stage 4 (Breaker / Pink stage)
                  </span>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Ideal transit tolerance for 300+ km travel to Chennai.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-harvest/15 dark:bg-harvest/10 border border-harvest/40">
                  <span className="text-[10px] font-bold uppercase text-soil dark:text-harvest block">
                    விலை உச்சம் (Target Price Peak)
                  </span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 mt-0.5 block">
                    Day 4 (+₹6/kg peak)
                  </span>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Coincides with weekend wholesale procurement surge.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 3: AI DOCTOR (CROP & ANIMAL WOUND)
           ========================================================================= */}
        {activeTab === 'doctor' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white dark:bg-night-card border border-sage-light dark:border-night-border p-4 rounded-2xl shadow-soft">
              <h2 className="text-xl font-extrabold text-forest dark:text-leaf">
                {t('doctor.title')}
              </h2>
              <p className="text-xs text-soil dark:text-stone-400 mt-1">
                Edge AI Computer Vision for Freshness/Rot Grading and Veterinary Wound/Skin Care.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Crop Doctor Card */}
              <div className="bg-white dark:bg-night-card border border-sage/60 dark:border-night-border rounded-2xl p-5 shadow-soft flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-forest dark:text-leaf">
                    {t('doctor.cropTab')}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    Scan fruits, vegetables, eggs, or crops to detect freshness percentage, rotting soft spots, pest damage, and automatic Grade A/B/C classification.
                  </p>
                </div>
                <button
                  onClick={() => setIsCropDoctorOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-forest hover:bg-forest-700 text-white font-bold text-xs shadow-sm transition"
                >
                  Open Crop Doctor
                </button>
              </div>

              {/* Animal Doctor Card */}
              <div className="bg-white dark:bg-night-card border border-sage/60 dark:border-night-border rounded-2xl p-5 shadow-soft flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-soil/15 flex items-center justify-center text-soil">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-soil dark:text-harvest">
                    {t('doctor.animalTab')}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    Scan domestic cattle, goats, sheep, and country poultry wounds or skin lesions to evaluate infection severity, traditional Nattu Vaithiyam remedies, and veterinary antibiotic protocols.
                  </p>
                </div>
                <button
                  onClick={() => setIsAnimalDoctorOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-soil hover:bg-soil-dark text-white font-bold text-xs shadow-sm transition"
                >
                  Open Animal Doctor
                </button>
              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 4: MARKETPLACE
           ========================================================================= */}
        {activeTab === 'market' && (
          <div className="space-y-5 animate-fadeIn">
            
            {/* Header with Add Listing & Category Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-forest dark:text-leaf">
                  {t('market.title')}
                </h2>
                <p className="text-xs text-soil dark:text-stone-400">
                  {t('market.subtitle')}
                </p>
              </div>

              <div className="flex items-center space-x-2 self-start sm:self-auto">
                <button
                  onClick={() => setIsVendorDirectoryOpen(true)}
                  className="px-3 py-1.5 rounded-xl border border-sage dark:border-night-border bg-white dark:bg-night text-xs font-bold text-stone-700 dark:text-stone-300 hover:border-forest"
                >
                  Vendors Directory
                </button>
                <button
                  onClick={() => setIsAddListingOpen(true)}
                  className="flex items-center space-x-1 px-3.5 py-1.5 rounded-xl bg-forest hover:bg-forest-700 text-white font-bold text-xs shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t('home.addProduce')}</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex space-x-1.5 overflow-x-auto pb-1">
              {[
                { id: 'all', label: t('market.allCategories') },
                { id: 'vegetables', label: t('market.vegetables') },
                { id: 'crops', label: t('market.crops') },
                { id: 'fruits', label: t('market.fruits') },
                { id: 'livestock', label: t('market.livestock') },
                { id: 'poultry', label: t('market.poultry') },
                { id: 'dairy', label: t('market.dairy') }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setMarketFilter(f.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${
                    marketFilter === f.id
                      ? 'bg-forest text-white border-forest shadow-xs'
                      : 'bg-white dark:bg-night-card border-stone-200 dark:border-night-border text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredListings.map(listing => (
                <div
                  key={listing.id}
                  className="bg-white dark:bg-night-card border border-sage/60 dark:border-night-border rounded-2xl overflow-hidden shadow-soft flex flex-col justify-between hover:shadow-elevated transition"
                >
                  <div>
                    {/* Image and Badges */}
                    <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 rounded-full bg-forest text-white text-[10px] font-extrabold uppercase shadow-sm">
                          Grade {listing.qualityGrade}
                        </span>
                        {listing.isVetCertified && (
                          <span className="px-2 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-bold shadow-sm">
                            ✓ Vet Certified
                          </span>
                        )}
                        {listing.isVerifiedSeller && (
                          <span className="px-2 py-0.5 rounded-full bg-harvest text-soil-dark text-[10px] font-extrabold shadow-sm">
                            ✓ Verified Farmer
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-xs text-white font-black text-sm">
                        ₹{listing.pricePerUnit} / {listing.unit}
                      </div>
                    </div>

                    {/* Listing Content */}
                    <div className="p-4 space-y-2.5">
                      <div>
                        <h4 className="font-extrabold text-base text-stone-900 dark:text-stone-100 line-clamp-1">
                          {listing.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-[11px] text-stone-500 mt-0.5">
                          <span>{listing.village}, {listing.district}</span>
                          <span>•</span>
                          <span>Quantity: <strong>{listing.quantity} {listing.unit}</strong></span>
                        </div>
                      </div>

                      {listing.breed && (
                        <div className="text-[11px] text-soil dark:text-stone-400 font-semibold bg-stone-50 dark:bg-night p-2 rounded-lg border border-stone-200 dark:border-night-border">
                          Breed: {listing.breed} · Age: {listing.age} · Weight: {listing.weight}
                        </div>
                      )}

                      <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                        {listing.description}
                      </p>

                      {/* Fair Price Meter on active highest bid or price */}
                      <FairPriceMeter
                        offerPrice={listing.pricePerUnit}
                        modalPrice={listing.govtApprovedPrice}
                        mspPrice={Math.round(listing.govtApprovedPrice * 0.85)}
                        unit={listing.unit}
                      />
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="p-4 pt-0 flex items-center justify-between border-t border-sage-light dark:border-night-border mt-2 pt-3">
                    <a
                      href={`tel:${listing.phone}`}
                      className="flex items-center space-x-1 text-xs font-bold text-soil dark:text-stone-300 hover:text-forest"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{listing.phone}</span>
                    </a>

                    <button
                      onClick={() => {
                        setSelectedOrderForEscrow({
                          id: `esc-${Date.now()}`,
                          listingTitle: `${listing.title} (${listing.quantity} ${listing.unit})`,
                          buyerName: userProfile.name,
                          sellerName: listing.sellerName,
                          totalAmount: listing.pricePerUnit * listing.quantity,
                          status: 'held'
                        });
                        setIsEscrowModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-forest hover:bg-forest-700 text-white font-bold text-xs shadow-xs"
                    >
                      {t('market.escrowPay')}
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 5: FPO GROUP SELLING
           ========================================================================= */}
        {activeTab === 'fpo' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="bg-white dark:bg-night-card border border-sage-light dark:border-night-border p-4 rounded-2xl shadow-soft">
              <h2 className="text-xl font-extrabold text-forest dark:text-leaf">
                {t('fpo.title')}
              </h2>
              <p className="text-xs text-soil dark:text-stone-400 mt-1">
                {t('fpo.subtitle')}
              </p>
            </div>

            <div className="bg-gradient-to-r from-forest to-leaf text-white p-5 rounded-2xl shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-harvest">FPO Logistics Savings</span>
                <h3 className="text-xl font-black mt-0.5">Shared Freight Pooling</h3>
                <p className="text-xs text-leaf-light mt-1 max-w-md">
                  Instead of dispatching separate Tata Ace vehicles with half loads, collaborate with farmers in your village to fill full 4-tonne mini trucks.
                </p>
              </div>
              <button
                onClick={() => setIsGroupSellingOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-harvest hover:bg-harvest-dark text-soil-dark font-extrabold text-xs shadow-md transition self-start sm:self-auto whitespace-nowrap"
              >
                Browse & Join Pools
              </button>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 6: PROFILE & FARMER DASHBOARD
           ========================================================================= */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Profile Overview Card */}
            <div className="bg-white dark:bg-night-card border border-sage/60 dark:border-night-border rounded-2xl p-5 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full bg-forest flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-harvest">
                    {userProfile.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100">
                        {userProfile.name}
                      </h3>
                      <span className="flex items-center text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full font-bold">
                        <ShieldCheck className="w-3 h-3 mr-0.5" />
                        Verified
                      </span>
                    </div>
                    <span className="text-xs text-soil dark:text-stone-400 font-medium">
                      {userProfile.village}, {userProfile.district} District
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      {userProfile.phone}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsLanguageModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl border border-sage dark:border-night-border bg-stone-50 dark:bg-night text-xs font-bold text-forest dark:text-leaf"
                >
                  {t('langName')} 🌐
                </button>
              </div>

              {/* Holding Details */}
              <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-sage-light dark:border-night-border text-center">
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-night">
                  <span className="text-[10px] text-stone-500 block uppercase font-bold">Land Holding</span>
                  <span className="text-base font-black text-stone-900 dark:text-stone-100">{userProfile.landAcres} Acres</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-night">
                  <span className="text-[10px] text-stone-500 block uppercase font-bold">Crops</span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{userProfile.crops.length} Types</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-night">
                  <span className="text-[10px] text-stone-500 block uppercase font-bold">Livestock</span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{userProfile.livestock.length} Heads</span>
                </div>
              </div>
            </div>

            {/* Extra Money Earned Impact Banner */}
            <div className="bg-gradient-to-r from-forest to-leaf text-white p-5 rounded-2xl shadow-elevated space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-harvest">
                  {t('home.extraEarningsBanner')}
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  FY 2026-27
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-harvest">
                ₹{userProfile.extraEarningsTotal.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-leaf-light leading-relaxed">
                Measured by comparing actual net profits received across Oddanchatram & Koyambedu against baseline local middleman offers.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-night-card border border-sage-light dark:border-night-border rounded-2xl p-4 space-y-2">
              <button
                onClick={() => setIsProfitPlannerOpen(true)}
                className="w-full text-left p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-night flex items-center justify-between transition text-xs font-bold text-stone-800 dark:text-stone-200"
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-forest" />
                  <span>{t('profitPlanner.title')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => setIsGroupSellingOpen(true)}
                className="w-full text-left p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-night flex items-center justify-between transition text-xs font-bold text-stone-800 dark:text-stone-200"
              >
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-forest" />
                  <span>{t('fpo.title')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => setIsVendorDirectoryOpen(true)}
                className="w-full text-left p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-night flex items-center justify-between transition text-xs font-bold text-stone-800 dark:text-stone-200"
              >
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-forest" />
                  <span>{t('market.sellerDirectory')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Floating Action Button for Voice Assistant */}
      <button
        onClick={() => setIsVoiceAssistantOpen(true)}
        className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-forest to-leaf hover:scale-105 active:scale-95 text-white p-3.5 rounded-full shadow-2xl border-2 border-harvest flex items-center justify-center animate-soft-pulse"
        title="Tap to speak with Tamil & Indic Voice AI"
      >
        <Sparkles className="w-6 h-6 text-harvest" />
      </button>

      {/* Interactive Global Modals */}
      <LanguageModal />
      <VoiceAssistantModal />
      <CropDoctorModal />
      <AnimalDoctorModal />
      <ProfitPlannerModal />
      <GroupSellingModal 
        isOpen={isGroupSellingOpen} 
        onClose={() => setIsGroupSellingOpen(false)} 
      />
      <EscrowPaymentModal 
        isOpen={isEscrowModalOpen} 
        onClose={() => {
          setIsEscrowModalOpen(false);
          setSelectedOrderForEscrow(null);
        }} 
        order={selectedOrderForEscrow}
      />
      <AddListingModal 
        isOpen={useApp().isAddListingOpen} 
        onClose={() => useApp().setIsAddListingOpen(false)} 
      />
      <VendorDirectoryModal 
        isOpen={isVendorDirectoryOpen} 
        onClose={() => setIsVendorDirectoryOpen(false)} 
      />

    </div>
  );
}
