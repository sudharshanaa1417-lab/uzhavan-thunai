import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import LoginScreen from './components/LoginScreen';
import LanguageModal from './components/LanguageModal';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import SmartSellAdvisorCard from './components/SmartSellAdvisorCard';
import CropDoctorModal from './components/CropDoctorModal';
import AnimalDoctorModal from './components/AnimalDoctorModal';
import DistrictMandiExplorer from './components/DistrictMandiExplorer';
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
  Clock, 
  ChevronRight, 
  Store,
  UserCheck,
  Award,
  LogOut,
  MapPin
} from 'lucide-react';

export default function App() {
  const { 
    t, 
    activeTab, 
    setActiveTab, 
    userProfile, 
    logoutUser,
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

  // If user is not logged in, show the dedicated Glassmorphic Login/Onboarding screen!
  if (!userProfile) {
    return (
      <>
        <LoginScreen />
        <LanguageModal />
      </>
    );
  }

  // Filter listings
  const filteredListings = marketFilter === 'all'
    ? listings
    : listings.filter(l => l.category === marketFilter);

  return (
    <div className="min-h-screen bg-glass-nature text-stone-900 dark:text-stone-100 pb-24 transition-colors duration-200">
      
      {/* Top Glass App Bar */}
      <Navbar />

      {/* Main Glassmorphic Container */}
      <main className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-6">
        
        {/* =========================================================================
            TAB 1: HOME
           ========================================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Farmer Welcome & Extra Earnings Glass Card */}
            <div className="glass-card rounded-3xl p-5 sm:p-6 shadow-elevated border border-white/60 dark:border-white/10 relative overflow-hidden">
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-extrabold text-[11px] uppercase tracking-wider border border-emerald-400/30">
                      {userProfile.district} District
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-semibold">
                      {t('home.locationBadge')}
                    </span>
                  </div>

                  {/* Proper localized greeting with ZERO language mixing */}
                  <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-50 mt-1">
                    {t('home.greeting')}, {userProfile.name}!
                  </h1>

                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-medium">
                    {userProfile.village} · {userProfile.landAcres} Acres · {userProfile.crops.join(", ")}
                  </p>
                </div>

                {/* Extra Profit Highlight Glass Badge */}
                <div className="glass-input p-3.5 rounded-2xl text-left sm:text-right min-w-[200px] border border-white/70 dark:border-white/10 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block">
                    {t('home.extraEarningsBanner')}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                    +₹{userProfile.extraEarningsTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-0.5">
                    Measured vs Middleman Offers
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Grid (Big readable touch targets) */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {t('home.quickActions')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                
                {/* 1. Add Produce / Animal */}
                <button
                  onClick={() => setIsAddListingOpen(true)}
                  className="glass-card flex flex-col items-center justify-center p-3.5 rounded-2xl hover:border-emerald-500 text-center transition hover:-translate-y-0.5 min-h-[88px] border border-white/60 dark:border-white/10"
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-2 shadow-xs">
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
                  className="glass-card flex flex-col items-center justify-center p-3.5 rounded-2xl hover:border-emerald-500 text-center transition hover:-translate-y-0.5 min-h-[88px] border border-white/60 dark:border-white/10"
                >
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-400 mb-2 shadow-xs">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-xs text-stone-800 dark:text-stone-100">
                    {t('home.sellAdvisor')}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    Net Profit Calculator
                  </span>
                </button>

                {/* 3. AI Health Clinic (Crop & Vet) */}
                <button
                  onClick={() => setActiveTab('doctor')}
                  className="glass-card flex flex-col items-center justify-center p-3.5 rounded-2xl hover:border-emerald-500 text-center transition hover:-translate-y-0.5 min-h-[88px] border border-white/60 dark:border-white/10"
                >
                  <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950/60 flex items-center justify-center text-teal-700 dark:text-teal-400 mb-2 shadow-xs">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-xs text-stone-800 dark:text-stone-100">
                    {t('home.aiDoctor')}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">
                    Produce & Vet Clinic
                  </span>
                </button>

                {/* 4. Group Transport Pool */}
                <button
                  onClick={() => setIsGroupSellingOpen(true)}
                  className="glass-card flex flex-col items-center justify-center p-3.5 rounded-2xl hover:border-emerald-500 text-center transition hover:-translate-y-0.5 min-h-[88px] border border-white/60 dark:border-white/10"
                >
                  <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950/60 flex items-center justify-center text-sky-700 dark:text-sky-400 mb-2 shadow-xs">
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

            {/* HERO FEATURE: Smart Sell Advisor Glass Card */}
            <SmartSellAdvisorCard />

            {/* Spoilage Clock Card */}
            <SpoilageClockCard />

            {/* Live Price Highlights & Forecast */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                    {t('home.liveMandiPrices')}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {t('home.govtApproved')}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('market')}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center hover:underline"
                >
                  <span>{t('home.viewAll')}</span>
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>

              {/* Commodity Pills */}
              <div className="flex space-x-2 overflow-x-auto pb-1">
                {COMMODITIES_DATA.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCommodity(c)}
                    className={`px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 border ${
                      selectedCommodity.id === c.id
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-md shadow-emerald-700/20'
                        : 'glass-input text-stone-800 dark:text-stone-200 hover:border-emerald-400'
                    }`}
                  >
                    <span>{c.name.split(" ")[0]}</span>
                    <span className="opacity-90">₹{c.modalPrice}/{c.unit}</span>
                  </button>
                ))}
              </div>

              {/* 7-Day Price Forecast Chart */}
              <PriceForecastChart commodity={selectedCommodity} />
            </div>

            {/* Registered Vendors Discovery Banner */}
            <div className="glass-card rounded-3xl p-5 border border-white/60 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-soft">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-amber-700 dark:text-amber-400 tracking-wider">
                  Tamil Nadu Registered Farmers & Vendors
                </span>
                <h4 className="text-base font-extrabold text-stone-900 dark:text-stone-100 mt-0.5">
                  {t('market.sellerDirectory')}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                  Discover verified farmers, fresh milk producers, and livestock breeders across all districts.
                </p>
              </div>
              <button
                onClick={() => setIsVendorDirectoryOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md self-start sm:self-auto whitespace-nowrap transition hover:scale-105"
              >
                View Directory
              </button>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: SMART SELL ADVISOR
           ========================================================================= */}
        {activeTab === 'advisor' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="glass-card p-5 rounded-3xl border border-white/60 dark:border-white/10 shadow-soft">
              <h2 className="text-xl font-black text-stone-900 dark:text-stone-100">
                {t('advisor.title')}
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                {t('advisor.subtitle')}. Compares Koyambedu, Oddanchatram, Mettupalayam, and Uzhavar Sandhais with real distance-based freight and commission deductions.
              </p>
            </div>

            <SmartSellAdvisorCard />
          </div>
        )}

        {/* =========================================================================
            TAB 3: AI DOCTOR (PRODUCE & VET HEALTH CLINIC)
           ========================================================================= */}
        {activeTab === 'doctor' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="glass-card p-5 rounded-3xl border border-white/60 dark:border-white/10 shadow-soft">
              <h2 className="text-xl font-black text-stone-900 dark:text-stone-100">
                {t('doctor.title')}
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Upload or capture photos to diagnose crop rot, pest damage, and livestock wounds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Crop Clinic */}
              <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-white/10 shadow-soft flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shadow-xs">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-base text-stone-900 dark:text-stone-100">
                    {t('doctor.cropTab')}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
                    Upload or take a live camera snap of fruits, vegetables, or eggs. AI analyzes whether it is healthy or diseased. If diseased, it prescribes remedies; otherwise it confirms peak freshness.
                  </p>
                </div>
                <button
                  onClick={() => setIsCropDoctorOpen(true)}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition hover:scale-[1.01]"
                >
                  Open Crop Clinic Scanner
                </button>
              </div>

              {/* Animal Clinic */}
              <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-white/10 shadow-soft flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-400 shadow-xs">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-base text-stone-900 dark:text-stone-100">
                    {t('doctor.animalTab')}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
                    Upload or capture a photo of cattle, goats, sheep, or country poultry. Evaluates wound severity and provides Traditional Tamil Nattu Vaithiyam remedies + veterinary medicines.
                  </p>
                </div>
                <button
                  onClick={() => setIsAnimalDoctorOpen(true)}
                  className="w-full py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs shadow-md shadow-amber-700/20 transition hover:scale-[1.01]"
                >
                  Open Animal Clinic Scanner
                </button>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: MARKET PRICES (DISTRICT-WISE MANDI EXPLORER)
           ========================================================================= */}
        {activeTab === 'market' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Comprehensive District-wise Mandi Explorer Component */}
            <DistrictMandiExplorer />

            {/* Direct Marketplace Listings */}
            <div className="space-y-4 pt-4 border-t border-stone-200/60 dark:border-stone-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-stone-900 dark:text-stone-100">
                    Direct Farmer Trade & Listings
                  </h3>
                  <p className="text-xs text-stone-500">
                    Buy and sell crops, domestic animals, milk, and eggs with UPI Escrow protection
                  </p>
                </div>
                <button
                  onClick={() => setIsAddListingOpen(true)}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-sm hover:bg-emerald-700"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t('home.addProduce')}</span>
                </button>
              </div>

              {/* Grid of Listings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {listings.map(listing => (
                  <div
                    key={listing.id}
                    className="glass-card rounded-3xl overflow-hidden border border-white/60 dark:border-white/10 shadow-soft flex flex-col justify-between hover:shadow-elevated transition"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-black uppercase shadow-xs">
                            Grade {listing.qualityGrade}
                          </span>
                          {listing.isVetCertified && (
                            <span className="px-2.5 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-black shadow-xs">
                              ✓ Vet Certified
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-2 right-2 px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md text-white font-black text-sm">
                          ₹{listing.pricePerUnit} / {listing.unit}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="font-black text-base text-stone-900 dark:text-stone-100 line-clamp-1">
                          {listing.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-[11px] text-stone-500">
                          <span>{listing.village}, {listing.district}</span>
                          <span>•</span>
                          <span>Qty: <strong>{listing.quantity} {listing.unit}</strong></span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                          {listing.description}
                        </p>

                        <FairPriceMeter
                          offerPrice={listing.pricePerUnit}
                          modalPrice={listing.govtApprovedPrice}
                          mspPrice={Math.round(listing.govtApprovedPrice * 0.85)}
                          unit={listing.unit}
                        />
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-between border-t border-stone-200/50 dark:border-stone-800 mt-2 pt-3">
                      <a
                        href={`tel:${listing.phone}`}
                        className="flex items-center space-x-1 text-xs font-bold text-stone-700 dark:text-stone-300 hover:text-emerald-700"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
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
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-xs"
                      >
                        Order (UPI Escrow)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 5: FPO GROUP SELLING
           ========================================================================= */}
        {activeTab === 'fpo' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="glass-card p-5 rounded-3xl border border-white/60 dark:border-white/10 shadow-soft">
              <h2 className="text-xl font-black text-stone-900 dark:text-stone-100">
                {t('fpo.title')}
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                {t('fpo.subtitle')}
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-white/60 dark:border-white/10 shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
                  FPO Logistics Savings
                </span>
                <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 mt-0.5">
                  Shared Freight Pooling
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-md leading-relaxed">
                  Fill empty return trucks with neighbor farmers to reduce transport expenditure from ₹4.20/kg down to ₹1.40/kg.
                </p>
              </div>
              <button
                onClick={() => setIsGroupSellingOpen(true)}
                className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md self-start sm:self-auto transition hover:scale-105"
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
            
            <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-white/10 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-emerald-100 border border-white/60 dark:border-white/20 flex items-center justify-center text-emerald-800 font-black text-2xl shadow-sm">
                    {userProfile.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-black text-lg text-stone-900 dark:text-stone-100">
                        {userProfile.name}
                      </h3>
                      <span className="flex items-center text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-extrabold border border-emerald-300">
                        <ShieldCheck className="w-3 h-3 mr-0.5" />
                        Verified
                      </span>
                    </div>
                    <span className="text-xs text-stone-600 dark:text-stone-400 font-semibold block mt-0.5">
                      {userProfile.village}, {userProfile.district} District
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      {userProfile.phone} · Role: {userProfile.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={logoutUser}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl glass-input text-xs font-bold text-rose-600 hover:bg-rose-50"
                  title="Switch Account / Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t('auth.logout')}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-stone-200/50 dark:border-stone-800 text-center">
                <div className="p-3 rounded-2xl glass-input">
                  <span className="text-[10px] text-stone-500 block uppercase font-bold">Land</span>
                  <span className="text-base font-black text-stone-900 dark:text-stone-100">{userProfile.landAcres} Acres</span>
                </div>
                <div className="p-3 rounded-2xl glass-input">
                  <span className="text-[10px] text-stone-500 block uppercase font-bold">Crops</span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{userProfile.crops.length} Types</span>
                </div>
                <div className="p-3 rounded-2xl glass-input">
                  <span className="text-[10px] text-stone-500 block uppercase font-bold">Livestock</span>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{userProfile.livestock.length} Heads</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-white/60 dark:border-white/10 shadow-elevated space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {t('home.extraEarningsBanner')}
                </span>
                <span className="text-[10px] glass-input px-2.5 py-0.5 rounded-full font-bold">
                  FY 2026-27
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400">
                ₹{userProfile.extraEarningsTotal.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
                Verified extra income earned by using Uzhavan Thunai's Smart Sell Advisor & FPO freight pooling.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-4 space-y-2 border border-white/60 dark:border-white/10">
              <button
                onClick={() => setIsProfitPlannerOpen(true)}
                className="w-full text-left p-3 rounded-2xl hover:bg-white/60 dark:hover:bg-black/30 flex items-center justify-between transition text-xs font-bold text-stone-800 dark:text-stone-200"
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{t('profitPlanner.title')}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => setIsVendorDirectoryOpen(true)}
                className="w-full text-left p-3 rounded-2xl hover:bg-white/60 dark:hover:bg-black/30 flex items-center justify-between transition text-xs font-bold text-stone-800 dark:text-stone-200"
              >
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
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
        className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-emerald-600 to-teal-700 hover:scale-105 active:scale-95 text-white p-3.5 rounded-full shadow-2xl border-2 border-white/70 flex items-center justify-center animate-soft-pulse"
        title="Tap to speak with Voice AI"
      >
        <Sparkles className="w-6 h-6 text-amber-300" />
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
