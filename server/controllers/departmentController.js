const express = require("express");
const database = require("../models/database");

// Get all departments
const getAllDepartments = async (req, res) => {
	try {
		const [rows] = await database.poolAdmin.query("CALL GetAllDepartments()");
		res.json(rows[0]); // The result from a CALL to a procedure is nested in an array
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get department by id
const getDepartmentById = async (req, res) => {
	try {
		const department_id = req.params.id;
		const [rows] = await database.poolAdmin.query("CALL GetDepartmentById(?)", [
			department_id,
		]);
		res.json(rows[0]); // Assuming only one department is returned
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = {
	getAllDepartments,
	getDepartmentById,
};
