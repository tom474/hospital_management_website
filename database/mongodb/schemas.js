const mongoose = require("mongoose");

// Define the schema for staff's documents
const staffSchema = new mongoose.Schema({
	staffId: { type: String, required: true },
	certificate: {
		data: { type: String, required: true },
		contentType: { type: String, default: "base64" },
	},
});

// Define the schema for appointments' documents
const appointmentSchema = new mongoose.Schema({
	appointmentId: { type: String, required: true },
	notes: {
		data: { type: String, required: true },
		contentType: { type: String, default: "text" },
	},
});

// Define the schema for treatments' documents
const treatmentSchema = new mongoose.Schema({
	treatmentId: { type: String, required: true },
	diagnoseImage: {
		data: { type: String, required: true },
		contentType: { type: String, default: "base64" },
	},
	labResults: {
		data: { type: String, required: true },
		contentType: { type: String, default: "base64" },
	},
});

const staffDocument = mongoose.model("StaffDocument", staffSchema);
const appointmentDocument = mongoose.model("AppointmentDocument", appointmentSchema);
const treatmentDocument = mongoose.model("TreatmentDocument", treatmentSchema);

module.exports = { staffDocument, appointmentDocument, treatmentDocument };
