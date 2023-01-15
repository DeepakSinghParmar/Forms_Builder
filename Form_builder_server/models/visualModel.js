const mongoose = require("mongoose");

const dataVisualization = mongoose.Schema({
  created: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Number,
    default: 0,
  },
  submitForm: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("visuals", dataVisualization);
