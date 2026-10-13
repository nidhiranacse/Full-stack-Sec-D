const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || "my_secret_key";
const users = [];

app.post("/register", async (req, res) => {
  const { username, password } = req.body || {};

  if (
    typeof username !== "string" ||
    !username.trim() ||
    typeof password !== "string" ||
    password.length < 6
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const normalizedUsername = username.trim();

  if (users.some((user) => user.username === normalizedUsername)) {
    return res.status(409).json({ error: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    username: normalizedUsername,
    password: hashedPassword,
  });

  return res.status(201).json({ message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body || {};

  if (
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = users.find(
    (u) => u.username === username.trim()
  );

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  return res.status(200).json({ token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err || !decoded || typeof decoded.username !== "string") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
}

app.get("/profile", authenticateToken, (req, res) => {
  return res.status(200).json({
    username: req.user.username,
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid input" });
  }

  return res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = app;

import React, { useState } from "react";

export default function Cart({ products = [] }) {
  const [cart, setCart] = useState([]);

  const addProduct = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeProduct = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Apply a 10% discount when the total is at least 1000.
  const discount = total >= 1000 ? total * 0.1 : 0;
  const grandTotal = total - discount;

  return (
    <div>
      <h2>Products</h2>

      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name} - {Number(product.price).toFixed(2)}</span>

          <button
            type="button"
            data-testid={`add-${product.id}`}
            onClick={() => addProduct(product)}
          >
            Add
          </button>
        </div>
      ))}

      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p data-testid="cart-empty">Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>{" "}
            <span>{Number(item.price).toFixed(2)}</span>{" "}

            <span data-testid={`qty-${item.id}`}>
              {item.quantity}
            </span>{" "}

            <button
              type="button"
              data-testid={`inc-${item.id}`}
              onClick={() => increaseQuantity(item.id)}
            >
              +
            </button>{" "}

            <button
              type="button"
              data-testid={`dec-${item.id}`}
              onClick={() => decreaseQuantity(item.id)}
            >
              -
            </button>{" "}

            <button
              type="button"
              data-testid={`remove-${item.id}`}
              onClick={() => removeProduct(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <p data-testid="total">
        Total: {total.toFixed(2)}
      </p>

      {discount > 0 && (
        <>
          <p data-testid="discount">
            Discount: {discount.toFixed(2)}
          </p>

          <p data-testid="grand-total">
            Grand Total: {grandTotal.toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
}