USE HospitalManagementSystem;

-- ======================================
-- 1. Admin Procedures
-- ======================================

-- 1.1 Create a New User
CREATE PROCEDURE CreateUser(
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(100),
    IN p_role VARCHAR(20)
)
BEGIN
    DECLARE role_assigned BOOLEAN DEFAULT FALSE;
    DECLARE stmt VARCHAR(255);

    IF p_role = 'admin' THEN
        SET stmt = CONCAT("CREATE USER '", p_username, "'@'localhost' IDENTIFIED BY '", p_password, "';");
        PREPARE userStmt FROM stmt;
        EXECUTE userStmt;
        DEALLOCATE PREPARE userStmt;
        
        SET stmt = CONCAT("GRANT ALL PRIVILEGES ON HospitalManagementSystem.* TO '", p_username, "'@'localhost';");
        PREPARE grantStmt FROM stmt;
        EXECUTE grantStmt;
        DEALLOCATE PREPARE grantStmt;
        
        SET role_assigned = TRUE;

    ELSEIF p_role = 'doctor' THEN
        SET stmt = CONCAT("CREATE USER '", p_username, "'@'localhost' IDENTIFIED BY '", p_password, "';");
        PREPARE userStmt FROM stmt;
        EXECUTE userStmt;
        DEALLOCATE PREPARE userStmt;
        
        SET stmt = CONCAT("GRANT doctor_role TO '", p_username, "'@'localhost';");
        PREPARE grantStmt FROM stmt;
        EXECUTE grantStmt;
        DEALLOCATE PREPARE grantStmt;
        
        SET role_assigned = TRUE;

    ELSEIF p_role = 'nurse' THEN
        SET stmt = CONCAT("CREATE USER '", p_username, "'@'localhost' IDENTIFIED BY '", p_password, "';");
        PREPARE userStmt FROM stmt;
        EXECUTE userStmt;
        DEALLOCATE PREPARE userStmt;
        
        SET stmt = CONCAT("GRANT nurse_role TO '", p_username, "'@'localhost';");
        PREPARE grantStmt FROM stmt;
        EXECUTE grantStmt;
        DEALLOCATE PREPARE grantStmt;
        
        SET role_assigned = TRUE;

    ELSEIF p_role = 'receptionist' THEN
        SET stmt = CONCAT("CREATE USER '", p_username, "'@'localhost' IDENTIFIED BY '", p_password, "';");
        PREPARE userStmt FROM stmt;
        EXECUTE userStmt;
        DEALLOCATE PREPARE userStmt;
        
        SET stmt = CONCAT("GRANT receptionist_role TO '", p_username, "'@'localhost';");
        PREPARE grantStmt FROM stmt;
        EXECUTE grantStmt;
        DEALLOCATE PREPARE grantStmt;
        
        SET role_assigned = TRUE;

    ELSE
        SET role_assigned = FALSE;
    END IF;

    IF role_assigned = FALSE THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid role specified';
    END IF;

    FLUSH PRIVILEGES;
END;

-- 1.2 Update Staff Job Information
CREATE PROCEDURE UpdateStaffJobInfo(
    IN p_staff_id INT,
    IN p_new_job VARCHAR(100),
    IN p_new_salary DECIMAL(10, 2),
    IN p_new_department_id INT
)
BEGIN
    DECLARE v_previous_job VARCHAR(100);
    DECLARE v_previous_salary DECIMAL(10, 2);
    DECLARE v_previous_dept_id INT;

    SELECT job_type, salary, department_id INTO v_previous_job, v_previous_salary, v_previous_dept_id
    FROM Staff
    WHERE staff_id = p_staff_id;

    -- Insert job history record
    INSERT INTO JobHistory (
        staff_id, 
        change_date, 
        previous_job, 
        new_job, 
        previous_salary, 
        new_salary, 
        previous_dept_id, 
        new_dept_id
    ) 
    VALUES (
        p_staff_id, 
        CURDATE(), 
        v_previous_job, 
        p_new_job, 
        v_previous_salary, 
        p_new_salary, 
        v_previous_dept_id, 
        p_new_department_id
    );

    -- Update the Staff table with new job information
    UPDATE Staff 
    SET job_type = p_new_job, salary = p_new_salary, department_id = p_new_department_id
    WHERE staff_id = p_staff_id;
