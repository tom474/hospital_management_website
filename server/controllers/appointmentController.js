const mongoose = require('mongoose');
const { documentSchema } = require('../../database/mongodb/schemas');
const database = require('../models/database');

// Initialize the Document model in MongoDB
const Document = mongoose.model('Document', documentSchema);

// Get all appointments for a specific patient
const getPatientAppointments = async (req, res) => {
    try {
        const patient_id = req.params.id;
        const [rows] = await database.poolAdmin.query("CALL getAllAppointmentsByPatientId(?)", [patient_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get appointment by id
const getAppointmentById = async (req, res) => {
    try {
        const appointment_id = req.params.id;
        const [rows] = await database.poolAdmin.query("CALL getAppointmentByAppointmentId(?)", [appointment_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all appointments for a specific staff
const getStaffAppointments = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const { date, start_time, end_time } = req.body;
        const [rows] = await database.poolAdmin.query("CALL getAllAppointmentsByStaffId(?, ?, ?, ?)", [staff_id, date, start_time, end_time]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get appointments in duration (date, start time, end time, mode)
const getAppointmentsInDuration = async (req, res) => {
    try {
        const { date, start_time, end_time, mode } = req.body;
        const [rows] = await database.poolAdmin.query("CALL getAllAppointmentsInDuration(?, ?, ?, ?)", [date, start_time, end_time, mode]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Create a new appointment
const createAppointment = async (req, res) => {
    try {
        const { staff_id, patient_id, date, start_time, end_time, purpose } = req.body;
        const [rows] = await database.poolAdmin.query("CALL createAppointment(?, ?, ?, ?, ?, ?)", [staff_id, patient_id, purpose, date, start_time, end_time]);
        res.json({ message: "Appointment created successfully", appointment: rows[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
        const appointment_id = req.params.id;
        const [rows] = await database.poolAdmin.query("CALL cancelAppointment(?)", [appointment_id]);
        res.json({ message: "Appointment cancelled successfully", result: rows[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Add a note to an appointment
const addNoteToAppointment = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { appointment_id, note, note_type } = req.body;

        // Convert image to base64 if note_type is 'image'
        let documentContent;
        if (note_type === 'image') {
            documentContent = `data:image/jpeg;base64,${Buffer.from(note).toString('base64')}`;
        } else {
            documentContent = note;
        }

        // Save the note in MongoDB
        const newDocument = new Document({
            entityType: 'Appointment',
            entityId: appointment_id.toString(),
            documentType: note_type,
            documentId: new mongoose.Types.ObjectId().toString(), // Generate a unique ID for document reference
            description: 'Appointment note',
            content: documentContent
        });

        await newDocument.save({ session });

        // Save the reference in MySQL
        const [result] = await database.poolAdmin.query(
            "CALL createDocumentReference(?, ?, ?, ?, ?)",
            ['Appointment', appointment_id, note_type, newDocument.documentId, 'Appointment note']
        );

        await session.commitTransaction();
        session.endSession();

        res.json({ message: "Note added successfully to the appointment", document: newDocument });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: "Failed to add note to the appointment", error: err.message });
    }
};

// Get all appointments (this function needs to be added based on your route setup)
const getAllAppointments = async (req, res) => {
    try {
        const [rows] = await database.poolAdmin.query("SELECT * FROM Appointment");
        res.json(rows);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getPatientAppointments,
    getAppointmentById,
    getStaffAppointments,
    getAppointmentsInDuration,
    createAppointment,
    cancelAppointment,
    addNoteToAppointment,
    getAllAppointments, // Added to match the route setup
};
