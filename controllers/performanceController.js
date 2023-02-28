// performance controller

// register performance data for a task by user id

// @desc    Register performance data for a task by user id
// @route   POST /api/performance/:id
// @access  Private

const asyncHandler = require("express-async-handler");

const Performance = require("../models/performanceModel");

const registerPerformance = asyncHandler(async (req, res) => {
  const { user, task, sentenceStats } = req.body;

  const performance = await Performance.create({
    user,
    task,
    sentenceStats,
  });

  res.status(200).json(performance);
});

// get performance data for a task by user id

// @desc    Get performance data for a task by user id
// @route   GET /api/performance/:id

const getPerformanceByUserId = asyncHandler(async (req, res) => {
  const performance = await Performance.find({ user: req.params.id });
  if (!performance) {
    res.status(400).json({ message: "No performance data found" });
  }
  res.status(200).json(performance);
});

// get performance data for a task by task id

// @desc    Get performance data for a task by task id
// @route   GET /api/performance/task/:id

const getPerformanceByTaskId = asyncHandler(async (req, res) => {
  const performance = await Performance.find({ task: req.params.id });
  if (!performance) {
    res.status(400).json({ message: "No performance data found" });
  }
  res.status(200).json(performance);
});

// get performance data for a task by user id and task id

// @desc    Get performance data for a task by user id and task id
// @route   GET /api/performance/:id/:task

const getPerformanceByUserIdAndTaskId = asyncHandler(async (req, res) => {
  const performance = await Performance.find({
    user: req.params.id,
    task: req.params.task,
  });
  if (!performance) {
    res.status(400).json({ message: "No performance data found" });
  }
  res.status(200).json(performance);
});

module.exports = {
  registerPerformance,
  getPerformanceByUserId,
  getPerformanceByTaskId,
  getPerformanceByUserIdAndTaskId,
};
