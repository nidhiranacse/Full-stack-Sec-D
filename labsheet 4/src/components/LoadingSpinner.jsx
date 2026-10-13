import React from 'react';

function LoadingSpinner({ message = 'Loading products...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-text">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
