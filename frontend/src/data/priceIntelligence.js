export const COMMODITIES_DATA = [
  {
    id: "tomato",
    name: "Tomato (தக்காளி)",
    category: "vegetables",
    unit: "kg",
    mandiPrices: {
      oddanchatram: 36,
      koyambedu: 44,
      mettupalayam: 38,
      uzhavarSandhai: 40,
      maduraiParavai: 37,
      trichyGandhi: 39
    },
    modalPrice: 38,
    mspPrice: 28, // Reference state benchmark
    arrivalsQuintal: 4200,
    forecast: {
      trend: "up", // up | down | stable
      confidence: 94,
      sevenDays: [
        { day: "Day 1 (Today)", price: 38, low: 36, high: 40 },
        { day: "Day 2", price: 40, low: 37, high: 42 },
        { day: "Day 3", price: 42, low: 39, high: 45 },
        { day: "Day 4", price: 44, low: 41, high: 48 },
        { day: "Day 5", price: 46, low: 42, high: 50 },
        { day: "Day 6", price: 45, low: 41, high: 49 },
        { day: "Day 7", price: 47, low: 43, high: 52 }
      ],
      recommendationDays: 4,
      reason: "Heavy rainfall in neighbouring Rayalaseema & Hosur belt will delay arrivals by 35% in Koyambedu. Holding 3-4 days yields 22% higher profit."
    },
    spoilageHours: 72,
    optimumTempC: "13-15°C"
  },
  {
    id: "shallots",
    name: "Small Onion / Chinna Vengayam (சின்ன வெங்காயம்)",
    category: "vegetables",
    unit: "kg",
    mandiPrices: {
      oddanchatram: 62,
      koyambedu: 74,
      mettupalayam: 68,
      uzhavarSandhai: 70,
      maduraiParavai: 65,
      trichyGandhi: 64
    },
    modalPrice: 66,
    mspPrice: 45,
    arrivalsQuintal: 1850,
    forecast: {
      trend: "up",
      confidence: 96,
      sevenDays: [
        { day: "Day 1 (Today)", price: 66, low: 62, high: 70 },
        { day: "Day 2", price: 68, low: 64, high: 72 },
        { day: "Day 3", price: 71, low: 67, high: 75 },
        { day: "Day 4", price: 74, low: 70, high: 78 },
        { day: "Day 5", price: 78, low: 73, high: 83 },
        { day: "Day 6", price: 81, low: 76, high: 86 },
        { day: "Day 7", price: 84, low: 78, high: 90 }
      ],
      recommendationDays: 5,
      reason: "Trichy and Perambalur harvest cycle tapering down; marriage season in Madurai and Tirunelveli drives peak demand."
    },
    spoilageHours: 360,
    optimumTempC: "25-30°C dry ventilated"
  },
  {
    id: "paddyPonni",
    name: "Paddy Ponni (பொன்னி நெல்)",
    category: "crops",
    unit: "quintal",
    mandiPrices: {
      oddanchatram: 2520,
      koyambedu: 2680,
      mettupalayam: 2550,
      uzhavarSandhai: 2600,
      maduraiParavai: 2540,
      trichyGandhi: 2580
    },
    modalPrice: 2560,
    mspPrice: 2320, // TN Govt + Central MSP + Incentive
    arrivalsQuintal: 9400,
    forecast: {
      trend: "stable",
      confidence: 97,
      sevenDays: [
        { day: "Day 1 (Today)", price: 2560, low: 2520, high: 2600 },
        { day: "Day 2", price: 2565, low: 2525, high: 2605 },
        { day: "Day 3", price: 2570, low: 2530, high: 2610 },
        { day: "Day 4", price: 2580, low: 2540, high: 2620 },
        { day: "Day 5", price: 2585, low: 2545, high: 2625 },
        { day: "Day 6", price: 2590, low: 2550, high: 2630 },
        { day: "Day 7", price: 2595, low: 2550, high: 2640 }
      ],
      recommendationDays: 0,
      reason: "Direct Purchase Centres (DPCs) active across Delta with ₹100 bonus incentive over central MSP. Sell to DPC or wholesale millers now."
    },
    spoilageHours: 8760,
    optimumTempC: "Dry storage <14% moisture"
  },
  {
    id: "countryGoat",
    name: "Salem Black / Kanni Goat (கன்னி / சேலம் ஆடு)",
    category: "livestock",
    unit: "kg",
    mandiPrices: {
      oddanchatram: 540,
      koyambedu: 620,
      mettupalayam: 560,
      uzhavarSandhai: 580,
      maduraiParavai: 590,
      trichyGandhi: 570
    },
    modalPrice: 575,
    mspPrice: 480,
    arrivalsQuintal: 620,
    forecast: {
      trend: "up",
      confidence: 95,
      sevenDays: [
        { day: "Day 1 (Today)", price: 575, low: 550, high: 600 },
        { day: "Day 2", price: 585, low: 560, high: 610 },
        { day: "Day 3", price: 600, low: 575, high: 625 },
        { day: "Day 4", price: 615, low: 590, high: 640 },
        { day: "Day 5", price: 630, low: 600, high: 660 },
        { day: "Day 6", price: 645, low: 615, high: 675 },
        { day: "Day 7", price: 660, low: 630, high: 690 }
      ],
      recommendationDays: 6,
      reason: "Upcoming festival weekend and temple festivals in Madurai and Tirunelveli district. Live weight value appreciates ₹85/kg over next 6 days."
    },
    spoilageHours: null,
    optimumTempC: null
  },
  {
    id: "countryHen",
    name: "Free-range Nattu Kozhi (நாட்டுக்கோழி)",
    category: "poultry",
    unit: "kg",
    mandiPrices: {
      oddanchatram: 380,
      koyambedu: 440,
      mettupalayam: 410,
      uzhavarSandhai: 420,
      maduraiParavai: 400,
      trichyGandhi: 395
    },
    modalPrice: 410,
    mspPrice: 320,
    arrivalsQuintal: 450,
    forecast: {
      trend: "up",
      confidence: 93,
      sevenDays: [
        { day: "Day 1 (Today)", price: 410, low: 390, high: 430 },
        { day: "Day 2", price: 415, low: 395, high: 435 },
        { day: "Day 3", price: 425, low: 405, high: 445 },
        { day: "Day 4", price: 435, low: 415, high: 455 },
        { day: "Day 5", price: 445, low: 425, high: 465 },
        { day: "Day 6", price: 450, low: 430, high: 470 },
        { day: "Day 7", price: 460, low: 440, high: 480 }
      ],
      recommendationDays: 5,
      reason: "Sunday market rush in Chennai and Coimbatore creates premium demand for genuine country fowl over broiler."
    },
    spoilageHours: null,
    optimumTempC: null
  },
  {
    id: "kangayamCow",
    name: "Kangayam Native Cow (காங்கேயம் நாட்டு மாடு)",
    category: "livestock",
    unit: "head",
    mandiPrices: {
      oddanchatram: 68000,
      koyambedu: 82000,
      mettupalayam: 74000,
      uzhavarSandhai: 75000,
      maduraiParavai: 72000,
      trichyGandhi: 71000
    },
    modalPrice: 73000,
    mspPrice: 55000,
    arrivalsQuintal: 85,
    forecast: {
      trend: "up",
      confidence: 92,
      sevenDays: [
        { day: "Day 1 (Today)", price: 73000, low: 70000, high: 76000 },
        { day: "Day 2", price: 73500, low: 70500, high: 76500 },
        { day: "Day 3", price: 74200, low: 71000, high: 77500 },
        { day: "Day 4", price: 75000, low: 72000, high: 78000 },
        { day: "Day 5", price: 76000, low: 73000, high: 79000 },
        { day: "Day 6", price: 76800, low: 73500, high: 80000 },
        { day: "Day 7", price: 78000, low: 74500, high: 82000 }
      ],
      recommendationDays: 5,
      reason: "High organic A2 milk demand and Anthiyur annual cattle fair attracting buyers from Kerala and Karnataka."
    },
    spoilageHours: null,
    optimumTempC: null
  },
  {
    id: "a2Milk",
    name: "Pure Country Cow Milk (நாட்டு மாட்டு A2 பால்)",
    category: "dairy",
    unit: "litre",
    mandiPrices: {
      oddanchatram: 50,
      koyambedu: 65,
      mettupalayam: 55,
      uzhavarSandhai: 58,
      maduraiParavai: 52,
      trichyGandhi: 54
    },
    modalPrice: 56,
    mspPrice: 38, // Aavin base purchase rate ₹38-42
    arrivalsQuintal: 14000,
    forecast: {
      trend: "stable",
      confidence: 98,
      sevenDays: [
        { day: "Day 1", price: 56, low: 54, high: 58 },
        { day: "Day 2", price: 56, low: 54, high: 58 },
        { day: "Day 3", price: 57, low: 55, high: 59 },
        { day: "Day 4", price: 57, low: 55, high: 59 },
        { day: "Day 5", price: 58, low: 56, high: 60 },
        { day: "Day 6", price: 58, low: 56, high: 60 },
        { day: "Day 7", price: 58, low: 56, high: 60 }
      ],
      recommendationDays: 0,
      reason: "Direct door-to-door or apartment society contracts in Coimbatore/Chennai give ₹58-65/L vs ₹38 at local collection centers."
    },
    spoilageHours: 12,
    optimumTempC: "4°C chilled"
  },
  {
    id: "countryEggs",
    name: "Pure Country Chicken Eggs (நாட்டுக்கோழி முட்டை)",
    category: "poultry",
    unit: "dozen",
    mandiPrices: {
      oddanchatram: 110,
      koyambedu: 135,
      mettupalayam: 120,
      uzhavarSandhai: 125,
      maduraiParavai: 115,
      trichyGandhi: 118
    },
    modalPrice: 120,
    mspPrice: 90,
    arrivalsQuintal: 890,
    forecast: {
      trend: "up",
      confidence: 95,
      sevenDays: [
        { day: "Day 1", price: 120, low: 115, high: 125 },
        { day: "Day 2", price: 122, low: 117, high: 127 },
        { day: "Day 3", price: 125, low: 120, high: 130 },
        { day: "Day 4", price: 128, low: 122, high: 134 },
        { day: "Day 5", price: 130, low: 125, high: 136 },
        { day: "Day 6", price: 132, low: 127, high: 138 },
        { day: "Day 7", price: 135, low: 130, high: 140 }
      ],
      recommendationDays: 4,
      reason: "NECC rate stable, but organic brown free-range eggs command 35% premium in urban organic chains."
    },
    spoilageHours: 360,
    optimumTempC: "15-20°C"
  },
  {
    id: "maduraiMalli",
    name: "Madurai Malli / Jasmine (மதுரை மல்லி)",
    category: "crops",
    unit: "kg",
    mandiPrices: {
      oddanchatram: 650,
      koyambedu: 950,
      mettupalayam: 720,
      uzhavarSandhai: 800,
      maduraiParavai: 750,
      trichyGandhi: 700
    },
    modalPrice: 760,
    mspPrice: 400,
    arrivalsQuintal: 310,
    forecast: {
      trend: "up",
      confidence: 96,
      sevenDays: [
        { day: "Day 1", price: 760, low: 720, high: 800 },
        { day: "Day 2", price: 810, low: 760, high: 860 },
        { day: "Day 3", price: 880, low: 830, high: 930 },
        { day: "Day 4", price: 950, low: 900, high: 1000 },
        { day: "Day 5", price: 1020, low: 960, high: 1080 },
        { day: "Day 6", price: 980, low: 920, high: 1040 },
        { day: "Day 7", price: 920, low: 870, high: 970 }
      ],
      recommendationDays: 3,
      reason: "Muhurtham (auspicious wedding dates) on Days 4 & 5. Air export from Madurai to Dubai/Singapore peaking."
    },
    spoilageHours: 36,
    optimumTempC: "8-10°C"
  }
];
