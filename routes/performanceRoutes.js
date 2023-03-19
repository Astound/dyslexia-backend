// performance routes
const express = require("express");

const {
  registerCompletedTask,
} = require("../controllers/completedTaskController");
const {
  registerPerformance,
  getPerformance,
  getPerformanceById,
} = require("../controllers/performanceController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

//GET

router.get("/", protect, getPerformance);
router.get("/:id", protect, getPerformanceById);

//POST

router.post("/register", protect, registerPerformance);

module.exports = router;
