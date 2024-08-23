const express = require("express");
const scheduleRouter = express.Router();
const {
    getSchedulesByStaffId,
    addSchedule,
    updateSchedule
} = require("../controllers/scheduleController");
const assignDatabasePool = require("../middlewares/assignDatabasePool");

scheduleRouter.use(assignDatabasePool);

scheduleRouter.get("/staff/:id", getSchedulesByStaffId);
scheduleRouter.post("/", addSchedule);
scheduleRouter.put("/:id", updateSchedule);

module.exports = scheduleRouter;
