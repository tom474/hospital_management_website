const mysql = require("mysql2/promise");
const assert = require("assert");

async function main() {
	// Database connection configuration
	const connection = await mysql.createConnection({
		host: "localhost",
		user: "root", // Replace with your MySQL root username
		password: "Pnm@9504", // Replace with your MySQL root password
		database: "HospitalManagementSystem",
	});

	try {
		console.log("Running tests...");

		// 1. Test getAllStaffs Procedure
		let [rows] = await connection.query("CALL getAllStaffs('ASC', NULL);");
		console.log("getAllStaffs result:", rows[0]);
		assert(rows[0].length > 0, "getAllStaffs should return some rows");
		console.log("getAllStaffs passed.");

		// 2. Test getStaffByStaffId Procedure
		[rows] = await connection.query("CALL getStaffByStaffId(1);");
		console.log("getStaffByStaffId result:", rows[0]);
		assert(rows[0].length === 1, "getStaffByStaffId should return exactly one row");
		console.log("getStaffByStaffId passed.");

		// 3. Test createStaff Procedure
		await connection.query(
			"CALL createStaff('Alice', 'Brown', 'alice.brown@hospital.com', 90000.00, 'Nurse', NULL, 1);"
		);
		[rows] = await connection.query("SELECT * FROM Staff WHERE email = 'alice.brown@hospital.com';");
		console.log("createStaff result:", rows);
		assert(rows.length === 1, "createStaff should insert one row");
		console.log("createStaff passed.");

		// 4. Test updateStaff Procedure
		await connection.query(
			"CALL updateStaff(1, 'John', 'Doe', 'john.newdoe@hospital.com', 130000.00, 'Senior Doctor', NULL, 1);"
		);
		[rows] = await connection.query("SELECT * FROM Staff WHERE staff_id = 1;");
		console.log("updateStaff result:", rows[0]);
		assert(rows[0].email === "john.newdoe@hospital.com", "updateStaff should update the email");
		console.log("updateStaff passed.");

		// 5. Test createDocumentReference Procedure
		await connection.query(
			"CALL createDocumentReference('Staff', 1, 'Certification', 'cert_001', 'Advanced Cardiology Certification');"
		);
		[rows] = await connection.query(
			"SELECT * FROM DocumentReference WHERE entity_id = 1 AND entity_type = 'Staff';"
		);
		console.log("createDocumentReference result:", rows);
		assert(rows.length > 0, "createDocumentReference should insert one row");
		console.log("createDocumentReference passed.");

		// 6. Test trg_after_staff_update Trigger (insert into JobHistory)
		await connection.query("UPDATE Staff SET salary = 135000.00 WHERE staff_id = 1;");
		[rows] = await connection.query("SELECT * FROM JobHistory WHERE staff_id = 1 ORDER BY change_date DESC;");
		console.log("trg_after_staff_update result:", rows);
		assert(rows.length > 0, "trg_after_staff_update should log changes in JobHistory");
		console.log("trg_after_staff_update passed.");

		// 7. Test trg_before_schedule_insert Trigger (conflict detection)
		try {
			await connection.query(
				"INSERT INTO Schedule (staff_id, start_time, end_time, date) VALUES (1, '08:00:00', '12:00:00', '2024-08-25');"
			);
			assert.fail("trg_before_schedule_insert should have thrown an error due to schedule conflict");
		} catch (err) {
			console.log("trg_before_schedule_insert error:", err.message);
			if (err.code === "ER_SIGNAL_EXCEPTION") {
				console.log("trg_before_schedule_insert passed.");
			} else {
				console.error("trg_before_schedule_insert failed with unexpected error:", err.message);
				throw err;
			}
		}

		// 8. Test trg_before_staff_delete Trigger (prevent deletion with future appointments)
		try {
			await connection.query("DELETE FROM Staff WHERE staff_id = 1;");
			assert.fail("trg_before_staff_delete should have thrown an error due to future appointments");
		} catch (err) {
			console.log("trg_before_staff_delete error:", err.message);
			if (err.code === "ER_SIGNAL_EXCEPTION") {
				console.log("trg_before_staff_delete passed.");
			} else {
				console.error("trg_before_staff_delete failed with unexpected error:", err.message);
				throw err;
			}
		}

		// 9. Test trg_before_patient_delete Trigger (prevent deletion with future appointments)
		try {
			await connection.query("DELETE FROM Patient WHERE patient_id = 1;");
			assert.fail("trg_before_patient_delete should have thrown an error due to future appointments");
		} catch (err) {
			console.log("trg_before_patient_delete error:", err.message);
			if (err.code === "ER_SIGNAL_EXCEPTION") {
				console.log("trg_before_patient_delete passed.");
			} else {
				console.error("trg_before_patient_delete failed with unexpected error:", err.message);
				throw err;
			}
		}

		console.log("All tests passed.");
	} catch (error) {
		console.error("Test failed:", error.message);
	} finally {
		await connection.end();
	}
}

main().catch(console.error);
