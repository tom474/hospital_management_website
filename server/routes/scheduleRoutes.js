const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

router.get("/staff/:id", scheduleController.getSchedulesByStaffId);
router.post("/", scheduleController.addSchedule);
router.put("/:id", scheduleController.updateSchedule);

module.exports = router;
