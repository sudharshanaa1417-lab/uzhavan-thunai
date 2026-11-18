import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Globe, 
  Moon, 
  Sun, 
  Wifi, 
  WifiOff, 
  Mic, 
  Store, 
  TrendingUp, 
  Stethoscope, 
  Users, 
  User, 
  Home,
  LogOut
} from 'lucide-react';

export default function Navbar() {
  const { 
    t, 
    language, 
    setIsLanguageModalOpen, 
    isDarkMode, 
    setIsDarkMode, 
    isOnline, 
    setIsVoiceAssistantOpen,
    activeTab,
    setActiveTab,
    userProfile,
    logoutUser
  } = useApp();

  return (
    <>
      {/* Top Header Bar with Glassmorphism */}
      <header className="sticky top-0 z-40 glass-nav transition-colors duration-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between">
          
          {/* Logo & Name */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-100 to-emerald-100 p-1 shadow-sm border border-white/60 dark:border-white/10 flex items-center justify-center">
              <img 
                src="/favicon.svg" 
                alt="Uzhavan Kutty Cute Mascot" 
                className="w-8 h-8 object-contain drop-shadow" 
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-lg text-emerald-900 dark:text-emerald-400 tracking-tight">
                  {t('appName')}
                </span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-400/30">
                  {userProfile ? userProfile.district : "TN"}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold line-clamp-1">
                {t('appTagline')}
              </p>
            </div>
          </div>

          {/* Action Icons: Language, Dark mode, Online, Voice AI, Logout */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Online / Offline Badge */}
            <div 
              title={isOnline ? t('common.onlineNotice') : t('common.offlineNotice')}
              className={`flex items-center px-2 py-1 rounded-full text-[11px] font-bold border ${
                isOnline 
                  ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-400/30' 
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 border-amber-400'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  <span className="hidden sm:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 mr-1 text-amber-600 animate-pulse" />
                  <span>Offline</span>
                </>
              )}
            </div>

            {/* Language Switcher Pill */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full glass-input hover:border-emerald-500 text-xs font-bold text-emerald-800 dark:text-emerald-300 transition-all shadow-xs"
              title="Change Language (10 Languages)"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{t('langName')}</span>
            </button>

            {/* Night Field Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full glass-input text-stone-700 dark:text-stone-300 hover:scale-105 transition"
              title="Toggle Night Field Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-800" />}
            </button>

            {/* Voice Assistant Floating Shortcut */}
            <button
              onClick={() => setIsVoiceAssistantOpen(true)}
              className="flex items-center space-x-1 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-3 py-1.5 rounded-full font-extrabold text-xs shadow-md shadow-emerald-600/20 animate-soft-pulse"
              title="Indic Voice Assistant"
            >
              <Mic className="w-4 h-4" />
              <span className="hidden md:inline">Voice AI</span>
            </button>

            {/* Switch Profile / Logout */}
            <button
              onClick={logoutUser}
              className="p-2 rounded-full glass-input text-stone-500 hover:text-rose-600 transition"
              title={t('auth.logout')}
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        </div>
      </header>

      {/* Bottom Mobile Tab Bar (Min 48px Touch Targets) with Glassmorphism */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-white/60 dark:border-white/10 shadow-xl">
        <div className="max-w-md mx-auto grid grid-cols-6 h-16">
          
          {/* Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center transition-colors min-h-[48px] ${
              activeTab === 'home' 
                ? 'text-emerald-700 dark:text-emerald-400 font-black' 
                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight truncate px-0.5">{t('nav.home')}</span>
          </button>

          {/* Smart Sell Advisor (Hero Feature) */}
          <button
            onClick={() => setActiveTab('advisor')}
            className={`flex flex-col items-center justify-center transition-colors min-h-[48px] relative ${
              activeTab === 'advisor' 
                ? 'text-emerald-700 dark:text-emerald-400 font-black' 
                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
            }`}
          >
            <div className="relative">
              <TrendingUp className="w-5 h-5 mb-0.5" />
              <span className="absolute -top-1 -right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </div>
            <span className="text-[10px] leading-tight truncate px-0.5">{t('nav.advisor')}</span>
          </button>

          {/* AI Doctor (Crop & Animal Clinic) */}
          <button
            onClick={() => setActiveTab('doctor')}
            className={`flex flex-col items-center justify-center transition-colors min-h-[48px] ${
              activeTab === 'doctor' 
                ? 'text-emerald-700 dark:text-emerald-400 font-black' 
                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
            }`}
          >
            <Stethoscope className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight truncate px-0.5">{t('nav.doctor')}</span>
          </button>

          {/* Market Prices (District Mandi Explorer) */}
          <button
            onClick={() => setActiveTab('market')}
            className={`flex flex-col items-center justify-center transition-colors min-h-[48px] ${
              activeTab === 'market' 
                ? 'text-emerald-700 dark:text-emerald-400 font-black' 
                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
            }`}
          >
            <Store className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight truncate px-0.5">{t('nav.market')}</span>
          </button>

          {/* Group Sell / FPO */}
          <button
            onClick={() => setActiveTab('fpo')}
            className={`flex flex-col items-center justify-center transition-colors min-h-[48px] ${
              activeTab === 'fpo' 
                ? 'text-emerald-700 dark:text-emerald-400 font-black' 
                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
            }`}
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight truncate px-0.5">{t('nav.fpo')}</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center transition-colors min-h-[48px] ${
              activeTab === 'profile' 
                ? 'text-emerald-700 dark:text-emerald-400 font-black' 
                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
            }`}
          >
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight truncate px-0.5">{t('nav.profile')}</span>
          </button>

        </div>
      </nav>
    </>
  );
}
