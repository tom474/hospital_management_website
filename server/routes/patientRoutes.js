const express = require("express");
const patientRouter = express.Router();
const {
    getAllPatients,
    getPatientById,
    getPatientByName,
    searchPatientsById,
    searchPatientsByName,
    createPatient,
    updatePatient,
    deletePatient,
    addPatientDocument
} = require("../controllers/patientController");
const assignDatabasePool = require("../middlewares/assignDatabasePool");

patientRouter.use(assignDatabasePool);

patientRouter.get("/", getAllPatients);
patientRouter.get("/id/:id", getPatientById);
patientRouter.get("/name/:name", getPatientByName);
patientRouter.get("/search/id/:id", searchPatientsById);
patientRouter.get("/search/name/:name", searchPatientsByName);
patientRouter.post("/", createPatient);
patientRouter.put("/:id", updatePatient);
patientRouter.delete("/:id", deletePatient);
patientRouter.post("/add-document", addPatientDocument);

module.exports = patientRouter;
