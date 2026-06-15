import { create } from "zustand";
import { keywordForName } from "@/lib/catalog";
import { parseRecurringInput, addDays } from "@/lib/recurring";
import productCatalog from "@/lib/data/productCatalog.json";

export type AgentKey = "speed" | "context" | "health";
export type Urgency = "normal" | "high" | "critical";
export type CrisisType = "power_cut" | "medical" | "baby" | "security" | "natural_event" | "custom";
export type CheckoutSource = "personal" | "group";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  reasoning: string;
  agentSource: AgentKey;
  imageKeyword: string;
  isVegetarian: boolean;
  isEco: boolean;
  etaMinutes: number;
  discountPercent: number;
  relevanceScore: number;
  brand?: string;
  crisisReason?: string;
}

export interface SkippedItem {
  id: string;
  name: string;
  reasoning: string;
  price: number;
  imageKeyword: string;
}

export interface GroupItem {
  id: string;
  name: string;
  imageKeyword: string;
  price: number;
  by: number;
  status: "confirmed" | "pending" | "rejected";
}

export interface Address {
  id: string; label: string; fullName: string; line1: string; cityStateZip: string;
}

export interface FamilyMember { id: string; name: string; age: number; note?: string; }

export interface FavoriteBrand { name: string; category: string; orderCount: number; prioritize: boolean; }

export interface RecurringRule {
  id: string;
  itemName: string;
  frequencyLabel: string;
  frequencyDays: number;
  rawInput: string;
  nextDueDate: string;
  price: number;
  imageKeyword: string;
}

export interface CrisisContact { id: string; name: string; relation: string; phone: string; }

interface AgentVerdicts { speed: string; context: string; health: string; }

interface AppState {
  searchQuery: string;
  cartItems: CartItem[];
  skippedItems: SkippedItem[];
  agentVerdicts: AgentVerdicts;
  urgencyLevel: Urgency;
  isGenerating: boolean;

  recipeMeta: { meal: string; people: number; cookTime: string; difficulty: string } | null;
  fridgeInventory: string[];

  groupCartItems: GroupItem[];
  groupPeople: { name: string; color: string; initials: string }[];
  checkoutSource: CheckoutSource;
  lastOrderItems: CartItem[];
  lastOrderTotal: number;
  lastOrderId: string;

  addresses: Address[];
  selectedAddressId: string;

  userProfile: { name: string; phone: string; email: string; avatarUrl?: string };

  dietaryPreferences: string[];

  crisisType: CrisisType | null;
  crisisCustomText: string;

  familyMembers: FamilyMember[];
  favoriteBrands: FavoriteBrand[];
  crisisContacts: CrisisContact[];
  recurringRules: RecurringRule[];

  productDetailFor: CartItem | null;
  addressSelectorOpen: boolean;
  addAddressOpen: boolean;
  editAddressId: string | null;
  crisisTriageOpen: boolean;

  setSearchQuery: (t: string) => void;
  generateResults: (input: string) => Promise<void>;
  generateRecipeCart: (meal: string, people: number) => Promise<void>;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  addCartItem: (item: Partial<CartItem> & { id: string; name: string; price: number }) => void;
  addSkippedItem: (id: string) => void;
  clearCart: () => void;
  loadSharedCart: (b64Payload: string) => void;

  setGroupItems: (fn: (items: GroupItem[]) => GroupItem[]) => void;
  setGroupItemStatus: (id: string, status: GroupItem["status"]) => void;
  addGroupPerson: (p: { name: string; color: string; initials: string }) => void;
  setCheckoutSource: (s: CheckoutSource) => void;
  placeOrder: () => string;

  setSelectedAddress: (id: string) => void;
  addAddress: (a: Omit<Address, "id">) => string;
  updateAddress: (id: string, a: Omit<Address, "id">) => void;
  deleteAddress: (id: string) => void;

  updateProfile: (p: Partial<{ name: string; phone: string; email: string; avatarUrl: string }>) => void;

  toggleDietary: (tag: string) => void;
  toggleBrand: (name: string) => void;

  updateFamilyMember: (id: string, m: Partial<FamilyMember>) => void;

  addRecurringRule: (rawInput: string) => void;
  deleteRecurringRule: (id: string) => void;
  fulfillRecurringRule: (id: string) => void;

  updateCrisisContact: (id: string, c: Partial<CrisisContact>) => void;
  addCrisisContact: () => void;
  deleteCrisisContact: (id: string) => void;

  setCrisisType: (t: CrisisType, custom?: string) => void;

  openProductDetail: (p: CartItem) => void;
  closeProductDetail: () => void;
  openAddressSelector: () => void;
  closeAddressSelector: () => void;
  openAddAddress: (editId?: string) => void;
  closeAddAddress: () => void;
  openCrisisTriage: () => void;
  closeCrisisTriage: () => void;
}

