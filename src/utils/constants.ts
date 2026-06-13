import { AnalysisResult, Message, CityData } from "../types";

export const INITIAL_RECEIPTS_HISTORY: AnalysisResult[] = [
  {
    items: [
      { id: "h1", name: "Full Cream Packet Milk", co2: 1.2, quantity: "2 Litres", category: "Dairy", ecoRating: "C", alternative: "Oat Milk or Soy Milk (0.3kg CO₂)" },
      { id: "h2", name: "Premium Raw Honey", co2: 0.4, quantity: "250g", category: "Produce", ecoRating: "A", alternative: "None needed (Local Organic)" }
    ],
    totalCo2: 1.6,
    explanation: "Initial account setup placeholder baseline. Organic sweeteners exhibit stable carbon weights, while milk drives dairy logistics indices."
  }
];

export const INITIAL_SCAN_RESULT: AnalysisResult = {
  items: [
    { id: "1", name: "Fresh Paneer", co2: 2.8, quantity: "500g", category: "Dairy", ecoRating: "C", alternative: "Firm Soy Tofu (0.6kg CO₂)" },
    { id: "2", name: "Pure Cow Ghee", co2: 4.8, quantity: "500ml", category: "Fats", ecoRating: "E", alternative: "Cold-Pressed Mustard Oil (0.8kg CO₂)" },
    { id: "3", name: "Organic Basmati Grains", co2: 1.6, quantity: "1kg", category: "Grains", ecoRating: "B", alternative: "Heritage Finger Millets (0.4kg CO₂)" }
  ],
  totalCo2: 9.2,
  explanation: "High dairy-fat loading (ghee and paneer) drives over 85% of this purchase's carbon load. Cow milk methane output in the local supply chain remains the critical bottleneck. Transitioning Ghee to wood-pressed plant fats lowers total footprint by nearly 4.0kg CO2."
};

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    role: "model",
    content: "Hello! I am your CarbonIQ Coach. Powered by Gemini-3.5 Intelligence, I leverage India's Carbon Intelligence Network agricultural and supply chain lifecycle metrics.\n\nI monitor your scanned receipts, carbon twin trajectories, and municipal trends. Ask me anything, such as 'Why is my footprint increasing?', 'What should I replace first?', or 'Compare me with Bengaluru averages'.",
    timestamp: new Date(Date.now() - 120000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  },
  {
    id: "init-2",
    role: "user",
    content: "How do dairy emissions in India compare to plant-based fats, and what are the actual cost and carbon savings of swapping?",
    timestamp: new Date(Date.now() - 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  },
  {
    id: "init-3",
    role: "model",
    content: "Dairy fat production (specifically Cow Ghee and Butter) carries a significantly high environmental footprint in India due to enteric fermentation in ruminants and coal-heavy logistics grids.\n\nHere is a direct lifecycle comparison of **500g Ghee/Butter** vs. **500ml Cold-Pressed Mustard/Til Oil**:\n\n| Ingredient Element | Carbon Coefficient | Avg. Retail Cost | Water Requirement | Eco Rating |\n| :--- | :--- | :--- | :--- | :--- |\n| **Pure Cow Ghee / Butter** | **4.8 kg CO₂e** | **₹350** | ~2,500 Litres | **E** (Critical) |\n| **Cold-Pressed Mustard Oil** | **0.8 kg CO₂e** | **₹110** | ~120 Litres | **A** (Optimal) |\n| **Net Savings (Delta)** | **-4.0 kg CO₂e (83%)** | **₹240 Saved** | -2,380 Litres | **A+ Upgrade** |\n\n### 🌿 Indian Kitchen Mitigation Impact:\n* **Carbon Impact Equivalents:** Swapping a single 500g container of Ghee avoids **4.0 kg CO₂e**, which is equivalent to saving **16.2 km driven on a petrol scooter** or offsetting **0.25 LPG household cylinder burns**.\n* **Financial Delta:** Switching to cold-pressed mustard or til oil saves **₹240 per transaction** while upgrading your diet to healthy, monounsaturated fats.\n\nWould you like me to simulate the long-term impact on your **Carbon Twin** or suggest a millet recipe matching this oil profile?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export const INITIAL_CITIES_DATA: CityData[] = [
  { name: "Bengaluru", avgCo2: 4.2, rank: 2, trend: "improving", emissionLeader: "Siddharth Verma (-24%)", topSector: "Transport Decarbonization" },
  { name: "Mumbai", avgCo2: 5.1, rank: 3, trend: "increasing", emissionLeader: "Priya Sanghavi (-11%)", topSector: "Local Rail Commuting" },
  { name: "Pune", avgCo2: 3.7, rank: 1, trend: "improving", emissionLeader: "Aniket Deshpande (-32%)", topSector: "Dietary Substitution" },
  { name: "Delhi Node", avgCo2: 6.2, rank: 4, trend: "increasing", emissionLeader: "Siddharth Goel (-6%)", topSector: "EV Logistics Hub" }
];

export const INITIAL_WEEKLY_MISSIONS = [
  { id: "m1", title: "Substitute Dairy Butter for plant fat", co2Saving: 2.4, monetarySaving: 40, status: "available", isCommit: false },
  { id: "m2", title: "Reduce home dairy volume by 10%", co2Saving: 3.5, monetarySaving: 120, status: "active", isCommit: true },
  { id: "m3", title: "Complete 3 low-carbon grocery trips", co2Saving: 1.8, monetarySaving: 60, status: "available", isCommit: false },
  { id: "m4", title: "Switch Basmati rice with Finger Millets", co2Saving: 1.2, monetarySaving: 30, status: "completed", isCommit: false }
];

export const OFFLINE_FALLBACK_RESULT: AnalysisResult = {
  items: [
    { id: "fb-1", name: "Premium Raw Butter", co2: 2.4, quantity: "250g", category: "Dairy", ecoRating: "D", alternative: "Regional Cold-pressed Sunflower Spread (0.5kg CO₂)" },
    { id: "fb-2", name: "Basmati Grains (Aged)", co2: 1.5, quantity: "1kg", category: "Grains", ecoRating: "B", alternative: "Local Organic finger Millets (0.3kg CO₂)" },
    { id: "fb-3", name: "Toned Milk Curd Packet", co2: 1.0, quantity: "400g", category: "Dairy", ecoRating: "C", alternative: "Soy-fermented Yogurt Cup (0.2kg CO₂)" }
  ],
  totalCo2: 4.9,
  explanation: "Automatic parse completed via local offline parameters. This grocery basket presents elevated dairy carbon coefficients. Swapping local pasture butter can save over 1.9kg directly."
};

