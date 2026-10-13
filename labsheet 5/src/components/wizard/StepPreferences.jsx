import React from 'react';

function StepPreferences({ formData, updateFormData }) {
  return (
    <div className="wizard-step-content">
      <h3 className="step-title">Step 3: Security & Notification Preferences</h3>
      <p className="step-subtitle">Configure your multi-factor authentication and notification settings.</p>

      {/* 2FA Selection */}
      <div className="form-group">
        <label>Two-Factor Authentication (2FA) Method</label>
        <div className="radio-group">
          <label className="radio-card">
            <input
              type="radio"
              name="twoFactor"
              value="authenticator"
              checked={formData.twoFactor === 'authenticator'}
              onChange={(e) => updateFormData('twoFactor', e.target.value)}
            />
            <div className="radio-text">
              <strong>Authenticator App (Recommended)</strong>
              <span>Use Google Authenticator, Authy, or 1Password.</span>
            </div>
          </label>

          <label className="radio-card">
            <input
              type="radio"
              name="twoFactor"
              value="sms"
              checked={formData.twoFactor === 'sms'}
              onChange={(e) => updateFormData('twoFactor', e.target.value)}
            />
            <div className="radio-text">
              <strong>SMS Verification</strong>
              <span>Receive security OTP via SMS to registered phone.</span>
            </div>
          </label>
        </div>
      </div>

      {/* Notifications */}
      <div className="form-group">
        <label>Communication Preferences</label>
        <div className="checkbox-stack">
          <label className="form-check">
            <input
              type="checkbox"
              checked={formData.emailAlerts}
              onChange={(e) => updateFormData('emailAlerts', e.target.checked)}
            />
            <span>Receive critical security and login alerts via email</span>
          </label>

          <label className="form-check">
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={(e) => updateFormData('newsletter', e.target.checked)}
            />
            <span>Subscribe to monthly developer digest & platform updates</span>
          </label>
        </div>
      </div>

      {/* Terms and conditions */}
      <div className="form-group terms-box">
        <label className="form-check">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => updateFormData('agreeTerms', e.target.checked)}
          />
          <span>
            I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>. <span className="req">*</span>
          </span>
        </label>
      </div>
    </div>
  );
}

export default StepPreferences;
