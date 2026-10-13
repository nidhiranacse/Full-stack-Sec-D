import React from 'react';
import { calculatePasswordStrength } from '../utils/validators';

/**
 * Task 5.2: Password Strength Checker Sub-component
 * Maps text input variations to a dynamic visual progress tracker bar
 * and renders interactive criteria checkmarks.
 *
 * @param {Object} props
 * @param {string} props.password - The current input password string
 */
function PasswordStrengthChecker({ password }) {
  const { score, label, color, rulesState } = calculatePasswordStrength(password);

  if (!password) {
    return null; // Don't clutter UI when password hasn't been touched yet
  }

  return (
    <div className="password-strength-container">
      <div className="strength-header">
        <span className="strength-title">Password Security Strength:</span>
        <span className="strength-label" style={{ color: color, fontWeight: 700 }}>
          {label} ({score}%)
        </span>
      </div>

      {/* Dynamic Visual Progress Tracker Bar */}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{
            width: `${Math.max(score, 5)}%`,
            backgroundColor: color,
            transition: 'width 0.3s ease, background-color 0.3s ease'
          }}
        />
      </div>

      {/* Interactive Criteria Verification Checklist */}
      <div className="strength-checklist">
        {rulesState.map((rule) => (
          <div
            key={rule.id}
            className={`checklist-item ${rule.passed ? 'valid' : 'invalid'}`}
          >
            <span className="checklist-icon">{rule.passed ? '✓' : '✕'}</span>
            <span className="checklist-text">{rule.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PasswordStrengthChecker;
