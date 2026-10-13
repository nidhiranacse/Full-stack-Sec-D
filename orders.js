import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data');
const file = path.join(dataDir, 'orders.json');

function readAll() {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  const all = readAll();
  all.push(order);
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(all, null, 2));
  return order;
}

export function findOrder(orderId) {
  return readAll().find((o) => o.orderId === orderId) ?? null;
}
