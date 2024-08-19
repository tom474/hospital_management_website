const express = require("express");
const router = express.Router();
const jobHistoryController = require("../controllers/jobHistoryController");

router.get("/staff/:id", jobHistoryController.getJobHistoriesByStaffId);

module.exports = router;
