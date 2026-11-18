import React, { createContext, useContext, useState, useEffect } from 'react';
import taJson from '../locales/ta.json';
import enJson from '../locales/en.json';
import hiJson from '../locales/hi.json';
import teJson from '../locales/te.json';
import knJson from '../locales/kn.json';
import mlJson from '../locales/ml.json';
import mrJson from '../locales/mr.json';
import bnJson from '../locales/bn.json';
import guJson from '../locales/gu.json';
import paJson from '../locales/pa.json';

import { INITIAL_LISTINGS } from '../data/seedListings';

const TRANSLATIONS = {
  ta: taJson,
  en: enJson,
  hi: hiJson,
  te: teJson,
  kn: knJson,
  ml: mlJson,
  mr: mrJson,
  bn: bnJson,
  gu: guJson,
  pa: paJson,
};

const AppContext = createContext();

export function AppProvider({ children }) {
  // Language state (Default: English)
  const [language, setLanguageState] = useState(() => {
    const version = localStorage.getItem('ut_lang_v');
    if (version !== '2') {
      localStorage.setItem('ut_lang_v', '2');
      localStorage.setItem('ut_lang', 'en');
      return 'en';
    }
    return localStorage.getItem('ut_lang') || 'en';
  });

  const setLanguage = (langCode) => {
    if (TRANSLATIONS[langCode]) {
      setLanguageState(langCode);
      localStorage.setItem('ut_lang', langCode);
      document.documentElement.lang = langCode;
    }
  };

  // Dark mode (Night Field mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('ut_dark_mode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ut_dark_mode', isDarkMode);
  }, [isDarkMode]);

  // Online / Offline Detection
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // User Profile & Authentication State
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ut_user_auth');
    if (saved) {
      try { return JSON.parse(saved); } catch(e){}
    }
    return null; // Require login page when first opened!
  });

  const loginUser = (profileData) => {
    const user = {
      ...profileData,
      id: `usr-${Date.now()}`,
      extraEarningsTotal: 18450,
      isVerified: true
    };
    setUserProfile(user);
    localStorage.setItem('ut_user_auth', JSON.stringify(user));
  };

  const logoutUser = () => {
    setUserProfile(null);
    localStorage.removeItem('ut_user_auth');
  };

  // Active Listings
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('ut_listings');
    if (saved) {
      try { return JSON.parse(saved); } catch(e){}
    }
    return INITIAL_LISTINGS;
  });

  const addListing = (newListing) => {
    const item = {
      ...newListing,
      id: `list-${Date.now()}`,
      sellerName: userProfile ? userProfile.name : "Farmer",
      phone: userProfile ? userProfile.phone : "+91 94400 00000",
      district: userProfile ? userProfile.district : "Dindigul",
      isVerifiedSeller: true,
      bids: []
    };
    const updated = [item, ...listings];
    setListings(updated);
    localStorage.setItem('ut_listings', JSON.stringify(updated));
    return item;
  };

  // Escrow Payments Sandbox
  const [escrowOrders, setEscrowOrders] = useState([
    {
      id: "esc-101",
      listingTitle: "Oddanchatram Grade-A Hybrid Tomatoes (1200 kg)",
      buyerName: "Koyambedu Fresh Traders",
      sellerName: "Selvaraj K.",
      totalAmount: 45600,
      status: "held",
      createdAt: "Today 10:15 AM",
      inspectionDone: false
    }
  ]);

  const releaseEscrow = (orderId) => {
    setEscrowOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: "released", inspectionDone: true };
      }
      return o;
    }));
  };

  // Navigation tab
  const [activeTab, setActiveTab] = useState('home');

  // Modals state
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isCropDoctorOpen, setIsCropDoctorOpen] = useState(false);
  const [isAnimalDoctorOpen, setIsAnimalDoctorOpen] = useState(false);
  const [isProfitPlannerOpen, setIsProfitPlannerOpen] = useState(false);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);
  const [isVendorDirectoryOpen, setIsVendorDirectoryOpen] = useState(false);

  // i18n Translation helper with path lookup and parameter replacement
  const t = (path, params = {}) => {
    const currentPack = TRANSLATIONS[language] || TRANSLATIONS.ta;
    const parts = path.split('.');
    let val = currentPack;

    for (const p of parts) {
      if (val && typeof val === 'object' && p in val) {
        val = val[p];
      } else {
        // Fallback to English, then Tamil
        let fallbackVal = TRANSLATIONS.en;
        for (const fp of parts) {
          if (fallbackVal && typeof fallbackVal === 'object' && fp in fallbackVal) {
            fallbackVal = fallbackVal[fp];
          } else {
            fallbackVal = null;
            break;
          }
        }
        val = fallbackVal || path;
        break;
      }
    }

    if (typeof val === 'string') {
      let result = val;
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(new RegExp(`{{${k}}}`, 'g'), v);
      }
      return result;
    }
    return val || path;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isDarkMode,
        setIsDarkMode,
        isOnline,
        userProfile,
        setUserProfile,
        loginUser,
        logoutUser,
        listings,
        addListing,
        escrowOrders,
        releaseEscrow,
        activeTab,
        setActiveTab,
        isVoiceAssistantOpen,
        setIsVoiceAssistantOpen,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isCropDoctorOpen,
        setIsCropDoctorOpen,
        isAnimalDoctorOpen,
        setIsAnimalDoctorOpen,
        isProfitPlannerOpen,
        setIsProfitPlannerOpen,
        isAddListingOpen,
        setIsAddListingOpen,
        isEscrowModalOpen,
        setIsEscrowModalOpen,
        isVendorDirectoryOpen,
        setIsVendorDirectoryOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
