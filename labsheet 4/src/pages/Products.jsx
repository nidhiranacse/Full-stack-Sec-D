import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProducts().then((data) => {
      if (isMounted) {
        setProducts(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Product Catalog</h1>
        <p>Explore our wide selection of tech gear and accessories</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="controls-bar">
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading state demonstration */}
      {loading ? (
        <LoadingSpinner message="Fetching the product catalog..." />
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="btn btn-outline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
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
                <p className="product-desc-short">{product.description}</p>
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
      )}
    </div>
  );
}

export default Products;
