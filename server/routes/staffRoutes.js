const express = require("express");
const staffRouter = express.Router();
const {
    getAllStaffs,
    getStaffById,
    getStaffAvailableTime,
    createStaff,
    updateStaff,
    addStaffDocument
} = require("../controllers/staffController");
const assignDatabasePool = require("../middlewares/assignDatabasePool");

staffRouter.use(assignDatabasePool);

staffRouter.get("/", getAllStaffs);
staffRouter.get("/:id", getStaffById);
staffRouter.post("/availability", getStaffAvailableTime);
staffRouter.post("/", createStaff);
staffRouter.put("/:id", updateStaff);
staffRouter.post("/add-document", addStaffDocument);

module.exports = staffRouter;
