// register performance data for a task by user id

// @desc    Register performance data for a task by user id
// @route   POST /api/performance/:id
// @access  Private

const asyncHandler = require("express-async-handler");
const {
  scoreOfSentence,
  sumOfArray,
  scoreOfTask,
} = require("../helpers/scoreOfTask");

const Performance = require("../models/performanceModel");
const CompletedTask = require("../models/completedTaskModel");
const registerPerformance = asyncHandler(async (req, res) => {
  const { user, task, sentenceStats } = req.body;
  const performance = await Performance.create({
    user,
    task,
    sentenceStats,
  });

  let completedTask = await CompletedTask.find({
    user: user,
    task: task,
  });

  const currentScore = scoreOfTask(sentenceStats);
  console.log("Current score", currentScore);
  let status = "Did not beat the previous best";
  if (completedTask.length == 0) {
    console.log("In not found completed task");
    const createdCompletion = await CompletedTask.create({
      user,
      task,
      bestScore: currentScore,
      performanceId: performance._id,
    });
    status = "Completed the task for the first time";
    completedTask = createdCompletion;
  } else if (completedTask[0].bestScore < currentScore) {
    const createdCompletion = await CompletedTask.findOneAndUpdate(
      completedTask._id,
      {
        performanceId: performance._id,
        bestScore: currentScore,
      },
      {
        new: true,
      }
    );
    status = "Registered new best";
    completedTask = createdCompletion;
  }
  res.status(200).json({ performance, message: status });
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
