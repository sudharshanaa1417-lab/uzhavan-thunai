import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Truck, Plus, CheckCircle2, X, ArrowRight, ShieldCheck } from 'lucide-react';

const INITIAL_POOLS = [
  {
    id: "pool-1",
    route: "Oddanchatram North → Koyambedu (Chennai)",
    vehicle: "Eicher 14ft Mini Lorry (4 Tonnes)",
    departureTime: "Today 7:30 PM (Night Transit)",
    currentLoadKg: 2800,
    maxCapacityKg: 4000,
    freightPerKg: 1.40, // ₹1.40/kg vs individual ₹4.20/kg
    organizer: "Dindigul Horticulture FPO",
    participatingFarmers: 4,
    crops: "Tomato, Drumstick, Chinna Vengayam"
  },
  {
    id: "pool-2",
    route: "Palani / Oddanchatram → Mettupalayam Agro Hub",
    vehicle: "Mahindra Bolero Pickup (1.8 Tonnes)",
    departureTime: "Tomorrow 4:00 AM",
    currentLoadKg: 1100,
    maxCapacityKg: 1800,
    freightPerKg: 0.95,
    organizer: "Palani Hill Organic Society",
    participatingFarmers: 2,
    crops: "Small Onions, Country Eggs, Guava"
  }
];

export default function GroupSellingModal({ isOpen, onClose }) {
  const { t, userProfile } = useApp();
  const [pools, setPools] = useState(INITIAL_POOLS);
  const [joinedPoolId, setJoinedPoolId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPoolRoute, setNewPoolRoute] = useState('Oddanchatram → Koyambedu');

  if (!isOpen) return null;

  const handleJoin = (poolId) => {
    setJoinedPoolId(poolId);
    setPools(prev => prev.map(p => {
      if (p.id === poolId) {
        return {
          ...p,
          participatingFarmers: p.participatingFarmers + 1,
          currentLoadKg: Math.min(p.maxCapacityKg, p.currentLoadKg + 500)
        };
      }
      return p;
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cream dark:bg-night-card border border-sage dark:border-night-border rounded-2xl max-w-xl w-full p-5 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sage-light dark:border-night-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center text-white">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-forest dark:text-leaf">
                {t('fpo.title')}
              </h3>
              <p className="text-xs text-soil dark:text-stone-400">
                {t('fpo.subtitle')}
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

        {/* Scrollable body */}
        <div className="py-4 space-y-4 overflow-y-auto">
          
          {/* Savings Highlight Box */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-forest to-leaf text-white flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-harvest">FPO Logistics Optimization</span>
              <h4 className="text-sm font-extrabold mt-0.5">Save ₹2,800 to ₹4,500 per Trip</h4>
              <p className="text-[11px] text-leaf-light">
                Pool with 3 nearby farmers to fill an empty truck return trip.
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-center font-black text-sm">
              60%
              <span className="block text-[9px] uppercase font-bold text-harvest">Saved</span>
            </div>
          </div>

          {/* Active Pools List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-soil dark:text-stone-400">
                {t('fpo.activePools')}:
              </span>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="flex items-center space-x-1 text-xs font-bold text-forest dark:text-leaf hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('fpo.createPool')}</span>
              </button>
            </div>

            {showCreateForm && (
              <div className="p-3 rounded-xl bg-white dark:bg-night border border-forest/30 space-y-2 animate-fadeIn">
                <span className="text-xs font-bold text-forest">Start New Logistics Pool</span>
                <input
                  type="text"
                  value={newPoolRoute}
                  onChange={(e) => setNewPoolRoute(e.target.value)}
                  placeholder="e.g., Oddanchatram → Koyambedu"
                  className="w-full text-xs p-2 rounded-lg border border-sage dark:border-night-border bg-stone-50 dark:bg-night-card"
                />
                <button
                  onClick={() => {
                    const newP = {
                      id: `pool-${Date.now()}`,
                      route: newPoolRoute,
                      vehicle: "Mahindra Bolero Pickup (1.8T)",
                      departureTime: "Tomorrow 6:00 AM",
                      currentLoadKg: 400,
                      maxCapacityKg: 1800,
                      freightPerKg: 1.10,
                      organizer: userProfile.name,
                      participatingFarmers: 1,
                      crops: "Vegetables / Perishables"
                    };
                    setPools([newP, ...pools]);
                    setShowCreateForm(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-forest text-white text-xs font-bold"
                >
                  Create & Invite Farmers
                </button>
              </div>
            )}

            {pools.map(pool => {
              const isJoined = joinedPoolId === pool.id;
              const fillPct = Math.round((pool.currentLoadKg / pool.maxCapacityKg) * 100);

              return (
                <div
                  key={pool.id}
                  className="p-3.5 rounded-xl border border-sage-light dark:border-night-border bg-white dark:bg-night shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-forest dark:text-leaf" />
                        <h4 className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                          {pool.route}
                        </h4>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                        {pool.vehicle} · Departs {pool.departureTime}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-forest dark:text-leaf">
                        ₹{pool.freightPerKg}/kg
                      </span>
                      <span className="block text-[10px] text-stone-500">
                        {t('fpo.costPerKg')}
                      </span>
                    </div>
                  </div>

                  {/* Load Capacity Bar */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                      <span>{t('fpo.poolCapacity')}: {pool.currentLoadKg} / {pool.maxCapacityKg} kg ({fillPct}%)</span>
                      <span>{pool.participatingFarmers} {t('fpo.joinedFarmers')}</span>
                    </div>
                    <div className="w-full bg-stone-200 dark:bg-night-border h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-forest dark:bg-leaf h-full rounded-full transition-all"
                        style={{ width: `${fillPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-soil dark:text-stone-400">
                      Organized by: <strong className="text-stone-800 dark:text-stone-200">{pool.organizer}</strong>
                    </span>

                    {isJoined ? (
                      <span className="flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>இணைந்தது (Joined!)</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleJoin(pool.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-forest hover:bg-forest-700 text-white font-bold text-xs shadow-sm transition"
                      >
                        {t('fpo.joinPool')} (Add 500kg)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-sage-light dark:border-night-border flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest-700 shadow-sm"
          >
            {t('common.close')}
          </button>
        </div>

      </div>
    </div>
  );
}
