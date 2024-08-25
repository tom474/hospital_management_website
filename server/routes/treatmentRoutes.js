const express = require("express");
const treatmentRouter = express.Router();
const { getAllTreatments, getTreatmentsByPatientId, createTreatment } = require("../controllers/treatmentController");

treatmentRouter.get("/", getAllTreatments);
treatmentRouter.get("/:id", getTreatmentsByPatientId);
treatmentRouter.post("/", createTreatment);

module.exports = treatmentRouter;
