const express = require("express");
const staffRouter = express.Router();
const staffController = require("../controllers/staffController");
const assignDatabasePool = require("../middleware/assignDatabasePool");

// Apply the role-based database pool assignment middleware
staffRouter.use(assignDatabasePool);

// Routes for staff operations
staffRouter.get("/", staffController.getAllStaffs);
staffRouter.get("/:id", staffController.getStaffById);
staffRouter.post("/availability", staffController.getStaffAvailableTime);
staffRouter.post("/", staffController.createStaff);
staffRouter.put("/:id", staffController.updateStaff);

// New route to add staff documents
staffRouter.post("/add-document", staffController.addStaffDocument);

module.exports = staffRouter;