// ---------- helpers ----------
type Mk = Partial<CartItem> & { id: string; name: string; price: number };
function mk(o: Mk): CartItem {
  const discount = o.originalPrice ? Math.round(((o.originalPrice - o.price) / o.originalPrice) * 100) : 0;
  return {
    quantity: 1,
    category: o.category || "General",
    reasoning: o.reasoning || "",
    agentSource: o.agentSource || "context",
    imageKeyword: o.imageKeyword || keywordForName(o.name),
    isVegetarian: o.isVegetarian ?? true,
    isEco: o.isEco ?? false,
    etaMinutes: o.etaMinutes ?? 11,
    discountPercent: o.discountPercent ?? discount,
    relevanceScore: o.relevanceScore ?? 70,
    brand: o.brand,
    ...o,
  } as CartItem;
}

function skip(id: string, name: string, reasoning: string, price: number, imageKeyword?: string): SkippedItem {
  return { id, name, reasoning, price, imageKeyword: imageKeyword || keywordForName(name) };
}

// Looks up the local catalog for a price/image match on a recurring item's
// name so manually-added rules (e.g. "Bread") render with real data when
// possible, falling back to a generic estimate for unknown items.
function catalogMatch(itemName: string) {
  const lower = itemName.toLowerCase();
  return (productCatalog as any[]).find(
    (p) => p.name.toLowerCase().includes(lower) || p.keywords?.some((k: string) => lower.includes(k) || k.includes(lower))
  );
}

