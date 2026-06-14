// Pure-TS inference for the "Zero-Second Cart" next-basket model.
// Walks the gradient-boosted trees serialized in basketModel.json (trained
// offline by scripts/trainBasketModel.ts from basketSessions.json) and
// returns the most likely "next basket" for the current session context —
// or null if nothing is confident enough, so the UI can render nothing.
import basketModel from "@/lib/data/basketModel.json";

export interface SessionContext {
  hour: number;
  dayOfWeek: number;
  isWeekend: number;
  daysSinceDairy: number;
  daysSinceSnacks: number;
  daysSinceProduce: number;
  daysSinceStaples: number;
}

export interface BasketItem {
  id: string;
  name: string;
  price: number;
  category: string;
  imageKeyword: string;
}

export interface BasketPrediction {
  label: string;
  items: BasketItem[];
  confidence: number; // 0-100
}

type TreeNode = { feature: keyof SessionContext; threshold: number; left: TreeNode; right: TreeNode } | { value: number };

function evalTree(node: TreeNode, ctx: SessionContext): number {
  if ("value" in node) return node.value;
  return ctx[node.feature] <= node.threshold ? evalTree(node.left, ctx) : evalTree(node.right, ctx);
}

function softmax(scores: number[]): number[] {
  const max = Math.max(...scores);
  const exps = scores.map((s) => Math.exp(s - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

// Real catalog items to dispatch for each predicted basket (src/lib/data/productCatalog.json).
const BASKET_ITEMS: Record<string, BasketItem[]> = {
  "Milk & Eggs": [
    { id: "d1", name: "Amul Toned Milk 1L", price: 64, category: "Dairy", imageKeyword: "milk-carton" },
    { id: "d5", name: "Farm Eggs (12-pack)", price: 96, category: "Dairy", imageKeyword: "farm-eggs" },
  ],
  "Chips & Soda": [
    { id: "s1", name: "Lay's Party Pack (6 flavours)", price: 299, category: "Snacks", imageKeyword: "potato-chips-bowl" },
    { id: "s2", name: "Coca-Cola 1.25L (2-pack)", price: 180, category: "Beverages", imageKeyword: "coca-cola-bottle" },
  ],
  "Vegetables & Bread": [
    { id: "d8", name: "Fresh Mixed Vegetables 2kg", price: 280, category: "Produce", imageKeyword: "mixed-vegetables" },
    { id: "d2", name: "Whole Wheat Bread", price: 50, category: "Bakery", imageKeyword: "brown-bread-loaf" },
  ],
  "Rice & Dal": [
    { id: "d6", name: "Premium Basmati Rice 5kg", price: 549, category: "Staples", imageKeyword: "basmati-rice" },
    { id: "d7", name: "Tata Sampann Toor Dal 1kg", price: 169, category: "Staples", imageKeyword: "toor-dal" },
  ],
};

const CONFIDENCE_THRESHOLD = 0.35;

export function predictNextBasket(ctx: SessionContext): BasketPrediction | null {
  const model = basketModel as unknown as {
    classes: string[];
    learningRate: number;
    trees: Record<string, TreeNode[]>;
  };

  const scores = model.classes.map((cls) =>
    (model.trees[cls] || []).reduce((sum, tree) => sum + model.learningRate * evalTree(tree, ctx), 0)
  );
  const probs = softmax(scores);

  let bestIdx = 0;
  for (let i = 1; i < probs.length; i++) if (probs[i] > probs[bestIdx]) bestIdx = i;

  const label = model.classes[bestIdx];
  const confidence = probs[bestIdx];
  const items = BASKET_ITEMS[label];
  if (label === "None" || !items || confidence < CONFIDENCE_THRESHOLD) return null;

  return { label, items, confidence: Math.round(confidence * 100) };
}
