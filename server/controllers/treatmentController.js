const database = require("../models/database");
const treatmentDocument = require("../../database/mongodb/schemas").treatmentDocument;

// Get all treatments
const getAllTreatments = async (req, res) => {
	try {
		const { start_date, end_date } = req.query;

		if (start_date && end_date) {
			// Get the treatment_id, patient_id, staff_id, date, and description from MySQL
			const [rows] = await database.poolAdmin.query("CALL getAllTreatmentsInDuration(?, ?)", [
				start_date,
				end_date,
			]);

			// Get the diagnoseImage and labResults from MongoDB
			for (let i = 0; i < rows[0].length; i++) {
				const treatmentId = rows[0][i].treatment_id;
				const treatment = await treatmentDocument.findOne({ treatmentId: treatmentId });

				if (treatment) {
					rows[0][i].diagnoseImage = treatment.diagnoseImage;
					rows[0][i].labResults = treatment.labResults;
				}
			}
			res.json(rows[0]);
		} else {
			// Get the treatment_id, patient_id, staff_id, date, and description from MySQL
			const [rows] = await database.poolAdmin.query("CALL getAllTreatments()");

			// Get the diagnoseImage and labResults from MongoDB
			for (let i = 0; i < rows[0].length; i++) {
				const treatmentId = rows[0][i].treatment_id;
				const treatment = await treatmentDocument.findOne({ treatmentId: treatmentId });

				if (treatment) {
					rows[0][i].diagnoseImage = treatment.diagnoseImage;
					rows[0][i].labResults = treatment.labResults;
				}
			}
			res.json(rows[0]);
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all treatments by patient id
const getTreatmentsByPatientId = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const { start_date, end_date } = req.query;

		if (start_date && end_date) {
			// Get the treatment_id, patient_id, staff_id, date, and description from MySQL
			const [rows] = await database.poolAdmin.query("CALL getTreatmentsByPatientIdInDuration(?, ?, ?)", [
				patient_id,
				start_date,
				end_date,
			]);

			// Get the diagnoseImage and labResults from MongoDB
			for (let i = 0; i < rows[0].length; i++) {
				const treatmentId = rows[0][i].treatment_id;
				const treatment = await treatmentDocument.findOne({ treatmentId: treatmentId });

				if (treatment) {
					rows[0][i].diagnoseImage = treatment.diagnoseImage;
					rows[0][i].labResults = treatment.labResults;
				}
			}
			res.json(rows[0]);
		} else {
			// Get the treatment_id, patient_id, staff_id, date, and description from MySQL
			const [rows] = await database.poolAdmin.query("CALL getTreatmentsByPatientId(?)", [patient_id]);

			// Get the diagnoseImage and labResults from MongoDB
			for (let i = 0; i < rows[0].length; i++) {
				const treatmentId = rows[0][i].treatment_id;
				const treatment = await treatmentDocument.findOne({ treatmentId: treatmentId });

				if (treatment) {
					rows[0][i].diagnoseImage = treatment.diagnoseImage;
					rows[0][i].labResults = treatment.labResults;
				}
			}
			res.json(rows[0]);
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Create a new treatment
const createTreatment = async (req, res) => {
	try {
		const { patient_id, staff_id, date, description, diagnoseImage, labResults } = req.body;

		// Save the patient_id, staff_id, date, and description to MySQL
		const [rows] = await database.poolAdmin.query("CALL createTreatment(?, ?, ?, ?)", [
			patient_id,
			staff_id,
			date,
			description,
		]);

		// Get all the treatments from MySQL
		const [allRows] = await database.poolAdmin.query("CALL getAllTreatments()");

		// Get the treatment_id of the newly created treatment
		const treatment_id = allRows[0][allRows[0].length - 1].treatment_id;

		// Save the diagnoseImage and labResults to MongoDB
		const newTreatment = new treatmentDocument({
			treatmentId: treatment_id,
			diagnoseImage: {
				data: diagnoseImage,
				contentType: "base64",
			},
			labResults: {
				data: labResults,
				contentType: "base64",
			},
		});
		await newTreatment.save();

		res.json({ message: "Treatment created successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = {
	getAllTreatments,
	getTreatmentsByPatientId,
	createTreatment,
};
