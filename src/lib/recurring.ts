// Pure rules-based parsing for "manual recurring context" reminders.
// No AI involved — just regex matching on common phrasings like:
//   "Remind me to add Bread every alternate days"
//   "I would like to have a Protein Powder ordered in first week of every month"

export interface ParsedRecurring {
  itemName: string;
  frequencyLabel: string;
  frequencyDays: number;
}

const NUMBER_WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
};

function toNumber(s: string): number {
  return NUMBER_WORDS[s.toLowerCase()] ?? parseInt(s, 10);
}

const NUM = "(\\d+|one|two|three|four|five|six|seven|eight|nine|ten)";

const FREQUENCY_RULES: { regex: RegExp; days: number | ((m: RegExpMatchArray) => number); label: string | ((m: RegExpMatchArray) => string) }[] = [
  { regex: /(?:every\s+)?\b(?:alternate|alternative|other)\b\s+days?/i, days: 2, label: "Every alternate day" },
  { regex: new RegExp(`(?:every\\s+)?\\b${NUM}\\b\\s+days?`, "i"), days: (m) => toNumber(m[1]), label: (m) => `Every ${toNumber(m[1])} days` },
  { regex: /\bfortnightly\b|(?:every\s+)?\bfortnight\b|(?:every\s+)?\b(?:other|alternate|2|two)\b\s+weeks?|\bbi-?weekly\b/i, days: 14, label: "Every 2 weeks" },
  { regex: new RegExp(`(?:every\\s+)?\\b${NUM}\\b\\s+weeks?`, "i"), days: (m) => toNumber(m[1]) * 7, label: (m) => `Every ${toNumber(m[1])} weeks` },
  { regex: /(in\s+)?(the\s+)?first week of (?:every|each)?\s*month/i, days: 30, label: "Monthly (first week)" },
  { regex: /twice a month|twice monthly/i, days: 15, label: "Twice a month" },
  { regex: /every month|monthly|once a month/i, days: 30, label: "Monthly" },
  { regex: /twice a week|twice weekly/i, days: 3, label: "Twice a week" },
  { regex: /every\s*day|daily|everyday|once a day/i, days: 1, label: "Daily" },
  { regex: /every week|weekly|once a week/i, days: 7, label: "Weekly" },
];

const FILLER_PATTERNS = [
  /^i'?d like to have\b/i,
  /^i would like to have\b/i,
  /^remind me to (add|order|buy|get)\b/i,
  /^(please\s+)?(add|order|buy|get)\b/i,
  /\bordered\b/i,
  /^to\s+/i,
  /\b(in|for|on)\s*$/i,
];

export function parseRecurringInput(raw: string): ParsedRecurring {
  const text = raw.trim();
  let rest = text;
  let frequencyDays = 7;
  let frequencyLabel = "Weekly";

  for (const rule of FREQUENCY_RULES) {
    const m = rest.match(rule.regex);
    if (m) {
      frequencyDays = typeof rule.days === "function" ? rule.days(m) : rule.days;
      frequencyLabel = typeof rule.label === "function" ? rule.label(m) : rule.label;
      rest = rest.replace(m[0], " ");
      break;
    }
  }

  for (const pattern of FILLER_PATTERNS) {
    rest = rest.replace(pattern, " ");
  }

  rest = rest
    .replace(/[.,!]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim()
    .replace(/^(a|an|the)\s+/i, "")
    .trim();

  const cleaned = rest || text;
  const itemName = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  return { itemName, frequencyDays, frequencyLabel };
}

export type DueStatus = "overdue" | "due-today" | "upcoming";

export function getDueStatus(nextDueDate: string): { status: DueStatus; daysUntil: number } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(nextDueDate);
  due.setHours(0, 0, 0, 0);
  const daysUntil = Math.round((due.getTime() - today.getTime()) / 86400000);
  if (daysUntil < 0) return { status: "overdue", daysUntil };
  if (daysUntil === 0) return { status: "due-today", daysUntil };
  return { status: "upcoming", daysUntil };
}

export function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
