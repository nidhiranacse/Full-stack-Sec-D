import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

function ProductDetails() {
  const { id } = useParams(); // Extract route param
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchProductById(id).then((found) => {
      if (isMounted) {
        setProduct(found);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, the product with ID #{id} could not be located in our inventory.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Products Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-details-page">
      <button onClick={() => navigate(-1)} className="btn-back">
        ← Back
      </button>

      <div className="details-container">
        <div className="details-image-wrapper">
          <img src={product.image} alt={product.title} className="details-image" />
          <span className="details-badge">{product.category}</span>
        </div>

        <div className="details-info">
          <div className="details-meta">
            <span className="rating-badge">★ {product.rating}</span>
            <span className="reviews-text">({product.reviewsCount} customer reviews)</span>
            <span className="stock-badge in-stock">In Stock & Ready to Ship</span>
          </div>

          <h1 className="details-title">{product.title}</h1>
          <div className="details-price">${product.price.toFixed(2)}</div>

          <p className="details-description">{product.description}</p>

          <div className="features-block">
            <h3>Key Features:</h3>
            <ul>
              {product.features?.map((feature, idx) => (
                <li key={idx}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          {/* Quantity Selector and Add to Cart */}
          <div className="action-row">
            <div className="quantity-control">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="qty-btn"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="qty-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button onClick={handleAddToCart} className="btn btn-primary btn-add-cart">
              🛒 Add {quantity} to Cart • ${(product.price * quantity).toFixed(2)}
            </button>
          </div>

          <div className="route-params-hint">
            <small>
              <strong>Route Param:</strong> Loaded product using URL parameter <code>id = {id}</code> via <code>useParams()</code>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
