const express = require("express");
const database = require("../models/database");
const treatmentController = require("../controllers/treatmentController");

const router = express.Router();

router.get("/patient/:id", treatmentController.getTreatmentByPatientId);
router.get("/date/:date", treatmentController.getTreatmentByDate);
router.post("/", treatmentController.createTreatment);
router.post("/patient-date", treatmentController.getTreatmentByPatientIdAndDate);

module.exports = router;
