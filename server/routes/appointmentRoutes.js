const express = require("express");
const appointmentRouter = express.Router();
const {
	getAllAppointments,
	getAppointmentById,
	getPatientAppointments,
	getStaffAppointments,
	createAppointment,
	updateAppointment,
} = require("../controllers/appointmentController");

appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/:id", getAppointmentById);
appointmentRouter.get("/patient/:id", getPatientAppointments);
appointmentRouter.get("/staff/:id", getStaffAppointments);
appointmentRouter.post("/", createAppointment);
appointmentRouter.put("/:id", updateAppointment);

module.exports = appointmentRouter;
