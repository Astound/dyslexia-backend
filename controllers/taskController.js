const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");

const createTask = asyncHandler(async (req, res) => {
  const createdTask = Task.create(req.body);
  res.status(200).json({ message: "task created successfully", createdTask });
});

module.exports = { createTask };
