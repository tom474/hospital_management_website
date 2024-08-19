const express = require("express");
const staffRouter = express.Router();
const staffController = require("../controllers/staffController");

staffRouter.get("/", staffController.getAllStaffs);
staffRouter.get("/name-asc", staffController.getAllStaffsByNameASC);
staffRouter.get("/name-desc", staffController.getAllStaffsByNameDESC);
staffRouter.get("/department/:id", staffController.getAllStaffsByDepartment);
staffRouter.get("/department/:id/name-asc", staffController.getAllStaffsByDepartmentNameASC);
staffRouter.get("/department/:id/name-desc", staffController.getAllStaffsByDepartmentNameDESC);
staffRouter.get("/:id", staffController.getStaffById);
staffRouter.post("/:id/available-time", staffController.getStaffAvailableTime);
staffRouter.post("/", staffController.createStaff);
staffRouter.put("/:id", staffController.updateStaff);

module.exports = staffRouter;
