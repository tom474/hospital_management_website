const express = require("express");
const treatmentRouter = express.Router();
const {
    getTreatmentByPatientId,
    getAllTreatmentInDuration,
    getAllTreatmentByPatientIdInDuration,
    createTreatment
} = require("../controllers/treatmentController");
const assignDatabasePool = require("../middlewares/assignDatabasePool");

treatmentRouter.use(assignDatabasePool);

treatmentRouter.get("/patient/:id", getTreatmentByPatientId);
treatmentRouter.get("/date/:date", getAllTreatmentInDuration);
treatmentRouter.post("/patient-date", getAllTreatmentByPatientIdInDuration);
treatmentRouter.post("/", createTreatment);

module.exports = treatmentRouter;
