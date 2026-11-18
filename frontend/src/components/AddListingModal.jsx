import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Mic, Upload, Sparkles, CheckCircle2, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AddListingModal({ isOpen, onClose }) {
  const { t, addListing, userProfile } = useApp();

  const [category, setCategory] = useState('vegetables');
  const [cropType, setCropType] = useState('Tomato');
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState(500);
  const [unit, setUnit] = useState('kg');
  const [pricePerUnit, setPricePerUnit] = useState(38);
  const [qualityGrade, setQualityGrade] = useState('A');
  const [isVetCertified, setIsVetCertified] = useState(false);
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80');
  const [isAiGrading, setIsAiGrading] = useState(false);

  if (!isOpen) return null;

  const handleSimulateAiPhoto = () => {
    setIsAiGrading(true);
    setTimeout(() => {
      setIsAiGrading(false);
      setQualityGrade('A');
      if (category === 'vegetables') {
        setImage('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80');
        setPricePerUnit(38);
      } else if (category === 'livestock') {
        setImage('https://images.unsplash.com/photo-1524024973431-2ad916746881?w=600&auto=format&fit=crop&q=80');
        setPricePerUnit(560);
        setBreed('Salem Black Native');
        setAge('1 Year');
        setWeight('24 kg');
        setIsVetCertified(true);
      } else if (category === 'dairy') {
        setImage('https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80');
        setPricePerUnit(55);
        setUnit('litre');
      }
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      title: title || `${userProfile.district} Fresh ${cropType}`,
      category,
      cropType,
      quantity: Number(quantity),
      unit,
      pricePerUnit: Number(pricePerUnit),
      govtApprovedPrice: Math.round(Number(pricePerUnit) * 0.92),
      qualityGrade,
      isVetCertified,
      breed,
      age,
      weight,
      image,
      harvestDate: new Date().toISOString().split('T')[0],
      village: userProfile.village,
      description: `High quality farm produce/livestock directly from ${userProfile.name} in ${userProfile.district}. Ready for immediate inspection.`
    };

    addListing(newListing);
    try {
      confetti({ particleCount: 80, spread: 60 });
    } catch(err){}
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cream dark:bg-night-card border border-sage dark:border-night-border rounded-2xl max-w-lg w-full p-5 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sage-light dark:border-night-border">
          <div>
            <h3 className="font-extrabold text-lg text-forest dark:text-leaf">
              {t('home.addProduce')}
            </h3>
            <p className="text-xs text-soil dark:text-stone-400">
              விளைபொருள் / கால்நடை / பால் / முட்டை விற்பனை பட்டியல்
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="py-4 space-y-3.5 overflow-y-auto">
          
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold uppercase text-soil dark:text-stone-400 mb-1">
              வகை (Category):
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (e.target.value === 'livestock') {
                  setUnit('head');
                  setPricePerUnit(11000);
                  setCropType('Goat');
                } else if (e.target.value === 'dairy') {
                  setUnit('litre');
                  setPricePerUnit(55);
                  setCropType('Milk');
                } else if (e.target.value === 'poultry') {
                  setUnit('dozen');
                  setPricePerUnit(120);
                  setCropType('Eggs');
                } else {
                  setUnit('kg');
                  setPricePerUnit(38);
                  setCropType('Tomato');
                }
              }}
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-sage dark:border-night-border bg-white dark:bg-night"
            >
              <option value="vegetables">காய்கறிகள் (Vegetables - Tomato, Onion, etc.)</option>
              <option value="crops">பயிர்கள் & தானியங்கள் (Crops - Paddy, Millets, Jasmine)</option>
              <option value="fruits">பழங்கள் (Fruits - Banana, Mango, Tender Coconut)</option>
              <option value="livestock">கால்நடைகள் (Livestock - Cow, Goat, Sheep)</option>
              <option value="poultry">கோழி & முட்டை (Poultry - Country Hen, Rooster, Eggs)</option>
              <option value="dairy">பால் பொருட்கள் (Dairy - Fresh A2 Milk, Desi Ghee)</option>
            </select>
          </div>

          {/* AI Auto Grade From Photo Banner */}
          <div className="p-3 rounded-xl bg-forest/5 dark:bg-leaf/10 border border-leaf/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-forest dark:text-leaf flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                <span>AI Photo Scan & Auto Quality Grading</span>
              </span>
              <button
                type="button"
                onClick={handleSimulateAiPhoto}
                className="px-2.5 py-1 rounded-lg bg-forest text-white text-[11px] font-bold shadow-xs hover:bg-forest-700"
              >
                {isAiGrading ? "Scanning..." : "Scan Photo (AI)"}
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400">
                AI Detected Quality:
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold border border-emerald-300">
                Grade '{qualityGrade}' (Premium Mandi Rate)
              </span>
            </div>
          </div>

          {/* Title / Name */}
          <div>
            <label className="block text-xs font-bold uppercase text-soil dark:text-stone-400 mb-1">
              விளைபொருள் பெயர் (Title / Item Name):
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Oddanchatram Fresh Farm Tomatoes"
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-sage dark:border-night-border bg-white dark:bg-night"
              required
            />
          </div>

          {/* Quantity & Unit Row */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold uppercase text-soil dark:text-stone-400 mb-1">
                அளவு (Quantity):
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-sage dark:border-night-border bg-white dark:bg-night"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-soil dark:text-stone-400 mb-1">
                அலகு (Unit):
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-sage dark:border-night-border bg-white dark:bg-night"
              >
                <option value="kg">கிலோ (kg)</option>
                <option value="quintal">குவிண்டால் (quintal)</option>
                <option value="head">எண்ணிக்கை (head)</option>
                <option value="litre">லிட்டர் (litre)</option>
                <option value="dozen">டஜன் (dozen)</option>
              </select>
            </div>
          </div>

          {/* Expected Price */}
          <div>
            <label className="block text-xs font-bold uppercase text-soil dark:text-stone-400 mb-1">
              எதிர்பார்க்கும் விலை (Expected Price ₹ per {unit}):
            </label>
            <input
              type="number"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              className="w-full text-sm font-black p-2.5 rounded-xl border border-forest text-forest dark:text-leaf bg-white dark:bg-night"
              required
            />
          </div>

          {/* Livestock specific fields */}
          {category === 'livestock' && (
            <div className="p-3 rounded-xl bg-soil/5 border border-soil/20 space-y-2">
              <span className="text-xs font-bold text-soil block uppercase">கால்நடை விபரங்கள் (Livestock Details):</span>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="இனம் (Breed)"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="text-xs p-2 rounded-lg border border-sage bg-white dark:bg-night"
                />
                <input
                  type="text"
                  placeholder="வயது (Age)"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="text-xs p-2 rounded-lg border border-sage bg-white dark:bg-night"
                />
                <input
                  type="text"
                  placeholder="எடை (Weight)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-xs p-2 rounded-lg border border-sage bg-white dark:bg-night"
                />
              </div>
              <label className="flex items-center space-x-2 text-xs font-bold text-soil cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isVetCertified}
                  onChange={(e) => setIsVetCertified(e.target.checked)}
                  className="rounded text-forest"
                />
                <span>கால்நடை மருத்துவர் தடுப்பூசி சான்று பெற்றது (Vet Certified)</span>
              </label>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-forest hover:bg-forest-700 text-white font-extrabold text-sm shadow-md transition"
            >
              பட்டியலிடுக (Publish Listing)
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
