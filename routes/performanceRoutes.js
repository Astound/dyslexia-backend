// performance routes

const {
  registerCompletedTask,
} = require("../controllers/completedTaskController");
const {
  getPerformanceByUserId,
  getPerformanceByUserIdAndTaskId,
  getPerformanceByTaskId,
  registerPerformance,
} = require("../controllers/performanceController");
const { protect } = require("../middleware/authMiddleware");

//GET

router.get("/:id", protect, getPerformanceByUserId);
router.get("/:id/:task", protect, getPerformanceByUserIdAndTaskId);
router.get("/:task", protect, getPerformanceByTaskId);

//POST

router.post("/register", protect, registerPerformance, registerCompletedTask);

module.exports = router;
