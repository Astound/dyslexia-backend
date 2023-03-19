const express = require("express");
const {
    getCompletedTasksByUserId,
    registerCompletedTask
} = require("../controllers/completedTaskController");
const router = express.Router();

//GET
router.get("/:id", getCompletedTasksByUserId);
//POST
router.post("/create", registerCompletedTask);

module.exports = router;
