import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, X, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EscrowPaymentModal({ isOpen, onClose, order }) {
  const { t, escrowOrders, releaseEscrow } = useApp();
  const currentOrder = order || escrowOrders[0];

  const [step, setStep] = useState(currentOrder.status === 'released' ? 'released' : 'held');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleRelease = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('released');
      releaseEscrow(currentOrder.id);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e){}
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cream dark:bg-night-card border border-sage dark:border-night-border rounded-2xl max-w-lg w-full p-5 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sage-light dark:border-night-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-forest text-harvest flex items-center justify-center shadow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-forest dark:text-leaf">
                {t('escrow.title')}
              </h3>
              <p className="text-xs text-soil dark:text-stone-400">
                {t('escrow.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="py-4 space-y-4 overflow-y-auto">
          
          {/* Amount Badge */}
          <div className="p-4 rounded-xl bg-white dark:bg-night border border-sage-light dark:border-night-border shadow-xs text-center space-y-1">
            <span className="text-[11px] font-bold uppercase text-stone-500">
              {t('escrow.amount')} (100% Guaranteed)
            </span>
            <div className="text-3xl font-black text-forest dark:text-leaf">
              ₹{currentOrder.totalAmount.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">
              {currentOrder.listingTitle}
            </p>
          </div>

          {/* Parties Info */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-night-card border border-stone-200 dark:border-night-border">
              <span className="text-stone-500 block text-[10px] font-bold uppercase">Buyer</span>
              <strong className="text-stone-900 dark:text-stone-100">{currentOrder.buyerName}</strong>
              <span className="block text-[10px] text-emerald-600 font-semibold">✓ UPI Verified</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-night-card border border-stone-200 dark:border-night-border">
              <span className="text-stone-500 block text-[10px] font-bold uppercase">Seller (Farmer)</span>
              <strong className="text-stone-900 dark:text-stone-100">{currentOrder.sellerName}</strong>
              <span className="block text-[10px] text-emerald-600 font-semibold">✓ Bank Account Linked</span>
            </div>
          </div>

          {/* Status Display */}
          {step === 'held' ? (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-xs text-amber-900 dark:text-amber-200 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-sm">
                <Lock className="w-4 h-4 text-amber-700" />
                <span>{t('escrow.statusHeld')}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Buyer payment is pre-authorized and locked in the secure sandbox escrow. Farmer can dispatch produce with complete peace of mind.
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-sm text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5" />
                <span>{t('escrow.statusReleased')}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                ₹{currentOrder.totalAmount.toLocaleString('en-IN')} has been immediately deposited into the farmer's UPI VPA (selvaraj@oksbi) with zero gateway commission!
              </p>
            </div>
          )}

        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-sage-light dark:border-night-border flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 font-bold text-xs hover:bg-stone-100"
          >
            {t('common.cancel')}
          </button>

          {step === 'held' ? (
            <button
              onClick={handleRelease}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-700 text-white font-extrabold text-xs shadow-md transition flex items-center space-x-1.5"
            >
              {isProcessing ? (
                <span>Releasing UPI Transfer...</span>
              ) : (
                <>
                  <span>{t('escrow.verifyDelivery')} & {t('escrow.releaseFunds')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs"
            >
              Done (சரி)
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
