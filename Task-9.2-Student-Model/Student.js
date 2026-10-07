const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
});

module.exports = mongoose.model("Student", schema);
