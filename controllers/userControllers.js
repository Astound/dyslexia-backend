const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  console.log("In register");
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json({ message: "User already registered" });
  } else {
    const hashedPswd = await bcrypt.hash(req.body.password, 12);

    user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      class: req.body.class,
      email: req.body.email,
      password: hashedPswd,
    });

    res.status(200).json(user);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({ message: "User doesn't exist", userExists: false });
  } else {
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(400).json({
        message: "Wrong credentials",
        userExists: true,
        correctPassword: false,
      });
    } else {
      res.status(200).json({
        message: "Logged in successfully",
        correctPassword: true,
        userId: user._id,
        token: generateToken(user),
      });
    }
  }
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
  registerUser,
  getUsers,
  getUsersById,
  udpateUser,
  deleteUser,
  addCompletedTask,
  loginUser,
};
