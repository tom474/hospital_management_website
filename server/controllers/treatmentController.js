const express = require("express");

// Get all treatments by patient id
const getTreatmentByPatientId = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const [rows] = await req.db.query("CALL getAllTreatmentByPatientId(?)", [patient_id]);
		res.json(rows[0]); // The result from a CALL to a procedure is nested in an array
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all treatments on a specific date
const getAllTreatmentInDuration = async (req, res) => {
	try {
		const date = req.params.date;
		const [rows] = await req.db.query("CALL getAllTreatmentInDuration(?)", [date]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all treatments for a patient on a specific date
const getAllTreatmentByPatientIdInDuration = async (req, res) => {
	try {
		const { patient_id, date } = req.body;
		const [rows] = await req.db.query("CALL getAllTreatmentByPatientIdInDuration(?, ?)", [
			patient_id,
			date,
		]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Create a new treatment
const createTreatment = async (req, res) => {
	try {
		const { patient_id, staff_id, date, description } = req.body;
		const [rows] = await req.db.query(
			"CALL createTreatment(?, ?, ?, ?)",
			[staff_id, patient_id, date, description]
		);
		res.json({ message: "Treatment created successfully", treatment: rows[0] });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = {
	getTreatmentByPatientId,
	getAllTreatmentInDuration,
	getAllTreatmentByPatientIdInDuration,
	createTreatment,
};
