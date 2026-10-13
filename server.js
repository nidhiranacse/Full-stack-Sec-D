// Practical B1: JWT Authentication API
// Node.js + Express + jsonwebtoken + bcryptjs

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_key';

// Users are stored in memory (no database is needed for this practical).
// key = username, value = { username, passwordHash }
// Note: data is lost whenever the server restarts.
const users = new Map();

app.use(express.json());

// ---------------------------------------------------------
// POST /register
// ---------------------------------------------------------
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body || {};

    // Validation: username must be a non-empty string, password >= 6 characters
    if (
      typeof username !== 'string' ||
      username.trim() === '' ||
      typeof password !== 'string' ||
      password.length < 6
    ) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Never store plain-text passwords, so hash it first
    const passwordHash = await bcrypt.hash(password, 10);

    if (users.has(username)) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    users.set(username, { username, passwordHash });
    return res.status(201).json({ message: 'User registered' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------------------------------------------------------
// POST /login
// ---------------------------------------------------------
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};

    const user = typeof username === 'string' ? users.get(username) : undefined;

    // Unknown user (or missing password)
    if (!user || typeof password !== 'string') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Wrong password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Token payload contains the username and it expires in 1 hour
    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------------------------------------------------------
// Middleware: checks the "Authorization: Bearer <token>" header
// ---------------------------------------------------------
function authenticate(req, res, next) {
  const header = req.headers.authorization;

  // Header missing or not in "Bearer <token>" format
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = header.slice(7).trim();

  try {
    // Throws an error if the token is malformed, has a bad signature or is expired
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// ---------------------------------------------------------
// GET /profile (protected route)
// ---------------------------------------------------------
app.get('/profile', authenticate, (req, res) => {
  return res.status(200).json({ username: req.user.username });
});

// ---------------------------------------------------------
// Error handler (for example: invalid JSON in the request body)
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid input' });
  }
  return res.status(500).json({ error: 'Internal server error' });
});

// Start the server only when this file is run directly (node server.js)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
