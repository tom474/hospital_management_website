const express = require("express");
const database = require("../models/database");

// Get all patients
const getAllPatients = async (req, res) => {
	try {
		const [rows] = await database.poolAdmin.query("CALL GetAllPatients()");
		res.json(rows[0]); // The result from a CALL to a procedure is nested in an array
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get patient by id
const getPatientById = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const [rows] = await database.poolAdmin.query("CALL GetPatientById(?)", [patient_id]);
		res.json(rows[0]); // Assuming only one patient is returned
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get patient by name
const getPatientByName = async (req, res) => {
	try {
		const search_name = req.params.name;
		const [rows] = await database.poolAdmin.query("CALL GetPatientByName(?)", [`%${search_name}%`]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Create a new patient
const createPatient = async (req, res) => {
	try {
		const { first_name, last_name, birth_date, address, email, phone, allergies } = req.body;
		const [rows] = await database.poolAdmin.query(
			"CALL CreatePatient(?, ?, ?, ?, ?, ?, ?)",
			[first_name, last_name, birth_date, address, email, phone, allergies]
		);
		res.json({ message: "Patient created successfully", patient: rows[0] });
	} catch (err) {
		res.status(400).json(err);
	}
};

// Update a patient information
const updatePatient = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const { first_name, last_name, birth_date, address, email, phone, allergies } = req.body;
		const [rows] = await database.poolAdmin.query(
			"CALL UpdatePatient(?, ?, ?, ?, ?, ?, ?, ?)",
			[first_name, last_name, birth_date, address, email, phone, allergies, patient_id]
		);
		res.json({ message: "Patient updated successfully", patient: rows[0] });
	} catch (err) {
		res.status(400).json(err);
	}
};

// Delete a patient
const deletePatient = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const [rows] = await database.poolAdmin.query("CALL DeletePatient(?)", [patient_id]);
		res.json({ message: "Patient deleted successfully", result: rows[0] });
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = {
	getAllPatients,
	getPatientById,
	getPatientByName,
	createPatient,
	updatePatient,
	deletePatient,
};
