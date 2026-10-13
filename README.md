# Obsidian Maison

Black and gold shopping cart. Practical B2 (Shopping Cart with Discount) wrapped in a full-stack app.

- `client/src/Cart.jsx` is the graded component (default export, `products` prop, exact `data-testid` values).
- `client/src/cartRules.js` holds every rule the sheet leaves open (discount threshold, rate, what "-" does at quantity 1).
- `server/` is an Express API: `GET /api/products`, `POST /api/orders` (prices and discount are recomputed on the server), `GET /api/orders/:id`.

## Run

Needs Node 20.19+ or 22.12+.

```bash
npm install
npm --prefix server install
npm --prefix client install
npm run dev
```

Open http://localhost:5173

## Test

```bash
npm test
```

## Production-style run

```bash
npm run build
npm start
```

Open http://localhost:4000 (Express serves the built site and the API together).

## Optional: real video

Put a short clip at `client/public/hero.mp4` and the opening scene plays it scrubbed by scrolling
(scroll down = forward, scroll up = rewind). If the file is missing, nothing changes.
For smooth scrubbing, export with a keyframe on every frame or two, for example:

```bash
ffmpeg -i input.mp4 -an -vf scale=1920:-2 -g 2 -crf 24 client/public/hero.mp4
```
