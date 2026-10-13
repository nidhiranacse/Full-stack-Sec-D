import React, { useState } from 'react';
import StepAccount from './StepAccount';
import StepProfile from './StepProfile';
import StepPreferences from './StepPreferences';
import StepReview from './StepReview';
import { validateField } from '../../utils/validators';

const INITIAL_STATE = {
  // Step 1
  username: '',
  email: '',
  password: '',
  // Step 2
  fullName: '',
  phone: '',
  role: 'Full-Stack Developer',
  bio: '',
  // Step 3
  twoFactor: 'authenticator',
  emailAlerts: true,
  newsletter: false,
  agreeTerms: false
};

const STEPS = [
  { id: 1, name: 'Account' },
  { id: 2, name: 'Profile' },
  { id: 3, name: 'Preferences' },
  { id: 4, name: 'Review' }
];

function MultiStepWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [touched, setTouched] = useState({});
  const [stepError, setStepError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setStepError('');
  };

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateCurrentStep = () => {
    setStepError('');

    if (currentStep === 1) {
      setTouched((prev) => ({ ...prev, username: true, email: true, password: true }));
      const userErr = validateField('username', formData.username);
      const emailErr = validateField('email', formData.email);
      const pwdErr = validateField('password', formData.password);

      if (userErr.length > 0 || emailErr.length > 0 || pwdErr.length > 0) {
        setStepError('Please resolve all validation errors in Step 1 before proceeding.');
        return false;
      }
    }

    if (currentStep === 2) {
      if (!formData.fullName.trim()) {
        setStepError('Full Name is required.');
        return false;
      }
      setTouched((prev) => ({ ...prev, phone: true }));
      const phoneErr = validateField('phone', formData.phone);
      if (phoneErr.length > 0) {
        setStepError('Please provide a valid phone number.');
        return false;
      }
    }

    if (currentStep === 3) {
      if (!formData.agreeTerms) {
        setStepError('You must agree to the Terms of Service to continue.');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setStepError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToStep = (stepNumber) => {
    setStepError('');
    setCurrentStep(stepNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    // Simulate API async submission routine
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionComplete(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setCurrentStep(1);
    setTouched({});
    setStepError('');
    setSubmissionComplete(false);
  };

  return (
    <div className="card-module wizard-module">
      <div className="module-header">
        <h2>🧙 Multi-Step User Onboarding Wizard</h2>
        <p>Demonstrates Task 5.3: Encapsulated State Management & Modular Flow</p>
      </div>

      {/* Stepper Progress Header */}
      <div className="stepper-header">
        {STEPS.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div
              className={`step-bubble-container ${
                currentStep === step.id ? 'current' : currentStep > step.id ? 'completed' : ''
              }`}
            >
              <div className="step-bubble">
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <span className="step-name">{step.name}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`step-connector ${currentStep > step.id ? 'active' : ''}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Global Step Error Notice */}
      {stepError && (
        <div className="step-error-notice">
          <span>⚠️ {stepError}</span>
        </div>
      )}

      {/* Final Submission Success Screen */}
      {submissionComplete ? (
        <div className="wizard-success-screen">
          <div className="success-icon">🎉</div>
          <h3>Onboarding Registration Complete!</h3>
          <p>
            User <strong>{formData.username}</strong> ({formData.email}) has been successfully provisioned.
          </p>
          <div className="json-summary">
            <strong>Submittal Payload:</strong>
            <pre>
              {JSON.stringify(
                {
                  username: formData.username,
                  email: formData.email,
                  fullName: formData.fullName,
                  phone: formData.phone,
                  role: formData.role,
                  twoFactor: formData.twoFactor,
                  emailAlerts: formData.emailAlerts,
                  newsletter: formData.newsletter,
                  registeredAt: new Date().toISOString()
                },
                null,
                2
              )}
            </pre>
          </div>
          <button onClick={handleReset} className="btn btn-primary">
            Start Another Onboarding Flow
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Child Steps Encapsulation */}
          <div className="wizard-body">
            {currentStep === 1 && (
              <StepAccount
                formData={formData}
                updateFormData={updateFormData}
                touched={touched}
                markTouched={markTouched}
              />
            )}
            {currentStep === 2 && (
              <StepProfile
                formData={formData}
                updateFormData={updateFormData}
                touched={touched}
                markTouched={markTouched}
              />
            )}
            {currentStep === 3 && (
              <StepPreferences
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 4 && (
              <StepReview
                formData={formData}
                goToStep={goToStep}
              />
            )}
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="wizard-footer">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="btn btn-outline"
            >
              ← Back
            </button>

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-submit-final"
              >
                {isSubmitting ? 'Finalizing Submission...' : 'Complete & Submit Onboarding ✓'}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default MultiStepWizard;
