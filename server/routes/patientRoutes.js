const express = require("express");
const patientRouter = express.Router();
const {
	getAllPatients,
	getPatientById,
	searchPatientsById,
	searchPatientsByName,
	createPatient,
	updatePatient,
	deletePatient,
} = require("../controllers/patientController");

patientRouter.get("/", getAllPatients);
patientRouter.get("/id/:id", getPatientById);
patientRouter.get("/search/id/", searchPatientsById);
patientRouter.get("/search/name/", searchPatientsByName);
patientRouter.post("/", createPatient);
patientRouter.put("/:id", updatePatient);
patientRouter.delete("/:id", deletePatient);

module.exports = patientRouter;
