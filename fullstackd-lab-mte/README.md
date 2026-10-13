# Full Stack Development Lab - Practical Test (BTCS303P)

| Set | Practical | Stack | Folder |
|-----|-----------|-------|--------|
| A | A1 Student Records REST API | Node.js + Express | `set-a/a1-student-api` |
| A | A2 Feedback Form with Validation | React | `set-a/a2-feedback-form` |
| B | B1 JWT Authentication API | Node.js + Express | `set-b/b1-jwt-auth-api` |
| B | B2 Shopping Cart with Discount | React | `set-b/b2-shopping-cart` |

## Run any practical
```bash
cd set-a/a1-student-api     # or any folder above
npm install
npm test                    # automated tests
npm start                   # APIs (A1, B1) on http://localhost:3000
npm run dev                 # React apps (A2, B2) via Vite
```

## Assumptions (where the question paper was silent)
- **A1:** valid input = non-empty `name`, valid-format `email`, positive integer `age`. Email uniqueness is case-insensitive. A non-numeric `minAge` returns 400.
- **A2:** errors appear after the first submit attempt and then update live. Comment is optional (max 200 chars). On success the form is replaced by the confirmation message.
- **B1:** passwords are hashed with Node's built-in `crypto.scrypt`. JWT secret comes from `JWT_SECRET` (fallback for development).
- **B2:** discount rule was not stated; inferred from the example (1000.00 -> Discount 100.00 -> Grand Total 900.00) as **10% off when total >= 1000**. Change `DISCOUNT_THRESHOLD` / `DISCOUNT_RATE` in `Cart.jsx` if needed. Decreasing a quantity below 1 removes the line.
