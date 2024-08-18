const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controllers/appointmentController");

appointmentRouter.get("/", appointmentController.getAllAppointments);
appointmentRouter.get("/:id", appointmentController.getAppointmentById);
appointmentRouter.get("/patient/:id", appointmentController.getPatientAppointments);
appointmentRouter.get("/staff/:id", appointmentController.getStaffAppointments);
appointmentRouter.post("/duration", appointmentController.getAppointmentsInDuration);
appointmentRouter.post("/", appointmentController.createAppointment);
appointmentRouter.put("/:id", appointmentController.cancelAppointment);

module.exports = appointmentRouter;
