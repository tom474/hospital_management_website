const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");
const assignDatabasePool = require("../middleware/assignDatabasePool");

// Apply the role-based database pool assignment middleware
appointmentRouter.use(assignDatabasePool);

appointmentRouter.get("/", appointmentController.getAllAppointments);
appointmentRouter.get("/:id", appointmentController.getAppointmentById);
appointmentRouter.get("/patient/:id", appointmentController.getPatientAppointments);
appointmentRouter.get("/staff/:id", appointmentController.getStaffAppointments);
appointmentRouter.post("/duration", appointmentController.getAppointmentsInDuration);
appointmentRouter.post("/", appointmentController.createAppointment);
appointmentRouter.put("/:id", appointmentController.cancelAppointment);

// New route for adding notes to an appointment
appointmentRouter.post("/add-note", appointmentController.addNoteToAppointment);

module.exports = appointmentRouter;
