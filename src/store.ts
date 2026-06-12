import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  reasoning: string;
  agentSource: "speed" | "context" | "health";
  emoji?: string;
}

export interface SkippedItem {
  id: string;
  name: string;
  reasoning: string;
  price: number;
  emoji?: string;
}

export type Urgency = "normal" | "high" | "critical";

interface AgentVerdicts {
  speed: string;
  context: string;
  health: string;
}

interface AppState {
  searchQuery: string;
  cartItems: CartItem[];
  skippedItems: SkippedItem[];
  agentVerdicts: AgentVerdicts;
  urgencyLevel: Urgency;
  ecoProgress: number;
  isGenerating: boolean;
  setSearchQuery: (text: string) => void;
  generateResults: (input: string) => Promise<void>;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  addCartItem: (item: CartItem) => void;
  addSkippedItem: (id: string) => void;
  clearCart: () => void;
}

function mockGenerateCart(input: string): {
  items: CartItem[];
  skipped: SkippedItem[];
  verdicts: AgentVerdicts;
  urgency: Urgency;
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
        { id: "1", name: "Lay's Party Pack (6 flavours)", category: "Snacks", quantity: 1, price: 299, originalPrice: 349, reasoning: "Variety for 4-6 guests", agentSource: "context", emoji: "🥔" },
        { id: "2", name: "Coca-Cola 1.25L (2-pack)", category: "Beverages", quantity: 1, price: 180, originalPrice: 220, reasoning: "Shareable, chilled in 11 min", agentSource: "speed", emoji: "🥤" },
        { id: "3", name: "Britannia Cake Tray", category: "Bakery", quantity: 1, price: 250, reasoning: "Easy serve dessert", agentSource: "context", emoji: "🎂" },
        { id: "4", name: "Paper Plates & Cups Set", category: "Hosting", quantity: 1, price: 120, reasoning: "Skip the dishwashing", agentSource: "context", emoji: "🍽️" },
        { id: "5", name: "Haldiram's Mixed Namkeen 400g", category: "Snacks", quantity: 1, price: 165, reasoning: "Traditional crowd-pleaser", agentSource: "context", emoji: "🥜" },
        { id: "6", name: "Amul Vanilla Ice Cream 1L", category: "Frozen", quantity: 1, price: 280, originalPrice: 310, reasoning: "Dessert for the kids", agentSource: "health", emoji: "🍦" },
      ],
      skipped: [
        { id: "s1", name: "Premium Imported Cheese", reasoning: "Outside budget for casual hosting", price: 650, emoji: "🧀" },
        { id: "s2", name: "Red Wine 750ml", reasoning: "Family guests — skipping alcohol", price: 1200, emoji: "🍷" },
        { id: "s3", name: "Fresh Sushi Platter", reasoning: "Cannot guarantee freshness in 11 min", price: 899, emoji: "🍣" },
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
        { id: "1", name: "ORS Hydration Sachets (10-pack)", category: "Wellness", quantity: 2, price: 120, reasoning: "Rehydration first", agentSource: "health", emoji: "💊" },
        { id: "2", name: "Paracetamol 500mg (15 tablets)", category: "Pharmacy", quantity: 1, price: 35, reasoning: "Fever / pain relief", agentSource: "health", emoji: "💊" },
        { id: "3", name: "Maggi 2-min Noodles (4-pack)", category: "Quick Meals", quantity: 1, price: 96, reasoning: "Soft, minimal effort", agentSource: "context", emoji: "🍜" },
        { id: "4", name: "Real Mixed Fruit Juice 1L", category: "Beverages", quantity: 1, price: 130, reasoning: "Vitamin boost, easy on stomach", agentSource: "health", emoji: "🧃" },
        { id: "5", name: "Vicks VapoRub 25g", category: "Pharmacy", quantity: 1, price: 90, reasoning: "Congestion relief", agentSource: "health", emoji: "🌿" },
        { id: "6", name: "Tissue Box (200 pulls)", category: "Household", quantity: 1, price: 80, reasoning: "Restocked — likely running low", agentSource: "context", emoji: "🧻" },
      ],
      skipped: [
        { id: "s1", name: "Spicy Chicken Biryani", reasoning: "Too heavy when unwell", price: 280, emoji: "🍛" },
        { id: "s2", name: "Cold Brew Coffee", reasoning: "Caffeine not ideal right now", price: 180, emoji: "☕" },
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
      items: [
        { id: "1", name: "Emergency LED Candles (6-pack)", category: "Emergency", quantity: 1, price: 199, reasoning: "Immediate light source", agentSource: "speed", emoji: "🕯️" },
        { id: "2", name: "10,000 mAh Power Bank", category: "Electronics", quantity: 1, price: 999, originalPrice: 1499, reasoning: "Keep phones alive", agentSource: "speed", emoji: "🔋" },
        { id: "3", name: "Bisleri Water 2L (4-pack)", category: "Beverages", quantity: 1, price: 160, reasoning: "Backup drinking water", agentSource: "health", emoji: "💧" },
        { id: "4", name: "Insulated Ice Pack (2-pack)", category: "Emergency", quantity: 1, price: 250, reasoning: "Save fridge perishables", agentSource: "context", emoji: "🧊" },
        { id: "5", name: "Ready-to-Eat Dal Tadka", category: "Meals", quantity: 2, price: 90, reasoning: "No cooking needed", agentSource: "context", emoji: "🥘" },
      ],
      skipped: [
        { id: "s1", name: "Frozen Pizza", reasoning: "Cannot cook — power out", price: 320, emoji: "🍕" },
        { id: "s2", name: "Fresh Milk 1L", reasoning: "Will spoil without refrigeration", price: 65, emoji: "🥛" },
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
      { id: "1", name: "Amul Toned Milk 1L", category: "Dairy", quantity: 2, price: 64, reasoning: "Weekly staple", agentSource: "context", emoji: "🥛" },
      { id: "2", name: "Modern Brown Bread", category: "Bakery", quantity: 1, price: 50, reasoning: "Breakfast restock", agentSource: "context", emoji: "🍞" },
      { id: "3", name: "Tata Salt 1kg", category: "Pantry", quantity: 1, price: 28, reasoning: "Predicted to run out tomorrow", agentSource: "context", emoji: "🧂" },
      { id: "4", name: "Fresh Bananas (1 dozen)", category: "Produce", quantity: 1, price: 60, reasoning: "Daily fruit intake", agentSource: "health", emoji: "🍌" },
      { id: "5", name: "Tropicana Orange Juice 1L", category: "Beverages", quantity: 1, price: 130, originalPrice: 150, reasoning: "On sale today", agentSource: "speed", emoji: "🧃" },
      { id: "6", name: "Maggi Atta Noodles (4-pack)", category: "Quick Meals", quantity: 1, price: 96, reasoning: "Pantry backup", agentSource: "context", emoji: "🍜" },
    ],
    skipped: [
      { id: "s1", name: "Premium Cold Pressed Oil", reasoning: "You bought this last week", price: 450, emoji: "🫒" },
    ],
  };
}

