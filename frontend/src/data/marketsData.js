export const ALL_38_TN_DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", 
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", 
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", 
  "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", 
  "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", 
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", 
  "Vellore", "Viluppuram", "Virudhunagar"
];

export const TAMIL_NADU_DISTRICTS = ALL_38_TN_DISTRICTS;

// Top price highlights across Tamil Nadu today (shown at top of Market explorer)
export const TOP_PRICE_HIGHLIGHTS = [
  {
    id: "top-1",
    commodity: "Tomato (தக்காளி)",
    category: "vegetables",
    highestDistrict: "Chennai (Koyambedu)",
    highestPrice: 48,
    unit: "kg",
    stateAverage: 37,
    diffPercent: "+29.7%",
    note: "Peak metro demand; arrivals from Karnataka delayed."
  },
  {
    id: "top-2",
    commodity: "Small Onion / Shallots (சின்ன வெங்காயம்)",
    category: "vegetables",
    highestDistrict: "Dindigul (Oddanchatram)",
    highestPrice: 78,
    unit: "kg",
    stateAverage: 62,
    diffPercent: "+25.8%",
    note: "Export quality podi shallots receiving Dubai orders."
  },
  {
    id: "top-3",
    commodity: "Salem Black Meat Goat (சேலம் ஆடு)",
    category: "livestock",
    highestDistrict: "Salem (Mecheri)",
    highestPrice: 640,
    unit: "kg live weight",
    stateAverage: 560,
    diffPercent: "+14.3%",
    note: "Top buyer competition from Bangalore hotel consortium."
  },
  {
    id: "top-4",
    commodity: "Madurai Malli / Jasmine (மதுரை மல்லிகை)",
    category: "flowers",
    highestDistrict: "Madurai (Paravai Market)",
    highestPrice: 1250,
    unit: "kg",
    stateAverage: 780,
    diffPercent: "+60.2%",
    note: "Pre-wedding muhurtham rush & airport air-cargo dispatch."
  },
  {
    id: "top-5",
    commodity: "Pollachi Tender Coconut (இளநீர்)",
    category: "fruits",
    highestDistrict: "Coimbatore (Pollachi)",
    highestPrice: 38,
    unit: "nut",
    stateAverage: 28,
    diffPercent: "+35.7%",
    note: "High sweetness electrolyte content drawing premium highway vendors."
  }
];

