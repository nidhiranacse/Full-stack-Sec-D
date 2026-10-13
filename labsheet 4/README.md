# Lab 4: React Routing and State Management — NovaStore SPA

## 🎯 Aim
Build a multi-page single-page application (SPA) featuring route parameters, global state management, loading states, and 404 error handling.

---

## 📋 Features Implemented

1. **Multi-Page Routing with `react-router-dom` (v6)**:
   - `Home` (`/`): Landing page with hero banner, value props, and featured products.
   - `Products` (`/products`): Full catalog with real-time category filtering and search.
   - `Product Details` (`/products/:id`): Dynamic detail view extracting `:id` via `useParams()`.
   - `Cart` (`/cart`): Shopping cart page managing items, quantities, and totals.
   - `404 Not Found` (`*`): Catch-all route for invalid or missing URLs.

2. **Route Parameters**:
   - Implemented via `useParams()` in `ProductDetails.jsx` to dynamically load product specs based on the URL parameter `/products/:id`.

3. **Global State Management (Context API)**:
   - `CartContext.jsx` provides global cart state across the whole application tree.
   - Actions: `addToCart(product, qty)`, `removeFromCart(id)`, `updateQuantity(id, qty)`, `clearCart()`.
   - Computed properties: `totalCount`, `totalPrice`.
   - Automatic browser persistence using `localStorage`.
   - Global active cart count badge on the navigation bar.

4. **Loading States**:
   - Simulated asynchronous fetch operations (`fetchProducts` and `fetchProductById`) with animated `LoadingSpinner` indicators.

5. **404 Not Found Page**:
   - Handles nonexistent routes gracefully with custom graphics, error messaging, and quick return links.

---

## 🗺️ Routing Architecture Table

| Route Path | Component | Purpose | Dynamic Params / State |
| :--- | :--- | :--- | :--- |
| `/` | `Home` | Landing page & featured picks | Consumes `useCart` |
| `/products` | `Products` | Catalog with search & filter | Async fetch + Loading state |
| `/products/:id` | `ProductDetails` | Deep product view & add to cart | `useParams()` (`id`), `useCart` |
| `/cart` | `CartPage` | Cart view, quantity adjustment, totals | Global `CartContext` |
| `*` | `NotFound` | 404 error page | Catch-all wildcard |

---

## 🛠️ How to Run Locally

1. Navigate to the project folder:
   ```bash
   cd lab-4-routing-cart
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:3001` (or Vite's active port).

---

## 🚀 Deployment & Demo Video Guide (Deliverable)

### Option A: Free 1-Click Deployment (Vercel)
1. Push this repository to your GitHub account.
2. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
3. Click **Add New Project**, select your repository, and set Root Directory to `lab-4-routing-cart`.
4. Click **Deploy**. Vercel will generate your live production URL (e.g. `https://novastore-lab4.vercel.app`).

### Option B: Local Demo Video Recording
- Use Windows built-in screen recorder (**Win + Alt + R**) or [OBS Studio](https://obsproject.com/).
- Showcase:
  1. Navigating from Home -> Products -> Product Details (`/products/:id`).
  2. Loading spinner while products load.
  3. Adding items to cart and observing the navbar badge update.
  4. Visiting Cart page (`/cart`), modifying quantity, and checkout.
  5. Visiting an invalid route like `/non-existent-url` to show the 404 page.

---

## 📦 Project Structure
```text
lab-4-routing-cart/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── CartContext.jsx
    ├── data/
    │   └── products.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   └── LoadingSpinner.jsx
    └── pages/
        ├── Home.jsx
        ├── Products.jsx
        ├── ProductDetails.jsx
        ├── CartPage.jsx
        └── NotFound.jsx
```
