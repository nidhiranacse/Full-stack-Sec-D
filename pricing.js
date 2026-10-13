// Mirror of client/src/cartRules.js. If you change a rule there, change it here too.
export const DISCOUNT_THRESHOLD = 1000; // discount starts at this total (inclusive)
export const DISCOUNT_RATE = 0.1; // 10 percent

const toCents = (amount) => Math.round(Number(amount) * 100);

// Works in whole cents so totals never drift by a fraction of a paisa/cent.
export function priceCart(lines) {
  const total = lines.reduce((sum, line) => sum + toCents(line.price) * line.qty, 0);
  const discount = total >= toCents(DISCOUNT_THRESHOLD) ? Math.round(total * DISCOUNT_RATE) : 0;
  return { total, discount, grand: total - discount };
}
