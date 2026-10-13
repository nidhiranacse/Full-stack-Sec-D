const express = require("express");

const app = express();
app.use(express.json());

let students = [];
let nextId = 1;

app.post("/students", (req, res) => {
  const { name, email, age } = req.body || {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof age !== "number" ||
    !Number.isInteger(age) ||
    age <= 0
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  if (students.some((student) => student.email === email)) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const student = {
    id: nextId++,
    name: name.trim(),
    email,
    age,
  };

  students.push(student);
  return res.status(201).json(student);
});

app.get("/students", (req, res) => {
  let result = students;

  if (req.query.minAge !== undefined) {
    const minAge = Number(req.query.minAge);

    if (req.query.minAge.trim() === "" || !Number.isFinite(minAge)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    result = students.filter((student) => student.age >= minAge);
  }

  return res.status(200).json(result);
});

app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find(
    (student) => student.id === id && Number.isInteger(id)
  );

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  return res.status(200).json(student);
});

app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex(
    (student) => student.id === id && Number.isInteger(id)
  );

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(index, 1);
  return res.status(204).end();
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid input" });
  }

  return res.status(500).json({ error: "Internal server error" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;


//QUESTION 2 

import React, { useState } from "react";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [submittedName, setSubmittedName] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    rating: false,
  });

  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: !name.trim(),
      email: !validateEmail(email.trim()),
      rating: !rating || !["1", "2", "3", "4", "5"].includes(rating),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.rating) {
      setSubmitted(false);
      return;
    }

    setSubmittedName(name.trim());
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name-input">Name:</label>
        <input
          id="name-input"
          data-testid="name-input"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSubmitted(false);
            setErrors((prev) => ({
              ...prev,
              name: !e.target.value.trim(),
            }));
          }}
        />

        {errors.name && (
          <p data-testid="name-error">Name is required.</p>
        )}
      </div>

      <div>
        <label htmlFor="email-input">Email:</label>
        <input
          id="email-input"
          data-testid="email-input"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSubmitted(false);
            setErrors((prev) => ({
              ...prev,
              email: !validateEmail(e.target.value.trim()),
            }));
          }}
        />

        {errors.email && (
          <p data-testid="email-error">Enter a valid email address.</p>
        )}
      </div>

      <div>
        <label htmlFor="rating-select">Rating:</label>
        <select
          id="rating-select"
          data-testid="rating-select"
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
            setSubmitted(false);
            setErrors((prev) => ({
              ...prev,
              rating: !e.target.value,
            }));
          }}
        >
          <option value="">Select a rating</option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={String(value)}>
              {value}
            </option>
          ))}
        </select>

        {errors.rating && (
          <p data-testid="rating-error">Please select a rating.</p>
        )}
      </div>

      <div>
        <label htmlFor="comment-input">Comment:</label>
        <textarea
          id="comment-input"
          data-testid="comment-input"
          value={comment}
          maxLength={200}
          onChange={(e) => {
            setComment(e.target.value);
            setSubmitted(false);
          }}
        />

        <p data-testid="comment-count">{comment.length}/200</p>
      </div>

      <button type="submit" data-testid="submit-btn">
        Submit Feedback
      </button>

      {submitted && (
        <p data-testid="success-msg">
          Thank you, {submittedName}! Feedback submitted.
        </p>
      )}
    </form>
  );
}