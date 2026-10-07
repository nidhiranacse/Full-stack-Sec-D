import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useParams
} from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Nova X1 Smartphone",
    price: 32999,
    category: "Electronics",
    emoji: "📱",
    description: "A premium everyday smartphone with a bright display, fast performance and all-day battery."
  },
  {
    id: 2,
    name: "Pulse Pro Headphones",
    price: 5999,
    category: "Audio",
    emoji: "🎧",
    description: "Wireless headphones with clear sound, comfortable ear cushions and reliable battery life."
  },
  {
    id: 3,
    name: "Aero Smartwatch",
    price: 7499,
    category: "Wearables",
    emoji: "⌚",
    description: "A modern smartwatch for notifications, fitness tracking and everyday productivity."
  },
  {
    id: 4,
    name: "Mecha Keyboard",
    price: 4299,
    category: "Accessories",
    emoji: "⌨️",
    description: "A compact mechanical keyboard designed for comfortable coding and gaming sessions."
  },
  {
    id: 5,
    name: "Vision 4K Monitor",
    price: 24999,
    category: "Displays",
    emoji: "🖥️",
    description: "A sharp 4K monitor with an immersive workspace for study, design and entertainment."
  },
  {
    id: 6,
    name: "Orbit Gaming Mouse",
    price: 2199,
    category: "Accessories",
    emoji: "🖱️",
    description: "A lightweight precision mouse with responsive controls for work and gaming."
  }
];

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((current) => [...current, product]);
  }

  function removeFromCart(index) {
    setCart((current) => current.filter((_, i) => i !== index));
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, total }),
    [cart, total]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <Link className="brand" to="/">MY<span>SHOP</span></Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link className="cart-pill" to="/cart">
          🛒 Cart <b>{cart.length}</b>
        </Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <section className="hero page">
      <div className="hero-copy">
        <p className="eyebrow">LAB SHEET 04 · REACT</p>
        <h1>Everything you need.<br /><span>One simple shop.</span></h1>
        <p>
          A React single-page shopping application demonstrating components,
          routing, hooks and shared cart state.
        </p>
        <Link className="primary-btn" to="/products">View Products →</Link>
      </div>

      <div className="hero-orb">
        <div className="orb-card">
          <span>NEW</span>
          <strong>Tech Collection</strong>
          <small>Fresh picks for your setup.</small>
        </div>
      </div>
    </section>
  );
}

function Products() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", ...new Set(products.map((item) => item.category))];

  const visibleProducts =
    category === "All"
      ? products
      : products.filter((item) => item.category === category);

  if (loading) {
    return (
      <section className="page centered">
        <div className="loader"></div>
        <p>Loading products...</p>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="section-head">
        <div>
          <p className="eyebrow">OUR COLLECTION</p>
          <h2>Products</h2>
        </div>

        <div className="filters">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "filter active" : "filter"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <Link className="product-visual" to={`/products/${product.id}`}>
              <span>{product.emoji}</span>
            </Link>

            <div className="product-info">
              <small>{product.category}</small>
              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <div className="product-bottom">
                <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                <button
                  className="small-btn"
                  onClick={() => addToCart(product)}
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <section className="page centered">
        <h2>Product not found</h2>
        <Link className="primary-btn" to="/products">Back to Products</Link>
      </section>
    );
  }

  return (
    <section className="page detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-card">
        <div className="detail-visual">{product.emoji}</div>

        <div className="detail-content">
          <span className="category-label">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="detail-price">₹{product.price.toLocaleString("en-IN")}</div>
          <button
            className="primary-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

function Cart() {
  const { cart, removeFromCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <section className="page centered">
        <div className="empty-cart">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add a product to see it here.</p>
        <Link className="primary-btn" to="/products">Shop Products</Link>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="section-head">
        <div>
          <p className="eyebrow">YOUR BAG</p>
          <h2>Shopping Cart</h2>
        </div>
        <span className="count-label">{cart.length} item(s)</span>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.map((item, index) => (
            <article className="cart-item" key={`${item.id}-${index}`}>
              <div className="cart-icon">{item.emoji}</div>
              <div className="cart-info">
                <small>{item.category}</small>
                <h3>{item.name}</h3>
                <strong>₹{item.price.toLocaleString("en-IN")}</strong>
              </div>
              <button
                className="delete-btn"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>

        <aside className="summary">
          <h3>Order Summary</h3>
          <div><span>Items</span><span>{cart.length}</span></div>
          <div><span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span></div>
          <div><span>Delivery</span><span>Free</span></div>
          <hr />
          <div className="grand"><span>Total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
          <button className="checkout">Checkout</button>
        </aside>
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <footer>© 2026 Suryakant Upadhyay · Full Stack Lab · Lab Sheet 04</footer>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
