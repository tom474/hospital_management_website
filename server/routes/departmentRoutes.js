const express = require("express");
const departmentRouter = express.Router();
const departmentController = require("../controllers/departmentController");
const assignDatabasePool = require("../middleware/assignDatabasePool");

// Apply the role-based database pool assignment middleware
departmentRouter.use(assignDatabasePool);

departmentRouter.get("/", departmentController.getAllDepartments);
departmentRouter.get("/:id", departmentController.getDepartmentById);

module.exports = departmentRouter;
