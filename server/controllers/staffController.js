const express = require("express");
const database = require("../models/database");

// Get all staffs
const getAllStaffs = async (req, res) => {
	try {
		const [rows] = await database.poolAdmin.query("SELECT * FROM staff");
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get all staff by name ASC
const getAllStaffsByNameASC = async (req, res) => {
	try {
		const [rows] = await database.poolAdmin.query("SELECT * FROM staff ORDER BY first_name ASC");
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get all staff by name DESC
const getAllStaffsByNameDESC = async (req, res) => {
	try {
		const [rows] = await database.poolAdmin.query("SELECT * FROM staff ORDER BY first_name DESC");
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get all staff by department
const getAllStaffsByDepartment = async (req, res) => {
	try {
		const department_id = req.params.id;
		const [rows] = await database.poolAdmin.query("SELECT * FROM staff WHERE department_id = ?", [department_id]);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get all staff by department and name ASC
const getAllStaffsByDepartmentNameASC = async (req, res) => {
	try {
		const department_id = req.params.id;
		const [rows] = await database.poolAdmin.query(
			"SELECT * FROM staff WHERE department_id = ? ORDER BY first_name ASC",
			[department_id]
		);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get all staff by department and name DESC
const getAllStaffsByDepartmentNameDESC = async (req, res) => {
	try {
		const department_id = req.params.id;
		const [rows] = await database.poolAdmin.query(
			"SELECT * FROM staff WHERE department_id = ? ORDER BY first_name DESC",
			[department_id]
		);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get staff by id
const getStaffById = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const [rows] = await database.poolAdmin.query("SELECT * FROM staff WHERE staff_id = ?", [staff_id]);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get staff's available time based on schedule and appointment (NOT IMPLEMENTED YET)
// The available time is the time that in the working schedule but not have any appointment
// For example, if the staff works from 8:00 to 17:00 and has an appointment from 9:00 to 10:00
// Then the available time is from 8:00 to 9:00 and from 10:00 to 17:00
const getStaffAvailableTime = async (req, res) => {
    try {
		const { staff_id, date } = req.body;
		res.json({ message: "This feature is not implemented yet!" });
	} catch (err) {
		res.status(400).json(err);
	}
};

// Create a new staff
const createStaff = async (req, res) => {
	try {
		const { first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id } = req.body;
		const [rows] = await database.poolAdmin.query(
			"INSERT INTO staff (first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id]
		);
		res.json(rows);
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
			"UPDATE staff SET first_name = ?, last_name = ?, email = ?, salary = ?, job_type = ?, qualifications = ?, manager_id = ?, department_id = ? WHERE staff_id = ?",
			[first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id, staff_id]
		);
		res.json(rows);
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
