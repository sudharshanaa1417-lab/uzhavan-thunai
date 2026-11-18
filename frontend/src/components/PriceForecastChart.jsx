import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, TrendingDown, Minus, Info, Sparkles } from 'lucide-react';

export default function PriceForecastChart({ commodity }) {
  const { t } = useApp();
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  if (!commodity || !commodity.forecast) return null;

  const { sevenDays, confidence, trend, reason, recommendationDays } = commodity.forecast;

  // Max and min prices for scaling the SVG chart
  const allPrices = sevenDays.flatMap(d => [d.low, d.price, d.high]);
  const minPrice = Math.min(...allPrices) * 0.95;
  const maxPrice = Math.max(...allPrices) * 1.05;
  const range = maxPrice - minPrice || 1;

  // Chart SVG coordinates calculation
  const width = 500;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;
  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingY * 2;

  const points = sevenDays.map((d, i) => {
    const x = paddingX + (i / (sevenDays.length - 1)) * plotWidth;
    const yPrice = height - paddingY - ((d.price - minPrice) / range) * plotHeight;
    const yHigh = height - paddingY - ((d.high - minPrice) / range) * plotHeight;
    const yLow = height - paddingY - ((d.low - minPrice) / range) * plotHeight;
    return { ...d, x, yPrice, yHigh, yLow, index: i };
  });

  // Confidence band polygon points (Upper curve then reversed Lower curve)
  const upperPath = points.map(p => `${p.x},${p.yHigh}`).join(' L ');
  const lowerPath = [...points].reverse().map(p => `${p.x},${p.yLow}`).join(' L ');
  const bandPolygon = `M ${upperPath} L ${lowerPath} Z`;

  // Center prediction line
  const linePath = `M ` + points.map(p => `${p.x},${p.yPrice}`).join(' L ');

  const currentSelection = points[selectedDayIdx];

  return (
    <div className="bg-white dark:bg-night-card border border-sage/60 dark:border-night-border rounded-2xl p-4 sm:p-5 shadow-soft space-y-4">
      
      {/* Title & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-sage-light dark:border-night-border">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-base text-stone-900 dark:text-stone-100">
              {commodity.name} - 7 நாள் விலை கணிப்பு
            </span>
            <span className="px-2 py-0.5 rounded-full bg-forest/10 dark:bg-leaf/20 text-forest dark:text-leaf text-[10px] font-black border border-leaf/30">
              Confidence: {confidence}%
            </span>
          </div>
          <p className="text-xs text-soil dark:text-stone-400 mt-0.5">
            LightGBM + LSTM Quantile Regression (10th - 90th Percentile Band)
          </p>
        </div>

        {/* Direction Badge */}
        <div className="flex items-center space-x-1.5 self-start sm:self-auto">
          {trend === 'up' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              {t('home.trendUp')}
            </span>
          )}
          {trend === 'down' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-300">
              <TrendingDown className="w-3.5 h-3.5 mr-1" />
              {t('home.trendDown')}
            </span>
          )}
          {trend === 'stable' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-stone-100 text-stone-700 border border-stone-300">
              <Minus className="w-3.5 h-3.5 mr-1" />
              {t('home.trendStable')}
            </span>
          )}
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative bg-cream-paper/40 dark:bg-night/60 rounded-xl p-2 border border-sage-light dark:border-night-border overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 sm:h-52 overflow-visible">
          
          <defs>
            <linearGradient id="bandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1B5E20" />
              <stop offset="100%" stopColor="#4CAF50" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#D1D5DB" strokeDasharray="3 3" opacity="0.4" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#D1D5DB" strokeDasharray="3 3" opacity="0.4" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#D1D5DB" strokeDasharray="3 3" opacity="0.4" />

          {/* Quantile Regression Confidence Band */}
          <path d={bandPolygon} fill="url(#bandGradient)" />

          {/* Center Forecast Line */}
          <path d={linePath} fill="none" stroke="url(#lineGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Day Interactive Points */}
          {points.map((p) => {
            const isSelected = p.index === selectedDayIdx;
            return (
              <g key={p.index} className="cursor-pointer" onClick={() => setSelectedDayIdx(p.index)}>
                {/* Upper and lower bound vertical tick */}
                <line x1={p.x} y1={p.yHigh} x2={p.x} y2={p.yLow} stroke="#81C784" strokeWidth="1.5" strokeDasharray="2 2" />
                
                {/* Center marker */}
                <circle
                  cx={p.x}
                  cy={p.yPrice}
                  r={isSelected ? "6" : "4"}
                  className={`transition-all duration-150 ${
                    isSelected ? 'fill-harvest stroke-forest stroke-[3px]' : 'fill-forest dark:fill-leaf stroke-white stroke-[2px]'
                  }`}
                />
                
                {/* Day label below */}
                <text
                  x={p.x}
                  y={height - 5}
                  textAnchor="middle"
                  className={`text-[9px] font-bold ${
                    isSelected ? 'fill-forest dark:fill-leaf font-extrabold' : 'fill-stone-500'
                  }`}
                >
                  D{p.index + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Day Tooltip Pill */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-sage-light dark:border-night-border text-xs px-2">
          <span className="font-bold text-stone-700 dark:text-stone-300">
            {currentSelection.day}:
          </span>
          <div className="flex items-center space-x-3">
            <span className="text-stone-500">
              Band: ₹{currentSelection.low} - ₹{currentSelection.high}
            </span>
            <span className="font-black text-sm text-forest dark:text-leaf">
              Forecast: ₹{currentSelection.price}/{commodity.unit}
            </span>
          </div>
        </div>
      </div>

      {/* AI Market Drivers Analysis */}
      <div className="p-3 rounded-xl bg-forest/5 dark:bg-leaf/10 border border-leaf/30 text-xs space-y-1">
        <span className="font-bold text-forest dark:text-leaf uppercase tracking-wider block">
          AI சந்தை பகுப்பாய்வு & காரணங்கள் (Agmarknet & Weather Correlation):
        </span>
        <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
          {reason}
        </p>
      </div>

    </div>
  );
}
