const request = require("supertest");

let app;
beforeEach(() => {
  // Fresh module (and fresh in-memory store) for every test
  jest.resetModules();
  app = require("../src/app");
});

const alice = { name: "Alice", email: "alice@example.com", age: 20 };
const bob = { name: "Bob", email: "bob@example.com", age: 25 };

test("creates a student with id 1", async () => {
  const res = await request(app).post("/students").send(alice);
  expect(res.status).toBe(201);
  expect(res.body).toEqual({ id: 1, ...alice });
});

test("ids increment", async () => {
  await request(app).post("/students").send(alice);
  const res = await request(app).post("/students").send(bob);
  expect(res.body.id).toBe(2);
});

test.each([
  [{}],
  [{ name: "", email: "a@b.com", age: 20 }],
  [{ name: "A", email: "bad", age: 20 }],
  [{ name: "A", email: "a@b.com", age: "20" }],
  [{ name: "A", email: "a@b.com", age: -1 }],
  [{ name: "A", email: "a@b.com" }],
])("rejects invalid input %j", async (body) => {
  const res = await request(app).post("/students").send(body);
  expect(res.status).toBe(400);
  expect(res.body).toEqual({ error: "Invalid input" });
});

test("duplicate email gives 409", async () => {
  await request(app).post("/students").send(alice);
  const res = await request(app).post("/students").send({ ...bob, email: alice.email });
  expect(res.status).toBe(409);
  expect(res.body).toEqual({ error: "Email already exists" });
});

test("lists in insertion order and filters by minAge", async () => {
  await request(app).post("/students").send(alice);
  await request(app).post("/students").send(bob);
  const all = await request(app).get("/students");
  expect(all.status).toBe(200);
  expect(all.body.map((s) => s.name)).toEqual(["Alice", "Bob"]);
  const filtered = await request(app).get("/students?minAge=25");
  expect(filtered.body.map((s) => s.name)).toEqual(["Bob"]);
});

test("get by id and 404", async () => {
  await request(app).post("/students").send(alice);
  const ok = await request(app).get("/students/1");
  expect(ok.status).toBe(200);
  expect(ok.body.name).toBe("Alice");
  const missing = await request(app).get("/students/99");
  expect(missing.status).toBe(404);
  expect(missing.body).toEqual({ error: "Student not found" });
});

test("delete returns 204, then 404, and ids are never reused", async () => {
  await request(app).post("/students").send(alice);
  const del = await request(app).delete("/students/1");
  expect(del.status).toBe(204);
  expect(del.text).toBe("");
  const again = await request(app).delete("/students/1");
  expect(again.status).toBe(404);
  expect(again.body).toEqual({ error: "Student not found" });
  const next = await request(app).post("/students").send(bob);
  expect(next.body.id).toBe(2);
});
