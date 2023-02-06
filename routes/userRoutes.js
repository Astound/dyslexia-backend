const express = require("express");
const {
  createUser,
  getUsers,
  udpateUser,
  getUsersById,
  deleteUser,
  addCompletedTask,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUsersById);

router.post("/create", createUser);

router.put("/update/:id", udpateUser);
router.put("/add_task/:id", addCompletedTask);

router.delete("/delete/:id", deleteUser);

module.exports = router;
