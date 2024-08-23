const database = require("../models/database");

// Get all departments
const getAllDepartments = async (req, res) => {
    try {
        const [rows] = await database.poolAdmin.query("CALL getAllDepartments()");
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get department by id
const getDepartmentById = async (req, res) => {
    try {
        const department_id = req.params.id;
        const [rows] = await database.poolAdmin.query("CALL getDepartmentById(?)", [department_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllDepartments,
    getDepartmentById,
};
