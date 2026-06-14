// Shared types/helpers for the "Zero-Second Cart" dataset + training scripts.
// Side-effect free (importing this never writes files), unlike the
// generate/train scripts which run as standalone CLI tools.

export const BASKET_CLASSES = ["Milk & Eggs", "Chips & Soda", "Vegetables & Bread", "Rice & Dal", "None"] as const;
export type BasketClass = (typeof BASKET_CLASSES)[number];

export const FEATURES = [
  "hour",
  "dayOfWeek",
  "isWeekend",
  "daysSinceDairy",
  "daysSinceSnacks",
  "daysSinceProduce",
  "daysSinceStaples",
] as const;
export type Feature = (typeof FEATURES)[number];

export interface BasketSessionRow {
  hour: number;
  dayOfWeek: number;
  isWeekend: number;
  daysSinceDairy: number;
  daysSinceSnacks: number;
  daysSinceProduce: number;
  daysSinceStaples: number;
  label: BasketClass;
}

export type TreeNode = { feature: Feature; threshold: number; left: TreeNode; right: TreeNode } | { value: number };

export function isLeaf(node: TreeNode): node is { value: number } {
  return "value" in node;
}

export function predictTree(node: TreeNode, row: Record<string, number>): number {
  if (isLeaf(node)) return node.value;
  return row[node.feature] <= node.threshold ? predictTree(node.left, row) : predictTree(node.right, row);
}

export function softmax(scores: number[]): number[] {
  const max = Math.max(...scores);
  const exps = scores.map((s) => Math.exp(s - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

// Deterministic PRNG so generated data/models are reproducible across runs.
export function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
