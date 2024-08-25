const express = require("express");
const departmentRouter = express.Router();
const {
    getAllDepartments,
    getDepartmentById,
    getDepartmentByName,
} = require("../controllers/departmentController");

departmentRouter.get("/", getAllDepartments);
departmentRouter.get("/id/:id", getDepartmentById);
departmentRouter.get("/name/:name", getDepartmentByName);

module.exports = departmentRouter;
