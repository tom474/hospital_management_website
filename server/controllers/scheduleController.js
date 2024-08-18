const express = require("express");
const database = require("../models/database");

// Get schedules by staff id
const getSchedulesByStaffId = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const [rows] = await database.poolAdmin.query("SELECT * FROM schedule WHERE staff_id = ?", [staff_id]);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Add a new schedule
const addSchedule = async (req, res) => {
	try {
		const { staff_id, start_time, end_time, day_of_week } = req.body;

		const [rows] = await database.poolAdmin.query(
			"INSERT INTO schedule (staff_id, start_time, end_time, day_of_week, is_booked) VALUES (?, ?, ?, ?, ?)",
			[staff_id, start_time, end_time, day_of_week, false]
		);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Update a schedule (NOT IMPLEMENTED YET)
const updateSchedule = async (req, res) => {
	try {
		const schedule_id = req.params.id;
		const { staff_id, start_time, end_time, day_of_week } = req.body;

		const [rows] = await database.poolAdmin.query(
			"UPDATE schedule SET staff_id = ?, start_time = ?, end_time = ?, day_of_week = ? WHERE schedule_id = ?",
			[staff_id, start_time, end_time, day_of_week, schedule_id]
		);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = {
	getSchedulesByStaffId,
	addSchedule,
	updateSchedule,
};
