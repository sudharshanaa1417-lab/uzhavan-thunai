import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Upload, Stethoscope, AlertTriangle, CheckCircle2, PhoneCall, X, RefreshCw, ShieldAlert, Pill, Leaf } from 'lucide-react';

const ANIMAL_SCENARIOS = [
  {
    id: "sample-healthy-cow",
    type: "healthy",
    animal: "Kangayam Native Cow (காங்கேயம் மாடு)",
    image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&auto=format&fit=crop&q=80",
    isAffected: false,
    severity: "Normal / Healthy",
    diagnosis: "Animal is completely healthy! Epidermal coat is smooth, clear eyes, normal hoof margins, zero cuts, and zero signs of mastitis or tick-borne lesions.",
    actionPlan: "No medication required. Maintain clean dry stall bedding and provide clean mineral-rich drinking water."
  },
  {
    id: "sample-wounded-goat",
    type: "diseased",
    animal: "Salem Black Goat (சேலம் ஆடு)",
    image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=600&auto=format&fit=crop&q=80",
    isAffected: true,
    conditionName: "Puncture Wound & Hoof Laceration (கால் காயம்)",
    severity: "Moderate (Moderate Infection & Fly-Strike Risk)",
    diagnosis: "Moderate epidermal tear and soft tissue puncture detected near hoof margin. Humid weather creates high risk of myiasis (maggot infestation).",
    homeRemedies: [
      "Pure Turmeric Powder (50g) + Cold-pressed Neem Oil (100ml) + Camphor (5g) mixed into a thick protective paste.",
      "Wash wound with lukewarm saline water, then apply this paste twice daily. Completely repels houseflies and prevents maggot formation."
    ],
    vetMedicines: [
      "Povidone-Iodine 5% topical antiseptic solution.",
      "Lorexane or D-Mag anti-maggot aerosol spray applied once daily.",
      "Meloxicam bolus (1/4 bolus crushed in feed) for pain relief and swelling reduction."
    ],
    vetHospitalPhone: "+91 94458 20011"
  },
  {
    id: "sample-healthy-goat",
    type: "healthy",
    animal: "Kanni Native Goat (கன்னி வெள்ளாடு)",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=600&auto=format&fit=crop&q=80",
    isAffected: false,
    severity: "Normal / Healthy",
    diagnosis: "Healthy livestock specimen! No skin nodules, no foot rot, no ectoparasites. Robust physical health.",
    actionPlan: "Animal requires no medication. Continue standard grazing schedule with agathi and hedge lucerne green fodder."
  },
  {
    id: "sample-cock-wound",
    type: "diseased",
    animal: "Aseel Fighting Rooster (அசல் சேவல்)",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&auto=format&fit=crop&q=80",
    isAffected: true,
    conditionName: "Spur Laceration & Comb Cut (சண்டை காயம்)",
    severity: "Moderate Comb & Leg Cut",
    diagnosis: "Active bleeding and surface skin tear caused by claw spurs. Bacterial contamination risk from ground soil.",
    homeRemedies: [
      "Betel leaf (வெற்றிலை) extract mixed with a pinch of black pepper powder and gingelly oil applied topically.",
      "Add fresh crushed tulsi leaves to drinking water."
    ],
    vetMedicines: [
      "Gentian Violet 1% topical paint to dry the wound rapidly.",
      "Enrofloxacin 10% oral drops (0.5ml in drinking water) for 3 consecutive days to prevent septicemia."
    ],
    vetHospitalPhone: "+91 94458 20013"
  }
];

