const express = require('express');
const database = require('../models/database');
const mongoose = require('mongoose');
const { documentSchema } = require('../../database/mongodb/schemas');

// Initialize the Document model in MongoDB
const Document = mongoose.model('Document', documentSchema);

// Get all appointments for a specific patient
const getPatientAppointments = async (req, res) => {
    try {
        const patient_id = req.params.id;
        const [rows] = await req.db.query("CALL getAllAppointmentsByPatientId(?)", [patient_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get appointment by id
const getAppointmentById = async (req, res) => {
    try {
        const appointment_id = req.params.id;
        const [rows] = await req.db.query("CALL getAppointmentByAppointmentId(?)", [appointment_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get all appointments for a specific staff
const getStaffAppointments = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const { date, start_time, end_time } = req.body;
        const [rows] = await req.db.query("CALL getAllAppointmentsByStaffId(?, ?, ?, ?)", [staff_id, date, start_time, end_time]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get appointments in duration (date, start time, end time, mode)
const getAppointmentsInDuration = async (req, res) => {
    try {
        const { date, start_time, end_time, mode } = req.body;
        const [rows] = await req.db.query("CALL getAllAppointmentsInDuration(?, ?, ?, ?)", [date, start_time, end_time, mode]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Create a new appointment
const createAppointment = async (req, res) => {
    try {
        const { staff_id, patient_id, date, start_time, end_time, purpose } = req.body;
        const [rows] = await req.db.query("CALL createAppointment(?, ?, ?, ?, ?, ?)", [staff_id, patient_id, date, start_time, end_time, purpose]);
        res.json({ message: "Appointment created successfully", appointment: rows[0] });
    } catch (err) {
        res.status(400).json(err);
    }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
        const appointment_id = req.params.id;
        const [rows] = await req.db.query("CALL cancelAppointment(?)", [appointment_id]);
        res.json({ message: "Appointment cancelled successfully", result: rows[0] });
    } catch (err) {
        res.status(400).json(err);
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
        });

        await newDocument.save({ session });

        // Save the reference in MySQL
        const [result] = await req.db.query(
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

module.exports = {
    getPatientAppointments,
    getAppointmentById,
    getStaffAppointments,
    getAppointmentsInDuration,
    createAppointment,
    cancelAppointment,
    addNoteToAppointment // Export the new function
};
