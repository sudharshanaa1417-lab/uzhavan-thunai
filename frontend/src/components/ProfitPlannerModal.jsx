import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TN_PROFIT_CALENDAR } from '../data/profitCalendarTN';
import { Calendar, TrendingUp, X, Sparkles, CheckCircle2, ChevronRight, DollarSign } from 'lucide-react';

export default function ProfitPlannerModal() {
  const { isProfitPlannerOpen, setIsProfitPlannerOpen, t } = useApp();
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(0);

  if (!isProfitPlannerOpen) return null;

  const currentPlan = TN_PROFIT_CALENDAR[selectedMonthIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cream dark:bg-night-card border border-sage dark:border-night-border rounded-2xl max-w-2xl w-full p-5 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sage-light dark:border-night-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-harvest/20 flex items-center justify-center text-soil-dark dark:text-harvest">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-forest dark:text-leaf">
                {t('profitPlanner.title')}
              </h3>
              <p className="text-xs text-soil dark:text-stone-400">
                {t('profitPlanner.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProfitPlannerOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Month Selector Pills */}
        <div className="py-3 flex space-x-2 overflow-x-auto border-b border-sage-light dark:border-night-border pr-2">
          {TN_PROFIT_CALENDAR.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMonthIdx(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                selectedMonthIdx === idx
                  ? 'bg-forest text-white shadow-sm'
                  : 'bg-white dark:bg-night border border-stone-200 dark:border-night-border text-stone-700 dark:text-stone-300 hover:border-sage'
              }`}
            >
              {item.month}
            </button>
          ))}
        </div>

        {/* Month Detail View */}
        <div className="py-4 space-y-4 overflow-y-auto">
          
          {/* Season Highlights Banner */}
          <div className="bg-gradient-to-r from-forest to-leaf text-white p-4 rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-harvest">
                Tamil Season & Cycle
              </span>
              <h4 className="text-lg font-black mt-0.5">
                {currentPlan.month}
              </h4>
              <p className="text-xs text-leaf-light mt-0.5">
                {currentPlan.season}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/30 text-right">
              <span className="text-[10px] uppercase font-bold block text-harvest">Target Lift</span>
              <span className="text-base font-black">{currentPlan.profitMultiplier}</span>
            </div>
          </div>

          {/* Top High-Profit Crops for this Season */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-soil dark:text-stone-400 flex items-center gap-1.5">
              <span>🌾</span>
              <span>அதிக லாபம் தரும் பயிர்கள் (High Profit Crops)</span>
            </h5>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentPlan.topCrops.map((crop, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white dark:bg-night border border-sage-light dark:border-night-border shadow-xs">
                  <div className="font-bold text-sm text-forest dark:text-leaf">
                    {crop.name}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold mt-0.5">
                    Target: {crop.targetMarket}
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-snug">
                    💡 <span className="font-semibold">{crop.profitTip}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top High-Profit Livestock & Domestic Animals */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-soil dark:text-stone-400 flex items-center gap-1.5">
              <span>🐐</span>
              <span>அதிக லாபம் தரும் கால்நடைகள் (High Profit Livestock)</span>
            </h5>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentPlan.topLivestock.map((animal, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white dark:bg-night border border-sage-light dark:border-night-border shadow-xs">
                  <div className="font-bold text-sm text-soil dark:text-harvest">
                    {animal.name}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold mt-0.5">
                    Target: {animal.targetMarket}
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-snug">
                    💡 <span className="font-semibold">{animal.profitTip}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Farmer Strategic Action Blueprint */}
          <div className="p-3.5 rounded-xl bg-harvest/10 dark:bg-harvest/5 border border-harvest/40 text-xs text-soil-dark dark:text-harvest font-medium space-y-1">
            <div className="font-extrabold flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-harvest" />
              <span>வருடாந்திர லாபத்தை அதிகரிக்கும் செயல் திட்டம் (Action to Maximize Profit):</span>
            </div>
            <p className="text-stone-800 dark:text-stone-200 leading-relaxed">
              {currentPlan.actionsToMaximizeProfit}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-sage-light dark:border-night-border flex justify-end">
          <button
            onClick={() => setIsProfitPlannerOpen(false)}
            className="px-5 py-2 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest-700 shadow-sm"
          >
            {t('common.close')}
          </button>
        </div>

      </div>
    </div>
  );
}
