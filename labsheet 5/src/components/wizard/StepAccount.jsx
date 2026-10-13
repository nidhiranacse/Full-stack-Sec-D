import React from 'react';
import { validateField } from '../../utils/validators';
import PasswordStrengthChecker from '../PasswordStrengthChecker';

function StepAccount({ formData, updateFormData, errors, touched, markTouched }) {
  const usernameErrors = touched.username ? validateField('username', formData.username) : [];
  const emailErrors = touched.email ? validateField('email', formData.email) : [];
  const passwordErrors = touched.password ? validateField('password', formData.password) : [];

  return (
    <div className="wizard-step-content">
      <h3 className="step-title">Step 1: Account Credentials</h3>
      <p className="step-subtitle">Set up your unique username, email address, and secure password.</p>

      {/* Username */}
      <div className="form-group">
        <label htmlFor="wizard-username">
          Username <span className="req">*</span>
        </label>
        <input
          id="wizard-username"
          type="text"
          value={formData.username}
          onChange={(e) => updateFormData('username', e.target.value)}
          onBlur={() => markTouched('username')}
          placeholder="e.g. kartik_dev"
          className={`form-input ${usernameErrors.length > 0 ? 'input-error' : ''}`}
        />
        {usernameErrors.length > 0 && (
          <div className="badge-container">
            {usernameErrors.map((err, i) => (
              <span key={i} className="error-badge">
                <span className="badge-dot">!</span> {err}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="wizard-email">
          Email Address <span className="req">*</span>
        </label>
        <input
          id="wizard-email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          onBlur={() => markTouched('email')}
          placeholder="name@domain.com"
          className={`form-input ${emailErrors.length > 0 ? 'input-error' : ''}`}
        />
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

      {/* Password with Strength Checker */}
      <div className="form-group">
        <label htmlFor="wizard-password">
          Password <span className="req">*</span>
        </label>
        <input
          id="wizard-password"
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData('password', e.target.value)}
          onBlur={() => markTouched('password')}
          placeholder="Strong password required"
          className={`form-input ${passwordErrors.length > 0 ? 'input-error' : ''}`}
        />
        {passwordErrors.length > 0 && (
          <div className="badge-container">
            {passwordErrors.map((err, i) => (
              <span key={i} className="error-badge">
                <span className="badge-dot">!</span> {err}
              </span>
            ))}
          </div>
        )}
        <PasswordStrengthChecker password={formData.password} />
      </div>
    </div>
  );
}

export default StepAccount;
