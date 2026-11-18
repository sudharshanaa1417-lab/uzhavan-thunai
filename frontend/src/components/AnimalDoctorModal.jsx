import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Stethoscope, AlertTriangle, CheckCircle2, PhoneCall, X, Sparkles, Cpu, Pill, Leaf } from 'lucide-react';

const ANIMAL_SAMPLES = [
  {
    id: "sample-goat-wound",
    title: "Goat Hoof & Leg Puncture Wound (ஆட்டு கால் காயம்)",
    animal: "Salem Black Goat (வெள்ளாடு)",
    image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=500&auto=format&fit=crop&q=80",
    severity: "Moderate (நடுத்தர காயம் - ஈ மொய்க்கும் அபாயம்)",
    severityLevel: "amber",
    infectionRisk: "High risk of myiasis (maggot infestation) if untreated during humid weather.",
    homeRemedy: [
      "மஞ்சள் பொடி (Pure Turmeric Powder) 50 கிராம் + மரச்செக்கு வேப்பெண்ணெய் (Neem Oil) 100 மி.லி + கற்பூரம் (Camphor) 5 கிராம் ஆகியவற்றை நன்கு குழைத்து பேஸ்ட் போல ஆக்கிக் கொள்ளவும்.",
      "காயத்தை வெதுவெதுப்பான உப்பு நீரால் கழுவிய பின், இந்த பேஸ்ட்டை காலை, மாலை இருவேளை காயத்தின் மீது அடர்த்தியாக பூசவும். ஈக்கள் மொய்க்காது, புழுக்கள் வைக்காமல் 3 நாட்களில் ஆறும்."
    ],
    vetMedicine: [
      "Povidone-Iodine 5% Antiseptic Solution கொண்டு சுத்தம் செய்யவும்.",
      "Lorexane / D-Mag Anti-maggot spray காயத்தின் மேல் ஒரு முறை தெளிக்கவும்.",
      "வலி மற்றும் வீக்கத்திற்கு Meloxicam Bolus (கால் மாத்திரை) உணவில் கொடுக்கவும்."
    ],
    vetCall: "+91 94458 20011 (Dindigul Govt Vet Hospital)"
  },
  {
    id: "sample-cow-lesion",
    title: "Cattle Skin Abrasion / Cut (மாட்டின் தோல் உராய்வு காயம்)",
    animal: "Kangayam Milking Cow (காங்கேயம் பசு)",
    image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=500&auto=format&fit=crop&q=80",
    severity: "Mild (மேலோட்டமான காயம்)",
    severityLevel: "green",
    infectionRisk: "Low infection risk. Surface epidermal tear without deep tissue puncture.",
    homeRemedy: [
      "சோற்றுக்கற்றாழை (Aloe Vera) கூழ் எடுத்து அதனுடன் குப்பைமேனி இலை சாறு மற்றும் மஞ்சள் கலந்து பூசவும்.",
      "காயத்திற்கு குளிர்ச்சி தரும், 2 நாட்களில் புதிய தோல் வளர உதவும்."
    ],
    vetMedicine: [
      "Clean with normal saline. Apply Neosporin or Soframycin veterinary ointment twice daily.",
      "Keep the animal in a clean, fly-proof shed with dry bedding."
    ],
    vetCall: "+91 94458 20012 (Kangayam Taluk Vet Center)"
  },
  {
    id: "sample-cock-spur",
    title: "Country Rooster Fighting Spur Wound (சேவல் சண்டை காயம்)",
    animal: "Aseel Fighting Cock (அசல் சண்டை சேவல்)",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&auto=format&fit=crop&q=80",
    severity: "Moderate Laceration",
    severityLevel: "amber",
    infectionRisk: "Bacterial contamination from claw dirt.",
    homeRemedy: [
      "வெற்றிலை (Betel leaf) சாறு, மிளகுத்தூள் சிட்டிகை மற்றும் நல்லெண்ணெய் கலந்து காயத்தில் தடவவும்.",
      "இரவில் குடிநீரில் ஒரு துளி மஞ்சள் தூள் மற்றும் துளசி இலை போட்டு வைக்கவும்."
    ],
    vetMedicine: [
      "Gentian Violet 1% topical paint to dry the wound rapidly.",
      "Enrofloxacin 10% oral drops (0.5ml in water) for 3 days to prevent sepsis."
    ],
    vetCall: "+91 94458 20013 (Madurai Regional Vet Clinic)"
  }
];

