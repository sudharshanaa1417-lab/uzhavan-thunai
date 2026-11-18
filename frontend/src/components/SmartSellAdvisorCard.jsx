import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { COMMODITIES_DATA } from '../data/priceIntelligence';
import { TAMIL_NADU_MANDIS, TAMIL_NADU_DISTRICTS, VEHICLE_OPTIONS } from '../data/marketsData';
import { TrendingUp, Truck, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Calendar, Sparkles } from 'lucide-react';

export default function SmartSellAdvisorCard() {
  const { t, userProfile, setIsProfitPlannerOpen, setActiveTab } = useApp();

  const [selectedCropId, setSelectedCropId] = useState('tomato');
  const [quantity, setQuantity] = useState(1200); // 1200 kg
  const [district, setDistrict] = useState(userProfile.district || 'Dindigul');
  const [useSharedPool, setUseSharedPool] = useState(true); // FPO Shared transport discount

  const selectedCrop = useMemo(() => {
    return COMMODITIES_DATA.find(c => c.id === selectedCropId) || COMMODITIES_DATA[0];
  }, [selectedCropId]);

  // Compute Net Profit for each Tamil Nadu mandi
  const marketAnalyses = useMemo(() => {
    const isAnimal = selectedCrop.category === 'livestock';
    const isPerHead = selectedCrop.unit === 'head';
    
    // Total weight estimate for transport
    let totalWeightKg = quantity;
    if (isPerHead) {
      totalWeightKg = quantity * 300; // Average cattle weight kg
    } else if (selectedCrop.unit === 'quintal') {
      totalWeightKg = quantity * 100;
    }

    // Baseline local farm-gate price (local middleman usually pays 20-30% below mandi)
    const localMiddlemanPrice = Math.round(selectedCrop.modalPrice * 0.76);
    const localGross = localMiddlemanPrice * quantity;

    return TAMIL_NADU_MANDIS.map(mandi => {
      const distance = mandi.distanceKm[district] || mandi.distanceKm["Dindigul"] || 100;
      const mandiPricePerUnit = selectedCrop.mandiPrices[mandi.id] || selectedCrop.modalPrice;
      const grossValue = mandiPricePerUnit * quantity;

      // Base transport rate (Tata Ace or Bolero)
      let transportCost = Math.round(distance * 16);
      if (useSharedPool) {
        // Shared transport saves 55%
        transportCost = Math.round(transportCost * 0.45);
      }

      // Mandi fee / commission
      const commission = Math.round(grossValue * mandi.commissionRate);
      const unloading = Math.round((totalWeightKg / 100) * mandi.unloadingPerQuintal);
      const totalMandiDeduction = commission + unloading;

      const netProfit = grossValue - transportCost - totalMandiDeduction;
      const profitDiffVsLocal = netProfit - localGross;

      return {
        mandi,
        mandiPricePerUnit,
        distance,
        grossValue,
        transportCost,
        totalMandiDeduction,
        netProfit,
        profitDiffVsLocal
      };
    }).sort((a, b) => b.netProfit - a.netProfit);
  }, [selectedCrop, quantity, district, useSharedPool]);

  const bestMarketAnalysis = marketAnalyses[0];
  const forecastDays = selectedCrop.forecast.recommendationDays;

  return (
    <div className="bg-white dark:bg-night-card border border-sage/60 dark:border-night-border rounded-2xl shadow-elevated overflow-hidden transition-all duration-200">
      
      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-forest to-forest-700 text-white p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-full bg-harvest text-soil-dark font-extrabold text-[11px] uppercase tracking-wider">
                Hero Feature
              </span>
              <span className="text-xs font-semibold text-leaf-light">
                {t('advisor.subtitle')}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold mt-1">
              {t('advisor.title')}
            </h2>
          </div>

          {/* Quick link to Annual/Monthly Profit Roadmap */}
          <button
            onClick={() => setIsProfitPlannerOpen(true)}
            className="flex items-center space-x-1.5 self-start sm:self-auto bg-white/15 hover:bg-white/25 text-harvest border border-harvest/40 px-3 py-1.5 rounded-full text-xs font-bold transition shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('home.monthlyProfitPlan')}</span>
          </button>
        </div>
      </div>

      {/* Inputs Form Row */}
      <div className="p-4 sm:p-5 border-b border-sage-light dark:border-night-border bg-cream-paper/50 dark:bg-night/50">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Commodity Selector */}
          <div>
            <label className="block text-xs font-bold text-soil dark:text-stone-300 mb-1">
              {t('advisor.selectCrop')}
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full bg-white dark:bg-night border border-sage dark:border-night-border rounded-xl px-3 py-2 text-sm font-semibold text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-forest"
            >
              {COMMODITIES_DATA.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-xs font-bold text-soil dark:text-stone-300 mb-1">
              {t('advisor.quantity')} ({selectedCrop.unit})
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full bg-white dark:bg-night border border-sage dark:border-night-border rounded-xl px-3 py-2 text-sm font-bold text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </div>

          {/* District Selector */}
          <div>
            <label className="block text-xs font-bold text-soil dark:text-stone-300 mb-1">
              {t('advisor.currentLocation')}
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-white dark:bg-night border border-sage dark:border-night-border rounded-xl px-3 py-2 text-sm font-semibold text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-forest"
            >
              {TAMIL_NADU_DISTRICTS.map(d => (
                <option key={d} value={d}>
                  {d} District
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* FPO Shared Freight Toggle */}
        <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-forest/5 dark:bg-leaf/10 border border-leaf/30">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-forest dark:text-leaf" />
            <span className="text-xs font-bold text-forest dark:text-leaf">
              FPO குழு வாகனப் பகிர்வு (Shared Vehicle Pooling - Save 55% Freight)
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useSharedPool}
              onChange={(e) => setUseSharedPool(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-forest"></div>
          </label>
        </div>

      </div>

      {/* Recommendation Card Outcome */}
      <div className="p-4 sm:p-5">
        <div className="bg-gradient-to-br from-cream to-white dark:from-night-card dark:to-night border-2 border-leaf rounded-2xl p-4 sm:p-5 shadow-soft relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Recommendation Decision */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest text-white text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-harvest" />
                <span>
                  {forecastDays > 0 
                    ? t('advisor.waitDays', { days: forecastDays }) 
                    : t('advisor.sellNow')}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-forest dark:text-leaf tracking-tight">
                {bestMarketAnalysis.mandi.name}
              </h3>
              
              <p className="text-xs text-soil dark:text-stone-300 leading-relaxed font-medium">
                {selectedCrop.forecast.reason}
              </p>
            </div>

            {/* Net Take-Home In Hand Profit */}
            <div className="bg-forest-50 dark:bg-forest/20 border border-forest/30 dark:border-leaf/40 rounded-xl p-3.5 text-right flex flex-col justify-center min-w-[200px]">
              <span className="text-[11px] font-bold text-soil dark:text-stone-400 uppercase">
                {t('advisor.netProfit')}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-forest dark:text-leaf">
                ₹{bestMarketAnalysis.netProfit.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                +₹{bestMarketAnalysis.profitDiffVsLocal.toLocaleString('en-IN')} {t('advisor.profitDiff')}
              </span>
            </div>

          </div>

          {/* Breakdown summary row */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-sage-light dark:border-night-border text-center">
            <div className="p-2 rounded-lg bg-white/70 dark:bg-night/70">
              <span className="block text-[10px] text-stone-500 dark:text-stone-400 font-semibold">
                {t('advisor.expectedPrice')}
              </span>
              <span className="text-sm font-bold text-stone-800 dark:text-stone-100">
                ₹{bestMarketAnalysis.grossValue.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/70 dark:bg-night/70">
              <span className="block text-[10px] text-stone-500 dark:text-stone-400 font-semibold">
                {t('advisor.transportCost')} ({bestMarketAnalysis.distance} km)
              </span>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                -₹{bestMarketAnalysis.transportCost.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/70 dark:bg-night/70">
              <span className="block text-[10px] text-stone-500 dark:text-stone-400 font-semibold">
                {t('advisor.mandiCommission')}
              </span>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                -₹{bestMarketAnalysis.totalMandiDeduction.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

        </div>

        {/* Detailed Tamil Nadu Mandis Net Profit Comparison Table */}
        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-soil dark:text-stone-400 mb-2">
            {t('advisor.marketComparison')}
          </h4>
          
          <div className="space-y-2">
            {marketAnalyses.map((item, idx) => {
              const isBest = idx === 0;
              return (
                <div
                  key={item.mandi.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition ${
                    isBest
                      ? 'bg-forest/5 dark:bg-leaf/10 border-leaf shadow-sm ring-1 ring-leaf/30'
                      : 'bg-white dark:bg-night border-stone-200 dark:border-night-border'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      isBest ? 'bg-forest text-white' : 'bg-stone-200 dark:bg-night-border text-stone-700 dark:text-stone-300'
                    }`}>
                      #{idx + 1}
                    </div>
                    <div>
                      <span className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                        {item.mandi.name}
                        {isBest && (
                          <span className="px-1.5 py-0.2 rounded-full bg-harvest text-soil-dark text-[10px] font-extrabold uppercase">
                            Best
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400">
                        {item.distance} km · Mandi Rate: ₹{item.mandiPricePerUnit}/{selectedCrop.unit}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-sm text-forest dark:text-leaf">
                      ₹{item.netProfit.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">
                      Net in-hand
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
