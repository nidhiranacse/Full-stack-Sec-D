import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { totalCount, notification } = useCart();

  return (
    <>
      <header className="navbar-container">
        <div className="navbar-inner">
          <Link to="/" className="brand-logo">
            <span className="brand-icon">⚡</span>
            <span className="brand-name">NovaStore</span>
          </Link>

          <nav className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? 'nav-link cart-link active' : 'nav-link cart-link')}
            >
              <span>🛒 Cart</span>
              {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Floating toast notification when item is added or removed */}
      {notification && (
        <div className="toast-notification">
          <span>✨ {notification}</span>
        </div>
      )}
    </>
  );
}

export default Navbar;
