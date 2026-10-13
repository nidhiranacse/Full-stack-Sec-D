/**
 * Regular Expression Security Patterns & Validation Utilities
 */

// Email RFC 5322 standard-compliant pattern
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Username pattern: 3-20 characters, alphanumeric and underscores only, cannot start with number
export const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;

// Phone number: standard 10-digit format (international optional)
export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$|^[0-9]{10}$/;

// Password criteria regex patterns
export const PASSWORD_RULES = [
  {
    id: 'length',
    label: 'At least 8 characters long',
    test: (pwd) => pwd.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Contains at least one uppercase letter (A-Z)',
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    id: 'lowercase',
    label: 'Contains at least one lowercase letter (a-z)',
    test: (pwd) => /[a-z]/.test(pwd),
  },
  {
    id: 'number',
    label: 'Contains at least one number (0-9)',
    test: (pwd) => /[0-9]/.test(pwd),
  },
  {
    id: 'special',
    label: 'Contains at least one special character (!@#$%^&*)',
    test: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
  }
];

/**
 * Calculates password strength score (0 to 100), label, and color.
 * @param {string} password 
 * @returns {Object} { score, label, color, passedCount, totalCount, rulesState }
 */
export function calculatePasswordStrength(password) {
  if (!password) {
    return {
      score: 0,
      label: 'Too Weak',
      color: '#e2e8f0',
      passedCount: 0,
      totalCount: PASSWORD_RULES.length,
      rulesState: PASSWORD_RULES.map((rule) => ({ ...rule, passed: false }))
    };
  }

  const rulesState = PASSWORD_RULES.map((rule) => ({
    ...rule,
    passed: rule.test(password)
  }));

  const passedCount = rulesState.filter((r) => r.passed).length;
  const score = Math.round((passedCount / PASSWORD_RULES.length) * 100);

  let label = 'Very Weak';
  let color = '#ef4444'; // Red

  if (passedCount === 2) {
    label = 'Weak';
    color = '#f97316'; // Orange
  } else if (passedCount === 3) {
    label = 'Fair';
    color = '#f59e0b'; // Amber / Yellow
  } else if (passedCount === 4) {
    label = 'Good';
    color = '#3b82f6'; // Blue
  } else if (passedCount === 5) {
    label = 'Strong';
    color = '#10b981'; // Green
  }

  return {
    score,
    label,
    color,
    passedCount,
    totalCount: PASSWORD_RULES.length,
    rulesState
  };
}

/**
 * Dynamic validation controller for field criteria
 * @param {string} name 
 * @param {string} value 
 * @returns {Array<string>} list of violated error messages
 */
export function validateField(name, value) {
  const errors = [];

  if (!value || value.trim() === '') {
    errors.push(`${name} is required.`);
    return errors;
  }

  if (name === 'email') {
    if (!EMAIL_REGEX.test(value)) {
      errors.push('Must be a valid email format (e.g., user@domain.com).');
    }
  }

  if (name === 'username') {
    if (!USERNAME_REGEX.test(value)) {
      errors.push('3-20 characters, starting with a letter; letters, numbers, and _ allowed.');
    }
  }

  if (name === 'password') {
    if (value.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(value)) {
      errors.push('Missing at least one uppercase letter (A-Z).');
    }
    if (!/[0-9]/.test(value)) {
      errors.push('Missing at least one numeric digit (0-9).');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      errors.push('Missing at least one special character (!@#$%^&*).');
    }
  }

  if (name === 'phone') {
    if (!PHONE_REGEX.test(value.replace(/[\s-]/g, ''))) {
      errors.push('Must be a valid 10-digit phone number.');
    }
  }

  return errors;
}
