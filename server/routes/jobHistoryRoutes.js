const express = require("express");
const jobHistoryRouter = express.Router();
const { getJobHistoriesByStaffId } = require("../controllers/jobHistoryController");

jobHistoryRouter.get("/staff/:id", getJobHistoriesByStaffId);

module.exports = jobHistoryRouter;
