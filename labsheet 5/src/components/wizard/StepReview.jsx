import React from 'react';

function StepReview({ formData, goToStep }) {
  return (
    <div className="wizard-step-content">
      <h3 className="step-title">Step 4: Review & Final Submittal</h3>
      <p className="step-subtitle">Please verify your details before submitting your onboarding registration.</p>

      <div className="review-cards-grid">
        {/* Section 1 */}
        <div className="review-card">
          <div className="review-card-header">
            <h4>1. Account Credentials</h4>
            <button type="button" onClick={() => goToStep(1)} className="btn-edit">
              Edit
            </button>
          </div>
          <div className="review-row">
            <span className="review-label">Username:</span>
            <span className="review-value">{formData.username || '—'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Email:</span>
            <span className="review-value">{formData.email || '—'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Password:</span>
            <span className="review-value">•••••••• (Verified & Encrypted)</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="review-card">
          <div className="review-card-header">
            <h4>2. Profile Information</h4>
            <button type="button" onClick={() => goToStep(2)} className="btn-edit">
              Edit
            </button>
          </div>
          <div className="review-row">
            <span className="review-label">Full Name:</span>
            <span className="review-value">{formData.fullName || '—'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Phone:</span>
            <span className="review-value">{formData.phone || '—'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Role:</span>
            <span className="review-value">{formData.role}</span>
          </div>
          {formData.bio && (
            <div className="review-row">
              <span className="review-label">Bio:</span>
              <span className="review-value">{formData.bio}</span>
            </div>
          )}
        </div>

        {/* Section 3 */}
        <div className="review-card">
          <div className="review-card-header">
            <h4>3. Security & Preferences</h4>
            <button type="button" onClick={() => goToStep(3)} className="btn-edit">
              Edit
            </button>
          </div>
          <div className="review-row">
            <span className="review-label">2FA Method:</span>
            <span className="review-value">
              {formData.twoFactor === 'authenticator' ? 'Authenticator App' : 'SMS OTP'}
            </span>
          </div>
          <div className="review-row">
            <span className="review-label">Security Alerts:</span>
            <span className="review-value">{formData.emailAlerts ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Newsletter:</span>
            <span className="review-value">{formData.newsletter ? 'Subscribed' : 'None'}</span>
          </div>
          <div className="review-row">
            <span className="review-label">Terms Accepted:</span>
            <span className="review-value status-badge active">✓ Agreed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepReview;
