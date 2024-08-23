const database = require("../models/database");

// Helper function to get a connection from the admin pool
async function getAdminConnection() {
    return await database.getAdminConnection();
}

// Get all treatments by patient id
const getTreatmentByPatientId = async (req, res) => {
    try {
        const patient_id = req.params.id;
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL getAllTreatmentByPatientId(?)", [patient_id]);
        connection.release();
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all treatments on a specific date
const getAllTreatmentInDuration = async (req, res) => {
    try {
        const date = req.params.date;
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL getAllTreatmentInDuration(?)", [date]);
        connection.release();
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all treatments for a patient on a specific date
const getAllTreatmentByPatientIdInDuration = async (req, res) => {
    try {
        const { patient_id, date } = req.body;
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL getAllTreatmentByPatientIdInDuration(?, ?)", [
            patient_id,
            date,
        ]);
        connection.release();
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Create a new treatment
const createTreatment = async (req, res) => {
    try {
        const { patient_id, staff_id, date, description } = req.body;
        const connection = await getAdminConnection();
        const [rows] = await connection.query(
            "CALL createTreatment(?, ?, ?, ?)",
            [staff_id, patient_id, date, description]
        );
        connection.release();
        res.json({ message: "Treatment created successfully", treatment: rows[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getTreatmentByPatientId,
    getAllTreatmentInDuration,
    getAllTreatmentByPatientIdInDuration,
    createTreatment,
};
