const database = require("../models/database");

// Helper function to get a connection from the admin pool
async function getAdminConnection() {
    return await database.getAdminConnection();
}

// Get all departments
const getAllDepartments = async (req, res) => {
    try {
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL getAllDepartments()");
        connection.release();
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get department by id
const getDepartmentById = async (req, res) => {
    try {
        const department_id = req.params.id;
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL getDepartmentById(?)", [department_id]);
        connection.release();
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllDepartments,
    getDepartmentById,
};
