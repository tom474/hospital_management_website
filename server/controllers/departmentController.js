const express = require("express");
const database = require("../models/database");

// Get all departments
const getAllDepartments = async (req, res) => {
	try {
		const [rows] = await database.poolAdmin.query("SELECT * FROM department");
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

// Get department by id
const getDepartmentById = async (req, res) => {
	try {
		const department_id = req.params.id;
		const [rows] = await database.poolAdmin.query("SELECT * FROM department WHERE department_id = ?", [
			department_id,
		]);
		res.json(rows);
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = {
	getAllDepartments,
	getDepartmentById,
};
