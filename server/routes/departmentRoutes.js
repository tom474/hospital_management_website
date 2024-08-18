const express = require("express");
const departmentRouter = express.Router();
const departmentController = require("../controllers/departmentController");

departmentRouter.get("/", departmentController.getAllDepartments);
departmentRouter.get("/:id", departmentController.getDepartmentById);

module.exports = departmentRouter;
