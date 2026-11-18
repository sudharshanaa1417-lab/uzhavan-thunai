from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/api/fpo", tags=["FPO Group Selling & Transport Pooling"])

@router.get("/active-pools")
def get_active_pools():
    return [
        {
            "pool_id": "pool-1",
            "route": "Oddanchatram North → Koyambedu (Chennai)",
            "vehicle": "Eicher 14ft Mini Lorry (4 Tonnes)",
            "departure": "Today 7:30 PM",
            "current_load_kg": 2800,
            "max_capacity_kg": 4000,
            "freight_per_kg": 1.40,
            "farmers_count": 4,
            "savings_percent": 60
        },
        {
            "pool_id": "pool-2",
            "route": "Palani / Oddanchatram → Mettupalayam Agro Hub",
            "vehicle": "Mahindra Bolero Pickup (1.8 Tonnes)",
            "departure": "Tomorrow 4:00 AM",
            "current_load_kg": 1100,
            "max_capacity_kg": 1800,
            "freight_per_kg": 0.95,
            "farmers_count": 2,
            "savings_percent": 55
        }
    ]