// Master Catalog of commodities with categorized items
export const DISTRICT_COMMODITIES_CATALOG = {
  vegetables: [
    { id: "tomato", name: "Tomato (தக்காளி)", unit: "kg", baseRate: 38, minRate: 34, maxRate: 46 },
    { id: "shallots", name: "Small Onion / Shallots (சின்ன வெங்காயம்)", unit: "kg", baseRate: 68, minRate: 60, maxRate: 78 },
    { id: "bellary", name: "Bellary Big Onion (பெல்லாரி வெங்காயம்)", unit: "kg", baseRate: 34, minRate: 28, maxRate: 40 },
    { id: "brinjal", name: "Brinjal (கத்தரிக்காய்)", unit: "kg", baseRate: 32, minRate: 26, maxRate: 38 },
    { id: "drumstick", name: "Drumstick (முருங்கைக்காய்)", unit: "kg", baseRate: 55, minRate: 45, maxRate: 68 },
    { id: "chilli", name: "Green Chilli (பச்சை மிளகாய்)", unit: "kg", baseRate: 48, minRate: 40, maxRate: 58 },
    { id: "ladiesfinger", name: "Lady's Finger / Bhindi (வெண்டைக்காய்)", unit: "kg", baseRate: 30, minRate: 24, maxRate: 36 },
    { id: "potato", name: "Potato (உருளைக்கிழங்கு)", unit: "kg", baseRate: 36, minRate: 30, maxRate: 42 },
    { id: "carrot", name: "Carrot (கேரட்)", unit: "kg", baseRate: 52, minRate: 44, maxRate: 64 },
    { id: "cabbage", name: "Cabbage (முட்டைக்கோஸ்)", unit: "kg", baseRate: 22, minRate: 18, maxRate: 28 }
  ],
  fruits: [
    { id: "bananaPoovan", name: "Poovan Banana (பூவன் வாழை)", unit: "bunch", baseRate: 420, minRate: 350, maxRate: 500 },
    { id: "bananaNendran", name: "Nendran Banana (நேந்திரன் வாழை)", unit: "kg", baseRate: 42, minRate: 36, maxRate: 48 },
    { id: "mangoBanganapalli", name: "Banganapalli Mango (பங்கனபள்ளி மாம்பழம்)", unit: "kg", baseRate: 75, minRate: 60, maxRate: 90 },
    { id: "tenderCoconut", name: "Tender Coconut (இளநீர்)", unit: "nut", baseRate: 32, minRate: 26, maxRate: 38 },
    { id: "papaya", name: "Red Lady Papaya (பப்பாளி)", unit: "kg", baseRate: 24, minRate: 18, maxRate: 30 },
    { id: "guava", name: "Taiwan Pink Guava (கொய்யா)", unit: "kg", baseRate: 45, minRate: 38, maxRate: 54 },
    { id: "watermelon", name: "Watermelon (தர்பூசணி)", unit: "kg", baseRate: 18, minRate: 14, maxRate: 24 }
  ],
  grains: [
    { id: "paddyPonni", name: "Deluxe Ponni Paddy (பொன்னி நெல்)", unit: "quintal", baseRate: 2560, minRate: 2450, maxRate: 2680 },
    { id: "paddyCR1009", name: "CR 1009 Sub 1 Paddy (வடிசல் நெல்)", unit: "quintal", baseRate: 2380, minRate: 2320, maxRate: 2450 },
    { id: "ragi", name: "Finger Millet / Ragi (கேழ்வரகு)", unit: "quintal", baseRate: 3600, minRate: 3300, maxRate: 3900 },
    { id: "kambu", name: "Pearl Millet / Kambu (கம்பு)", unit: "quintal", baseRate: 3100, minRate: 2800, maxRate: 3400 },
    { id: "sugarcane", name: "Sugarcane (கரும்பு)", unit: "tonne", baseRate: 3250, minRate: 3100, maxRate: 3500 },
    { id: "cotton", name: "Cotton / Kapas (பருத்தி)", unit: "quintal", baseRate: 7400, minRate: 6900, maxRate: 7900 }
  ],
  dairyEggs: [
    { id: "a2Milk", name: "Pure A2 Native Cow Milk (A2 பசும்பால்)", unit: "litre", baseRate: 58, minRate: 52, maxRate: 65 },
    { id: "cowMilk", name: "Standard Cow Milk (பசும்பால்)", unit: "litre", baseRate: 42, minRate: 38, maxRate: 46 },
    { id: "countryEggs", name: "Free-range Country Eggs (நாட்டுக்கோழி முட்டை)", unit: "dozen", baseRate: 120, minRate: 108, maxRate: 135 },
    { id: "broilerEggs", name: "Farm White Eggs (பண்ணை முட்டை)", unit: "dozen", baseRate: 68, minRate: 62, maxRate: 74 },
    { id: "desiGhee", name: "Pure Bilona Desi Ghee (நாட்டு நெய்)", unit: "kg", baseRate: 850, minRate: 750, maxRate: 950 }
  ],
  livestock: [
    { id: "salemGoat", name: "Salem Black Meat Goat (சேலம் ஆடு)", unit: "kg", baseRate: 580, minRate: 520, maxRate: 640 },
    { id: "kanniGoat", name: "Kanni Native Goat (கன்னி ஆடு)", unit: "kg", baseRate: 560, minRate: 500, maxRate: 620 },
    { id: "mecheriSheep", name: "Mecheri Ram / Sheep (மேச்சேரி செம்மறி ஆடு)", unit: "kg", baseRate: 540, minRate: 490, maxRate: 600 },
    { id: "kangayamCow", name: "Kangayam Native Milking Cow (காங்கேயம் மாடு)", unit: "head", baseRate: 74000, minRate: 62000, maxRate: 85000 },
    { id: "countryHen", name: "Country Chicken / Nattu Kozhi (நாட்டுக்கோழி)", unit: "kg", baseRate: 420, minRate: 380, maxRate: 460 },
    { id: "aseelCock", name: "Aseel Fighting Rooster (அசல் சண்டை சேவல்)", unit: "head", baseRate: 1800, minRate: 1200, maxRate: 3500 }
  ],
  flowers: [
    { id: "maduraiMalli", name: "Madurai Malli / Jasmine (மதுரை மல்லிகை)", unit: "kg", baseRate: 850, minRate: 650, maxRate: 1250 },
    { id: "marigold", name: "Orange / Yellow Marigold (செண்டுமல்லி)", unit: "kg", baseRate: 65, minRate: 45, maxRate: 85 },
    { id: "rose", name: "Button Rose (பன்னீர் ரோஜா)", unit: "kg", baseRate: 140, minRate: 110, maxRate: 190 },
    { id: "sevvanthi", name: "Sevvanthi / Chrysanthemum (சாமந்தி)", unit: "kg", baseRate: 110, minRate: 80, maxRate: 150 }
  ]
};

