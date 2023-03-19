// performance controller

// register performance data for a task by user id

// @desc    Register performance data for a task by user id
// @route   POST /api/performance/:id
// @access  Private

const asyncHandler = require("express-async-handler");
const { scoreOfSentence, sumOfArray } = require("../helpers/scoreOfTask");

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

const shortenPerformance = (performance) => {
  const filteredPerformance = performance.map((p) => {
    return {
      user: p.user,
      task: p.task,
      sentenceScore: p.sentenceStats.map((stat) => stat.sentenceScore),
      id: p._id,
    };
  });

  return filteredPerformance;
};
const getPerformance = asyncHandler(async (req, res) => {
  const query = req.query;
  if (query.userId && query.taskId) {
    const performance = await Performance.find({
      user: query.userId,
      task: query.taskId,
    });
    if (!performance) {
      res.status(400).json({ message: "No performance data found" });
    }
    filteredPerformance = shortenPerformance(performance);
    res.status(200).json(filteredPerformance);
  } else if (query.taskId) {
    const performance = await Performance.find({ task: query.taskId });
    if (!performance) {
      res.status(400).json({ message: "No performance data found" });
    }
    filteredPerformance = shortenPerformance(performance);

    res.status(200).json(filteredPerformance);
  } else if (query.userId) {
    const performance = await Performance.find({ user: query.userId });
    if (!performance) {
      res.status(400).json({ message: "No performance data found" });
    }
    filteredPerformance = shortenPerformance(performance);

    res.status(200).json(filteredPerformance);
  } else {
    const performance = await Performance.find();
    filteredPerformance = shortenPerformance(performance);

    res.status(200).json(filteredPerformance);
  }
});
const getPerformanceById = asyncHandler(async (req, res) => {
  const performance = await Performance.findById(req.params.id);
  if (!performance) {
    res.status(400).json({ message: "No performance data found" });
  }
  res.status(200).json(performance);
});

module.exports = {
  registerPerformance,
  getPerformance,
  getPerformanceById,
};