END;

-- ======================================
-- 2. Doctor Procedures
-- ======================================

-- 2.1 Add a New Patient Treatment
CREATE PROCEDURE AddPatientTreatment(
    IN p_patient_id INT,
    IN p_staff_id INT,
    IN p_description TEXT
)
BEGIN
    INSERT INTO Treatment (patient_id, staff_id, date, description)
    VALUES (p_patient_id, p_staff_id, CURDATE(), p_description);
END;

-- 2.2 Book an Appointment with Transaction
CREATE PROCEDURE BookAppointment(
    IN p_patient_id INT,
    IN p_staff_id INT,
    IN p_date DATE,
    IN p_start_time TIME,
    IN p_end_time TIME,
    IN p_purpose VARCHAR(255)
)
BEGIN
    DECLARE conflict_count INT DEFAULT 0;

    START TRANSACTION;

    -- Check for scheduling conflicts
    SELECT COUNT(*) INTO conflict_count
    FROM Appointment
    WHERE staff_id = p_staff_id 
    AND date = p_date 
    AND (
        (start_time < p_end_time AND start_time >= p_start_time) OR
        (end_time > p_start_time AND end_time <= p_end_time)
    );

    IF conflict_count > 0 THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Scheduling conflict detected';
    ELSE
        -- Insert the new appointment
        INSERT INTO Appointment (patient_id, staff_id, date, start_time, end_time, purpose)
        VALUES (p_patient_id, p_staff_id, p_date, p_start_time, p_end_time, p_purpose);

        COMMIT;
    END IF;
END;

-- ======================================
-- 3. Nurse Procedures
-- ======================================

-- 3.1 Add Nursing Notes
CREATE PROCEDURE AddNursingNote(
    IN p_treatment_id INT,
    IN p_nurse_id INT,
    IN p_note TEXT
)
BEGIN
    INSERT INTO DocumentReference (entity_type, entity_id, document_type, document_id, description)
    VALUES ('Treatment', p_treatment_id, 'NursingNote', CONCAT('Note_', UUID()), p_note);
END;

-- ======================================
-- 4. Receptionist Procedures
-- ======================================

-- 4.1 Register a New Patient
CREATE PROCEDURE RegisterPatient(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_birth_date DATE,
    IN p_address VARCHAR(255),
    IN p_phone VARCHAR(20),
    IN p_email VARCHAR(100),
    IN p_allergies VARCHAR(255)
)
BEGIN
    INSERT INTO Patient (first_name, last_name, birth_date, address, phone, email, allergies)
    VALUES (p_first_name, p_last_name, p_birth_date, p_address, p_phone, p_email, p_allergies);
END;

-- 4.2 Manage Appointments (Update or Cancel)
CREATE PROCEDURE UpdateAppointment(
    IN p_appointment_id INT,
    IN p_new_date DATE,
    IN p_new_start_time TIME,
    IN p_new_end_time TIME,
    IN p_new_purpose VARCHAR(255),
    IN p_status VARCHAR(20)
)
BEGIN
    UPDATE Appointment 
    SET date = p_new_date, start_time = p_new_start_time, end_time = p_new_end_time, purpose = p_new_purpose, status = p_status
    WHERE appointment_id = p_appointment_id;
END;

-- ======================================
-- 5. General Procedures for Appointments
-- ======================================

-- Get All Appointments
CREATE PROCEDURE GetAllAppointments()
BEGIN
    SELECT * FROM Appointment;
END;

-- Get Appointment by ID
CREATE PROCEDURE GetAppointmentById(IN p_appointment_id INT)
BEGIN
    SELECT * FROM Appointment WHERE appointment_id = p_appointment_id;
END;

-- Get All Appointments for a Specific Patient
CREATE PROCEDURE GetPatientAppointments(IN p_patient_id INT)
BEGIN
    SELECT * FROM Appointment WHERE patient_id = p_patient_id;
END;

-- Get All Appointments for a Specific Staff
CREATE PROCEDURE GetStaffAppointments(IN p_staff_id INT)
BEGIN
    SELECT * FROM Appointment WHERE staff_id = p_staff_id;
END;

