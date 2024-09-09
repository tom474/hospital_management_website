const express = require("express");
const jobHistoryRouter = express.Router();
const { getAllJobHistories, getJobHistoriesByStaffId } = require("../controllers/jobHistoryController");

jobHistoryRouter.get("/", getAllJobHistories);
jobHistoryRouter.get("/staff/:id", getJobHistoriesByStaffId);

module.exports = jobHistoryRouter;
