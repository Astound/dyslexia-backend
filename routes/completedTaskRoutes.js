const express = require("express");
const {
  getCompletedTasksByUserId,
} = require("../controllers/completedTaskController");
const router = express.Router();

//GET
router.get("/:id", getCompletedTasksByUserId);

module.exports = router;
