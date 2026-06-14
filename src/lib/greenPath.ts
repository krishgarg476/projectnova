// "Green Path" — pure local logic (no AI). Suggests 1-2 items from the
// user's predicted/recurring "usual list" (Features 6 & 9) that aren't
// already in the cart, so adding them consolidates this delivery instead
// of triggering a separate trip later.

import { purchaseHistory } from "@/lib/data/purchaseHistory";
import { getDueStatus } from "@/lib/recurring";
import type { CartItem, RecurringRule } from "@/store";

export interface GreenSuggestion {
  id: string;
  name: string;
  price: number;
  imageKeyword: string;
  category: string;
  reasoning: string;
}

const CO2_PER_ITEM_KG = 0.2;
const MAX_SUGGESTIONS = 2;
const UPCOMING_WINDOW_DAYS = 3;

export function getGreenPathSuggestions(cartItems: CartItem[], recurringRules: RecurringRule[]): GreenSuggestion[] {
  const inCartIds = new Set(cartItems.map((i) => i.id));
  const inCartNames = new Set(cartItems.map((i) => i.name.toLowerCase()));
  const out: GreenSuggestion[] = [];

  const alreadySuggested = (name: string) => out.some((o) => o.name.toLowerCase() === name.toLowerCase());

  for (const r of purchaseHistory.predictedRestocks) {
    if (out.length >= MAX_SUGGESTIONS) break;
    if (inCartIds.has(r.id) || inCartNames.has(r.name.toLowerCase())) continue;
    out.push({
      id: r.id,
      name: r.name,
      price: r.price,
      imageKeyword: r.imageKeyword,
      category: r.category,
      reasoning: r.reasoning,
    });
  }

  for (const rule of recurringRules) {
    if (out.length >= MAX_SUGGESTIONS) break;
    if (inCartNames.has(rule.itemName.toLowerCase()) || alreadySuggested(rule.itemName)) continue;

    const { status, daysUntil } = getDueStatus(rule.nextDueDate);
    const dueSoon = status === "overdue" || status === "due-today" || (status === "upcoming" && daysUntil <= UPCOMING_WINDOW_DAYS);
    if (!dueSoon) continue;

    out.push({
      id: rule.id,
      name: rule.itemName,
      price: rule.price,
      imageKeyword: rule.imageKeyword,
      category: "Recurring",
      reasoning: `From your recurring reminder — ${rule.frequencyLabel.toLowerCase()}.`,
    });
  }

  return out;
}

export function estimateCO2SavedKg(suggestionCount: number): number {
  return Math.round(suggestionCount * CO2_PER_ITEM_KG * 10) / 10;
}
