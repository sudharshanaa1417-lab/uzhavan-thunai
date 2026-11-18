import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, X } from 'lucide-react';

export const SUPPORTED_LANGUAGES = [
  { code: 'ta', name: 'தமிழ்', script: 'Tamil', nativeSpeakerCheck: 'Native Tamil Agri Experts (Tamil Nadu)' },
  { code: 'en', name: 'English', script: 'Latin', nativeSpeakerCheck: 'Indian English Agri Terminology' },
  { code: 'hi', name: 'हिन्दी', script: 'Devanagari', nativeSpeakerCheck: 'North & Central Mandi Standard' },
  { code: 'te', name: 'తెలుగు', script: 'Telugu', nativeSpeakerCheck: 'Andhra & Telangana Agri Standard' },
  { code: 'kn', name: 'ಕನ್ನಡ', script: 'Kannada', nativeSpeakerCheck: 'Karnataka APMC Standard' },
  { code: 'ml', name: 'മലയാളം', script: 'Malayalam', nativeSpeakerCheck: 'Kerala Agri & Rubber/Spice Board' },
  { code: 'mr', name: 'मराठी', script: 'Devanagari', nativeSpeakerCheck: 'Maharashtra Mandi Standard' },
  { code: 'bn', name: 'বাংলা', script: 'Bengali', nativeSpeakerCheck: 'Bengal & Eastern Agri Standard' },
  { code: 'gu', name: 'ગુજરાતી', script: 'Gujarati', nativeSpeakerCheck: 'Gujarat APMC & Dairy Standard' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', nativeSpeakerCheck: 'Punjab Mandi Board Standard' }
];

export default function LanguageModal() {
  const { isLanguageModalOpen, setIsLanguageModalOpen, language, setLanguage, t } = useApp();

  if (!isLanguageModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cream dark:bg-night-card border border-sage dark:border-night-border rounded-2xl max-w-md w-full p-5 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sage-light dark:border-night-border">
          <div>
            <h3 className="font-bold text-lg text-forest dark:text-leaf">
              மொழியைத் தேர்ந்தெடுக்கவும் / Select Language
            </h3>
            <p className="text-xs text-soil dark:text-stone-400">
              10 Indian Languages · A to Z Complete Translation
            </p>
          </div>
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-2 gap-2.5 py-4 overflow-y-auto pr-1">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsLanguageModalOpen(false);
                }}
                className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-150 relative min-h-[56px] ${
                  isSelected
                    ? 'bg-forest/10 dark:bg-leaf/20 border-forest dark:border-leaf shadow-sm'
                    : 'bg-white dark:bg-night border-stone-200 dark:border-night-border hover:border-sage'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-base font-bold ${isSelected ? 'text-forest dark:text-leaf' : 'text-stone-800 dark:text-stone-100'}`}>
                    {lang.name}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-forest dark:text-leaf" />}
                </div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  {lang.script}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="pt-3 border-t border-sage-light dark:border-night-border text-center">
          <p className="text-[11px] text-stone-600 dark:text-stone-400">
            ✓ Noto Sans Script Typography · Native-Speaker Reviewed
          </p>
        </div>

      </div>
    </div>
  );
}
