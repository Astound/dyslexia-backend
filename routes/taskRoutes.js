const express = require("express");
const {
  getTasks,
  getTasksById,
  createTask,
  udpateTask,
  deleteTask,
  getTasksByClass,
} = require("../controllers/taskController");
const router = express.Router();

//GET
router.get("/", getTasks);
router.get("/:id", getTasksById);
//POST
router.post("/create", createTask);

//PUT UPDATE EDIT
router.put("/update/:id", udpateTask);

//DELETE
router.delete("/delete/:id", deleteTask);

module.exports = router;
