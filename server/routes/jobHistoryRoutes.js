const express = require("express");
const jobHistoryRouter = express.Router();
const jobHistoryController = require("../controllers/jobHistoryController");
const assignDatabasePool = require("../middleware/assignDatabasePool");

// Apply the role-based database pool assignment middleware
jobHistoryRouter.use(assignDatabasePool);

jobHistoryRouter.get("/staff/:id", jobHistoryController.getJobHistoriesByStaffId);

module.exports = jobHistoryRouter;