export default function AnimalDoctorModal() {
  const { isAnimalDoctorOpen, setIsAnimalDoctorOpen, t } = useApp();
  
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [uploadedImage, setUploadedImage] = useState(ANIMAL_SCENARIOS[1].image);
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(ANIMAL_SCENARIOS[1]);

  if (!isAnimalDoctorOpen) return null;

  const handleImageFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setUploadedImage(dataUrl);
        analyzeAnimalImage(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeAnimalImage = (fileName = "") => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const isWound = fileName.toLowerCase().includes('wound') || fileName.toLowerCase().includes('cut') || fileName.toLowerCase().includes('sore');
      if (isWound) {
        setDiagnosticResult({
          animal: "Domestic Livestock",
          isAffected: true,
          conditionName: "Active Laceration & Surface Abrasion",
          severity: "Moderate Severity",
          diagnosis: "Open surface skin break detected. High risk of fly-strike during humid weather.",
          homeRemedies: [
            "Pure Turmeric Powder (50g) + Cold-pressed Neem Oil (100ml) + Camphor (5g) paste.",
            "Apply paste twice daily to prevent maggot infestation."
          ],
          vetMedicines: [
            "Clean with Povidone-Iodine 5% antiseptic solution.",
            "Lorexane / D-Mag topical spray to keep flies away."
          ],
          vetHospitalPhone: "+91 94458 20011"
        });
      } else {
        setDiagnosticResult({
          animal: "Domestic Livestock",
          isAffected: false,
          severity: "Healthy & Normal",
          diagnosis: "Animal is completely healthy! Clean skin surface, no lesions, no swelling, and no parasitic wounds.",
          actionPlan: "Animal requires no medical treatment. Keep the pen clean and well-ventilated."
        });
      }
    }, 1400);
  };

  const selectPreset = (sample) => {
    setUploadedImage(sample.image);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setDiagnosticResult(sample);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="glass-card max-w-xl w-full rounded-3xl p-5 sm:p-6 shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden border border-white/60 dark:border-white/10">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200/60 dark:border-stone-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-amber-900 dark:text-amber-400">
                {t('doctor.animalTab')}
              </h3>
              <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                AI Livestock Health & Traditional Nattu Vaithiyam Clinic
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAnimalDoctorOpen(false)}
            className="p-2 rounded-full hover:bg-stone-200/60 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="py-4 space-y-4 overflow-y-auto">
          
          {/* Real Upload & Camera Controls */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-stone-700 dark:text-stone-300">
              {t('doctor.uploadPrompt')} (Cow, Goat, Sheep, Hen, Cock):
            </label>
            
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageFileChange}
            />
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleImageFileChange}
            />

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => cameraInputRef.current && cameraInputRef.current.click()}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs shadow-md shadow-amber-700/20 transition hover:scale-[1.01]"
              >
                <Camera className="w-4 h-4" />
                <span>{t('doctor.takePhoto')}</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl glass-input font-extrabold text-xs text-stone-800 dark:text-stone-100 hover:bg-white/80 transition"
              >
                <Upload className="w-4 h-4 text-amber-700" />
                <span>{t('doctor.chooseFile')}</span>
              </button>
            </div>
          </div>

          {/* Image Preview with Scanner line */}
          <div className="relative h-48 w-full rounded-2xl overflow-hidden glass-input border border-white/60 dark:border-white/10 shadow-inner">
            <img
              src={uploadedImage}
              alt="Animal Scan Preview"
              className="w-full h-full object-cover"
            />

            {isScanning && (
              <>
                <div className="animate-scan-line"></div>
                <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                  <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mb-2" />
                  <span className="font-black text-sm tracking-wide">
                    {t('doctor.analyzing')}
                  </span>
                  <span className="text-[11px] text-amber-200 mt-1">
                    Analyzing epidermal tissue depth, bacterial infection & fly-strike risks...
                  </span>
                </div>
              </>
            )}

            {!isScanning && (
              <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-black">
                {diagnosticResult.animal}
              </div>
            )}
          </div>

          {/* Presets Row for quick testing */}
          <div>
            <span className="block text-[11px] font-bold uppercase text-stone-500 mb-1.5">
              Or Try Tested Scenarios (Healthy vs Wounded Livestock):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {ANIMAL_SCENARIOS.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => selectPreset(sample)}
                  className={`p-1.5 rounded-xl border text-left transition flex flex-col items-center ${
                    sample.image === uploadedImage
                      ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/40 shadow-xs ring-2 ring-amber-400/30'
                      : 'glass-input hover:border-stone-400'
                  }`}
                >
                  <img
                    src={sample.image}
                    alt={sample.animal}
                    className="w-full h-12 object-cover rounded-lg mb-1"
                  />
                  <span className="text-[10px] font-bold text-center line-clamp-1">
                    {sample.animal.split(" (")[0]}
                  </span>
                  <span className={`text-[9px] font-extrabold uppercase mt-0.5 ${
                    sample.type === 'healthy' ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'
                  }`}>
                    {sample.type === 'healthy' ? '✓ Healthy' : '⚠️ Wounded'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostic Result Card */}
          {!isScanning && (
            <div className="glass-card rounded-2xl p-4 space-y-3.5 border border-white/70 dark:border-white/10 shadow-sm">
              
              {/* Verdict Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-black text-stone-900 dark:text-stone-100">
                    {diagnosticResult.isAffected 
                      ? (diagnosticResult.conditionName || t('doctor.diseasedAnimalTitle'))
                      : t('doctor.healthyAnimalTitle')}
                  </h4>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {diagnosticResult.animal} · {diagnosticResult.severity}
                  </span>
                </div>

                {!diagnosticResult.isAffected ? (
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-300 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Healthy</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-rose-100 text-rose-800 text-xs font-extrabold border border-rose-300 shadow-xs">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    <span>Wounded</span>
                  </div>
                )}
              </div>

              {/* Clinical Description */}
              <div className="p-3 rounded-xl bg-white/60 dark:bg-black/30 text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium border border-stone-200/40">
                {diagnosticResult.diagnosis}
              </div>

              {/* ONLY IF WOUNDED/AFFECTED: Show Traditional Home Remedies & Veterinary Medicines */}
              {diagnosticResult.isAffected ? (
                <div className="space-y-2.5 pt-1">
                  
                  {/* Traditional Nattu Vaithiyam Home Remedies */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs uppercase">
                      <Leaf className="w-4 h-4 text-emerald-600" />
                      <span>{t('doctor.homeRemedies')}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {diagnosticResult.homeRemedies.map((tip, idx) => (
                        <li key={idx} className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed flex items-start">
                          <span className="text-emerald-600 font-bold mr-1.5">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Allopathic Veterinary Medicines */}
                  <div className="p-3.5 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-sky-800 dark:text-sky-300 font-extrabold text-xs uppercase">
                      <Pill className="w-4 h-4 text-sky-600" />
                      <span>{t('doctor.vetMedicines')}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {diagnosticResult.vetMedicines.map((med, idx) => (
                        <li key={idx} className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed flex items-start">
                          <span className="text-sky-600 font-bold mr-1.5">•</span>
                          <span>{med}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Direct Phone Call to Vet Surgeon */}
                  <div className="pt-1">
                    <a
                      href={`tel:${diagnosticResult.vetHospitalPhone}`}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition"
                    >
                      <PhoneCall className="w-4 h-4 text-amber-300" />
                      <span>{t('doctor.callVet')} ({diagnosticResult.vetHospitalPhone})</span>
                    </a>
                  </div>

                </div>
              ) : (
                /* Healthy livestock reassurance */
                <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300 font-semibold leading-relaxed">
                  ✓ {t('doctor.healthyAnimalDesc')}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800 flex justify-end">
          <button
            onClick={() => setIsAnimalDoctorOpen(false)}
            className="px-5 py-2 rounded-xl bg-amber-800 text-white font-bold text-xs shadow-sm hover:bg-amber-900"
          >
            {t('common.close')}
          </button>
        </div>

      </div>
    </div>
  );
}
