const asyncHandler = require("express-async-handler");

const Teacher = require("../models/teacherModel");

const createTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.create(req.body);
  res.status(200).json({ message: "Teacher created successfully", teacher });
});

const getTeachers = asyncHandler(async (req, res) => {
  const Teachers = await Teacher.find();
  res.status(200).json(Teachers);
});

const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    res.status(400).json({ message: "Teacher not found" });
  }
  res.status(200).json(teacher);
});

const udpateTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    res.status(400).json({ message: "Teacher not found" });
  }
  const updatedTeacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({
    message: "Teacher updated successfully",
    updatedTeacher,
  });
});

const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Deleted successfully", teacher });
});

module.exports = {
  createTeacher,
  getTeachers,
  getTeacherById,
  udpateTeacher,
  deleteTeacher,
};