// ---------- mock cart generation ----------
function mockGenerateCart(input: string, prefs: string[], favBrands: FavoriteBrand[]): {
  items: CartItem[]; skipped: SkippedItem[]; verdicts: AgentVerdicts; urgency: Urgency;
} {
  const q = input.toLowerCase();

  if (/guest|host|party|friend|family.*coming|arriv/.test(q)) {
    return {
      urgency: "normal",
      verdicts: {
        speed: "Express delivery in 11 min — beats guest arrival window.",
        context: "Hosting detected — chose shareable, crowd-pleasing sizes.",
        health: "Mixed savoury + sweet, kept within ₹1,200 budget.",
      },
      items: [
        mk({ id: "g1", name: "Lay's Party Pack (6 flavours)", category: "Snacks", price: 299, originalPrice: 349, reasoning: "Variety for 4-6 guests", agentSource: "context", imageKeyword: "potato-chips-bowl", etaMinutes: 11, relevanceScore: 92 }),
        mk({ id: "g2", name: "Coca-Cola 1.25L (2-pack)", category: "Beverages", price: 180, originalPrice: 220, reasoning: "Shareable, chilled in 11 min", agentSource: "speed", imageKeyword: "coca-cola-bottle", etaMinutes: 8, relevanceScore: 90 }),
        mk({ id: "g3", name: "Britannia Cake Tray", category: "Bakery", price: 250, reasoning: "Easy serve dessert", agentSource: "context", imageKeyword: "chocolate-cake", relevanceScore: 80 }),
        mk({ id: "g4", name: "Paper Plates & Cups Set", category: "Hosting", price: 120, reasoning: "Skip the dishwashing", agentSource: "context", imageKeyword: "paper-plates", relevanceScore: 75, isEco: false }),
        mk({ id: "g5", name: "Haldiram's Mixed Namkeen 400g", category: "Snacks", price: 165, reasoning: "Traditional crowd-pleaser", agentSource: "context", imageKeyword: "indian-snacks-bowl", relevanceScore: 88 }),
        mk({ id: "g6", name: "Amul Vanilla Ice Cream 1L", category: "Frozen", price: 280, originalPrice: 310, reasoning: "Dessert for the kids", agentSource: "health", imageKeyword: "vanilla-icecream", etaMinutes: 12, relevanceScore: 82, brand: "Amul" }),
      ],
      skipped: [
        skip("sg1", "Premium Imported Cheese", "Outside budget for casual hosting", 650, "cheese-board"),
        skip("sg2", "Red Wine 750ml", "Family guests — skipping alcohol", 1200, "red-wine-bottle"),
        skip("sg3", "Fresh Sushi Platter", "Cannot guarantee freshness in 11 min", 899, "sushi-platter"),
      ],
    };
  }

  if (/sick|fever|unwell|cold|cough|cramp|pain|headache|flu/.test(q)) {
    return {
      urgency: "high",
      verdicts: {
        speed: "Pharmacy items prioritised — 9 min delivery.",
        context: "Unwell signal — soft foods + hydration only.",
        health: "Avoided heavy/spicy. Added electrolytes for recovery.",
      },
      items: [
        mk({ id: "s1", name: "ORS Hydration Sachets (10-pack)", category: "Wellness", price: 120, quantity: 2, reasoning: "Rehydration first", agentSource: "health", imageKeyword: "ors-sachet", etaMinutes: 9, relevanceScore: 96 }),
        mk({ id: "s2", name: "Paracetamol 500mg (15 tablets)", category: "Pharmacy", price: 35, reasoning: "Fever / pain relief", agentSource: "health", imageKeyword: "paracetamol-tablets", etaMinutes: 9, relevanceScore: 95 }),
        mk({ id: "s3", name: "Maggi 2-min Noodles (4-pack)", category: "Quick Meals", price: 96, reasoning: "Soft, minimal effort", agentSource: "context", imageKeyword: "instant-noodles", relevanceScore: 78 }),
        mk({ id: "s4", name: "Real Mixed Fruit Juice 1L", category: "Beverages", price: 130, reasoning: "Vitamin boost, easy on stomach", agentSource: "health", imageKeyword: "fruit-juice-carton", relevanceScore: 82 }),
        mk({ id: "s5", name: "Vicks VapoRub 25g", category: "Pharmacy", price: 90, reasoning: "Congestion relief", agentSource: "health", imageKeyword: "vicks-vaporub-jar", etaMinutes: 9, relevanceScore: 85 }),
        mk({ id: "s6", name: "Tissue Box (200 pulls)", category: "Household", price: 80, reasoning: "Restocked — likely running low", agentSource: "context", imageKeyword: "tissue-box", relevanceScore: 70 }),
      ],
      skipped: [
        skip("ss1", "Spicy Chicken Biryani", "Too heavy when unwell", 280, "chicken-biryani"),
        skip("ss2", "Cold Brew Coffee", "Caffeine not ideal right now", 180, "cold-brew-coffee"),
      ],
    };
  }

  if (/power.?cut|outage|fridge|perish|electric|black.?out/.test(q)) {
    return {
      urgency: "critical",
      verdicts: {
        speed: "CRISIS protocol — 8 min ETA, skipping confirmation steps.",
        context: "Power cut detected. Saving perishables, adding light.",
        health: "Non-perishable proteins + safe drinking water.",
      },
      items: powerCutItems(),
      skipped: [
        skip("sp1", "Frozen Pizza", "Cannot cook — power out", 320, "frozen-pizza"),
        skip("sp2", "Fresh Milk 1L", "Will spoil without refrigeration", 65, "milk-carton"),
      ],
    };
  }

  // Household weekly restock — Family Context AI (Section 11)
  if (/groceries.*week|weekly restock|weekly grocer|household restock|big restock/.test(q)) {
    return {
      urgency: "normal",
      verdicts: {
        speed: "Standard 18 min Express — large basket consolidation.",
        context: "Recognized as full household restock for your family of 4; included a lactose-free option for your household profile.",
        health: "Balanced — staples, fresh produce, and proteins. Within monthly budget.",
      },
      items: [
        mk({ id: "h1", name: "Amul Toned Milk 1L (2-pack)", category: "Dairy", price: 128, reasoning: "3-day household supply", agentSource: "context", imageKeyword: "milk-carton", etaMinutes: 18, relevanceScore: 95, brand: "Amul" }),
        mk({ id: "h2", name: "Lactose-Free Almond Milk 1L", category: "Dairy", price: 220, reasoning: "For your lactose-sensitive household member", agentSource: "health", imageKeyword: "almond-milk", etaMinutes: 18, relevanceScore: 88, isEco: true }),
        mk({ id: "h3", name: "Premium Basmati Rice 5kg", category: "Staples", price: 549, originalPrice: 750, reasoning: "Monthly staple — runs out weekly", agentSource: "context", imageKeyword: "basmati-rice", etaMinutes: 18, relevanceScore: 90 }),
        mk({ id: "h4", name: "Tata Sampann Toor Dal 1kg", category: "Staples", price: 169, originalPrice: 210, reasoning: "Vegetarian protein staple", agentSource: "health", imageKeyword: "toor-dal", etaMinutes: 18, relevanceScore: 92, brand: "Tata Sampann" }),
        mk({ id: "h5", name: "Fresh Mixed Vegetables 2kg", category: "Produce", price: 280, reasoning: "Twice-weekly veg restock", agentSource: "context", imageKeyword: "mixed-vegetables", etaMinutes: 18, relevanceScore: 85, isEco: true }),
        mk({ id: "h6", name: "Farm Eggs (12-pack)", category: "Dairy", price: 96, reasoning: "Protein for the household", agentSource: "health", imageKeyword: "farm-eggs", etaMinutes: 18, isVegetarian: false, relevanceScore: 80 }),
        mk({ id: "h7", name: "Whole Wheat Bread (2-pack)", category: "Bakery", price: 90, originalPrice: 120, reasoning: "Breakfast staple", agentSource: "context", imageKeyword: "whole-wheat-bread", etaMinutes: 18, relevanceScore: 78 }),
        mk({ id: "h8", name: "Amul Butter 500g", category: "Dairy", price: 285, originalPrice: 320, reasoning: "Goes with the bread", agentSource: "context", imageKeyword: "amul-butter", etaMinutes: 18, relevanceScore: 76, brand: "Amul" }),
        mk({ id: "h9", name: "Cooking Oil 1L", category: "Staples", price: 199, reasoning: "Monthly kitchen essential", agentSource: "context", imageKeyword: "cooking-oil-bottle", etaMinutes: 18, relevanceScore: 82 }),
        mk({ id: "h10", name: "Tata Salt 1kg", category: "Pantry", price: 28, reasoning: "Predicted to run out tomorrow", agentSource: "context", imageKeyword: "salt-bag", etaMinutes: 18, relevanceScore: 70 }),
      ],
      skipped: [
        skip("sh1", "Premium Cold Pressed Oil", "You bought this last week", 450, "cold-pressed-oil"),
      ],
    };
  }

  // default — daily restock
  return {
    urgency: "normal",
    verdicts: {
      speed: "Standard 12 min Express — no rush signals.",
      context: "Matches your Friday evening restock pattern.",
      health: "Balanced — fresh produce + pantry staples within budget.",
    },
    items: [
      mk({ id: "r1", name: "Amul Toned Milk 1L", category: "Dairy", price: 64, quantity: 2, reasoning: "Weekly staple", agentSource: "context", imageKeyword: "milk-carton", relevanceScore: 90, brand: "Amul" }),
      mk({ id: "r2", name: "Modern Brown Bread", category: "Bakery", price: 50, reasoning: "Breakfast restock", agentSource: "context", imageKeyword: "brown-bread-loaf", relevanceScore: 75 }),
      mk({ id: "r3", name: "Tata Salt 1kg", category: "Pantry", price: 28, reasoning: "Predicted to run out tomorrow", agentSource: "context", imageKeyword: "salt-bag", relevanceScore: 70 }),
      mk({ id: "r4", name: "Fresh Bananas (1 dozen)", category: "Produce", price: 60, reasoning: "Daily fruit intake", agentSource: "health", imageKeyword: "banana-bunch", relevanceScore: 80, isEco: true }),
      mk({ id: "r5", name: "Tropicana Orange Juice 1L", category: "Beverages", price: 130, originalPrice: 150, reasoning: "On sale today", agentSource: "speed", imageKeyword: "orange-juice-bottle", etaMinutes: 9, relevanceScore: 85 }),
      mk({ id: "r6", name: "Maggi Atta Noodles (4-pack)", category: "Quick Meals", price: 96, reasoning: "Pantry backup", agentSource: "context", imageKeyword: "instant-noodles-pack", relevanceScore: 72 }),
    ],
    skipped: [
      skip("sr1", "Premium Cold Pressed Oil", "You bought this last week", 450, "olive-oil-bottle"),
    ],
  };
}

