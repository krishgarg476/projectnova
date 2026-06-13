// Per-product descriptions, reviews, bundles, brand metadata.
// Used by ProductDetailModal and Smart Bundles row.

export interface ReviewMock { name: string; rating: number; text: string; date: string; }
export interface ProductMeta {
  description: string;
  reviews: ReviewMock[];
  bundlePartners?: string[]; // names of bundle items
}

const GENERIC_REVIEWS: ReviewMock[] = [
  { name: "Anjali V.", rating: 5, text: "Quality product, delivered fast. Exactly as described.", date: "2 weeks ago" },
  { name: "Rahul M.", rating: 4, text: "Good value for money. Packaging could be better but contents are fine.", date: "1 month ago" },
  { name: "Sneha P.", rating: 5, text: "Repurchasing — this is a household staple for us now.", date: "3 weeks ago" },
];

const CATALOG: Record<string, ProductMeta> = {
  // Homepage deal-grid
  d1: {
    description: "Replenish lost electrolytes quickly with WHO-recommended oral rehydration salts. Each sachet mixes with 200ml water for instant relief during dehydration, fever, or heat exhaustion. Pack of 10 individually sealed sachets for hygiene and portability.",
    reviews: [
      { name: "Dr. Mehta", rating: 5, text: "Recommend to all my patients for mild dehydration. Reliable formulation.", date: "1 week ago" },
      { name: "Priya K.", rating: 5, text: "Saved us during a stomach bug — kids tolerated the orange flavour well.", date: "3 weeks ago" },
      { name: "Vikram S.", rating: 4, text: "Works as expected. Wish there were more flavour options.", date: "2 months ago" },
    ],
    bundlePartners: ["Electrolyte Drink", "Digital Thermometer", "Paracetamol 500mg"],
  },
  d2: {
    description: "Long-grain basmati rice aged for 12 months for the perfect aroma and non-sticky cooked texture. Sourced from the foothills of the Himalayas, ideal for biryani, pulao, and everyday meals. Resealable 5kg pack keeps grains fresh.",
    reviews: [
      { name: "Anu G.", rating: 5, text: "Grains separate beautifully — restaurant-quality biryani at home.", date: "1 week ago" },
      { name: "Karan P.", rating: 5, text: "5kg lasts our family of 4 nearly a month. Great price.", date: "2 weeks ago" },
      { name: "Meera R.", rating: 4, text: "Good rice, but I prefer a slightly stronger aroma.", date: "1 month ago" },
    ],
    bundlePartners: ["Tata Sampann Toor Dal 1kg", "Cooking Oil 1L"],
  },
  d3: {
    description: "20,000 mAh dual-port power bank with PD 22.5W fast charging. Charges a phone fully 4-5 times. LED indicator shows remaining capacity. Compact and travel-friendly with airline-safe lithium cells.",
    reviews: [
      { name: "Aditya N.", rating: 5, text: "Fast charging actually works — full phone charge in under an hour.", date: "5 days ago" },
      { name: "Riya T.", rating: 4, text: "Heavier than expected but capacity is genuine.", date: "2 weeks ago" },
      { name: "Sahil B.", rating: 5, text: "Got me through a 14-hour blackout last week. Worth every rupee.", date: "1 month ago" },
    ],
  },
  d4: {
    description: "BPA-free stainless steel insulated lunch box set with three compartments. Keeps food warm for 4-6 hours or cool for 8 hours. Leak-proof silicone seal, includes carry bag and reusable cutlery.",
    reviews: [
      { name: "Pooja M.", rating: 5, text: "Coffee was still hot when I opened it at 2 PM. Brilliant.", date: "1 week ago" },
      { name: "Naveen L.", rating: 4, text: "Sturdy build but the cutlery feels lightweight.", date: "3 weeks ago" },
    ],
  },
  d5: {
    description: "Set of 12 long-burning emergency candles, each lasting 6-8 hours. Dripless, smokeless paraffin wax in a stable jar base. Essential for power cuts, religious occasions, or ambiance.",
    reviews: [
      { name: "Kavya D.", rating: 5, text: "Used during our 5-hour power cut — clean burn, no soot.", date: "2 weeks ago" },
      { name: "Manish J.", rating: 4, text: "Good value. Wish the jars were a bit taller.", date: "1 month ago" },
    ],
    bundlePartners: ["LED Rechargeable Torch", "Matchbox (10-pack)"],
  },
  d6: {
    description: "30 individually sealed instant coffee sachets in rich Colombian roast. Just add hot water for cafe-style coffee in seconds. Perfect for office, travel, or quick morning fix.",
    reviews: [
      { name: "Suresh T.", rating: 4, text: "Better than expected for instant. Smooth, not bitter.", date: "1 week ago" },
      { name: "Ira K.", rating: 5, text: "Lifesaver for early morning shifts.", date: "3 weeks ago" },
    ],
    bundlePartners: ["Amul Toned Milk 1L", "Britannia Marie Biscuits"],
  },
  d7: {
    description: "Hand-picked, unpolished toor dal rich in protein and fibre. Tata Sampann ensures higher protein content than regular polished dal. Cooks evenly in a pressure cooker in 15 minutes.",
    reviews: [
      { name: "Lakshmi V.", rating: 5, text: "Cooks faster than my old brand and tastes more wholesome.", date: "2 weeks ago" },
      { name: "Anil P.", rating: 5, text: "My grandmother approved — that's the highest praise.", date: "1 month ago" },
    ],
    bundlePartners: ["Premium Basmati Rice 5kg", "Cooking Oil 1L"],
  },
  d8: {
    description: "Three-pack of Colgate MaxFresh with cooling crystals for long-lasting fresh breath. Fluoride formula fights cavities. Each tube is 150g — a 3-month supply for one person.",
    reviews: [
      { name: "Tarun S.", rating: 5, text: "Tingling sensation lasts hours. Family favourite.", date: "1 week ago" },
      { name: "Renu A.", rating: 4, text: "Standard Colgate quality, good bulk deal.", date: "2 weeks ago" },
    ],
    bundlePartners: ["Bamboo Toothbrush (2-pack)", "Dental Floss"],
  },
  d9: {
    description: "Two-pack of soft whole wheat bread baked fresh daily. 100% whole grain, no maida, with added fibre. Stays fresh for 4 days when stored properly.",
    reviews: [
      { name: "Geeta H.", rating: 5, text: "Soft texture, perfect for toast or sandwiches.", date: "3 days ago" },
      { name: "Rohan B.", rating: 4, text: "Tastes genuinely whole-wheat, not bleached.", date: "1 week ago" },
    ],
    bundlePartners: ["Amul Butter 500g", "Mixed Fruit Jam"],
  },
  d10: {
    description: "Classic Amul salted butter, churned from fresh cream. Spreads easily, perfect for breakfast toast, parathas, or baking. 500g pack stays fresh for 6 months when refrigerated.",
    reviews: [
      { name: "Sundar M.", rating: 5, text: "Nothing beats Amul butter on hot toast. Timeless.", date: "1 week ago" },
      { name: "Niharika D.", rating: 4, text: "Slightly saltier than I prefer but quality is consistent.", date: "1 month ago" },
    ],
    bundlePartners: ["Whole Wheat Bread (2-pack)", "Mixed Fruit Jam"],
  },
  d11: {
    description: "Maggi's iconic Hot & Sweet tomato chilli sauce in a family 1kg bottle. Perfect dip for snacks, base for noodle dishes, or condiment for sandwiches. Made with real tomatoes and a balanced kick.",
    reviews: [
      { name: "Pranav K.", rating: 5, text: "Childhood in a bottle. Goes with literally everything.", date: "2 weeks ago" },
      { name: "Aarti R.", rating: 4, text: "1kg is huge — get the smaller one if you live alone.", date: "1 month ago" },
    ],
  },
  d12: {
    description: "Two-pack of Dettol pH-balanced handwash with antibacterial protection. Kills 99.9% germs while being gentle on skin. 750ml bottles with pump dispensers — ideal for kitchen and bathroom.",
    reviews: [
      { name: "Dr. Singh", rating: 5, text: "Recommend this in my clinic. Reliable antibacterial action.", date: "1 week ago" },
      { name: "Mona V.", rating: 5, text: "Doesn't dry out my hands like generic handwashes.", date: "2 weeks ago" },
    ],
    bundlePartners: ["Dettol Liquid Soap", "Tissue Box (200 pulls)"],
  },
  // Crisis essentials (homepage)
  c1: {
    description: "Comprehensive 50-item first aid kit including bandages, antiseptic wipes, scissors, thermometer, and emergency contact card. Compact zippered case fits in any household drawer or car.",
    reviews: [
      { name: "Capt. Mehra", rating: 5, text: "Better stocked than most office kits. Recommended.", date: "1 week ago" },
      { name: "Sunita K.", rating: 4, text: "Solid kit — wish it included more burn-care supplies.", date: "3 weeks ago" },
    ],
  },
  c2: {
    description: "Powerful 1000-lumen LED rechargeable torch with 3 brightness modes and SOS strobe. USB-C charges in 2 hours, runs up to 12 hours on low. Waterproof aluminium body — essential for outages and emergencies.",
    reviews: [
      { name: "Vinay G.", rating: 5, text: "Genuinely bright. Used it through a 6-hour outage last month.", date: "2 weeks ago" },
      { name: "Anita J.", rating: 5, text: "Solid build, USB-C charging is a thoughtful touch.", date: "1 month ago" },
    ],
    bundlePartners: ["Emergency Candle Pack (12)", "Power Bank 20,000 mAh"],
  },
  c3: {
    description: "Pack of four 2L Bisleri bottles of purified mineral water. ISI-certified, sealed for hygiene. Essential backup during outages, parties, or as everyday drinking water.",
    reviews: [
      { name: "Ravi M.", rating: 5, text: "Always good to keep a 4-pack at home for emergencies.", date: "1 week ago" },
      { name: "Pallavi N.", rating: 4, text: "Standard Bisleri quality. Heavy but reliable.", date: "2 weeks ago" },
    ],
  },
  c4: {
    description: "Battery-powered USB-rechargeable table fan with 3 speeds. Runs up to 8 hours on a single charge. Quiet operation, lightweight, perfect for power cuts and travel.",
    reviews: [
      { name: "Imran S.", rating: 5, text: "Lifesaver during the summer power cuts in Kota.", date: "3 weeks ago" },
      { name: "Divya P.", rating: 4, text: "Battery life is real. Wish it oscillated though.", date: "1 month ago" },
    ],
  },
  c5: {
    description: "Five ready-to-eat heat-and-serve Indian meals — dal makhani, rajma chawal, chana masala, aloo paratha, and pulao. Each pouch is 300g, 18-month shelf life, no preservatives.",
    reviews: [
      { name: "Sameer T.", rating: 4, text: "Genuinely tasty for ready-to-eat. The dal makhani is impressive.", date: "1 week ago" },
      { name: "Rekha B.", rating: 5, text: "Saved many late nights when cooking wasn't an option.", date: "3 weeks ago" },
    ],
  },
  c6: {
    description: "20,000 mAh power bank with quick charge and pass-through charging. Charges most phones 5+ times. Built-in flashlight and digital battery display. Cabin-baggage approved.",
    reviews: [
      { name: "Aditya R.", rating: 5, text: "Lasted through a 36-hour trip without needing a wall socket.", date: "2 weeks ago" },
      { name: "Naina K.", rating: 4, text: "Heavy but justified for the capacity.", date: "1 month ago" },
    ],
  },
};

