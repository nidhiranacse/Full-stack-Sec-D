import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            🏠 Return to Homepage
          </Link>
          <Link to="/products" className="btn btn-outline">
            🛍️ Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
