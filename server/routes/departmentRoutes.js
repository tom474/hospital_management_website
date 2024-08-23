const express = require("express");
const departmentRouter = express.Router();
const {
    getAllDepartments,
    getDepartmentById
} = require("../controllers/departmentController");

departmentRouter.get("/", getAllDepartments);
departmentRouter.get("/:id", getDepartmentById);

module.exports = departmentRouter;
