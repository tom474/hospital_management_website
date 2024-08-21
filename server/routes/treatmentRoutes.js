const express = require("express");
const treatmentController = require("../controllers/treatmentController");
const assignDatabasePool = require("../middleware/assignDatabasePool");

const router = express.Router();

// Apply the role-based database pool assignment middleware
router.use(assignDatabasePool);

router.get("/patient/:id", treatmentController.getTreatmentByPatientId);
router.get("/date/:date", treatmentController.getAllTreatmentInDuration);
router.post("/patient-date", treatmentController.getAllTreatmentByPatientIdInDuration);
router.post("/", treatmentController.createTreatment);

module.exports = router;
