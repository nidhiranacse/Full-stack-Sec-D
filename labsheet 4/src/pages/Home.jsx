import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

function Home() {
  const { addToCart } = useCart();
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-badge">Next-Gen Tech & Gear</span>
          <h1 className="hero-title">Experience Innovation at Your Fingertips</h1>
          <p className="hero-subtitle">
            Curated high-performance electronics, ergonomics, and daily essentials designed to elevate your workspace and lifestyle.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Explore All Products →
            </Link>
            <Link to="/cart" className="btn btn-outline">
              View Cart
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Lightning Fast Delivery</h3>
          <p>Get your gear delivered straight to your door with real-time tracking.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>2-Year Warranty</h3>
          <p>Complete peace of mind with 100% verified authentic items.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>30-Day Hassle Free Returns</h3>
          <p>Not satisfied? Exchange or return items with zero questions asked.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header">
          <div>
            <h2>Featured Products</h2>
            <p className="section-subtitle">Top rated picks from our latest collection</p>
          </div>
          <Link to="/products" className="view-all-link">
            See all ({PRODUCTS.length}) →
          </Link>
        </div>

        <div className="products-grid">
          {featured.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                <span className="product-category-tag">{product.category}</span>
              </div>
              <div className="product-info">
                <div className="product-rating">
                  ★ {product.rating} <span className="reviews">({product.reviewsCount})</span>
                </div>
                <h3 className="product-title">
                  <Link to={`/products/${product.id}`}>{product.title}</Link>
                </h3>
                <div className="product-footer">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <div className="product-card-buttons">
                    <Link to={`/products/${product.id}`} className="btn-sm btn-outline">
                      Details
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn-sm btn-primary"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
