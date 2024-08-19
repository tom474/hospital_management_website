const express = require("express");
const database = require("../models/database");

// Get all job histories by staff id
const getJobHistoriesByStaffId = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const [rows] = await database.poolAdmin.query("SELECT * FROM JobHistory WHERE staff_id = ?", [staff_id]);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = {
	getJobHistoriesByStaffId,
};
