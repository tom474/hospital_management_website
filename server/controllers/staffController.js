const database = require("../models/database");

// Get all staffs with optional sorting order and department filter
const getAllStaffs = async (req, res) => {
    try {
        const { order = 'ASC', department_id = null } = req.query;
        const [rows] = await database.poolAdmin.query("CALL getAllStaffs(?, ?)", [order, department_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get staff by id
const getStaffById = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const [rows] = await database.poolAdmin.query("CALL getStaffByStaffId(?)", [staff_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Create a new staff
const createStaff = async (req, res) => {
    try {
        const { first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id } = req.body;
        const [rows] = await database.poolAdmin.query(
            "CALL createStaff(?, ?, ?, ?, ?, ?, ?, ?)",
            [first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id]
        );
        res.json({ message: "Staff created successfully", staff: rows[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a staff information
const updateStaff = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const { first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id } = req.body;
        const [rows] = await database.poolAdmin.query(
            "CALL updateStaff(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [staff_id, first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id]
        );
        res.json({ message: "Staff updated successfully", staff: rows[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get staff's available time based on schedule and appointment
const getStaffAvailableTime = async (req, res) => {
    try {
        const { staff_id, date } = req.body;
        const [rows] = await database.poolAdmin.query("CALL GetStaffAvailableTime(?, ?)", [staff_id, date]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllStaffs,
    getStaffById,
    getStaffAvailableTime,
    createStaff,
    updateStaff,
};
