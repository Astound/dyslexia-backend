const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sentences: {
    type: Array,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  classes: {
    type: [Number],
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
