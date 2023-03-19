const asyncHandler = require("express-async-handler");

const CompletedTask = require("../models/completedTaskModel");

const getCompletedTasksByUserId = asyncHandler(async (req, res) => {
  const completedTasks = await CompletedTask.find({ user: req.params.id });
  if (!completedTasks) {
    res.status(400).json({ message: "No completed tasks found" });
  }
  res.status(200).json(completedTasks);
});

module.exports = {
  getCompletedTasksByUserId,
};
