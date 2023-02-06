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
});

module.exports = mongoose.model("Task", taskSchema);
