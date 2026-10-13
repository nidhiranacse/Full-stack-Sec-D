# Student Records REST API

A simple REST API built with Node.js and Express for Practical A1.

## Requirements

- Node.js installed
- VS Code (recommended)

## Run the project

1. Extract/open this folder in VS Code.
2. Open the VS Code terminal (`Terminal > New Terminal`).
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. The API runs at `http://localhost:3000`.

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/students` | Create a student |
| GET | `/students` | List all students |
| GET | `/students?minAge=18` | List students aged 18 or older |
| GET | `/students/:id` | Fetch one student |
| DELETE | `/students/:id` | Delete one student |

## Test with Postman

### Create a student

Send `POST http://localhost:3000/students` with header `Content-Type: application/json` and body set to **raw > JSON**:

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "age": 20
}
```

Successful response: status `201 Created`

```json
{
  "id": 1,
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "age": 20
}
```

### List students

`GET http://localhost:3000/students`

### Filter by minimum age

`GET http://localhost:3000/students?minAge=18`

### Fetch a student

`GET http://localhost:3000/students/1`

### Delete a student

`DELETE http://localhost:3000/students/1`

Successful deletion returns `204 No Content` with an empty response body.

## Validation and status codes

- `201`: student created
- `200`: students/student returned
- `400`: invalid input
- `404`: student not found
- `409`: email already exists
- `204`: student deleted

Input validation requires a non-empty name, a valid-looking email address, and a positive integer age. Email addresses are normalized to lowercase for duplicate checking. Student records are stored in memory, so they reset when the server restarts.