-- Get Appointments in a Specific Duration
CREATE PROCEDURE GetAppointmentsInDuration(
    IN p_date DATE, 
    IN p_start_time TIME, 
    IN p_end_time TIME
)
BEGIN
    SELECT * FROM Appointment 
    WHERE date = p_date 
      AND start_time >= p_start_time 
      AND end_time <= p_end_time;
END;

-- Cancel an Appointment
CREATE PROCEDURE CancelAppointment(IN p_appointment_id INT)
BEGIN
    UPDATE Appointment 
    SET status = 'Cancelled' 
    WHERE appointment_id = p_appointment_id;
END;

-- ======================================
-- 6. Department Procedures
-- ======================================

-- Procedure to get all departments
CREATE PROCEDURE GetAllDepartments()
BEGIN
    SELECT * FROM Department;
END;

-- Procedure to get a department by ID
CREATE PROCEDURE GetDepartmentById(IN p_department_id INT)
BEGIN
    SELECT * FROM Department WHERE department_id = p_department_id;
END;

-- ======================================
-- 7. Job History Procedures
-- ======================================

-- Procedure to get all job histories by staff id
CREATE PROCEDURE GetJobHistoriesByStaffId(IN p_staff_id INT)
BEGIN
    SELECT * FROM JobHistory WHERE staff_id = p_staff_id;
END;

-- ======================================
-- 8. Patient Procedures
-- ======================================

-- Procedure to get all patients
CREATE PROCEDURE GetAllPatients()
BEGIN
    SELECT * FROM Patient;
END;

-- Procedure to get a patient by ID
CREATE PROCEDURE GetPatientById(IN p_patient_id INT)
BEGIN
    SELECT * FROM Patient WHERE patient_id = p_patient_id;
END;

-- Procedure to get patients by name (search by first or last name)
CREATE PROCEDURE GetPatientByName(IN p_search_name VARCHAR(50))
BEGIN
    SELECT * FROM Patient 
    WHERE first_name LIKE p_search_name OR last_name LIKE p_search_name;
END;

-- Procedure to create a new patient
CREATE PROCEDURE CreatePatient(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_birth_date DATE,
    IN p_address VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_allergies VARCHAR(255)
)
BEGIN
    INSERT INTO Patient (first_name, last_name, birth_date, address, email, phone, allergies)
    VALUES (p_first_name, p_last_name, p_birth_date, p_address, p_email, p_phone, p_allergies);
END;

-- Procedure to update a patient's information
CREATE PROCEDURE UpdatePatient(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_birth_date DATE,
    IN p_address VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_allergies VARCHAR(255),
    IN p_patient_id INT
)
BEGIN
    UPDATE Patient 
    SET first_name = p_first_name, 
        last_name = p_last_name, 
        birth_date = p_birth_date, 
        address = p_address, 
        email = p_email, 
        phone = p_phone, 
        allergies = p_allergies
    WHERE patient_id = p_patient_id;
END;

-- Procedure to delete a patient
CREATE PROCEDURE DeletePatient(IN p_patient_id INT)
BEGIN
    DELETE FROM Patient WHERE patient_id = p_patient_id;
END;

-- ======================================
-- 9. Schedule Procedures
-- ======================================

-- Procedure to get schedules by staff id
CREATE PROCEDURE GetSchedulesByStaffId(IN p_staff_id INT)
BEGIN
    SELECT * FROM Schedule WHERE staff_id = p_staff_id;
END;

-- Procedure to add a new schedule
CREATE PROCEDURE AddSchedule(
    IN p_staff_id INT, 
    IN p_start_time TIME, 
    IN p_end_time TIME, 
    IN p_day_of_week VARCHAR(20)
)
BEGIN
    INSERT INTO Schedule (staff_id, start_time, end_time, day_of_week, is_booked)
    VALUES (p_staff_id, p_start_time, p_end_time, p_day_of_week, FALSE);
END;

-- Procedure to update a schedule
CREATE PROCEDURE UpdateSchedule(
    IN p_schedule_id INT,
    IN p_staff_id INT, 
    IN p_start_time TIME, 
    IN p_end_time TIME, 
    IN p_day_of_week VARCHAR(20)
)
BEGIN
    UPDATE Schedule 
    SET staff_id = p_staff_id, 
        start_time = p_start_time, 
        end_time = p_end_time, 
        day_of_week = p_day_of_week 
    WHERE schedule_id = p_schedule_id;
END;