export function powerCutItems(): CartItem[] {
  return [
    mk({ id: "cp1", name: "LED Rechargeable Torch", category: "Emergency", price: 449, originalPrice: 650, reasoning: "Immediate light source", agentSource: "speed", imageKeyword: "led-torch-flashlight", etaMinutes: 8, relevanceScore: 96, crisisReason: "Added — primary light during the outage" }),
    mk({ id: "cp2", name: "Battery-Powered Fan", category: "Emergency", price: 799, originalPrice: 1100, reasoning: "Cooling without power", agentSource: "context", imageKeyword: "battery-fan", etaMinutes: 8, relevanceScore: 90, crisisReason: "Added — cooling without AC/ceiling fan" }),
    mk({ id: "cp3", name: "Insulated Ice Pack (2-pack)", category: "Emergency", price: 250, reasoning: "Save fridge perishables", agentSource: "context", imageKeyword: "ice-pack", etaMinutes: 8, relevanceScore: 92, crisisReason: "Added — your fridge items may spoil without power" }),
    mk({ id: "cp4", name: "Power Bank 20,000 mAh", category: "Electronics", price: 1599, originalPrice: 2200, reasoning: "Keep phones alive", agentSource: "speed", imageKeyword: "power-bank", etaMinutes: 8, relevanceScore: 95, crisisReason: "Added — keep devices charged during the outage" }),
    mk({ id: "cp5", name: "Emergency Candles (12-pack)", category: "Emergency", price: 199, reasoning: "Backup light", agentSource: "speed", imageKeyword: "emergency-candles", etaMinutes: 8, relevanceScore: 80, crisisReason: "Added — backup if torch batteries die" }),
  ];
}

export function medicalItems(): CartItem[] {
  return [
    mk({ id: "cm1", name: "ORS Hydration Sachets (10-pack)", category: "Wellness", price: 120, reasoning: "Rehydration", agentSource: "health", imageKeyword: "ors-sachet", etaMinutes: 9, relevanceScore: 98, crisisReason: "Added — essential for hydration during illness" }),
    mk({ id: "cm2", name: "Digital Thermometer", category: "Pharmacy", price: 240, reasoning: "Monitor temperature", agentSource: "health", imageKeyword: "digital-thermometer", etaMinutes: 9, relevanceScore: 96, crisisReason: "Added — essential for monitoring temperature" }),
    mk({ id: "cm3", name: "Paracetamol Syrup (Pediatric)", category: "Pharmacy", price: 85, reasoning: "Fever symptoms", agentSource: "health", imageKeyword: "paracetamol-syrup", etaMinutes: 9, relevanceScore: 94, crisisReason: "Added — helps manage fever symptoms" }),
    mk({ id: "cm4", name: "First Aid Kit (50 items)", category: "Emergency", price: 399, originalPrice: 599, reasoning: "General preparedness", agentSource: "health", imageKeyword: "first-aid-kit", etaMinutes: 9, relevanceScore: 90, crisisReason: "Added — covers most minor injuries" }),
    mk({ id: "cm5", name: "Electrolyte Drink", category: "Beverages", price: 110, reasoning: "Energy + minerals", agentSource: "health", imageKeyword: "electrolyte-drink-bottle", etaMinutes: 9, relevanceScore: 85, crisisReason: "Added — replenishes lost minerals" }),
  ];
}