export function metaFor(id: string, name?: string): ProductMeta {
  if (CATALOG[id]) return CATALOG[id];
  return {
    description: `${name || "This product"} is a quality everyday essential, sourced and packaged for freshness. Arrives sealed and ready to use, with full quality assurance from Now's curated supplier network.`,
    reviews: GENERIC_REVIEWS,
  };
}

// Bundle map by item NAME (substring match)
const BUNDLE_MAP: { match: string; partners: string[] }[] = [
  { match: "bread", partners: ["Amul Butter 500g", "Mixed Fruit Jam", "Farm Eggs (12-pack)"] },
  { match: "maggi", partners: ["Onion 1kg", "Tomato 500g", "Extra Masala Sachet"] },
  { match: "noodles", partners: ["Onion 1kg", "Tomato 500g", "Extra Masala Sachet"] },
  { match: "milk", partners: ["Tea Bags (100)", "Sugar 1kg", "Britannia Marie Biscuits"] },
  { match: "ors", partners: ["Electrolyte Drink", "Digital Thermometer"] },
  { match: "rice", partners: ["Tata Sampann Toor Dal 1kg", "Cooking Oil 1L"] },
  { match: "diaper", partners: ["Baby Wipes (3-pack)", "Diaper Rash Cream"] },
  { match: "torch", partners: ["AA Batteries (4-pack)", "Power Bank 20,000 mAh"] },
];

export function bundlesFor(name: string): string[] {
  const lower = name.toLowerCase();
  for (const b of BUNDLE_MAP) if (lower.includes(b.match)) return b.partners;
  return [];
}

// Imagekeyword fallback when items are added from ad-hoc places
export function keywordForName(name: string): string {
  return name.toLowerCase().replace(/\([^)]*\)/g, "").replace(/\d+/g, "").replace(/[^a-z\s]/g, "").trim().split(/\s+/).slice(0, 3).join("-") || "product";
}
