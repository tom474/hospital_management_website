const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");

patientRouter.get("/", patientController.getAllPatients);
patientRouter.get("/id/:id", patientController.getPatientById);
patientRouter.get("/name/:name", patientController.getPatientByName);
patientRouter.post("/", patientController.createPatient);
patientRouter.put("/:id", patientController.updatePatient);
patientRouter.delete("/:id", patientController.deletePatient);

module.exports = patientRouter;