export function babyItems(): CartItem[] {
  return [
    mk({ id: "cb1", name: "Diapers (Size 3, 30-pack)", category: "Baby", price: 599, reasoning: "Likely running low", agentSource: "context", imageKeyword: "baby-diapers", etaMinutes: 10, relevanceScore: 96, crisisReason: "Added — based on typical infant emergency needs" }),
    mk({ id: "cb2", name: "Infant Formula 400g", category: "Baby", price: 549, reasoning: "Feeding essential", agentSource: "health", imageKeyword: "infant-formula", etaMinutes: 10, relevanceScore: 95, crisisReason: "Added — feeding essential" }),
    mk({ id: "cb3", name: "Baby Wipes (3-pack)", category: "Baby", price: 280, reasoning: "Hygiene staple", agentSource: "context", imageKeyword: "baby-wipes", etaMinutes: 10, relevanceScore: 90, crisisReason: "Added — hygiene essential" }),
    mk({ id: "cb4", name: "Baby Paracetamol Drops", category: "Pharmacy", price: 95, reasoning: "Infant fever relief", agentSource: "health", imageKeyword: "baby-medicine-bottle", etaMinutes: 10, relevanceScore: 92, crisisReason: "Added — for infant fever" }),
    mk({ id: "cb5", name: "Diaper Rash Cream", category: "Baby", price: 199, reasoning: "Skin protection", agentSource: "health", imageKeyword: "diaper-rash-cream", etaMinutes: 10, relevanceScore: 80, crisisReason: "Added — prevents diaper rash" }),
  ];
}

export function securityItems(): CartItem[] {
  return [
    mk({ id: "cs1", name: "LED Rechargeable Torch", category: "Security", price: 449, originalPrice: 650, reasoning: "Light = safety", agentSource: "speed", imageKeyword: "led-torch", etaMinutes: 10, relevanceScore: 95, crisisReason: "Added — improves visibility and home security" }),
    mk({ id: "cs2", name: "Door Security Bar", category: "Security", price: 899, reasoning: "Physical reinforcement", agentSource: "context", imageKeyword: "door-security-bar", etaMinutes: 10, relevanceScore: 90, crisisReason: "Added — physical door reinforcement" }),
    mk({ id: "cs3", name: "Personal Safety Alarm", category: "Security", price: 599, reasoning: "Loud deterrent", agentSource: "context", imageKeyword: "personal-safety-alarm", etaMinutes: 10, relevanceScore: 92, crisisReason: "Added — loud alarm deters intruders" }),
    mk({ id: "cs4", name: "Motion-Sensor Light", category: "Security", price: 699, reasoning: "Automatic outdoor lighting", agentSource: "context", imageKeyword: "motion-sensor-light", etaMinutes: 10, relevanceScore: 88, crisisReason: "Added — deters approach to entry points" }),
    mk({ id: "cs5", name: "Power Bank 20,000 mAh", category: "Electronics", price: 1599, originalPrice: 2200, reasoning: "Keep phone alive", agentSource: "speed", imageKeyword: "power-bank", etaMinutes: 10, relevanceScore: 85, crisisReason: "Added — keep phone alive to call for help" }),
  ];
}

export function naturalEventItems(): CartItem[] {
  return [
    mk({ id: "cn1", name: "Bisleri Water 2L (4-pack)", category: "Beverages", price: 160, originalPrice: 200, reasoning: "Safe drinking water", agentSource: "health", imageKeyword: "water-bottles", etaMinutes: 12, relevanceScore: 96, crisisReason: "Added — recommended stock for severe weather events" }),
    mk({ id: "cn2", name: "Ready-to-Eat Meals (5-pack)", category: "Emergency", price: 450, originalPrice: 600, reasoning: "No cooking needed", agentSource: "context", imageKeyword: "ready-meals", etaMinutes: 12, relevanceScore: 94, crisisReason: "Added — no cooking required" }),
    mk({ id: "cn3", name: "Battery-Powered Radio", category: "Emergency", price: 1199, reasoning: "Stay informed", agentSource: "context", imageKeyword: "emergency-radio", etaMinutes: 12, relevanceScore: 90, crisisReason: "Added — stay informed if network drops" }),
    mk({ id: "cn4", name: "First Aid Kit (50 items)", category: "Emergency", price: 399, originalPrice: 599, reasoning: "General preparedness", agentSource: "health", imageKeyword: "first-aid-kit", etaMinutes: 12, relevanceScore: 88, crisisReason: "Added — injury preparedness" }),
    mk({ id: "cn5", name: "Emergency Candles (12-pack)", category: "Emergency", price: 199, reasoning: "Backup light", agentSource: "speed", imageKeyword: "emergency-candles", etaMinutes: 12, relevanceScore: 82, crisisReason: "Added — long-burning candles for outages" }),
  ];
}

