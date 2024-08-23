const express = require("express");
const departmentRouter = express.Router();
const {
    getAllDepartments,
    getDepartmentById
} = require("../controllers/departmentController");
const assignDatabasePool = require("../middlewares/assignDatabasePool");

departmentRouter.use(assignDatabasePool);

departmentRouter.get("/", getAllDepartments);
departmentRouter.get("/:id", getDepartmentById);

module.exports = departmentRouter;
