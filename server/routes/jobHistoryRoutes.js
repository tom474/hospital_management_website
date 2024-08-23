const express = require("express");
const jobHistoryRouter = express.Router();
const { getJobHistoriesByStaffId } = require("../controllers/jobHistoryController");
const assignDatabasePool = require("../middlewares/assignDatabasePool");

jobHistoryRouter.use(assignDatabasePool);

jobHistoryRouter.get("/staff/:id", getJobHistoriesByStaffId);

module.exports = jobHistoryRouter;
