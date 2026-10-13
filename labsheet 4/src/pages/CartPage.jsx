import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice > 150 ? 0 : 15.00;
  const grandTotal = totalPrice + shipping;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <span className="cart-count-pill">{totalCount} items</span>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          <div className="cart-table-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span></span>
          </div>

          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="cart-item-row">
              <div className="item-info">
                <img src={product.image} alt={product.title} className="item-thumb" />
                <div>
                  <Link to={`/products/${product.id}`} className="item-title">
                    {product.title}
                  </Link>
                  <div className="item-cat">{product.category}</div>
                </div>
              </div>

              <div className="item-price">${product.price.toFixed(2)}</div>

              <div className="item-qty">
                <div className="quantity-control-small">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="qty-btn-sm"
                  >
                    -
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="qty-btn-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="item-total">
                ${(product.price * quantity).toFixed(2)}
              </div>

              <div className="item-actions">
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="btn-remove"
                  title="Remove from cart"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div className="cart-actions-bar">
            <Link to="/products" className="btn btn-outline">
              ← Continue Shopping
            </Link>
            <button onClick={clearCart} className="btn-clear-cart">
              Empty Cart
            </button>
          </div>
        </div>

        {/* Order Summary sidebar */}
        <div className="cart-summary-card">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <div className="free-shipping-hint">
              Add ${(150 - totalPrice).toFixed(2)} more for Free Shipping!
            </div>
          )}
          <hr className="summary-divider" />
          <div className="summary-row total-row">
            <span>Estimated Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => alert('Order Placed Successfully! (Demo Purpose)')}
            className="btn btn-primary btn-checkout"
          >
            Proceed to Checkout
          </button>
          <p className="checkout-guarantee">🔒 Safe & Secure 256-Bit SSL Checkout</p>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
