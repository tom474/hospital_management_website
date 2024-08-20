const express = require("express");
const database = require("../models/database");

// Get schedules by staff id
const getSchedulesByStaffId = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const [rows] = await database.poolAdmin.query("CALL GetSchedulesByStaffId(?)", [staff_id]);
		res.json(rows[0]); // The result from a CALL to a procedure is nested in an array
	} catch (err) {
		res.status(400).json(err);
	}
};

// Add a new schedule
const addSchedule = async (req, res) => {
	try {
		const { staff_id, start_time, end_time, day_of_week } = req.body;
		const [rows] = await database.poolAdmin.query(
			"CALL AddSchedule(?, ?, ?, ?)", 
			[staff_id, start_time, end_time, day_of_week]
		);
		res.json({ message: "Schedule added successfully", schedule: rows[0] });
	} catch (err) {
		res.status(400).json(err);
	}
};

// Update a schedule
const updateSchedule = async (req, res) => {
	try {
		const schedule_id = req.params.id;
		const { staff_id, start_time, end_time, day_of_week } = req.body;

		const [rows] = await database.poolAdmin.query(
			"CALL UpdateSchedule(?, ?, ?, ?, ?)", 
			[schedule_id, staff_id, start_time, end_time, day_of_week]
		);
		res.json({ message: "Schedule updated successfully", schedule: rows[0] });
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = {
	getSchedulesByStaffId,
	addSchedule,
	updateSchedule,
};
