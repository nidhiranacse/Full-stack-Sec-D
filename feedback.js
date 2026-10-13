import React, { useState } from 'react';
export default function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', email: '', rating: '', comment: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!validateEmail(formData.email)) newErrors.email = true;
    if (!formData.rating) newErrors.rating = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setSubmitted(true);
  };
  if (submitted) {
    return <div data-testid="success-msg">Thank you, {formData.name}! Feedback submitted.</div>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <input data-testid="name-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      {errors.name && <div data-testid="name-error">Name is required</div>}
      <input data-testid="email-input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      {errors.email && <div data-testid="email-error">Valid email is required</div>}
      <select data-testid="rating-select" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })}>
        <option value=""></option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {errors.rating && <div data-testid="rating-error">Rating is required</div>}
      <textarea data-testid="comment-input" maxLength={200} value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })}></textarea>
      <div data-testid="comment-count">{formData.comment.length}/200</div>
      <button type="submit" data-testid="submit-btn">Submit</button>
    </form>
  );
}