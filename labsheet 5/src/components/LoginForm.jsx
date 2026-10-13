import React, { useState } from 'react';
import { validateField } from '../utils/validators';
import PasswordStrengthChecker from './PasswordStrengthChecker';

/**
 * Task 5.1: Functional, responsive Login Form module using controlled component inputs
 * Incorporates dynamic regex criteria verification to trigger interactive error warning badges.
 */
function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const [submittedPayload, setSubmittedPayload] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Dynamic regex errors computed on state changes
  const emailErrors = touched.email ? validateField('email', formData.email) : [];
  const passwordErrors = touched.password ? validateField('password', formData.password) : [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const currentEmailErrors = validateField('email', formData.email);
    const currentPasswordErrors = validateField('password', formData.password);

    if (currentEmailErrors.length === 0 && currentPasswordErrors.length === 0) {
      setSubmittedPayload({
        email: formData.email,
        rememberMe: formData.rememberMe,
        timestamp: new Date().toLocaleTimeString()
      });
    }
  };

  return (
    <div className="card-module login-module">
      <div className="module-header">
        <h2>🔒 Secure Login Portal</h2>
        <p>Demonstrates Task 5.1 & 5.2: Controlled Inputs & Dynamic Regex Badges</p>
      </div>

      {submittedPayload && (
        <div className="success-banner">
          <h4>✅ Login Verification Successful!</h4>
          <p>
            Authenticated session for <strong>{submittedPayload.email}</strong> at {submittedPayload.timestamp}.
          </p>
          <button
            onClick={() => {
              setSubmittedPayload(null);
              setFormData({ email: '', password: '', rememberMe: false });
              setTouched({ email: false, password: false });
            }}
            className="btn-link"
          >
            Reset Form
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Email Field with Controlled Input & Regex Verification */}
        <div className="form-group">
          <label htmlFor="login-email">
            Corporate Email Address <span className="req">*</span>
          </label>
          <div className="input-wrapper">
            <input
              id="login-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              placeholder="e.g. user@enterprise.com"
              className={`form-input ${
                emailErrors.length > 0 ? 'input-error' : touched.email ? 'input-valid' : ''
              }`}
            />
            {touched.email && emailErrors.length === 0 && (
              <span className="input-indicator valid">✓</span>
            )}
          </div>

          {/* Interactive Error Warning Badges */}
          {emailErrors.length > 0 && (
            <div className="badge-container">
              {emailErrors.map((err, i) => (
                <span key={i} className="error-badge">
                  <span className="badge-dot">!</span> {err}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Password Field with Controlled Input */}
        <div className="form-group">
          <div className="label-row">
            <label htmlFor="login-password">
              Security Key / Password <span className="req">*</span>
            </label>
            <button
              type="button"
              className="toggle-pwd-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="input-wrapper">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              placeholder="Min 8 chars, uppercase, number, symbol"
              className={`form-input ${
                passwordErrors.length > 0 ? 'input-error' : touched.password ? 'input-valid' : ''
              }`}
            />
          </div>

          {/* Interactive Error Warning Badges */}
          {passwordErrors.length > 0 && (
            <div className="badge-container">
              {passwordErrors.map((err, i) => (
                <span key={i} className="error-badge">
                  <span className="badge-dot">!</span> {err}
                </span>
              ))}
            </div>
          )}

          {/* Task 5.2 Sub-component: Password Strength Checker */}
          <PasswordStrengthChecker password={formData.password} />
        </div>

        {/* Remember Me Checkbox */}
        <div className="form-check">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="rememberMe">Remember this device for 30 days</label>
        </div>

        <button type="submit" className="btn btn-primary btn-submit">
          Sign In to Workspace →
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
