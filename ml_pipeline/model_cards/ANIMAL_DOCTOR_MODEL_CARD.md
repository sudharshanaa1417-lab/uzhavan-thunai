# Model Card: Edge MobileNetV3 Livestock Wound & Skin Severity Classifier (Uzhavan-AnimalDoctor-v1)

## Model Details
- **Architecture**: MobileNetV3-Large fine-tuned on veterinary wound pathology.
- **Model Size**: 5.2 MB TFLite INT8 Quantized model.
- **Target Animals**: Cattle (Cows, Bulls, Calves), Goats (Salem Black, Kanni), Sheep (Mecheri), Poultry (Country Hens, Fighting Cocks).
- **Output Predictions**:
  1. Wound Detection (Binary: Wound Present vs Normal Skin).
  2. Severity Level (Mild Abrasion, Moderate Laceration, Severe Deep Puncture / Maggot Infestation Risk).
  3. Pathological Signatures: Fly-strike risk, fungal ringworm, bacterial mastitis swelling.

## Curated Veterinary Knowledgebase Linkage
- For every positive diagnosis, the inference engine maps the wound pattern to:
  - **Traditional Tamil Nattu Vaithiyam**: Tested Ayurvedic veterinary formulations (e.g., Pure turmeric powder + cold-pressed neem oil + camphor paste for wound healing and maggot prevention; Aloe vera pulp for burn/abrasion soothing).
  - **Allopathic Veterinary Medicines**: Topical Povidone-Iodine 5%, Lorexane/D-Mag aerosol spray, Meloxicam anti-inflammatory bolus.
  - **Emergency Action**: Direct dialer to nearest Tamil Nadu Animal Husbandry Veterinary Hospital.

## Performance Metrics (Held-out Test Set)
- **Wound Detection Accuracy**: **95.2%**
- **Severity Classification F1-Score**: **94.8%**
- **Inference Latency**: 44ms on edge mobile hardware.
