// Pure rules-based parsing + catalog matching for Voice Mode.
// No AI involved: regex parses the spoken command, then the local catalog
// is searched for the best match — falling back to the closest "similar"
// item (by category/keyword overlap) when the exact item isn't stocked.

import productCatalog from "@/lib/data/productCatalog.json";

export interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  image_keyword: string;
  is_vegetarian: boolean;
  is_eco: boolean;
  brand: string;
  eta_minutes: number;
  keywords: string[];
}

export interface MatchResult {
  product: CatalogProduct;
  exact: boolean;
}

const STOPWORDS = new Set(["a", "an", "the", "some", "me", "to", "please", "of", "for", "my", "cart", "and", "&", "also", "plus", "hello", "hi", "hey"]);

function tokenize(s: string): string[] {
  return s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

// Whole-word equality (with basic plural handling) — avoids substring
// false-positives like "chocolate" containing "cola".
function tokensMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (a === b + "s" || b === a + "s") return true;
  if (a === b + "es" || b === a + "es") return true;
  return false;
}

function productTokens(p: CatalogProduct): string[] {
  return [...tokenize(p.name), ...(p.keywords || []).flatMap(tokenize)];
}

// Finds the catalog product(s) matching a spoken item phrase. Returns:
// - a single exact: true match when every (non-stopword) word in the query
//   matches a whole word in one product's name/keywords;
// - multiple exact: true matches when the phrase names several distinct
//   items in one breath (e.g. "bread milk" -> Bread + Milk);
// - a single exact: false match — the closest available substitute — when
//   nothing matches directly but something in the catalog shares a word;
// - an empty array if nothing in the catalog relates to the query at all.
export function matchProducts(query: string): MatchResult[] {
  const lower = query.toLowerCase().trim();
  if (!lower) return [];
  const items = productCatalog as CatalogProduct[];

  const rawTokens = tokenize(lower);
  const queryTokens = rawTokens.filter((t) => !STOPWORDS.has(t));
  const effectiveTokens = queryTokens.length ? queryTokens : rawTokens;

  // Whole phrase matches a single product directly.
  for (const p of items) {
    const allTokens = productTokens(p);
    if (effectiveTokens.every((t) => allTokens.some((at) => tokensMatch(t, at)))) {
      return [{ product: p, exact: true }];
    }
  }

  // Multiple items named together, e.g. "bread milk" or "bread and milk" —
  // match each significant word to its own product.
  if (effectiveTokens.length > 1) {
    const found: CatalogProduct[] = [];
    for (const t of effectiveTokens) {
      const p = items.find((p) => productTokens(p).some((at) => tokensMatch(t, at)));
      if (p && !found.some((f) => f.id === p.id)) found.push(p);
    }
    if (found.length >= 1) return found.map((product) => ({ product, exact: true }));
  }

  // Fallback: closest substitute by keyword/category overlap.
  let best: CatalogProduct | null = null;
  let bestScore = 0;
  for (const p of items) {
    const haystack = [p.name, p.category, p.image_keyword.replace(/-/g, " "), ...(p.keywords || [])]
      .join(" ")
      .toLowerCase();
    let score = 0;
    for (const w of effectiveTokens) {
      if (w.length >= 3 && haystack.includes(w)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }
  return best ? [{ product: best, exact: false }] : [];
}

export function matchProduct(query: string): MatchResult | null {
  return matchProducts(query)[0] ?? null;
}

export type VoiceAction = "add" | "remove" | "confirm" | "clear" | "noop";

export interface VoiceCommand {
  action: VoiceAction;
  item?: string;
  quantity?: number;
}

const CONFIRM_RE = /^(confirm|done|that'?s all|finish|place( the)? order|checkout|go to cart|i'?m done)\b/i;
const CLEAR_RE = /^(clear|empty)( the| my)? cart\b/i;
const REMOVE_RE = /^(remove|delete|take off|drop)\s+(?:\d+\s+)?(.+)/i;
const ADD_RE = /^(?:add|i need|i want|get me|buy|order|get|please add|can you add)\s+(?:(\d+)\s+)?(.+)/i;

export function parseVoiceCommand(raw: string): VoiceCommand {
  const text = raw.trim().replace(/[.!?]+$/, "");
  if (!text) return { action: "noop" };
  if (CONFIRM_RE.test(text)) return { action: "confirm" };
  if (CLEAR_RE.test(text)) return { action: "clear" };

  let m = text.match(REMOVE_RE);
  if (m) return { action: "remove", item: m[2].trim() };

  m = text.match(ADD_RE);
  if (m) return { action: "add", item: m[2].trim(), quantity: m[1] ? parseInt(m[1], 10) : 1 };

  // Bare item name with no leading verb, e.g. just "milk"
  return { action: "add", item: text, quantity: 1 };
}