export const useStore = create<AppState>((set, get) => ({
  searchQuery: "",
  cartItems: [],
  skippedItems: [],
  agentVerdicts: { speed: "", context: "", health: "" },
  urgencyLevel: "normal",
  ecoProgress: 62,
  isGenerating: false,
  setSearchQuery: (text) => set({ searchQuery: text }),
  generateResults: async (input) => {
    set({ isGenerating: true, searchQuery: input });
    await new Promise((r) => setTimeout(r, 600));
    const res = mockGenerateCart(input);
    set({
      cartItems: res.items,
      skippedItems: res.skipped,
      agentVerdicts: res.verdicts,
      urgencyLevel: res.urgency,
      isGenerating: false,
    });
  },
  updateQuantity: (id, qty) =>
    set((s) => ({
      cartItems: s.cartItems
        .map((it) => (it.id === id ? { ...it, quantity: Math.max(0, qty) } : it))
        .filter((it) => it.quantity > 0),
    })),
  removeItem: (id) =>
    set((s) => ({ cartItems: s.cartItems.filter((it) => it.id !== id) })),
  addCartItem: (item) =>
    set((s) => {
      const exists = s.cartItems.find((i) => i.id === item.id);
      if (exists) {
        return {
          cartItems: s.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { cartItems: [...s.cartItems, item] };
    }),
  addSkippedItem: (id) => {
    const s = get();
    const sk = s.skippedItems.find((x) => x.id === id);
    if (!sk) return;
    set({
      cartItems: [
        ...s.cartItems,
        {
          id: sk.id,
          name: sk.name,
          category: "Added back",
          quantity: 1,
          price: sk.price,
          reasoning: "Added by user from skipped list",
          agentSource: "context",
          emoji: sk.emoji,
        },
      ],
      skippedItems: s.skippedItems.filter((x) => x.id !== id),
    });
  },
  clearCart: () => set({ cartItems: [], skippedItems: [] }),
}));

export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, it) => sum + it.price * it.quantity, 0);
