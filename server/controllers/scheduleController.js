const database = require("../models/database");

// Get schedules by staff id
const getSchedulesByStaffId = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const [rows] = await database.poolAdmin.query(
			"CALL getAllSchedulesByStaffId(?)",
			[staff_id]
		);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Add a new schedule
const addSchedule = async (req, res) => {
	try {
		const { staff_id, start_time, end_time, date } = req.body;
		const [rows] = await database.poolAdmin.query(
			"CALL addSchedule(?, ?, ?, ?, @result)",
			[staff_id, start_time, end_time, date]
		);

		const [result] = await database.poolAdmin.query("SELECT @result");
		const resultCode = result[0]["@result"];

		if (resultCode === -1) {
			res.status(400).json({
				error: "Schedule is clashed with another existence schedule"
			});
		} else if (resultCode === 0) {
			res.json({
				message: "Schedule added successfully",
				schedule: rows[0]
			});
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a schedule
const updateSchedule = async (req, res) => {
	try {
		const { schedule_id, staff_id, start_time, end_time, date } = req.body;
		const [rows] = await database.poolAdmin.query(
			"CALL updateSchedule(?, ?, ?, ?, ?, @result)",
			[schedule_id, staff_id, start_time, end_time, date]
		);
		const [result] = await database.poolAdmin.query("SELECT @result");
		const resultCode = result[0]["@result"];

		if (resultCode === -1) {
			res.status(400).json({
				error: "Schedule is clashed with another existence schedule"
			});
		} else if (resultCode === 1) {
			res.status(400).json({
				error: "Appointment or Staff does not exist"
			});
		} else if (resultCode === 0) {
			res.json({
				message: "Schedule updated successfully",
				schedule: rows[0]
			});
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = {
	getSchedulesByStaffId,
	addSchedule,
	updateSchedule
};
