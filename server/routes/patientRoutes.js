const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");
const assignDatabasePool = require("../middleware/assignDatabasePool");

// Apply the role-based database pool assignment middleware
patientRouter.use(assignDatabasePool);

patientRouter.get("/", patientController.getAllPatients);
patientRouter.get("/id/:id", patientController.getPatientById);
patientRouter.get("/name/:name", patientController.getPatientByName);
patientRouter.get("/search/id/:id", patientController.searchPatientsById);
patientRouter.get("/search/name/:name", patientController.searchPatientsByName);
patientRouter.post("/", patientController.createPatient);
patientRouter.put("/:id", patientController.updatePatient);
patientRouter.delete("/:id", patientController.deletePatient);

// New route to add patient documents
patientRouter.post("/add-document", patientController.addPatientDocument);

module.exports = patientRouter;
