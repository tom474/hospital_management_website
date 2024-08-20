const express = require("express");
const database = require("../models/database");

// Get all staffs
const getAllStaffs = async (req, res) => {
	try {
		const [rows] = await database.poolAdmin.query("CALL GetAllStaffs()");
		res.json(rows[0]); // The result from a CALL to a procedure is nested in an array
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get all staff by name ASC
const getAllStaffsByNameASC = async (req, res) => {
	try {
		const [rows] = await database.poolAdmin.query("CALL GetAllStaffsByNameASC()");
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get all staff by name DESC
const getAllStaffsByNameDESC = async (req, res) => {
	try {
		const [rows] = await database.poolAdmin.query("CALL GetAllStaffsByNameDESC()");
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get all staff by department
const getAllStaffsByDepartment = async (req, res) => {
	try {
		const department_id = req.params.id;
		const [rows] = await database.poolAdmin.query("CALL GetAllStaffsByDepartment(?)", [department_id]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get all staff by department and name ASC
const getAllStaffsByDepartmentNameASC = async (req, res) => {
	try {
		const department_id = req.params.id;
		const [rows] = await database.poolAdmin.query("CALL GetAllStaffsByDepartmentNameASC(?)", [department_id]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get all staff by department and name DESC
const getAllStaffsByDepartmentNameDESC = async (req, res) => {
	try {
		const department_id = req.params.id;
		const [rows] = await database.poolAdmin.query("CALL GetAllStaffsByDepartmentNameDESC(?)", [department_id]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get staff by id
const getStaffById = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const [rows] = await database.poolAdmin.query("CALL GetStaffById(?)", [staff_id]);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get staff's available time based on schedule and appointment
const getStaffAvailableTime = async (req, res) => {
	try {
		const { staff_id, date } = req.body;
		const [rows] = await database.poolAdmin.query("CALL GetStaffAvailableTime(?, ?)", [staff_id, date]);
		res.json(rows[0]); // The result from a CALL to a procedure is nested in an array
	} catch (err) {
		res.status(400).json(err);
	}
};

// Create a new staff
const createStaff = async (req, res) => {
	try {
		const { first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id } = req.body;
		const [rows] = await database.poolAdmin.query(
			"CALL CreateStaff(?, ?, ?, ?, ?, ?, ?, ?)",
			[first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id]
		);
		res.json({ message: "Staff created successfully", staff: rows[0] });
	} catch (err) {
		res.status(400).json(err);
	}
};

// Update a staff information
const updateStaff = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const { first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id } = req.body;
		const [rows] = await database.poolAdmin.query(
			"CALL UpdateStaff(?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[staff_id, first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id]
		);
		res.json({ message: "Staff updated successfully", staff: rows[0] });
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = {
	getAllStaffs,
	getAllStaffsByNameASC,
	getAllStaffsByNameDESC,
	getAllStaffsByDepartment,
	getAllStaffsByDepartmentNameASC,
	getAllStaffsByDepartmentNameDESC,
	getStaffById,
	getStaffAvailableTime,
	createStaff,
	updateStaff,
};
