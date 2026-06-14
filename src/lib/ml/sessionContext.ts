// Derives the live session context fed to the Zero-Second Cart model.
// hour/dayOfWeek come from the real device clock (so the prediction genuinely
// changes depending on when the app is opened); the "days since last
// purchase" figures are a hardcoded mock — consistent with the other mock
// purchase-history data used across the app (src/lib/data/purchaseHistory.ts)
// — standing in for real order timestamps.
import type { SessionContext } from "./basketModel";

const MOCK_DAYS_SINCE_LAST_PURCHASE = {
  dairy: 7,
  snacks: 9,
  produce: 6,
  staples: 8,
};

export function getCurrentSessionContext(): SessionContext {
  const now = new Date();
  const dayOfWeek = now.getDay();
  return {
    hour: now.getHours(),
    dayOfWeek,
    isWeekend: dayOfWeek === 0 || dayOfWeek === 6 ? 1 : 0,
    daysSinceDairy: MOCK_DAYS_SINCE_LAST_PURCHASE.dairy,
    daysSinceSnacks: MOCK_DAYS_SINCE_LAST_PURCHASE.snacks,
    daysSinceProduce: MOCK_DAYS_SINCE_LAST_PURCHASE.produce,
    daysSinceStaples: MOCK_DAYS_SINCE_LAST_PURCHASE.staples,
  };
}
