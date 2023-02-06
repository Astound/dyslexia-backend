const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);

  res.status(200).json(user);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const getUsersById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

const udpateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400).json({ message: "User not found" });
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: "User updated successfully",
    updatedUser,
  });
});

const addCompletedTask = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400).json({ message: "User not found" });
  }

  let tasks = user.completedTasks;
  tasks.push(req.body.taskId);

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { completedTasks: tasks },
    {
      new: true,
    }
  );
  res.status(200).json({
    message: "Task added successfully",
    updatedUser,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Deleted successfully", user });
});

module.exports = {
  createUser,
  getUsers,
  getUsersById,
  udpateUser,
  deleteUser,
  addCompletedTask,
};
