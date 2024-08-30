const database = require("../models/database");
const staffDocument = require("../../database/mongodb/schemas").staffDocument;

// Get all staffs with optional sorting order and department filter
const getAllStaffs = async (req, res) => {
	try {
		const {
			order = "DEFAULT",
			department_id = null,
			job_type = null
		} = req.query;

		// Get staff data from MySQL
		const [rows] = await database.poolAdmin.query(
			"CALL getAllStaffs(?, ?, ?)",
			[order, department_id, job_type]
		);

		// Get the certificate from MongoDB
		for (let i = 0; i < rows[0].length; i++) {
			const staffId = rows[0][i].staff_id;
			const staff = await staffDocument.findOne({ staffId: staffId });

			if (staff) {
				rows[0][i].certificate = staff.certificate;
			}
		}
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get staff by id
const getStaffById = async (req, res) => {
	try {
		const staff_id = req.params.id;

		// Get staff_id, first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id from MySQL
		const [rows] = await database.poolAdmin.query("CALL getStaffById(?)", [
			staff_id
		]);

		// Get the certificate from MongoDB
		const staff = await staffDocument.findOne({ staffId: staff_id });

		if (staff) {
			rows[0][0].certificate = staff.certificate;
		}
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Create a new staff
const createStaff = async (req, res) => {
	try {
		const {
			first_name,
			last_name,
			email,
			salary,
			job_type,
			qualifications,
			manager_id,
			department_id,
			certificate
		} = req.body;

		// Insert staff_id, first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id into MySQL
		const [rows] = await database.poolAdmin.query(
			"CALL createStaff(?, ?, ?, ?, ?, ?, ?, ?, @result)",
			[
				first_name,
				last_name,
				email,
				salary,
				job_type,
				qualifications,
				manager_id,
				department_id
			]
		);

		const [result] = await database.poolAdmin.query("SELECT @result");
		const resultCode = result[0]["@result"];

		if (resultCode === 0) {
			// Get all staffs from MySQL
			const [allStaffs] = await database.poolAdmin.query(
				"CALL getAllStaffs(?, ?, ?)",
				["DEFAULT", null, null]
			);

			// Get the staff_id of the last staff created
			const staff_id = allStaffs[0][allStaffs[0].length - 1].staff_id;

			// Insert staffId, certificate into MongoDB
			const newStaffDocument = new staffDocument({
				staffId: staff_id,
				certificate: { data: certificate, contentType: "base64" }
			});
			await newStaffDocument.save();

			res.json({ message: "Staff created successfully" });
		} else if (resultCode === 1) {
			res.status(400).json({
				error: "Staff already exists with this email"
			});
		} else if (resultCode === 2) {
			res.status(400).json({
				error: "Invalid argument value"
			});
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a staff information
const updateStaff = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const {
			first_name,
			last_name,
			email,
			salary,
			job_type,
			qualifications,
			manager_id,
			department_id,
			certificate
		} = req.body;

		// Update staff_id, first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id in MySQL
		await database.poolAdmin.query(
			"CALL updateStaff(?, ?, ?, ?, ?, ?, ?, ?, ?, @result)",
			[
				staff_id,
				first_name,
				last_name,
				email,
				salary,
				job_type,
				qualifications,
				manager_id,
				department_id
			]
		);

		const [result] = await database.poolAdmin.query("SELECT @result");
		const resultCode = result[0]["@result"];

		if (resultCode === 0) {
			// Update certificate in MongoDB
			await staffDocument.updateOne(
				{ staffId: staff_id },
				{ certificate: { data: certificate, contentType: "base64" } }
			);

			res.json({ message: "Staff updated successfully" });
		} else if (resultCode === 1) {
			res.status(400).json({
				error: "Staff or Department does not exist"
			});
		} else if (resultCode === 2) {
			res.status(400).json({
				error: "Invalid argument value"
			});
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get available staffs in duration
const getAvailableStaffsInDuration = async (req, res) => {
	try {
		const { start_date, end_date } = req.query;

		// Get staff_id, first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id from MySQL
		const [rows] = await database.poolAdmin.query(
			"CALL getAvailableStaffsInDuration(?, ?)",
			[start_date, end_date]
		);

		// Get the certificate from MongoDB
		for (let i = 0; i < rows[0].length; i++) {
			const staffId = rows[0][i].staff_id;
			const staff = await staffDocument.findOne({ staffId: staffId });

			if (staff) {
				rows[0][i].certificate = staff.certificate;
			}
		}
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get busy staffs in duration
const getBusyStaffsInDuration = async (req, res) => {
	try {
		const { start_date, end_date } = req.query;

		// Get staff_id, first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id from MySQL
		const [rows] = await database.poolAdmin.query(
			"CALL getBusyStaffsInDuration(?, ?)",
			[start_date, end_date]
		);

		// Get the certificate from MongoDB
		for (let i = 0; i < rows[0].length; i++) {
			const staffId = rows[0][i].staff_id;
			const staff = await staffDocument.findOne({ staffId: staffId });

			if (staff) {
				rows[0][i].certificate = staff.certificate;
			}
		}
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get works of staffs in duration
const getWorksInDuration = async (req, res) => {
	try {
		const { start_date, end_date } = req.query;
		const [rows] = await database.poolAdmin.query(
			"CALL getWorksInDuration(?, ?)",
			[start_date, end_date]
		);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get works of staffs in duration by staff id
const getWorksByStaffIdInDuration = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const { start_date, end_date } = req.query;
		const [rows] = await database.poolAdmin.query(
			"CALL getWorksByStaffIdInDuration(?, ?, ?)",
			[staff_id, start_date, end_date]
		);
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = {
	getAllStaffs,
	getStaffById,
	createStaff,
	updateStaff,
	getAvailableStaffsInDuration,
	getBusyStaffsInDuration,
	getWorksInDuration,
	getWorksByStaffIdInDuration
};
