const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies.
app.use(express.json());

// In-memory storage: records are lost when the server restarts.
const students = [];
let nextId = 1;

function isValidEmail(email) {
  return typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidStudentInput(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return false;
  }

  const { name, email, age } = body;

  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    isValidEmail(email) &&
    typeof age === "number" &&
    Number.isInteger(age) &&
    age > 0
  );
}

// Create a student.
app.post("/students", (req, res) => {
  if (!isValidStudentInput(req.body)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const name = req.body.name.trim();
  const email = req.body.email.trim().toLowerCase();
  const age = req.body.age;

  const emailExists = students.some(
    (student) => student.email.toLowerCase() === email
  );

  if (emailExists) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const student = { id: nextId++, name, email, age };
  students.push(student);

  return res.status(201).json(student);
});

// List all students. Optional query: ?minAge=18
app.get("/students", (req, res) => {
  let result = students;

  if (req.query.minAge !== undefined) {
    const minAge = Number(req.query.minAge);

    if (
      req.query.minAge.trim() === "" ||
      !Number.isFinite(minAge) ||
      minAge < 0
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }

    result = students.filter((student) => student.age >= minAge);
  }

  return res.status(200).json(result);
});

// Fetch one student by ID.
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  return res.status(200).json(student);
});

// Delete one student by ID.
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const index = students.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(index, 1);
  return res.status(204).send();
});

// Handle malformed JSON bodies.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid input" });
  }
  return next(err);
});

app.listen(PORT, () => {
  console.log(`Student Records API running at http://localhost:${PORT}`);
});
