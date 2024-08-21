const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

// Get all patients
const getAllPatients = async (req, res) => {
	try {
		const [rows] = await req.db.query("CALL getAllPatients()");
		res.json(rows[0]); // The result from a CALL to a procedure is nested in an array
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get patient by id
const getPatientById = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const [rows] = await req.db.query("CALL getPatientByPatientId(?)", [patient_id]);
		res.json(rows[0]); // Assuming only one patient is returned
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get patient by name
const getPatientByName = async (req, res) => {
	try {
		const search_name = req.params.name;
		const [rows] = await req.db.query("CALL searchPatientsByName(?)", [`%${search_name}%`]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Search patients by partial ID
const searchPatientsById = async (req, res) => {
	try {
		const id_search = req.params.id;
		const [rows] = await req.db.query("CALL searchPatientsById(?)", [`%${id_search}%`]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Search patients by partial name
const searchPatientsByName = async (req, res) => {
	try {
		const name_search = req.params.name;
		const [rows] = await req.db.query("CALL searchPatientsByName(?)", [`%${name_search}%`]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Create a new patient
const createPatient = async (req, res) => {
	try {
		const { first_name, last_name, birth_date, address, email, phone, allergies } = req.body;
		const [rows] = await req.db.query(
			"CALL createPatient(?, ?, ?, ?, ?, ?, ?)",
			[first_name, last_name, birth_date, address, email, phone, allergies]
		);
		res.json({ message: "Patient created successfully", patient: rows[0] });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update patient information
const updatePatient = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const { first_name, last_name, birth_date, address, email, phone, allergies } = req.body;
		const [rows] = await req.db.query(
			"CALL updatePatientInformation(?, ?, ?, ?, ?, ?, ?, ?)",
			[patient_id, first_name, last_name, birth_date, address, email, phone, allergies]
		);
		res.json({ message: "Patient updated successfully", patient: rows[0] });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a patient
const deletePatient = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const [rows] = await req.db.query("CALL deletePatient(?)", [patient_id]);
		res.json({ message: "Patient deleted successfully", result: rows[0] });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Add doctor's note, diagnostic image, lab result, etc.
const addPatientDocument = async (req, res) => {
	try {
		const { patient_id, document_type, description, document_content, entity_type = 'Patient' } = req.body;

		// Connect to MongoDB
		const mongoClient = new MongoClient(process.env.MONGO_URI);
		await mongoClient.connect();
		const db = mongoClient.db(process.env.MONGO_DATABASE_NAME);
		const Document = db.collection('documents');

		// Generate a unique document ID
		const documentId = uuidv4();

		// Insert the document into MongoDB
		const document = {
			entityType: entity_type,
			entityId: patient_id,
			documentType: document_type,
			documentId: documentId,
			description: description,
			content: document_content
		};
		await Document.insertOne(document);

		// Insert the reference into MySQL
		const [rows] = await req.db.query(
			"CALL createDocumentReference(?, ?, ?, ?, ?)",
			[entity_type, patient_id, document_type, documentId, description]
		);

		// Close MongoDB connection
		await mongoClient.close();

		res.json({ message: "Document added successfully", document: rows[0] });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = {
	getAllPatients,
	getPatientById,
	getPatientByName,
	searchPatientsById,
	searchPatientsByName,
	createPatient,
	updatePatient,
	deletePatient,
	addPatientDocument, // New API for adding documents
};
