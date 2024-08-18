const express = require('express');
const database = require('../models/database');

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const [rows] = await database.poolAdmin.query("SELECT * FROM appointment");
        res.json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get appointment by id
const getAppointmentById = async (req, res) => {
    try {
        const appointment_id = req.params.id;
        const [rows] = await database.poolAdmin.query("SELECT * FROM appointment WHERE appointment_id = ?", [appointment_id]);
        res.json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get all appointments for a specific patient
const getPatientAppointments = async (req, res) => {
    try {
        const patient_id = req.params.id;
        const [rows] = await database.poolAdmin.query("SELECT * FROM appointment WHERE patient_id = ?", [patient_id]);
        res.json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Get all appointments for a specific staff
const getStaffAppointments = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const [rows] = await database.poolAdmin.query("SELECT * FROM appointment WHERE staff_id = ?", [staff_id]);
        res.json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Get appointments in duration (date, start time, end time)
const getAppointmentsInDuration = async (req, res) => {
    try {
        const { date, start_time, end_time } = req.body;
        const [rows] = await database.poolAdmin.query("SELECT * FROM appointment WHERE date = ? AND start_time >= ? AND end_time <= ?", [date, start_time, end_time]);
        res.json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Create a new appointment (NOT IMPLEMENTED YET)
const createAppointment = async (req, res) => {
    try {
        const { patient_id, staff_id, date, start_time, end_time, purpose } = req.body;
		res.json({ message: "This feature is not implemented yet!" });
        
    } catch (err) {
        res.status(400).json(err);
    }
}

// Cancel an appointment (NOT IMPLEMENTED YET)
const cancelAppointment = async (req, res) => {
    try {
        const appointment_id = req.params.id;
        res.json({ message: "This feature is not implemented yet!" });
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    getAllAppointments,
    getAppointmentById,
    getPatientAppointments,
    getStaffAppointments,
    getAppointmentsInDuration,
    createAppointment,
    cancelAppointment
};