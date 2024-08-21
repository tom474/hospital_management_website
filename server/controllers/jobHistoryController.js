const express = require("express");

// Get all job histories by staff id
const getJobHistoriesByStaffId = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const [rows] = await req.db.query("CALL getAllJobHistoryByStaffId(?)", [staff_id]);
		res.json(rows[0]); // The result from a CALL to a procedure is nested in an array
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = {
	getJobHistoriesByStaffId,
};