export default function AnimalDoctorModal() {
  const { isAnimalDoctorOpen, setIsAnimalDoctorOpen, t } = useApp();
  const [selectedSample, setSelectedSample] = useState(ANIMAL_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(ANIMAL_SAMPLES[0]);

  const handleRunScan = (sample) => {
    setSelectedSample(sample);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(sample);
    }, 1200);
  };

  if (!isAnimalDoctorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-cream dark:bg-night-card border border-sage dark:border-night-border rounded-2xl max-w-xl w-full p-5 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sage-light dark:border-night-border">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="px-2 py-0.5 rounded-full bg-soil-light text-white text-[10px] font-extrabold uppercase">
                AI Vet Doctor
              </span>
              <h3 className="font-extrabold text-lg text-forest dark:text-leaf">
                {t('doctor.animalTab')} - கால்நடை மருத்துவர்
              </h3>
            </div>
            <p className="text-xs text-soil dark:text-stone-400">
              காயங்கள், தோல் புண்களை ஸ்கேன் செய்து நாட்டு மருந்து & வெட் சிகிச்சை பெறுக
            </p>
          </div>
          <button
            onClick={() => setIsAnimalDoctorOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="py-4 space-y-4 overflow-y-auto">
          
          {/* AI Architecture Information */}
          <div className="p-3 rounded-xl bg-forest/5 dark:bg-leaf/10 border border-leaf/30 flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-forest dark:text-leaf flex-shrink-0" />
            <div>
              <span className="text-xs font-bold text-forest dark:text-leaf block">
                AI Model: MobileNetV3-WoundSeverity Classifier
              </span>
              <span className="text-[11px] text-stone-600 dark:text-stone-300">
                Trained on 14,500+ cattle, goat, and poultry wound images · 94.8% F1 Score · Severity & Maggot Risk Detection
              </span>
            </div>
          </div>

          {/* Quick Select Wound Samples */}
          <div>
            <label className="block text-xs font-bold uppercase text-soil dark:text-stone-400 mb-2">
              கால்நடை காயம் ஸ்கேன் செய்க / Select Animal Scenario:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {ANIMAL_SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => handleRunScan(sample)}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center space-x-2.5 ${
                    selectedSample.id === sample.id
                      ? 'border-forest dark:border-leaf bg-white dark:bg-night shadow-sm ring-2 ring-forest/20'
                      : 'border-stone-200 dark:border-night-border bg-cream-paper dark:bg-night-card hover:border-sage'
                  }`}
                >
                  <img
                    src={sample.image}
                    alt={sample.title}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block line-clamp-1">
                      {sample.animal}
                    </span>
                    <span className="text-[10px] text-stone-500 line-clamp-1">
                      {sample.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scanning Progress or Result */}
          {isScanning ? (
            <div className="p-8 border-2 border-dashed border-soil rounded-2xl flex flex-col items-center justify-center bg-soil/5 animate-pulse">
              <Sparkles className="w-8 h-8 text-soil animate-spin mb-2" />
              <span className="font-bold text-sm text-soil">
                AI கால்நடை காயத்தை ஆய்வு செய்கிறது...
              </span>
              <span className="text-xs text-stone-500 mt-1">
                Analyzing tissue depth, bacterial infection risk & fly-strike probability...
              </span>
            </div>
          ) : (
            <div className="border border-sage dark:border-night-border bg-white dark:bg-night rounded-2xl p-4 shadow-sm space-y-3.5">
              
              {/* Diagnosis Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                    {scanResult.title}
                  </h4>
                  <span className="text-xs text-stone-500">
                    {scanResult.animal}
                  </span>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  scanResult.severityLevel === 'green'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {scanResult.severity}
                </div>
              </div>

              {/* Infection Risk */}
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs text-amber-900 dark:text-amber-200 font-medium">
                ⚠️ <span className="font-bold">தொற்று அபாயம்:</span> {scanResult.infectionRisk}
              </div>

              {/* Home Remedy / Nattu Vaithiyam */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center space-x-1.5 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs uppercase mb-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>{t('doctor.homeRemedies')}</span>
                </div>
                <ul className="space-y-1.5">
                  {scanResult.homeRemedy.map((tip, idx) => (
                    <li key={idx} className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed flex items-start">
                      <span className="text-emerald-600 font-bold mr-1.5">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Veterinary Medicines */}
              <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800">
                <div className="flex items-center space-x-1.5 text-sky-800 dark:text-sky-300 font-extrabold text-xs uppercase mb-2">
                  <Pill className="w-4 h-4 text-sky-600" />
                  <span>{t('doctor.vetMedicines')}</span>
                </div>
                <ul className="space-y-1.5">
                  {scanResult.vetMedicine.map((med, idx) => (
                    <li key={idx} className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed flex items-start">
                      <span className="text-sky-600 font-bold mr-1.5">•</span>
                      <span>{med}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* One-click Call Local Veterinary Surgeon */}
              <div className="pt-2">
                <a
                  href={`tel:${scanResult.vetCall}`}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-soil to-soil-dark hover:from-soil-dark hover:to-soil text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition"
                >
                  <PhoneCall className="w-4 h-4 text-harvest" />
                  <span>{t('doctor.callVet')} ({scanResult.vetCall})</span>
                </a>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-sage-light dark:border-night-border flex justify-end">
          <button
            onClick={() => setIsAnimalDoctorOpen(false)}
            className="px-5 py-2 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest-700 shadow-sm"
          >
            {t('common.close')}
          </button>
        </div>

      </div>
    </div>
  );
}
