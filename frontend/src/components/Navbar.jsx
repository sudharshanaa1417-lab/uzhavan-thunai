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
  Home 
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
    userProfile
  } = useApp();

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-cream-paper/95 dark:bg-night-card/95 backdrop-blur-md border-b border-sage-light dark:border-night-border transition-colors duration-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between">
          
          {/* Logo & Name */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center p-1 shadow-md border-2 border-harvest">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-full h-full">
                <circle cx="50" cy="50" r="46" fill="#1B5E20"/>
                <path d="M18 72 C32 64, 68 64, 82 72 C74 82, 63 88, 50 88 C37 88, 26 82, 18 72 Z" fill="#6D4C41"/>
                <circle cx="50" cy="40" r="16" fill="#F2B544"/>
                <path d="M50 70 Q50 48 50 32" stroke="#FAF6EC" strokeWidth="4.5" strokeLinecap="round"/>
                <path d="M50 50 C36 46, 26 34, 32 22 C44 26, 48 38, 50 46" fill="#81C784"/>
                <path d="M50 42 C64 38, 74 26, 68 14 C56 18, 52 30, 50 38" fill="#4CAF50"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-lg text-forest dark:text-leaf tracking-tight">
                  {t('appName')}
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-harvest/20 text-soil dark:text-harvest border border-harvest/40">
                  TN Agri
                </span>
              </div>
              <p className="text-[11px] text-soil dark:text-stone-400 font-medium line-clamp-1">
                {userProfile.district} · {t('appTagline')}
              </p>
            </div>
          </div>

          {/* Action Icons: Language, Dark mode, Online, Voice AI */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Online/Offline Badge */}
            <div 
              title={isOnline ? t('common.onlineNotice') : t('common.offlineNotice')}
              className={`flex items-center px-2 py-1 rounded-full text-[11px] font-semibold border ${
                isOnline 
                  ? 'bg-leaf/15 text-forest dark:text-leaf-light border-leaf/30' 
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 border-amber-400'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 mr-1 text-leaf" />
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
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-pill bg-cream dark:bg-night border border-sage dark:border-night-border hover:border-forest text-xs font-bold text-forest dark:text-leaf transition-all shadow-sm"
              title="Change Language (10 Languages)"
            >
              <Globe className="w-4 h-4 text-forest dark:text-leaf" />
              <span className="font-semibold">{t('langName')}</span>
            </button>

            {/* Night Field Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition"
              title="Toggle Night Field Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-harvest" /> : <Moon className="w-4 h-4 text-soil" />}
            </button>

            {/* Voice Assistant Floating Action Button Header shortcut */}
            <button
              onClick={() => setIsVoiceAssistantOpen(true)}
              className="flex items-center space-x-1 bg-gradient-to-r from-forest to-leaf hover:from-forest-700 hover:to-forest text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-md shadow-forest/20 animate-soft-pulse"
              title="Tamil & Indic Voice Assistant"
            >
              <Mic className="w-4 h-4" />
              <span className="hidden md:inline">Voice AI</span>
            </button>

          </div>
        </div>
      </header>

      {/* Bottom Mobile Tab Bar (Min 48px Touch Targets) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-cream-paper/95 dark:bg-night-card/95 backdrop-blur-md border-t border-sage-light dark:border-night-border shadow-lg">
        <div className="max-w-md mx-auto grid grid-cols-6 h-16">
          
          {/* Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center transition-colors min-h-[48px] ${
              activeTab === 'home' 
                ? 'text-forest dark:text-leaf font-bold' 
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
                ? 'text-forest dark:text-leaf font-bold' 
                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
            }`}
          >
            <div className="relative">
              <TrendingUp className="w-5 h-5 mb-0.5" />
              <span className="absolute -top-1 -right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-harvest opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-harvest"></span>
              </span>
            </div>
            <span className="text-[10px] leading-tight truncate px-0.5">{t('nav.advisor')}</span>
          </button>

          {/* AI Doctor (Crop & Vet) */}
          <button
            onClick={() => setActiveTab('doctor')}
            className={`flex flex-col items-center justify-center transition-colors min-h-[48px] ${
              activeTab === 'doctor' 
                ? 'text-forest dark:text-leaf font-bold' 
                : 'text-stone-500 hover:text-stone-800 dark:text-stone-400'
            }`}
          >
            <Stethoscope className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight truncate px-0.5">{t('nav.doctor')}</span>
          </button>

          {/* Marketplace */}
          <button
            onClick={() => setActiveTab('market')}
            className={`flex flex-col items-center justify-center transition-colors min-h-[48px] ${
              activeTab === 'market' 
                ? 'text-forest dark:text-leaf font-bold' 
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
                ? 'text-forest dark:text-leaf font-bold' 
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
                ? 'text-forest dark:text-leaf font-bold' 
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
