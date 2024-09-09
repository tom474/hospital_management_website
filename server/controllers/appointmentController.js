const database = require("../models/database");
const appointmentDocument =
	require("../../database/mongodb/schemas").appointmentDocument;

// Get all appointments
const getAllAppointments = async (req, res) => {
	try {
		const { start_date, end_date } = req.query;

		if (start_date && end_date) {
			// Get the appointment_id, patient_id, staff_id, date, start_time, end_time, purpose, and status from MySQL
			const [rows] = await database.poolAdmin.query(
				"CALL getAllAppointmentsInDuration(?, ?)",
				[start_date, end_date]
			);

			// Get the notes from MongoDB
			for (let i = 0; i < rows[0].length; i++) {
				const appointmentId = rows[0][i].appointment_id;
				const appointment = await appointmentDocument.findOne({
					appointmentId: appointmentId
				});

				if (appointment) {
					rows[0][i].notes = appointment.notes;
				}
			}
			res.json(rows[0]);
		} else {
			// Get the appointment_id, patient_id, staff_id, date, start_time, end_time, purpose, and status from MySQL
			const [rows] = await database.poolAdmin.query(
				"CALL getAllAppointments"
			);

			// Get the notes from MongoDB
			for (let i = 0; i < rows[0].length; i++) {
				const appointmentId = rows[0][i].appointment_id;
				const appointment = await appointmentDocument.findOne({
					appointmentId: appointmentId
				});

				if (appointment) {
					rows[0][i].notes = appointment.notes;
				}
			}
			res.json(rows[0]);
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get appointment by id
const getAppointmentById = async (req, res) => {
	try {
		const appointment_id = req.params.id;
		// Get the appointment_id, patient_id, staff_id, date, start_time, end_time, purpose, and status from MySQL
		const [rows] = await database.poolAdmin.query(
			"CALL getAppointmentById(?)",
			[appointment_id]
		);

		// Get the notes from MongoDB
		const appointment = await appointmentDocument.findOne({
			appointmentId: appointment_id
		});

		if (appointment) {
			rows[0][0].notes = appointment.notes;
		}
		res.json(rows[0]);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all appointments for a specific patient
const getPatientAppointments = async (req, res) => {
	try {
		const patient_id = req.params.id;
		const { start_date, end_date } = req.query;

		if (start_date && end_date) {
			// Get the appointment_id, patient_id, staff_id, date, start_time, end_time, purpose, and status from MySQL
			const [rows] = await database.poolAdmin.query(
				"CALL getAppointmentsByPatientIdInDuration(?, ?, ?)",
				[patient_id, start_date, end_date]
			);

			// Get the notes from MongoDB
			for (let i = 0; i < rows[0].length; i++) {
				const appointmentId = rows[0][i].appointment_id;
				const appointment = await appointmentDocument.findOne({
					appointmentId: appointmentId
				});

				if (appointment) {
					rows[0][i].notes = appointment.notes;
				}
			}
			res.json(rows[0]);
		} else {
			// Get the appointment_id, patient_id, staff_id, date, start_time, end_time, purpose, and status from MySQL
			const [rows] = await database.poolAdmin.query(
				"CALL getAppointmentsByPatientId(?)",
				[patient_id]
			);

			// Get the notes from MongoDB
			for (let i = 0; i < rows[0].length; i++) {
				const appointmentId = rows[0][i].appointment_id;
				const appointment = await appointmentDocument.findOne({
					appointmentId: appointmentId
				});

				if (appointment) {
					rows[0][i].notes = appointment.notes;
				}
			}
			res.json(rows[0]);
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all appointments for a specific staff
const getStaffAppointments = async (req, res) => {
	try {
		const staff_id = req.params.id;
		const { start_date, end_date } = req.query;

		if (start_date && end_date) {
			// Get the appointment_id, patient_id, staff_id, date, start_time, end_time, purpose, and status from MySQL
			const [rows] = await database.poolAdmin.query(
				"CALL getAppointmentsByStaffIdInDuration(?, ?, ?)",
				[staff_id, start_date, end_date]
			);

			// Get the notes from MongoDB
			for (let i = 0; i < rows[0].length; i++) {
				const appointmentId = rows[0][i].appointment_id;
				const appointment = await appointmentDocument.findOne({
					appointmentId: appointmentId
				});

				if (appointment) {
					rows[0][i].notes = appointment.notes;
				}
			}
			res.json(rows[0]);
		} else {
			// Get the appointment_id, patient_id, staff_id, date, start_time, end_time, purpose, and status from MySQL
			const [rows] = await database.poolAdmin.query(
				"CALL getAppointmentsByStaffId(?)",
				[staff_id]
			);

			// Get the notes from MongoDB
			for (let i = 0; i < rows[0].length; i++) {
				const appointmentId = rows[0][i].appointment_id;
				const appointment = await appointmentDocument.findOne({
					appointmentId: appointmentId
				});

				if (appointment) {
					rows[0][i].notes = appointment.notes;
				}
			}
			res.json(rows[0]);
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Create a new appointment
const createAppointment = async (req, res) => {
	try {
		const {
			patient_id,
			staff_id,
			date,
			start_time,
			end_time,
			purpose,
			notes
		} = req.body;

		// Insert the appointment into MySQL
		const [rows] = await database.poolAdmin.query(
			"CALL createAppointment(?, ?, ?, ?, ?, ?, @result)",
			[patient_id, staff_id, date, start_time, end_time, purpose]
		);
		const [result] = await database.poolAdmin.query("SELECT @result");
		const resultCode = result[0]["@result"];

		if (resultCode === 0) {
			// Get all appointments from MySQL
			const [allRows] = await database.poolAdmin.query(
				"CALL getAllAppointments()"
			);

			// Get the appointment_id of the newly created appointment
			const appointment_id =
				allRows[0][allRows[0].length - 1].appointment_id;

			// Insert the notes into MongoDB
			const newAppointment = new appointmentDocument({
				appointmentId: appointment_id,
				notes: {
					data: notes,
					contentType: "text"
				}
			});
			await newAppointment.save();

			res.status(201).json({
				message: "Appointment created successfully"
			});
		} else if (resultCode === 1) {
			res.status(400).json({
				error: "Patient or Staff does not exist"
			});
		} else if (resultCode === 2) {
			res.status(400).json({
				error: "Invalid argument value"
			});
		} else if (resultCode === 3) {
			res.status(400).json({
				error: "Staff is not available at the specified time"
			});
		} else {
			res.status(500).json({
				error: "Internal server error"
			});
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update an existing appointment
const updateAppointment = async (req, res) => {
	try {
		const appointment_id = req.params.id;
		const { status, notes } = req.body;

		// Update the status in MySQL
		await database.poolAdmin.query(
			"CALL updateAppointment(?, ?, @result)",
			[appointment_id, status]
		);

		const [result] = await database.poolAdmin.query("SELECT @result");
		const resultCode = result[0]["@result"];

		if (resultCode === 0) {
			// Update the notes in MongoDB
			await appointmentDocument.updateOne(
				{ appointmentId: appointment_id },
				{
					notes: {
						data: notes,
						contentType: "text"
					}
				}
			);

			res.json({ message: "Appointment updated successfully" });
		} else if (resultCode === 1) {
			res.status(400).json({ error: "Appointment does not exist" });
		} else {
			res.status(500).json({ error: "Internal server error" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

module.exports = {
	getAllAppointments,
	getAppointmentById,
	getPatientAppointments,
	getStaffAppointments,
	createAppointment,
	updateAppointment
};
