import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { products } from './data/products.js';
import { findOrder, saveOrder } from './orders.js';
import { priceCart } from './pricing.js';
import { parseItems } from './validate.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;
const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/api/products', (_req, res) => res.json(products));

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// The browser sends only ids and quantities. Prices and the discount are worked out here.
app.post('/api/orders', (req, res) => {
  const items = parseItems(req.body?.items);
  if (!items) return res.status(400).json({ error: 'Invalid input' });

  const lines = [];
  for (const { id, qty } of items) {
    const product = products.find((p) => p.id === id);
    if (!product) return res.status(400).json({ error: `Unknown product ${id}` });
    lines.push({ id, name: product.name, price: product.price, qty });
  }

  const { total, discount, grand } = priceCart(lines);
  const order = {
    orderId: `OBS-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    items: lines,
    totals: { total: total / 100, discount: discount / 100, grandTotal: grand / 100 },
  };
  saveOrder(order);
  res.status(201).json(order);
});

app.get('/api/orders/:id', (req, res) => {
  const order = findOrder(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));

// After `npm run build`, this same server also serves the finished website.
const dist = path.join(here, '..', 'client', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid input' });
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => console.log(`Obsidian Maison API listening on http://localhost:${PORT}`));
