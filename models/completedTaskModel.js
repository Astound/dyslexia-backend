// completed task model

const mongoose = require("mongoose");

const completedTaskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Task",
    },
    sentences: {
      type: Array,
      required: true,
    },
    bestScore: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CompletedTask", completedTaskSchema);
