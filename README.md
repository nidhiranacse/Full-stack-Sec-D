# Practical B1: JWT Authentication API (Node.js and Express)

## Aim
To implement user registration, login and a protected route using JSON Web Tokens (JWT) in an Express application.

## Tech Stack
- Node.js
- Express
- jsonwebtoken (create and verify tokens)
- bcryptjs (password hashing)

## Project Structure
```
jwt-auth-api/
├── server.js        # all routes and the auth middleware
├── package.json
├── requests.http    # sample requests for the VS Code REST Client extension
├── .gitignore
└── README.md
```

## How to Run
```bash
npm install
npm start
```
The server starts on `http://localhost:3000`.
Optional: set your own secret with the `JWT_SECRET` environment variable.

## API Endpoints

| Method | Route       | Body                    | Success             | Errors                                                                 |
|--------|-------------|-------------------------|---------------------|------------------------------------------------------------------------|
| POST   | `/register` | `{ username, password }` | `201` `{ message: "User registered" }` | `400` Invalid input, `409` Username already exists |
| POST   | `/login`    | `{ username, password }` | `200` `{ token }` (expires in 1 hour)  | `401` Invalid credentials                          |
| GET    | `/profile`  | Header `Authorization: Bearer <token>` | `200` `{ username }` | `401` Unauthorized                          |

## Sample Requests (curl)
```bash
# Register
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret123"}'

# Login
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret123"}'

# Profile (paste the token from the login response)
curl http://localhost:3000/profile \
  -H "Authorization: Bearer <token>"
```

## Notes
- Users are stored in memory, so they are cleared when the server restarts.
- Passwords are hashed with bcrypt and are never stored as plain text.
