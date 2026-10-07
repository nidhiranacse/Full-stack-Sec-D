const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("YOUR_MONGODB_ATLAS_CONNECTION_STRING")
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log(e.message));

app.post("/students", async (req, res) => {
  try {
    res.status(201).json(
      await Student.create({
        ...req.body,
        marks: Number(req.body.marks),
      })
    );
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/students", async (req, res) => {
  res.json(await Student.find());
});

app.get("/students/:id", async (req, res) => {
  res.json(await Student.findById(req.params.id));
});

app.put("/students/:id", async (req, res) => {
  res.json(
    await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
  );
});

app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on 5000"));
