import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Phone, MapPin, Star, ShieldCheck, X, Search } from 'lucide-react';

const REGISTERED_SELLERS = [
  {
    id: "seller-1",
    name: "Selvaraj K. (செல்வராஜ்)",
    role: "Organic Farmer & FPO Director",
    district: "Dindigul",
    village: "Oddanchatram North",
    phone: "+91 94421 88390",
    rating: 4.9,
    reviewsCount: 38,
    isVerified: true,
    cropsGrown: ["Tomato (Grade A)", "Drumstick", "Small Onions"],
    livestockOwned: ["Country Hens", "2 Kangayam Cows"],
    status: "Active Seller",
    ordersCompleted: 142
  },
  {
    id: "seller-2",
    name: "Murugesan Palanisamy (முருகேசன்)",
    role: "Native Livestock Breeder",
    district: "Tiruppur",
    village: "Kangayam East",
    phone: "+91 98421 77102",
    rating: 4.8,
    reviewsCount: 29,
    isVerified: true,
    cropsGrown: ["Cholam / Fodder Sorghum", "Coconuts"],
    livestockOwned: ["Kangayam Stud Bulls & Cows", "Mecheri Rams"],
    status: "Active Breeder",
    ordersCompleted: 88
  },
  {
    id: "seller-3",
    name: "Saraswathi Ammal (சரஸ்வதி)",
    role: "Women Dairy FPO Lead",
    district: "Erode",
    village: "Perundurai Rural",
    phone: "+91 98944 67019",
    rating: 5.0,
    reviewsCount: 64,
    isVerified: true,
    cropsGrown: ["Turmeric", "Tapioca"],
    livestockOwned: ["A2 Umblachery Cows", "Native Goats"],
    status: "Daily Milk Supplier",
    ordersCompleted: 310
  },
  {
    id: "seller-4",
    name: "Ganesan Natarajan (கணேசன்)",
    role: "Delta Organic Paddy Producer",
    district: "Thanjavur",
    village: "Kumbakonam South",
    phone: "+91 96291 44501",
    rating: 4.9,
    reviewsCount: 45,
    isVerified: true,
    cropsGrown: ["Deluxe Ponni Paddy", "Black Gram", "Sesame"],
    livestockOwned: ["Country Poultry"],
    status: "Bulk Grain Seller",
    ordersCompleted: 95
  }
];

export default function VendorDirectoryModal({ isOpen, onClose }) {
  const { t, setIsEscrowModalOpen } = useApp();
  const [searchDistrict, setSearchDistrict] = useState('');

  if (!isOpen) return null;

  const filtered = searchDistrict
    ? REGISTERED_SELLERS.filter(s => s.district.toLowerCase().includes(searchDistrict.toLowerCase()) || s.name.toLowerCase().includes(searchDistrict.toLowerCase()))
    : REGISTERED_SELLERS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cream dark:bg-night-card border border-sage dark:border-night-border rounded-2xl max-w-xl w-full p-5 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sage-light dark:border-night-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-forest text-harvest flex items-center justify-center shadow">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-forest dark:text-leaf">
                {t('market.sellerDirectory')}
              </h3>
              <p className="text-xs text-soil dark:text-stone-400">
                தமிழ்நாடு பதிவு செய்த உழவர்கள் மற்றும் விற்பனையாளர்கள்
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

        {/* Search Input */}
        <div className="py-3 border-b border-sage-light dark:border-night-border">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by District or Farmer Name (e.g., Dindigul, Selvaraj)..."
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-sage dark:border-night-border bg-white dark:bg-night focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </div>
        </div>

        {/* Sellers List */}
        <div className="py-3 space-y-3 overflow-y-auto">
          {filtered.map(seller => (
            <div
              key={seller.id}
              className="p-3.5 rounded-xl border border-sage-light dark:border-night-border bg-white dark:bg-night shadow-xs space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {seller.name}
                    </h4>
                    {seller.isVerified && (
                      <span className="flex items-center text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full font-bold">
                        <ShieldCheck className="w-3 h-3 mr-0.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-soil dark:text-stone-400 block mt-0.5">
                    {seller.role}
                  </span>
                  <div className="flex items-center space-x-1 text-[11px] text-stone-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-soil" />
                    <span>{seller.village}, {seller.district}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-1 justify-end text-amber-600 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{seller.rating}</span>
                    <span className="text-[10px] text-stone-400">({seller.reviewsCount})</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                    {seller.ordersCompleted} Orders Delivered
                  </span>
                </div>
              </div>

              {/* Items sold */}
              <div className="text-xs space-y-1 bg-stone-50 dark:bg-night-card p-2.5 rounded-lg border border-stone-200 dark:border-night-border">
                <div>
                  <strong className="text-stone-700 dark:text-stone-300 text-[10px] uppercase">விற்பனை பொருட்கள் (Crops): </strong>
                  <span className="text-stone-600 dark:text-stone-400 text-[11px]">{seller.cropsGrown.join(", ")}</span>
                </div>
                <div>
                  <strong className="text-soil dark:text-harvest text-[10px] uppercase">கால்நடைகள் (Livestock): </strong>
                  <span className="text-stone-600 dark:text-stone-400 text-[11px]">{seller.livestockOwned.join(", ")}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                <a
                  href={`tel:${seller.phone}`}
                  className="flex items-center space-x-1 text-xs font-bold text-forest hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{seller.phone}</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    setIsEscrowModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-forest hover:bg-forest-700 text-white font-bold text-xs shadow-xs"
                >
                  Order with Escrow (UPI)
                </button>
              </div>

            </div>
          ))}
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