// Major wholesale mandis across Tamil Nadu for Smart Sell Advisor
export const TAMIL_NADU_MANDIS = [
  {
    id: "oddanchatram",
    name: "Oddanchatram Vegetable Market",
    nameTa: "ஒட்டன்சத்திரம் காய்கறி சந்தை",
    district: "Dindigul",
    type: "Major Wholesale Mandi",
    specialty: "Tomato, Drumstick, Beans, Brinjal, Chilli",
    commissionRate: 0.02,
    unloadingPerQuintal: 25,
    distanceKm: {
      "Dindigul": 28, "Madurai": 88, "Theni": 72, "Coimbatore": 105,
      "Tiruppur": 82, "Erode": 96, "Salem": 160, "Tiruchirappalli": 125,
      "Thanjavur": 175, "Dharmapuri": 215, "Tirunelveli": 225, "Chennai": 430
    }
  },
  {
    id: "koyambedu",
    name: "Koyambedu Wholesale Complex (Chennai)",
    nameTa: "கோயம்பேடு மொத்த விற்பனை வளாகம் (சென்னை)",
    district: "Chennai",
    type: "Mega Metropolitan Hub",
    specialty: "All vegetables, fruits, flowers, export clearing",
    commissionRate: 0.035,
    unloadingPerQuintal: 40,
    distanceKm: {
      "Chennai": 8, "Kanchipuram": 72, "Vellore": 138, "Viluppuram": 160,
      "Cuddalore": 190, "Salem": 340, "Tiruchirappalli": 325, "Thanjavur": 350,
      "Dharmapuri": 295, "Erode": 395, "Coimbatore": 505, "Dindigul": 430, "Madurai": 460
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
      "Coimbatore": 36, "Nilgiris": 42, "Tiruppur": 68, "Erode": 98,
      "Salem": 165, "Dindigul": 140, "Madurai": 205, "Tiruchirappalli": 220
    }
  },
  {
    id: "uzhavarSandhai",
    name: "Local Uzhavar Sandhai (Farmer Direct)",
    nameTa: "உள்ளூர் உழவர் சந்தை (0% கமிஷன் நேரடி சந்தை)",
    district: "Local District",
    type: "TN Govt Direct Market (0% Commission)",
    specialty: "Fresh vegetables, greens, fruits, flowers",
    commissionRate: 0.00,
    unloadingPerQuintal: 0,
    distanceKm: {
      "Dindigul": 12, "Madurai": 10, "Coimbatore": 15, "Thanjavur": 8,
      "Salem": 12, "Tiruchirappalli": 10, "Tiruppur": 14, "Erode": 11, "Chennai": 14
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
      "Madurai": 12, "Dindigul": 56, "Theni": 68, "Tirunelveli": 150,
      "Tiruchirappalli": 130, "Thanjavur": 180, "Sivaganga": 48, "Virudhunagar": 52
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
      "Tiruchirappalli": 6, "Thanjavur": 55, "Perambalur": 54, "Karur": 82,
      "Pudukkottai": 58, "Dindigul": 102, "Madurai": 132, "Salem": 138
    }
  }
];

export const VEHICLE_OPTIONS = [
  { id: "tataAce", name: "Tata Ace (Chota Hathi)", capacityKg: 1000, ratePerKm: 14, icon: "Truck" },
  { id: "bolero", name: "Mahindra Bolero Pickup", capacityKg: 1800, ratePerKm: 18, icon: "Truck" },
  { id: "eicher", name: "Eicher 14ft Mini Lorry", capacityKg: 4000, ratePerKm: 26, icon: "Truck" }
];
