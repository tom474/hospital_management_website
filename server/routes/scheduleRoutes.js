const express = require("express");
const scheduleRouter = express.Router();
const scheduleController = require("../controllers/scheduleController");
const assignDatabasePool = require("../middleware/assignDatabasePool");

// Apply the role-based database pool assignment middleware
scheduleRouter.use(assignDatabasePool);

scheduleRouter.get("/staff/:id", scheduleController.getSchedulesByStaffId);
scheduleRouter.post("/", scheduleController.addSchedule);
scheduleRouter.put("/:id", scheduleController.updateSchedule);

module.exports = scheduleRouter;
