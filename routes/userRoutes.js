const express = require("express");
const {
  getUsers,
  udpateUser,
  getUsersById,
  deleteUser,
  addCompletedTask,
  registerUser,
  loginUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.get("/",protect, getUsers);
router.get("/:id",protect, getUsersById);

router.post("/login", loginUser);

router.put("/update/:id",protect, udpateUser);
router.put("/add_task/:id",protect, addCompletedTask);

router.delete("/delete/:id",protect, deleteUser);

module.exports = router;
