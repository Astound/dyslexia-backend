const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");

// GET

const getTasks = asyncHandler(async (req, res) => {
  const taskQuery = Task.find();
  if (req.query.class) taskQuery.where("classes").equals(req.query.class);
  if (req.query.createdBy)
    taskQuery.where("createdBy").equals(req.query.createdBy);
  if (req.query.full !== "true" || !req.query.full) taskQuery.select("title");

  taskQuery.exec((err, task) => {
    if (err) {
      res.status(500).json("query error");
    } else {
      res.status(200).json(task);
    }
  });
});

const getTasksById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400).json({ message: "Task not found" });
  }
  res.status(200).json(task);
});

//POST OR CREATE

const addCompletedTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(400).json({ message: "Task not found" });
  }

  let tasks = task.completedTasks;
  tasks.push(req.body.taskId);

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { completedTasks: tasks },
    {
      new: true,
    }
  );
  res.status(200).json({
    message: "Task added successfully",
    updatedTask,
  });
});
const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);

  res.status(200).json(task);
});

//EDIT OR UPDATE

const udpateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400).json({ message: "Task not found" });
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: "Task updated successfully",
    updatedTask,
  });
});

//DELETE

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Deleted successfully", task });
});

module.exports = {
  createTask,
  getTasks,
  getTasksById,
  udpateTask,
  deleteTask,
  addCompletedTask,
};
