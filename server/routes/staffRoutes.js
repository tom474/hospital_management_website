const express = require("express");
const staffRouter = express.Router();
const {
	getAllStaffs,
	getStaffById,
	createStaff,
	updateStaff,
	getAvailableStaffsInDuration,
	getBusyStaffsInDuration,
    getWorksInDuration,
    getWorksByStaffIdInDuration,
} = require("../controllers/staffController");

staffRouter.get("/", getAllStaffs);
staffRouter.get("/id/:id", getStaffById);
staffRouter.post("/", createStaff);
staffRouter.put("/:id", updateStaff);
staffRouter.get("/available", getAvailableStaffsInDuration);
staffRouter.get("/busy", getBusyStaffsInDuration);
staffRouter.get("/works", getWorksInDuration);
staffRouter.get("/works/:id", getWorksByStaffIdInDuration);

module.exports = staffRouter;
