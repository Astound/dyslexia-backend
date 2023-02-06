const express = require("express");
const {
  getTeachers,
  createTeacher,
  udpateTeacher,
  getTeacherById,
  deleteTeacher,
} = require("../controllers/teacherController");
const router = express.Router();

router.get("/", getTeachers);

router.post("/create", createTeacher);

router.put("/update/:id", udpateTeacher);

router.get("/:id", getTeacherById);

router.delete("/delete/:id", deleteTeacher);

module.exports = router;
