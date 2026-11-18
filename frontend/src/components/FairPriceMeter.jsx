import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function FairPriceMeter({ offerPrice, modalPrice, mspPrice, unit }) {
  const { t } = useApp();

  const ratio = offerPrice / (modalPrice || 1);
  const percentageOfMandi = Math.round(ratio * 100);

  let status = 'fair'; // low | fair | high
  let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  let meterWidth = '50%';
  let warningMessage = t('market.fairOffer');

  if (ratio < 0.85) {
    status = 'low';
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
    meterWidth = `${Math.max(15, percentageOfMandi * 0.4)}%`;
    warningMessage = t('market.lowOffer');
  } else if (ratio > 1.05) {
    status = 'high';
    badgeColor = 'bg-harvest/30 text-soil-dark border-harvest';
    meterWidth = '92%';
    warningMessage = t('market.highOffer');
  } else {
    meterWidth = `${Math.min(80, percentageOfMandi * 0.65)}%`;
  }

  return (
    <div className="bg-cream-paper dark:bg-night-card border border-sage/60 dark:border-night-border rounded-xl p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-soil dark:text-stone-400">
          {t('market.fairPriceMeter')}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold border ${badgeColor}`}>
          {percentageOfMandi}% of Mandi Rate
        </span>
      </div>

      {/* Progress Bar Gauge */}
      <div className="w-full bg-stone-200 dark:bg-night-border rounded-full h-2.5 overflow-hidden relative">
        <div 
          className={`h-full transition-all duration-300 rounded-full ${
            status === 'low' 
              ? 'bg-rose-600' 
              : status === 'high' 
                ? 'bg-gradient-to-r from-forest to-harvest' 
                : 'bg-leaf'
          }`}
          style={{ width: meterWidth }}
        />
      </div>

      {/* Benchmarks Row */}
      <div className="flex justify-between text-[10px] text-stone-500 dark:text-stone-400 font-semibold">
        <span>MSP: ₹{mspPrice}/{unit}</span>
        <span>Avg Mandi: ₹{modalPrice}/{unit}</span>
        <span>Offer: ₹{offerPrice}/{unit}</span>
      </div>

      {/* Warning message if exploitative */}
      {status === 'low' ? (
        <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 pt-0.5">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{warningMessage} (₹{modalPrice - offerPrice}/{unit} below fair market price!)</span>
        </div>
      ) : (
        <div className="flex items-center space-x-1.5 text-xs font-bold text-forest dark:text-leaf pt-0.5">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{warningMessage}</span>
        </div>
      )}
    </div>
  );
}
