import { useState } from "react";

const MAX_COMMENT = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, rating }) {
  return {
    name: name.trim() === "",
    email: !EMAIL_RE.test(email.trim()),
    rating: rating === "",
  };
}

export default function FeedbackForm() {
  const [values, setValues] = useState({ name: "", email: "", rating: "", comment: "" });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submittedName, setSubmittedName] = useState(null);

  const invalid = validate(values);
  // Errors appear after the first submit attempt, then update live while the user fixes fields.
  const show = (field) => submitAttempted && invalid[field];

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (invalid.name || invalid.email || invalid.rating) return;
    setSubmittedName(values.name.trim());
  };

  if (submittedName !== null) {
    return (
      <p data-testid="success-msg">Thank you, {submittedName}! Feedback submitted.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>
          Name
          <input data-testid="name-input" type="text" value={values.name} onChange={update("name")} />
        </label>
        {show("name") && <p data-testid="name-error" role="alert">Name is required</p>}
      </div>

      <div>
        <label>
          Email
          <input data-testid="email-input" type="email" value={values.email} onChange={update("email")} />
        </label>
        {show("email") && <p data-testid="email-error" role="alert">Enter a valid email address</p>}
      </div>

      <div>
        <label>
          Rating
          <select data-testid="rating-select" value={values.rating} onChange={update("rating")}>
            <option value=""></option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={String(n)}>{n}</option>
            ))}
          </select>
        </label>
        {show("rating") && <p data-testid="rating-error" role="alert">Please select a rating</p>}
      </div>

      <div>
        <label>
          Comment
          <textarea
            data-testid="comment-input"
            value={values.comment}
            maxLength={MAX_COMMENT}
            onChange={update("comment")}
          />
        </label>
        <span data-testid="comment-count">{values.comment.length}/{MAX_COMMENT}</span>
      </div>

      <button data-testid="submit-btn" type="submit">Submit</button>
    </form>
  );
}
