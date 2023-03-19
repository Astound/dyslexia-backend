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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : "Teacher"
  },
  classes: {
    type: [Number],
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
