const mongoose = require("mongoose");

const taskOverviewSchema = mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  taskScores: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