export function customCrisisItems(text: string): CartItem[] {
  const t = text.toLowerCase();
  if (/baby|infant|diaper|formula/.test(t)) return babyItems();
  if (/medic|fever|sick|hurt|injur|wound/.test(t)) return medicalItems();
  if (/power|outage|blackout|fridge/.test(t)) return powerCutItems();
  if (/lock|safe|intrud|securit/.test(t)) return securityItems();
  if (/storm|flood|cyclone|heat|rain/.test(t)) return naturalEventItems();
  // generic emergency essentials
  return [
    mk({ id: "cx1", name: "ORS Hydration Sachets (10-pack)", category: "Wellness", price: 120, reasoning: "General hydration", agentSource: "health", imageKeyword: "ors-sachet", etaMinutes: 10, relevanceScore: 90, crisisReason: "Added — general emergency essential" }),
    mk({ id: "cx2", name: "LED Rechargeable Torch", category: "Emergency", price: 449, originalPrice: 650, reasoning: "Backup light", agentSource: "speed", imageKeyword: "led-torch", etaMinutes: 10, relevanceScore: 88, crisisReason: "Added — backup light source" }),
    mk({ id: "cx3", name: "Emergency Candles (12-pack)", category: "Emergency", price: 199, reasoning: "Backup", agentSource: "speed", imageKeyword: "emergency-candles", etaMinutes: 10, relevanceScore: 80, crisisReason: "Added — backup light" }),
    mk({ id: "cx4", name: "Bisleri Water 2L (4-pack)", category: "Beverages", price: 160, reasoning: "Drinking water", agentSource: "health", imageKeyword: "water-bottles", etaMinutes: 10, relevanceScore: 85, crisisReason: "Added — safe drinking water" }),
    mk({ id: "cx5", name: "First Aid Kit (50 items)", category: "Emergency", price: 399, reasoning: "Preparedness", agentSource: "health", imageKeyword: "first-aid-kit", etaMinutes: 10, relevanceScore: 86, crisisReason: "Added — general preparedness" }),
  ];
}

export function crisisItemsFor(t: CrisisType, custom = ""): CartItem[] {
  switch (t) {
    case "power_cut": return powerCutItems();
    case "medical": return medicalItems();
    case "baby": return babyItems();
    case "security": return securityItems();
    case "natural_event": return naturalEventItems();
    case "custom": return customCrisisItems(custom);
  }
}

