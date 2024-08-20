const express = require('express');
const database = require('../models/database');

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const [rows] = await database.poolAdmin.query("CALL GetAllAppointments()");
        res.json(rows[0]); // The result from a CALL to a procedure is nested in an array
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get appointment by id
const getAppointmentById = async (req, res) => {
    try {
        const appointment_id = req.params.id;
        const [rows] = await database.poolAdmin.query("CALL GetAppointmentById(?)", [appointment_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get all appointments for a specific patient
const getPatientAppointments = async (req, res) => {
    try {
        const patient_id = req.params.id;
        const [rows] = await database.poolAdmin.query("CALL GetPatientAppointments(?)", [patient_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get all appointments for a specific staff
const getStaffAppointments = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const [rows] = await database.poolAdmin.query("CALL GetStaffAppointments(?)", [staff_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get appointments in duration (date, start time, end time)
const getAppointmentsInDuration = async (req, res) => {
    try {
        const { date, start_time, end_time } = req.body;
        const [rows] = await database.poolAdmin.query("CALL GetAppointmentsInDuration(?, ?, ?)", [date, start_time, end_time]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Create a new appointment
const createAppointment = async (req, res) => {
    try {
        const { patient_id, staff_id, date, start_time, end_time, purpose } = req.body;
        const [rows] = await database.poolAdmin.query("CALL BookAppointment(?, ?, ?, ?, ?, ?)", [patient_id, staff_id, date, start_time, end_time, purpose]);
        res.json({ message: "Appointment created successfully", appointment: rows[0] });
    } catch (err) {
        res.status(400).json(err);
    }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
        const appointment_id = req.params.id;
        const [rows] = await database.poolAdmin.query("CALL CancelAppointment(?)", [appointment_id]);
        res.json({ message: "Appointment cancelled successfully", result: rows[0] });
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = {
    getAllAppointments,
    getAppointmentById,
    getPatientAppointments,
    getStaffAppointments,
    getAppointmentsInDuration,
    createAppointment,
    cancelAppointment
};
