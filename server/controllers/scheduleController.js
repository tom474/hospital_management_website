const database = require("../models/database");

// Get schedules by staff id
const getSchedulesByStaffId = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const [rows] = await database.poolAdmin.query("CALL getAllSchedulesByStaffId(?)", [staff_id]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Add a new schedule
const addSchedule = async (req, res) => {
	try {
		const { staff_id, start_time, end_time, date } = req.body;
		const [rows] = await database.poolAdmin.query("CALL addSchedule(?, ?, ?, ?)", [
			staff_id,
			start_time,
			end_time,
			date,
		]);
		res.json({ message: "Schedule added successfully", schedule: rows[0] });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a schedule
const updateSchedule = async (req, res) => {
	try {
		const { schedule_id, staff_id, start_time, end_time, date } = req.body;
		const [rows] = await database.poolAdmin.query("CALL updateSchedule(?, ?, ?, ?, ?)", [
			schedule_id,
			staff_id,
			start_time,
			end_time,
			date,
		]);
		res.json({ message: "Schedule updated successfully", schedule: rows[0] });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = {
	getSchedulesByStaffId,
	addSchedule,
	updateSchedule,
};
