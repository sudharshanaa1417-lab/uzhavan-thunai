export const TAMIL_NADU_DISTRICTS = [
  "Dindigul", "Madurai", "Coimbatore", "Thanjavur", "Salem", 
  "Tiruchirappalli", "Tiruppur", "Erode", "Dharmapuri", "Theni", 
  "Tirunelveli", "Villupuram", "Cuddalore", "Vellore", "Kanchipuram"
];

export const TAMIL_NADU_MANDIS = [
  {
    id: "oddanchatram",
    name: "Oddanchatram Vegetable Market",
    nameTa: "ஒட்டன்சத்திரம் காய்கறி சந்தை",
    district: "Dindigul",
    type: "Major Wholesale Mandi",
    specialty: "Tomato, Drumstick, Beans, Brinjal, Chilli",
    commissionRate: 0.02, // 2%
    unloadingPerQuintal: 25,
    distanceKm: {
      "Dindigul": 28,
      "Madurai": 88,
      "Theni": 72,
      "Coimbatore": 105,
      "Tiruppur": 82,
      "Erode": 96,
      "Salem": 160,
      "Tiruchirappalli": 125,
      "Thanjavur": 175,
      "Dharmapuri": 215,
      "Tirunelveli": 225,
      "Villupuram": 290,
      "Vellore": 350
    }
  },
  {
    id: "koyambedu",
    name: "Koyambedu Wholesale Market Complex (KWMC)",
    nameTa: "கோயம்பேடு மொத்த விற்பனை வளாகம் (சென்னை)",
    district: "Chennai",
    type: "Mega Metropolitan Hub",
    specialty: "All vegetables, fruits, flowers, export clearing",
    commissionRate: 0.035, // 3.5%
    unloadingPerQuintal: 40,
    distanceKm: {
      "Villupuram": 160,
      "Cuddalore": 190,
      "Vellore": 138,
      "Kanchipuram": 72,
      "Salem": 340,
      "Tiruchirappalli": 325,
      "Thanjavur": 350,
      "Dharmapuri": 295,
      "Erode": 395,
      "Coimbatore": 505,
      "Dindigul": 430,
      "Madurai": 460,
      "Theni": 495,
      "Tirunelveli": 615
    }
  },
  {
    id: "mettupalayam",
    name: "Mettupalayam Agro Hub",
    nameTa: "மேட்டுப்பாளையம் உருளை & காய்கறி சந்தை",
    district: "Coimbatore",
    type: "Hill & Plains Gateway Mandi",
    specialty: "Potato, Carrot, Cabbage, Garlic, Ginger, Banana",
    commissionRate: 0.025,
    unloadingPerQuintal: 30,
    distanceKm: {
      "Coimbatore": 36,
      "Tiruppur": 68,
      "Erode": 98,
      "Salem": 165,
      "Dindigul": 140,
      "Madurai": 205,
      "Dharmapuri": 210,
      "Tiruchirappalli": 220,
      "Theni": 185
    }
  },
  {
    id: "uzhavarSandhai",
    name: "Local Uzhavar Sandhai (Farmer Market)",
    nameTa: "உள்ளூர் உழவர் சந்தை (நேரடி நுகர்வோர்)",
    district: "Local Taluk",
    type: "TN Govt Direct Market (0% Commission)",
    specialty: "Fresh vegetables, greens, fruits, flowers",
    commissionRate: 0.00, // 0% commission!
    unloadingPerQuintal: 0, // Farmer sells directly
    distanceKm: {
      "Dindigul": 12,
      "Madurai": 10,
      "Coimbatore": 15,
      "Thanjavur": 8,
      "Salem": 12,
      "Tiruchirappalli": 10,
      "Tiruppur": 14,
      "Erode": 11,
      "Dharmapuri": 16,
      "Theni": 9,
      "Tirunelveli": 12,
      "Villupuram": 14
    }
  },
  {
    id: "maduraiParavai",
    name: "Madurai Paravai Central Market",
    nameTa: "மதுரை பரவை காய்கறி & மல்லிகை சந்தை",
    district: "Madurai",
    type: "South TN Regional Hub",
    specialty: "Malli (Jasmine), Onion, Tomato, Banana, Mutton livestock",
    commissionRate: 0.02,
    unloadingPerQuintal: 25,
    distanceKm: {
      "Madurai": 12,
      "Dindigul": 56,
      "Theni": 68,
      "Tirunelveli": 150,
      "Tiruchirappalli": 130,
      "Thanjavur": 180,
      "Coimbatore": 210,
      "Erode": 195,
      "Salem": 220
    }
  },
  {
    id: "trichyGandhi",
    name: "Trichy Gandhi Market",
    nameTa: "திருச்சி காந்தி மார்க்கெட்",
    district: "Tiruchirappalli",
    type: "Central Delta Hub",
    specialty: "Banana, Paddy, Onion, Brinjal, Country Chicken",
    commissionRate: 0.02,
    unloadingPerQuintal: 25,
    distanceKm: {
      "Tiruchirappalli": 6,
      "Thanjavur": 55,
      "Dindigul": 102,
      "Madurai": 132,
      "Salem": 138,
      "Villupuram": 160,
      "Perambalur": 54,
      "Karur": 82
    }
  }
];

export const VEHICLE_OPTIONS = [
  { id: "tataAce", name: "Tata Ace (Chota Hathi)", capacityKg: 1000, ratePerKm: 14, icon: "Truck" },
  { id: "bolero", name: "Mahindra Bolero Pickup", capacityKg: 1800, ratePerKm: 18, icon: "Truck" },
  { id: "eicher", name: "Eicher 14ft Mini Lorry", capacityKg: 4000, ratePerKm: 26, icon: "Truck" }
];
