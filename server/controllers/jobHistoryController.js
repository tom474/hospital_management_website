const database = require("../models/database");

// Get all job histories by staff id
const getJobHistoriesByStaffId = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const [rows] = await database.poolAdmin.query("CALL getAllJobHistoryByStaffId(?)", [staff_id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getJobHistoriesByStaffId,
};
