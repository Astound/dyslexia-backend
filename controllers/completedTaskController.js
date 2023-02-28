// completed task controller

// register completed task

// @desc    Register a new completed task
// @route   POST /api/completed_tasks
// @access  Private

const asyncHandler = require("express-async-handler");
const { default: scoreOfTask } = require("../helpers/scoreOfTask");

const CompletedTask = require("../models/completedTaskModel");

const registerCompletedTask = asyncHandler(async (req, res) => {
  const { user, task, sentenceStats } = req.body;
  const completedTask = await CompletedTask.find({
    user: user,
    task: task,
  });

  if (completedTask.bestScore < scoreOfTask(sentenceStats)) {
    const updatedCompletedTask = await CompletedTask.findByIdAndUpdate(
      completedTask._id,
      {
        sentences: sentenceStats,
        bestScore: scoreOfTask(sentenceStats),
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedCompletedTask);
  }
});

// get completed tasks by user id

// @desc    Get completed tasks by user id
// @route   GET /api/completed_tasks/:id

const getCompletedTasksByUserId = asyncHandler(async (req, res) => {
  const completedTasks = await CompletedTask.find({ user: req.params.id });
  if (!completedTasks) {
    res.status(400).json({ message: "No completed tasks found" });
  }
  res.status(200).json(completedTasks);
});

module.exports = {
  registerCompletedTask,
  getCompletedTasksByUserId,
};
