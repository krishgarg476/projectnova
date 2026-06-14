// Generates the synthetic training set for the "Zero-Second Cart" next-basket
// model (src/lib/data/basketSessions.json). Each row is a simulated app-open
// "session" described by 7 simple, always-available features:
//   - hour (0-23), dayOfWeek (0=Sun..6=Sat), isWeekend (0/1)
//   - daysSinceDairy / daysSinceSnacks / daysSinceProduce / daysSinceStaples
// labeled with the basket the user most likely came to buy.
//
// Run with: ./node_modules/.bin/tsx scripts/generateBasketDataset.ts
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { BASKET_CLASSES, type BasketClass, type BasketSessionRow, mulberry32 } from "./basketShared";

const __dirname = dirname(fileURLToPath(import.meta.url));

function randInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

// Encodes the "common sense" rules from the spec (morning -> milk/eggs,
// evening -> veggies/bread, Friday/Saturday night -> chips/soda, long-overdue
// staples -> rice/dal) as weights, then samples a label from that
// distribution so the data is learnable but noisy/realistic.
function generateRow(rng: () => number): BasketSessionRow {
  const hour = randInt(rng, 0, 23);
  const dayOfWeek = randInt(rng, 0, 6);
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6 ? 1 : 0;
  const daysSinceDairy = randInt(rng, 0, 7);
  const daysSinceSnacks = randInt(rng, 0, 10);
  const daysSinceProduce = randInt(rng, 0, 7);
  const daysSinceStaples = randInt(rng, 0, 21);

  const weights: Record<BasketClass, number> = {
    "Milk & Eggs": 0.2,
    "Chips & Soda": 0.2,
    "Vegetables & Bread": 0.2,
    "Rice & Dal": 0.2,
    None: 1,
  };

  if (hour >= 6 && hour <= 10) {
    weights["Milk & Eggs"] += 7 * (daysSinceDairy / 7) ** 1.5;
  }
  if (hour >= 17 && hour <= 21) {
    weights["Vegetables & Bread"] += 7 * (daysSinceProduce / 7) ** 1.5;
  }
  if ((dayOfWeek === 5 || dayOfWeek === 6) && hour >= 20) {
    weights["Chips & Soda"] += 7 * (daysSinceSnacks / 10) ** 1.5;
  }
  if (daysSinceStaples >= 10) {
    weights["Rice & Dal"] += 1 + 6 * Math.min((daysSinceStaples - 10) / 10, 1);
  }

  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let r = rng() * total;
  let label: BasketClass = "None";
  for (const c of BASKET_CLASSES) {
    r -= weights[c];
    if (r <= 0) {
      label = c;
      break;
    }
  }

  return { hour, dayOfWeek, isWeekend, daysSinceDairy, daysSinceSnacks, daysSinceProduce, daysSinceStaples, label };
}

const ROWS = 3000;
const rng = mulberry32(1234);
const rows: BasketSessionRow[] = [];
for (let i = 0; i < ROWS; i++) rows.push(generateRow(rng));

const outPath = join(__dirname, "..", "src", "lib", "data", "basketSessions.json");
writeFileSync(outPath, JSON.stringify(rows));

const counts: Record<string, number> = {};
for (const r of rows) counts[r.label] = (counts[r.label] || 0) + 1;
console.log(`Wrote ${rows.length} rows to ${outPath}`);
console.log("Label distribution:", counts);
