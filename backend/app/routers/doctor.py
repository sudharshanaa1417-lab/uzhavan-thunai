from fastapi import APIRouter
from ..schemas import CropDoctorRequest, CropDoctorResponse, AnimalDoctorRequest, AnimalDoctorResponse
from ..services.computer_vision import vision_service

router = APIRouter(prefix="/api/doctor", tags=["AI Crop & Animal Doctor"])

@router.post("/crop-scan", response_model=CropDoctorResponse)
def scan_crop_produce(req: CropDoctorRequest):
    """
    On-device MobileNetV3 edge grading for crop freshness, rot, and pest damage.
    """
    res = vision_service.analyze_crop_image(req.commodity)
    return CropDoctorResponse(
        quality_grade=res["quality_grade"],
        freshness_percent=res["freshness_percent"],
        is_rotten=res["is_rotten"],
        diagnosis=res["diagnosis"],
        action_plan=res["action_plan"],
        disease_detected=res["disease_detected"],
        model_name=res["model_name"],
        latency_ms=res["latency_ms"]
    )

@router.post("/animal-wound-scan", response_model=AnimalDoctorResponse)
def scan_animal_wound(req: AnimalDoctorRequest):
    """
    Diagnoses animal wounds, severity, Traditional Nattu Vaithiyam remedies, and vet medicine.
    """
    res = vision_service.analyze_animal_wound(req.animal_type)
    return AnimalDoctorResponse(
        wound_detected=res["wound_detected"],
        severity=res["severity"],
        infection_risk=res["infection_risk"],
        home_remedies_ta=res["home_remedies_ta"],
        vet_medicines=res["vet_medicines"],
        emergency_vet_phone=res["emergency_vet_phone"],
        model_name=res["model_name"]
    )
