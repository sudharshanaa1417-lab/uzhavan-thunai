import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Warehouse, Phone, Thermometer, ShieldAlert, ArrowRight } from 'lucide-react';
import { TN_COLD_STORAGES } from '../data/coldStoragesTN';

export default function SpoilageClockCard() {
  const { t, userProfile } = useApp();

  // Simulated countdown timer for perishable tomatoes (starts at 54 hours 18 mins)
  const [timeLeft, setTimeLeft] = useState({
    hours: 54,
    minutes: 18,
    seconds: 40
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Nearest Cold Storage to user's district
  const nearestStorage = TN_COLD_STORAGES[0]; // Dindigul Regulated Market Cold Storage

  return (
    <div className="bg-white dark:bg-night-card border border-sage/60 dark:border-night-border rounded-2xl p-4 sm:p-5 shadow-soft transition-all duration-200">
      
      {/* Title Header */}
      <div className="flex items-center justify-between pb-3 border-b border-sage-light dark:border-night-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-800 dark:text-amber-200">
            <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-forest dark:text-leaf">
              {t('spoilage.title')}
            </h3>
            <span className="text-[11px] text-soil dark:text-stone-400">
              தக்காளி & அழுகும் பயிர்கள் ஆயுட்காலம்
            </span>
          </div>
        </div>

        {/* Ambient weather indicator */}
        <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-cream-paper dark:bg-night border border-sage/50 text-[11px] font-semibold text-stone-600 dark:text-stone-300">
          <Thermometer className="w-3.5 h-3.5 text-amber-600" />
          <span>31°C · 74% RH</span>
        </div>
      </div>

      {/* Countdown Digits */}
      <div className="my-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold uppercase text-amber-900 dark:text-amber-300 block">
            {t('spoilage.hoursLeft')} (Tomato Batch #401):
          </span>
          <div className="flex items-center space-x-2 mt-1">
            <div className="bg-white dark:bg-night px-2.5 py-1 rounded-lg border border-amber-300 font-black text-xl text-amber-900 dark:text-amber-200 shadow-sm">
              {String(timeLeft.hours).padStart(2, '0')}
              <span className="text-[10px] font-normal ml-0.5">h</span>
            </div>
            <span className="font-black text-amber-700">:</span>
            <div className="bg-white dark:bg-night px-2.5 py-1 rounded-lg border border-amber-300 font-black text-xl text-amber-900 dark:text-amber-200 shadow-sm">
              {String(timeLeft.minutes).padStart(2, '0')}
              <span className="text-[10px] font-normal ml-0.5">m</span>
            </div>
            <span className="font-black text-amber-700">:</span>
            <div className="bg-white dark:bg-night px-2.5 py-1 rounded-lg border border-amber-300 font-black text-xl text-amber-900 dark:text-amber-200 shadow-sm">
              {String(timeLeft.seconds).padStart(2, '0')}
              <span className="text-[10px] font-normal ml-0.5">s</span>
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="inline-block px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-200 font-bold text-xs">
            {t('spoilage.safeHours', { hours: timeLeft.hours })}
          </span>
          <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">
            Move to cold store if holding beyond 48 hours
          </p>
        </div>
      </div>

      {/* Nearest Cold Storage Info */}
      <div className="p-3.5 rounded-xl bg-forest/5 dark:bg-leaf/10 border border-leaf/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-forest dark:text-leaf">
            <Warehouse className="w-4 h-4 text-forest dark:text-leaf" />
            <span>{t('home.nearestColdStorage')} (18 km)</span>
          </div>
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
            {nearestStorage.availableTonnes}T Vacant
          </span>
        </div>

        <div>
          <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
            {nearestStorage.name}
          </h4>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            {nearestStorage.location} · ₹{nearestStorage.costPerKgPerMonth}/kg/month
          </p>
        </div>

        <div className="pt-1 flex items-center justify-between">
          <span className="text-[11px] font-medium text-stone-600 dark:text-stone-300">
            Contact: {nearestStorage.contactPerson}
          </span>
          <a
            href={`tel:${nearestStorage.phone}`}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-forest hover:bg-forest-700 text-white font-bold text-xs shadow-sm transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call & Book</span>
          </a>
        </div>
      </div>

    </div>
  );
}
