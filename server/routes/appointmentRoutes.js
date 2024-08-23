const express = require("express");
const appointmentRouter = express.Router();
const {
    getAllAppointments,
    getAppointmentById,
    getPatientAppointments,
    getStaffAppointments,
    getAppointmentsInDuration,
    createAppointment,
    cancelAppointment,
    addNoteToAppointment
} = require("../controllers/appointmentController");

appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/:id", getAppointmentById);
appointmentRouter.get("/patient/:id", getPatientAppointments);
appointmentRouter.get("/staff/:id", getStaffAppointments);
appointmentRouter.post("/duration", getAppointmentsInDuration);
appointmentRouter.post("/", createAppointment);
appointmentRouter.put("/:id", cancelAppointment);
appointmentRouter.post("/add-note", addNoteToAppointment);

module.exports = appointmentRouter;
