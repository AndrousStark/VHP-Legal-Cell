/** VHP Legal Cell — 12 Chetras (Regions) mapping to Indian states */

export interface ChetraConfig {
  id: string;
  nameEn: string;
  nameHi: string;
  color: string;
  states: string[]; // ST_NM values from TopoJSON
}

/**
 * 12 VHP Chetras mapped to Indian states.
 * Colors chosen for visual distinction on the map.
 */
export const CHETRAS: ChetraConfig[] = [
  {
    id: "uttaranchal",
    nameEn: "Uttaranchal Chetra",
    nameHi: "उत्तरांचल क्षेत्र",
    color: "#E65100",
    states: ["Uttarakhand", "Himachal Pradesh"],
  },
  {
    id: "delhi",
    nameEn: "Delhi Chetra",
    nameHi: "दिल्ली क्षेत्र",
    color: "#C62828",
    states: ["NCT of Delhi", "Chandigarh"],
  },
  {
    id: "uttar-bharat",
    nameEn: "Uttar Bharat Chetra",
    nameHi: "उत्तर भारत क्षेत्र",
    color: "#AD1457",
    states: ["Punjab", "Haryana", "Jammu & Kashmir", "Ladakh"],
  },
  {
    id: "braj-chetra",
    nameEn: "Braj Chetra",
    nameHi: "ब्रज क्षेत्र",
    color: "#6A1B9A",
    states: ["Uttar Pradesh"],
  },
  {
    id: "awadh",
    nameEn: "Awadh Chetra",
    nameHi: "अवध क्षेत्र",
    color: "#283593",
    states: ["Bihar", "Jharkhand"],
  },
  {
    id: "purva",
    nameEn: "Purva Chetra",
    nameHi: "पूर्वा क्षेत्र",
    color: "#0277BD",
    states: ["West Bengal", "Odisha", "Sikkim"],
  },
  {
    id: "purvottar",
    nameEn: "Purvottar Chetra",
    nameHi: "पूर्वोत्तर क्षेत्र",
    color: "#00695C",
    states: ["Assam", "Meghalaya", "Arunachal Pradesh", "Nagaland", "Manipur", "Mizoram", "Tripura"],
  },
  {
    id: "madhya-bharat",
    nameEn: "Madhya Bharat Chetra",
    nameHi: "मध्य भारत क्षेत्र",
    color: "#2E7D32",
    states: ["Madhya Pradesh", "Chhattisgarh"],
  },
  {
    id: "rajasthan",
    nameEn: "Rajasthan Chetra",
    nameHi: "राजस्थान क्षेत्र",
    color: "#F9A825",
    states: ["Rajasthan"],
  },
  {
    id: "paschim",
    nameEn: "Paschim Chetra",
    nameHi: "पश्चिम क्षेत्र",
    color: "#EF6C00",
    states: ["Gujarat", "Maharashtra", "Goa", "Dadra and Nagar Haveli and Daman and Diu"],
  },
  {
    id: "dakshin-madhya",
    nameEn: "Dakshin Madhya Chetra",
    nameHi: "दक्षिण मध्य क्षेत्र",
    color: "#5D4037",
    states: ["Telangana", "Andhra Pradesh"],
  },
  {
    id: "dakshin",
    nameEn: "Dakshin Chetra",
    nameHi: "दक्षिण क्षेत्र",
    color: "#37474F",
    states: ["Karnataka", "Tamil Nadu", "Kerala", "Puducherry", "Lakshadweep", "Andaman and Nicobar Islands"],
  },
];

/** Find which Chetra a state belongs to */
export function getChetraForState(stateName: string): ChetraConfig | undefined {
  return CHETRAS.find((k) =>
    k.states.some((s) => s.toLowerCase() === stateName.toLowerCase())
  );
}

/** Get color for a state based on its Chetra */
export function getStateColor(stateName: string): string {
  return getChetraForState(stateName)?.color ?? "#9E9E9E";
}

/** Map projection config for India */
export const INDIA_PROJECTION = {
  center: [82, 22] as [number, number],
  scale: 1000,
};

/** Mock region statistics — will be replaced by API */
export const MOCK_REGION_STATS: Record<string, {
  cases: number;
  members: number;
  activities: number;
  resolutionRate: number;
}> = {
  "braj-chetra": { cases: 85, members: 120, activities: 12, resolutionRate: 78 },
  "delhi": { cases: 45, members: 80, activities: 8, resolutionRate: 82 },
  "rajasthan": { cases: 32, members: 60, activities: 6, resolutionRate: 75 },
  "paschim": { cases: 55, members: 95, activities: 10, resolutionRate: 80 },
  "madhya-bharat": { cases: 28, members: 50, activities: 5, resolutionRate: 72 },
  "dakshin": { cases: 22, members: 45, activities: 4, resolutionRate: 85 },
  "dakshin-madhya": { cases: 18, members: 35, activities: 3, resolutionRate: 70 },
  "purva": { cases: 15, members: 30, activities: 3, resolutionRate: 68 },
  "purvottar": { cases: 10, members: 25, activities: 2, resolutionRate: 65 },
  "awadh": { cases: 20, members: 40, activities: 4, resolutionRate: 73 },
  "uttar-bharat": { cases: 25, members: 55, activities: 5, resolutionRate: 76 },
  "uttaranchal": { cases: 12, members: 28, activities: 3, resolutionRate: 80 },
};
