const express = require("express");
const scheduleRouter = express.Router();
const {
    getSchedulesByStaffId,
    addSchedule,
    updateSchedule
} = require("../controllers/scheduleController");

scheduleRouter.get("/:id", getSchedulesByStaffId);
scheduleRouter.post("/", addSchedule);
scheduleRouter.put("/", updateSchedule);

module.exports = scheduleRouter;
