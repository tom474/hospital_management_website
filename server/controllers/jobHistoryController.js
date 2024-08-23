const database = require("../models/database");

// Helper function to get a connection from the admin pool
async function getAdminConnection() {
    return await database.getAdminConnection();
}

// Get all job histories by staff id
const getJobHistoriesByStaffId = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL getAllJobHistoryByStaffId(?)", [staff_id]);
        connection.release();
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getJobHistoriesByStaffId,
};