-- Procedure to get staff available time based on their schedule and appointments
CREATE PROCEDURE GetStaffAvailableTime(
    IN p_staff_id INT,
    IN p_date DATE
)
BEGIN
    DECLARE v_start_time TIME;
    DECLARE v_end_time TIME;

    -- Temporary table to hold available time slots
    CREATE TEMPORARY TABLE AvailableTimes (
        start_time TIME,
        end_time TIME
    );

    -- Get the working schedule for the staff member on the specified date
    SELECT start_time, end_time INTO v_start_time, v_end_time
    FROM Schedule
    WHERE staff_id = p_staff_id
    AND date = p_date;

    -- Insert the entire working period initially as an available slot
    INSERT INTO AvailableTimes (start_time, end_time)
    VALUES (v_start_time, v_end_time);

    -- Iterate over the appointments for the day and adjust available times
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur_start_time, cur_end_time TIME;
    DECLARE appointment_cursor CURSOR FOR
        SELECT start_time, end_time
        FROM Appointment
        WHERE staff_id = p_staff_id
        AND date = p_date;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN appointment_cursor;
    read_loop: LOOP
        FETCH appointment_cursor INTO cur_start_time, cur_end_time;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Remove the time occupied by this appointment
        DELETE FROM AvailableTimes
        WHERE start_time < cur_end_time AND end_time > cur_start_time;

        -- Add available time before the appointment
        IF cur_start_time > v_start_time THEN
            INSERT INTO AvailableTimes (start_time, end_time)
            VALUES (v_start_time, cur_start_time);
        END IF;

        -- Update start time to the end of the current appointment
        SET v_start_time = cur_end_time;
    END LOOP;

    CLOSE appointment_cursor;

    -- Select and return the available time slots
    SELECT * FROM AvailableTimes;

    -- Drop the temporary table
    DROP TEMPORARY TABLE AvailableTimes;
END;

-- ======================================
-- 10. Treatment Procedures
-- ======================================

-- Procedure to get treatment by patient id
CREATE PROCEDURE GetTreatmentByPatientId(IN p_patient_id INT)
BEGIN
    SELECT * FROM Treatment WHERE patient_id = p_patient_id;
END;

-- Procedure to get treatments by date
CREATE PROCEDURE GetTreatmentByDate(IN p_date DATE)
BEGIN
    SELECT * FROM Treatment WHERE date = p_date;
END;

-- Procedure to get treatment by patient id and date
CREATE PROCEDURE GetTreatmentByPatientIdAndDate(IN p_patient_id INT, IN p_date DATE)
BEGIN
    SELECT * FROM Treatment WHERE patient_id = p_patient_id AND date = p_date;
END;

-- Procedure to create a new treatment
CREATE PROCEDURE CreateTreatment(
    IN p_patient_id INT,
    IN p_staff_id INT,
    IN p_date DATE,
    IN p_description TEXT
)
BEGIN
    INSERT INTO Treatment (patient_id, staff_id, date, description)
    VALUES (p_patient_id, p_staff_id, p_date, p_description);
END;

-- ======================================
-- 11. Report Functions
-- ======================================

-- 11.1 View Patient Treatment History
CREATE FUNCTION GetPatientTreatmentHistory(
    p_patient_id INT,
    p_start_date DATE,
    p_end_date DATE
)
RETURNS TABLE
RETURN
    SELECT * 
    FROM Treatment
    WHERE patient_id = p_patient_id 
    AND date BETWEEN p_start_date AND p_end_date;

-- 11.2 View Doctor Work History
CREATE FUNCTION GetDoctorWorkHistory(
    p_staff_id INT,
    p_start_date DATE,
    p_end_date DATE
)
RETURNS TABLE
RETURN
    SELECT 
        'Appointment' AS type, 
        patient_id, 
        date, 
        start_time, 
        end_time, 
        purpose 
    FROM Appointment 
    WHERE staff_id = p_staff_id 
    AND date BETWEEN p_start_date AND p_end_date
    UNION
    SELECT 
        'Treatment' AS type, 
        patient_id, 
        date, 
        NULL AS start_time, 
        NULL AS end_time, 
        description AS purpose 
    FROM Treatment 
    WHERE staff_id = p_staff_id 
    AND date BETWEEN p_start_date AND p_end_date;