export const useStore = create<AppState>((set, get) => ({
  searchQuery: "",
  cartItems: [],
  skippedItems: [],
  agentVerdicts: { speed: "", context: "", health: "" },
  urgencyLevel: "normal",
  isGenerating: false,

  recipeMeta: null,
  fridgeInventory: ["Salt", "Turmeric Powder", "Cooking Oil", "Onion"],

  groupCartItems: [
    { id: "gi1", name: "Pizza Family Pack", imageKeyword: "pizza-family-pack", price: 599, by: 1, status: "confirmed" },
    { id: "gi2", name: "Coke 2L (3-pack)", imageKeyword: "coca-cola-bottles", price: 270, by: 0, status: "confirmed" },
    { id: "gi3", name: "Garlic Bread (2-pack)", imageKeyword: "garlic-bread", price: 220, by: 2, status: "confirmed" },
    { id: "gi4", name: "Choco Lava Cake (4)", imageKeyword: "chocolate-lava-cake", price: 320, by: 3, status: "confirmed" },
    { id: "gi5", name: "Paneer Tikka Starter", imageKeyword: "paneer-tikka", price: 380, by: 1, status: "pending" },
    { id: "gi6", name: "Imported Cheese Board", imageKeyword: "cheese-board", price: 750, by: 2, status: "rejected" },
  ],
  groupPeople: [
    { name: "Krish", color: "#ff9900", initials: "K" },
    { name: "Priya", color: "#5848bc", initials: "P" },
    { name: "Arjun", color: "#007185", initials: "A" },
    { name: "Sneha", color: "#b12704", initials: "S" },
  ],
  checkoutSource: "personal",
  lastOrderItems: [],
  lastOrderTotal: 0,
  lastOrderId: "",

  addresses: [
    { id: "home", label: "Home", fullName: "Krish Sharma", line1: "203, Vigyan Nagar", cityStateZip: "Kota, Rajasthan 324001" },
    { id: "office", label: "Office", fullName: "Krish Sharma", line1: "5th Floor, Tech Park", cityStateZip: "Jaipur 302017" },
  ],
  selectedAddressId: "home",

  userProfile: { name: "Krish Sharma", phone: "+91 98765 43210", email: "krish@example.com" },

  dietaryPreferences: ["Vegetarian", "Budget-conscious"],

  crisisType: null,
  crisisCustomText: "",

  familyMembers: [
    { id: "fm1", name: "Krish (You)", age: 21, note: "—" },
    { id: "fm2", name: "Mother", age: 48, note: "Vegetarian" },
    { id: "fm3", name: "Father", age: 52, note: "No dietary restrictions" },
    { id: "fm4", name: "Younger sibling", age: 12, note: "Lactose-sensitive" },
  ],
  favoriteBrands: [
    { name: "Raw Pressery", category: "Juices", orderCount: 6, prioritize: true },
    { name: "Minimalist", category: "Skincare", orderCount: 3, prioritize: true },
    { name: "Amul", category: "Dairy", orderCount: 12, prioritize: true },
    { name: "Tata Sampann", category: "Pulses", orderCount: 4, prioritize: true },
  ],
  crisisContacts: [
    { id: "cc1", name: "Priya Sharma", relation: "Sister", phone: "+91 98XXX XX234" },
  ],

  recurringRules: [],

  productDetailFor: null,
  addressSelectorOpen: false,
  addAddressOpen: false,
  editAddressId: null,
  crisisTriageOpen: false,

  setSearchQuery: (text) => set({ searchQuery: text }),
  generateResults: async (input) => {
    set({ isGenerating: true, searchQuery: input });
    try {
      const { dietaryPreferences } = get();

      const { generateCartFn } = await import("@/lib/api/agent.functions");

      const res = await generateCartFn({
        data: {
          query: input,
          dietary: dietaryPreferences,
        }
      });

      const items = res.items || [];

      set({
        cartItems: items.map((i: any) => ({ ...i, price: Number(i.price), originalPrice: i.original_price ? Number(i.original_price) : undefined, imageKeyword: i.image_keyword, isVegetarian: i.is_vegetarian, isEco: i.is_eco, etaMinutes: i.eta_minutes })),
        skippedItems: (res.skipped || []).map((i: any) => ({ ...i, price: Number(i.price), imageKeyword: i.image_keyword })),
        agentVerdicts: res.verdicts,
        urgencyLevel: res.urgency as Urgency,
        isGenerating: false,
      });
    } catch (error: any) {
      console.error("AI Generation failed:", error);
      set({ 
        isGenerating: false,
        agentVerdicts: { 
          speed: "ERROR", 
          context: String(error.message || error), 
          health: "Check browser console or terminal" 
        }
      });
    }
  },
  generateRecipeCart: async (meal, people) => {
    set({ isGenerating: true, searchQuery: `Cooking: ${meal} for ${people}` });
    try {
      const { dietaryPreferences, fridgeInventory, favoriteBrands } = get();

      const { generateRecipeCartFn } = await import("@/lib/api/recipe.functions");

      const res = await generateRecipeCartFn({
        data: {
          meal,
          people,
          dietary: dietaryPreferences,
          fridgeInventory,
          favoriteBrands,
        }
      });

      const items = res.items || [];

      set({
        cartItems: items.map((i: any) => ({ ...i, price: Number(i.price), originalPrice: i.original_price ? Number(i.original_price) : undefined, imageKeyword: i.image_keyword, isVegetarian: i.is_vegetarian, isEco: i.is_eco, etaMinutes: i.eta_minutes })),
        skippedItems: (res.skipped || []).map((i: any) => ({ ...i, price: Number(i.price), imageKeyword: i.image_keyword })),
        agentVerdicts: res.verdicts,
        urgencyLevel: res.urgency as Urgency,
        recipeMeta: { meal, people, cookTime: res.recipeMeta.cookTime, difficulty: res.recipeMeta.difficulty },
        isGenerating: false,
      });
    } catch (error: any) {
      console.error("Recipe Generation failed:", error);
      set({ 
        isGenerating: false,
        agentVerdicts: { 
          speed: "ERROR", 
          context: String(error.message || error), 
          health: "Check browser console or terminal" 
        }
      });
    }
  },
  updateQuantity: (id, qty) =>
    set((s) => ({
      cartItems: s.cartItems.map((it) => (it.id === id ? { ...it, quantity: Math.max(0, qty) } : it)).filter((it) => it.quantity > 0),
    })),
  removeItem: (id) => set((s) => ({ cartItems: s.cartItems.filter((it) => it.id !== id) })),
  addCartItem: (item) =>
    set((s) => {
      const existing = s.cartItems.find((i) => i.id === item.id);
      if (existing) {
        return { cartItems: s.cartItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i)) };
      }
      return { cartItems: [...s.cartItems, mk(item as Mk)] };
    }),
  addSkippedItem: (id) => {
    const s = get();
    const sk = s.skippedItems.find((x) => x.id === id);
    if (!sk) return;
    set({
      cartItems: [...s.cartItems, mk({ id: sk.id, name: sk.name, category: "Added back", price: sk.price, reasoning: "Added by user from skipped list", imageKeyword: sk.imageKeyword })],
      skippedItems: s.skippedItems.filter((x) => x.id !== id),
    });
  },
  clearCart: () => set({ cartItems: [], skippedItems: [], recipeMeta: null }),
  loadSharedCart: (b64Payload) => {
    try {
      const decoded = atob(b64Payload);
      const parsed = JSON.parse(decoded) as any[]; // [[id, name, price, qty, img], ...]
      const items = parsed.map(c => mk({
        id: c[0] || ("sc_" + Date.now()),
        name: c[1] || "Shared Item",
        price: Number(c[2]) || 0,
        quantity: Number(c[3]) || 1,
        imageKeyword: c[4] || "product",
        category: "Shared Cart",
        reasoning: "Loaded from shared link",
        agentSource: "context"
      }));
      set({ 
        cartItems: items, 
        skippedItems: [], 
        agentVerdicts: { speed: "Instant load", context: "Shared via WhatsApp", health: "User specified list" },
        urgencyLevel: "normal",
        recipeMeta: null,
        searchQuery: "Shared Cart"
      });
    } catch (e) {
      console.error("Failed to load shared cart", e);
    }
  },

  setGroupItems: (fn) => set((s) => ({ groupCartItems: fn(s.groupCartItems) })),
  setGroupItemStatus: (id, status) => set((s) => ({ groupCartItems: s.groupCartItems.map((i) => (i.id === id ? { ...i, status } : i)) })),
  addGroupPerson: (p) => set((s) => ({ groupPeople: [...s.groupPeople, p] })),
  setCheckoutSource: (source) => set({ checkoutSource: source }),
  placeOrder: () => {
    const s = get();
    const id = `NOW-2026-${Math.floor(10000 + Math.random() * 89999)}`;
    if (s.checkoutSource === "group") {
      const items = s.groupCartItems.filter((i) => i.status === "confirmed").map((g) => mk({ id: g.id, name: g.name, price: g.price, imageKeyword: g.imageKeyword, category: "Group", reasoning: "Group cart item" }));
      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      set({ lastOrderItems: items, lastOrderTotal: total, lastOrderId: id, groupCartItems: [], checkoutSource: "personal" });
    } else {
      const items = s.cartItems;
      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      set({ lastOrderItems: items, lastOrderTotal: total, lastOrderId: id, cartItems: [] });
    }
    return id;
  },

  setSelectedAddress: (id) => set({ selectedAddressId: id }),
  addAddress: (a) => {
    const id = `addr_${Date.now()}`;
    set((s) => ({ addresses: [...s.addresses, { id, ...a }], selectedAddressId: id }));
    return id;
  },
  updateAddress: (id, a) => set((s) => ({ addresses: s.addresses.map((x) => (x.id === id ? { id, ...a } : x)) })),
  deleteAddress: (id) =>
    set((s) => {
      const left = s.addresses.filter((x) => x.id !== id);
      return { addresses: left, selectedAddressId: s.selectedAddressId === id ? (left[0]?.id || "") : s.selectedAddressId };
    }),

  updateProfile: (p) => set((s) => ({ userProfile: { ...s.userProfile, ...p } })),

  toggleDietary: (tag) =>
    set((s) => ({
      dietaryPreferences: s.dietaryPreferences.includes(tag)
        ? s.dietaryPreferences.filter((t) => t !== tag)
        : [...s.dietaryPreferences, tag],
    })),
  toggleBrand: (name) =>
    set((s) => ({ favoriteBrands: s.favoriteBrands.map((b) => (b.name === name ? { ...b, prioritize: !b.prioritize } : b)) })),

  updateFamilyMember: (id, m) =>
    set((s) => ({ familyMembers: s.familyMembers.map((x) => (x.id === id ? { ...x, ...m } : x)) })),

  addRecurringRule: (rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;
    const parsed = parseRecurringInput(trimmed);
    const match = catalogMatch(parsed.itemName);
    set((s) => ({
      recurringRules: [
        ...s.recurringRules,
        {
          id: `rr_${Date.now()}`,
          itemName: parsed.itemName,
          frequencyLabel: parsed.frequencyLabel,
          frequencyDays: parsed.frequencyDays,
          rawInput: trimmed,
          nextDueDate: addDays(new Date(), parsed.frequencyDays),
          price: match?.price ?? 150,
          imageKeyword: match?.image_keyword ?? keywordForName(parsed.itemName),
        },
      ],
    }));
  },
  deleteRecurringRule: (id) => set((s) => ({ recurringRules: s.recurringRules.filter((r) => r.id !== id) })),
  fulfillRecurringRule: (id) => {
    const rule = get().recurringRules.find((r) => r.id === id);
    if (!rule) return;
    get().addCartItem({
      id: `${rule.id}_${Date.now()}`,
      name: rule.itemName,
      price: rule.price,
      imageKeyword: rule.imageKeyword,
      category: "Recurring",
      reasoning: `Recurring reminder — ${rule.frequencyLabel.toLowerCase()}.`,
      agentSource: "context",
    });
    set((s) => ({
      recurringRules: s.recurringRules.map((r) => (r.id === id ? { ...r, nextDueDate: addDays(new Date(), r.frequencyDays) } : r)),
    }));
  },

  updateCrisisContact: (id, c) =>
    set((s) => ({ crisisContacts: s.crisisContacts.map((x) => (x.id === id ? { ...x, ...c } : x)) })),
  addCrisisContact: () =>
    set((s) => ({ crisisContacts: [...s.crisisContacts, { id: `cc_${Date.now()}`, name: "New Contact", relation: "", phone: "" }] })),
  deleteCrisisContact: (id) => set((s) => ({ crisisContacts: s.crisisContacts.filter((c) => c.id !== id) })),

  setCrisisType: (t, custom = "") => set({ crisisType: t, crisisCustomText: custom }),

  openProductDetail: (p) => set({ productDetailFor: p }),
  closeProductDetail: () => set({ productDetailFor: null }),
  openAddressSelector: () => set({ addressSelectorOpen: true }),
  closeAddressSelector: () => set({ addressSelectorOpen: false }),
  openAddAddress: (editId) => set({ addAddressOpen: true, editAddressId: editId || null, addressSelectorOpen: false }),
  closeAddAddress: () => set({ addAddressOpen: false, editAddressId: null }),
  openCrisisTriage: () => set({ crisisTriageOpen: true }),
  closeCrisisTriage: () => set({ crisisTriageOpen: false }),
}));

export const cartTotal = (items: CartItem[]) => items.reduce((sum, it) => sum + it.price * it.quantity, 0);
