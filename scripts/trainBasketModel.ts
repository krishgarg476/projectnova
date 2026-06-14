// Trains the "Zero-Second Cart" next-basket model on
// src/lib/data/basketSessions.json and writes the learned trees to
// src/lib/data/basketModel.json for the app to load at runtime.
//
// This is a hand-rolled, dependency-free gradient-boosted decision tree
// classifier (multiclass, one tree per class per round, softmax output) —
// the same idea as an XGBoost classifier, implemented in plain TypeScript so
// no Python/ML packages are required.
//
// Run with: ./node_modules/.bin/tsx scripts/trainBasketModel.ts
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  BASKET_CLASSES,
  FEATURES,
  type BasketClass,
  type BasketSessionRow,
  type Feature,
  type TreeNode,
  predictTree,
  softmax,
  mulberry32,
} from "./basketShared";

const __dirname = dirname(fileURLToPath(import.meta.url));

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function sse(values: number[], m: number): number {
  return values.reduce((s, v) => s + (v - m) ** 2, 0);
}

function fitTree(rows: BasketSessionRow[], residuals: number[], indices: number[], depth: number, maxDepth: number, minLeaf: number): TreeNode {
  const subResiduals = indices.map((i) => residuals[i]);
  const m = mean(subResiduals);
  if (depth >= maxDepth || indices.length < minLeaf * 2) {
    return { value: m };
  }

  const baseSSE = sse(subResiduals, m);
  let best: { feature: Feature; threshold: number; left: number[]; right: number[]; gain: number } | null = null;

  for (const feature of FEATURES) {
    const values = Array.from(new Set(indices.map((i) => rows[i][feature]))).sort((a, b) => a - b);
    for (let v = 0; v < values.length - 1; v++) {
      const threshold = (values[v] + values[v + 1]) / 2;
      const left: number[] = [];
      const right: number[] = [];
      for (const i of indices) {
        if (rows[i][feature] <= threshold) left.push(i);
        else right.push(i);
      }
      if (left.length < minLeaf || right.length < minLeaf) continue;

      const leftR = left.map((i) => residuals[i]);
      const rightR = right.map((i) => residuals[i]);
      const gain = baseSSE - sse(leftR, mean(leftR)) - sse(rightR, mean(rightR));
      if (gain > 0 && (!best || gain > best.gain)) {
        best = { feature, threshold, left, right, gain };
      }
    }
  }

  if (!best) return { value: m };

  return {
    feature: best.feature,
    threshold: best.threshold,
    left: fitTree(rows, residuals, best.left, depth + 1, maxDepth, minLeaf),
    right: fitTree(rows, residuals, best.right, depth + 1, maxDepth, minLeaf),
  };
}

const dataPath = join(__dirname, "..", "src", "lib", "data", "basketSessions.json");
const data: BasketSessionRow[] = JSON.parse(readFileSync(dataPath, "utf-8"));

// Deterministic shuffle + 80/20 train/test split.
const rng = mulberry32(42);
const shuffled = [...data];
for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(rng() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
const splitIdx = Math.floor(shuffled.length * 0.8);
const trainRows = shuffled.slice(0, splitIdx);
const testRows = shuffled.slice(splitIdx);

const ROUNDS = 10;
const LEARNING_RATE = 0.3;
const MAX_DEPTH = 3;
const MIN_LEAF = 24;

const n = trainRows.length;
const F: number[][] = BASKET_CLASSES.map(() => new Array(n).fill(0)); // F[class][sample]
const yOneHot: number[][] = trainRows.map((r) => BASKET_CLASSES.map((c) => (r.label === c ? 1 : 0)));

const trees: Record<BasketClass, TreeNode[]> = {} as Record<BasketClass, TreeNode[]>;
for (const c of BASKET_CLASSES) trees[c] = [];

const allIndices = trainRows.map((_, i) => i);

for (let round = 0; round < ROUNDS; round++) {
  const probs: number[][] = [];
  for (let i = 0; i < n; i++) {
    probs.push(softmax(BASKET_CLASSES.map((_, k) => F[k][i])));
  }

  for (let k = 0; k < BASKET_CLASSES.length; k++) {
    const residuals = trainRows.map((_, i) => yOneHot[i][k] - probs[i][k]);
    const tree = fitTree(trainRows, residuals, allIndices, 0, MAX_DEPTH, MIN_LEAF);
    trees[BASKET_CLASSES[k]].push(tree);
    for (let i = 0; i < n; i++) {
      F[k][i] += LEARNING_RATE * predictTree(tree, trainRows[i]);
    }
  }
}

// Evaluate on held-out test set.
let correct = 0;
const confusion: Record<string, Record<string, number>> = {};
for (const row of testRows) {
  const scores = BASKET_CLASSES.map((c) => trees[c].reduce((s, t) => s + LEARNING_RATE * predictTree(t, row), 0));
  const probs = softmax(scores);
  let best = 0;
  for (let i = 1; i < probs.length; i++) if (probs[i] > probs[best]) best = i;
  const predicted = BASKET_CLASSES[best];
  if (predicted === row.label) correct++;
  confusion[row.label] = confusion[row.label] || {};
  confusion[row.label][predicted] = (confusion[row.label][predicted] || 0) + 1;
}

console.log(`Test accuracy: ${((correct / testRows.length) * 100).toFixed(1)}% (${correct}/${testRows.length})`);
console.log("Confusion (actual -> predicted counts):");
console.log(JSON.stringify(confusion, null, 2));

const model = {
  classes: BASKET_CLASSES,
  features: FEATURES,
  learningRate: LEARNING_RATE,
  trees,
};

const outPath = join(__dirname, "..", "src", "lib", "data", "basketModel.json");
writeFileSync(outPath, JSON.stringify(model));
console.log(`Saved model to ${outPath}`);
