// Turns the raw request body into a clean list of { id, qty }, or null if it is not acceptable.
export function parseItems(raw) {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 50) return null;

  const merged = new Map();
  for (const entry of raw) {
    const id = Number(entry?.id);
    const qty = Number(entry?.qty);
    if (!Number.isInteger(id) || !Number.isInteger(qty) || qty < 1 || qty > 99) return null;
    merged.set(id, Math.min(99, (merged.get(id) ?? 0) + qty));
  }
  return [...merged].map(([id, qty]) => ({ id, qty }));
}
