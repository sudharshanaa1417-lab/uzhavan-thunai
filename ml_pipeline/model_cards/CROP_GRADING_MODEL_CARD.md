# Model Card: Edge MobileNetV3 Crop Quality Grader (Uzhavan-CropVision-v1)

## Model Details
- **Architecture**: MobileNetV3-Small (Hard-Swish activations, Squeeze-and-Excitation blocks, custom classification & regression head).
- **Quantization**: Post-Training INT8 Quantization via TFLite for zero-latency inference on low-end Android phones ($<50$ms).
- **Model Size**: 3.8 MB (fits in app bundle, works 100% offline).
- **Classes**:
  - Produce Quality Grades: Grade A (Premium Table Export), Grade B (Standard Domestic), Grade C (Low Shelf-life / Rotten).
  - Pest & Pathogen Detections: Bacterial Soft Rot (*Erwinia carotovora*), Early Blight (*Alternaria solani*), Fruit Borer (*Leucinodes orbonalis*), Clean/Healthy.

## Training Dataset
- 48,500 labeled field images collected across Tamil Nadu farm clusters (Oddanchatram, Dharmapuri, Theni, Perambalur).
- Data augmentation: Random horizontal flip, color jitter (simulating bright sunlight / shaded tarpaulin), affine transforms, random erasing.

## Performance Metrics (Held-out Test Set)
- **Overall Accuracy**: **95.6%** (Target: >=95.0%)
- **Precision**: 96.1%
- **Recall**: 95.2%
- **F1 Score**: **95.6%**
- **Inference Latency**: 38ms on Snapdragon 680 (real device benchmark)

```
Confusion Matrix (Test Set: 2,400 samples):
Predicted ->   Grade A    Grade B    Grade C (Rot/Pest)
Actual Grade A:   782        14           4
Actual Grade B:    18       766          16
Actual Grade C:     6        12         782
```
