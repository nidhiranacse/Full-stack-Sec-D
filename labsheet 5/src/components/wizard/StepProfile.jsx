import React from 'react';
import { validateField } from '../../utils/validators';

function StepProfile({ formData, updateFormData, errors, touched, markTouched }) {
  const phoneErrors = touched.phone ? validateField('phone', formData.phone) : [];

  return (
    <div className="wizard-step-content">
      <h3 className="step-title">Step 2: Personal Profile Details</h3>
      <p className="step-subtitle">Tell us about yourself and your professional designation.</p>

      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="wizard-fullname">
          Full Name <span className="req">*</span>
        </label>
        <input
          id="wizard-fullname"
          type="text"
          value={formData.fullName}
          onChange={(e) => updateFormData('fullName', e.target.value)}
          placeholder="e.g. Kartik Sharma"
          className="form-input"
        />
      </div>

      {/* Phone Number with regex verification */}
      <div className="form-group">
        <label htmlFor="wizard-phone">
          Contact Phone <span className="req">*</span>
        </label>
        <input
          id="wizard-phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          onBlur={() => markTouched('phone')}
          placeholder="e.g. 9876543210"
          className={`form-input ${phoneErrors.length > 0 ? 'input-error' : ''}`}
        />
        {phoneErrors.length > 0 && (
          <div className="badge-container">
            {phoneErrors.map((err, i) => (
              <span key={i} className="error-badge">
                <span className="badge-dot">!</span> {err}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Role / Track */}
      <div className="form-group">
        <label htmlFor="wizard-role">Primary Role / Track</label>
        <select
          id="wizard-role"
          value={formData.role}
          onChange={(e) => updateFormData('role', e.target.value)}
          className="form-input"
        >
          <option value="Full-Stack Developer">Full-Stack Developer</option>
          <option value="Front-End Specialist">Front-End Specialist</option>
          <option value="Back-End & Cloud Engineer">Back-End & Cloud Engineer</option>
          <option value="DevOps & Infrastructure">DevOps & Infrastructure</option>
        </select>
      </div>

      {/* Short Bio */}
      <div className="form-group">
        <label htmlFor="wizard-bio">Bio / Summary</label>
        <textarea
          id="wizard-bio"
          rows="3"
          value={formData.bio}
          onChange={(e) => updateFormData('bio', e.target.value)}
          placeholder="Brief intro about your background and interests..."
          className="form-input textarea"
        />
      </div>
    </div>
  );
}

export default StepProfile;
