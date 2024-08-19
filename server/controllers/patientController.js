const express = require("express");
const database = require("../models/database");

// Get all patients
const getAllPatients = async (req, res) => {
	try {
		const [rows] = await database.poolAdmin.query("SELECT * FROM patient");
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get patient by id
const getPatientById = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const [rows] = await database.poolAdmin.query("SELECT * FROM patient WHERE patient_id = ?", [patient_id]);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get patient by name
const getPatientByName = async (req, res) => {
	try {
		const search_name = req.params.name;
		const [rows] = await database.poolAdmin.query(
			"SELECT * FROM patient WHERE first_name LIKE ? OR last_name LIKE ?",
			[`%${search_name}%`, `%${search_name}%`]
		);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Create a new patient
const createPatient = async (req, res) => {
	try {
		const { first_name, last_name, birth_date, address, email, phone, allergies } = req.body;

		const [rows] = await database.poolAdmin.query(
			"INSERT INTO patient (first_name, last_name, birth_date, address, email, phone, allergies) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
			[first_name, last_name, birth_date, address, email, phone, allergies]
		);
		res.json(rows);
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
			"UPDATE patient SET first_name = ?, last_name = ?, birth_date = ?, address = ?, email = ?, phone = ?, allergies = ? WHERE patient_id = ?",
			[first_name, last_name, birth_date, address, email, phone, allergies, patient_id]
		);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Delete a patient
const deletePatient = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const [rows] = await database.poolAdmin.query("DELETE FROM patient WHERE patient_id = ?", [patient_id]);
		res.json(rows);
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
