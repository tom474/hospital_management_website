USE HospitalManagementSystem;

DELIMITER $$

-- Patient Procedures

CREATE PROCEDURE getAllPatients()
BEGIN
    SELECT * FROM Patient;
END $$

CREATE PROCEDURE getPatientById(IN p_patient_id INT)
BEGIN
    SELECT * FROM Patient WHERE patient_id = p_patient_id;
END $$

CREATE PROCEDURE searchPatientsById(IN p_patient_id VARCHAR(255))
BEGIN
    SELECT * FROM Patient WHERE CAST(patient_id AS CHAR) LIKE CONCAT('%', p_patient_id, '%');
END $$

CREATE PROCEDURE searchPatientsByName(IN p_name VARCHAR(255))
BEGIN
    SELECT * FROM Patient WHERE first_name LIKE CONCAT('%', p_name, '%') OR last_name LIKE CONCAT('%', p_name, '%');
END $$

CREATE PROCEDURE createPatient(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_birth_date DATE,
    IN p_address VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_allergies VARCHAR(255)
)
BEGIN
    START TRANSACTION;
    INSERT INTO Patient (first_name, last_name, birth_date, address, email, phone, allergies)
    VALUES (p_first_name, p_last_name, p_birth_date, p_address, p_email, p_phone, p_allergies);
    COMMIT;
END $$

CREATE PROCEDURE updatePatientInformation(
    IN p_patient_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_birth_date DATE,
    IN p_address VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_allergies VARCHAR(255)
)
BEGIN
    START TRANSACTION;
    UPDATE Patient
    SET
        first_name = p_first_name,
        last_name = p_last_name,
        birth_date = p_birth_date,
        address = p_address,
        email = p_email,
        phone = p_phone,
        allergies = p_allergies
    WHERE
        patient_id = p_patient_id;
    COMMIT;
END $$

CREATE PROCEDURE deletePatient(IN p_patient_id INT)
BEGIN
    -- Start transaction to ensure data integrity
    START TRANSACTION;
    
    -- Delete any related records from other tables first, if necessary
    DELETE FROM Appointment WHERE patient_id = p_patient_id;
    DELETE FROM Treatment WHERE patient_id = p_patient_id;

    -- Finally, delete the patient record
    DELETE FROM Patient WHERE patient_id = p_patient_id;

    -- Commit the transaction
    COMMIT;
END $$ 

-- Appointment Procedures

CREATE PROCEDURE getAllAppointmentsByPatientId(IN p_patientId INT)
BEGIN
    SELECT * FROM Appointment WHERE patient_id = p_patientId;
END $$

CREATE PROCEDURE getAppointmentByAppointmentId(IN p_appointmentId INT)
BEGIN
    SELECT * FROM Appointment WHERE appointment_id = p_appointmentId;
END $$

CREATE PROCEDURE getAllAppointmentsByStaffId(
    IN p_staffId INT, 
    IN p_date DATE, 
    IN p_startTime TIME, 
    IN p_endTime TIME
)
BEGIN
    IF p_date IS NOT NULL THEN
        SELECT * FROM Appointment 
        WHERE staff_id = p_staffId AND date = p_date
        AND (start_time >= p_startTime OR p_startTime IS NULL)
        AND (end_time <= p_endTime OR p_endTime IS NULL);
    ELSE
        SELECT * FROM Appointment WHERE staff_id = p_staffId;
    END IF;
END $$

CREATE PROCEDURE getWorkingScheduleOfAllDoctorsInDuration(
    IN p_date DATE, 
    IN p_startTime TIME, 
    IN p_endTime TIME, 
    IN p_mode ENUM('available', 'busy')
)
BEGIN
    IF p_mode = 'available' THEN
        SELECT s.staff_id, s.first_name, s.last_name, sch.start_time, sch.end_time 
        FROM Staff s 
        JOIN Schedule sch ON s.staff_id = sch.staff_id 
        WHERE s.job_type = 'Doctor'
        AND sch.date = p_date
        AND sch.start_time >= p_startTime 
        AND sch.end_time <= p_endTime
        AND NOT EXISTS (
            SELECT 1 FROM Appointment a 
            WHERE a.staff_id = s.staff_id 
            AND a.date = p_date
            AND a.start_time >= p_startTime 
            AND a.end_time <= p_endTime
        );
    ELSE
        SELECT s.staff_id, s.first_name, s.last_name, sch.start_time, sch.end_time 
        FROM Staff s 
        JOIN Schedule sch ON s.staff_id = sch.staff_id 
        WHERE s.job_type = 'Doctor'
        AND sch.date = p_date
        AND sch.start_time >= p_startTime 
        AND sch.end_time <= p_endTime
        AND EXISTS (
            SELECT 1 FROM Appointment a 
            WHERE a.staff_id = s.staff_id 
            AND a.date = p_date
            AND a.start_time >= p_startTime 
            AND a.end_time <= p_endTime
        );
    END IF;
END $$

CREATE PROCEDURE getAllAppointmentsInDuration(
    IN p_date DATE, 
    IN p_startTime TIME, 
    IN p_endTime TIME, 
    IN p_mode ENUM('available', 'busy')
)
BEGIN
    IF p_mode = 'available' THEN
        SELECT * FROM Appointment 
        WHERE date = p_date
        AND start_time >= p_startTime 
        AND end_time <= p_endTime
        AND status = 'Scheduled';
    ELSE
        SELECT * FROM Appointment 
        WHERE date = p_date
        AND start_time >= p_startTime 
        AND end_time <= p_endTime
        AND status IN ('Completed', 'Cancelled');
    END IF;
END $$

CREATE PROCEDURE cancelAppointment(IN p_appointmentId INT)
BEGIN
    START TRANSACTION;
    UPDATE Appointment SET status = 'Cancelled' WHERE appointment_id = p_appointmentId;
    COMMIT;
END $$

CREATE PROCEDURE createAppointment(
    IN p_staffId INT,
    IN p_patientId INT,
    IN p_purpose VARCHAR(255),
    IN p_date DATE,
    IN p_startTime TIME,
    IN p_endTime TIME
)
BEGIN
    START TRANSACTION;
    INSERT INTO Appointment (staff_id, patient_id, date, start_time, end_time, purpose)
    VALUES (p_staffId, p_patientId, p_date, p_startTime, p_endTime, p_purpose);
    COMMIT;
END $$

-- JobHistory Procedures

CREATE PROCEDURE getAllJobHistories()
BEGIN
    SELECT * FROM JobHistory;
END $$

CREATE PROCEDURE getAllJobHistoryByStaffId(IN p_staff_id INT)
BEGIN
    SELECT * FROM JobHistory WHERE staff_id = p_staff_id;
END $$

-- Schedule Procedures

CREATE PROCEDURE getAllSchedulesByStaffId(IN p_staff_id INT)
BEGIN
    SELECT * FROM Schedule
    WHERE staff_id = p_staff_id;
END $$

CREATE PROCEDURE addSchedule(
    IN p_staff_id INT,
    IN p_start_time TIME,
    IN p_end_time TIME,
    IN p_date DATE
)
BEGIN
    START TRANSACTION;
    INSERT INTO Schedule (staff_id, start_time, end_time, date)
    VALUES (p_staff_id, p_start_time, p_end_time, p_date);
    COMMIT;
END $$

CREATE PROCEDURE updateSchedule(
    IN p_schedule_id INT,
    IN p_staff_id INT,
    IN p_start_time TIME,
    IN p_end_time TIME,
    IN p_date DATE
)
BEGIN
    START TRANSACTION;
    UPDATE Schedule
    SET 
        staff_id = p_staff_id,
        start_time = p_start_time,
        end_time = p_end_time,
        date = p_date
    WHERE 
        schedule_id = p_schedule_id;
    COMMIT;
END $$

-- Treatment Procedures
CREATE PROCEDURE getAllTreatments()
BEGIN
    SELECT * FROM Treatment;
END $$

CREATE PROCEDURE getAllTreatmentsInDuration(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT * FROM Treatment
    WHERE date BETWEEN p_start_date AND p_end_date;
END $$

CREATE PROCEDURE getAllTreatmentsByPatientId(
    IN p_patient_id INT
)
BEGIN
    SELECT * FROM Treatment
    WHERE patient_id = p_patient_id;
END $$

CREATE PROCEDURE getAllTreatmentsByPatientIdInDuration(
    IN p_patient_id INT,
    IN start_date DATE,
    IN end_date DATE
)
BEGIN
    SELECT * FROM Treatment
    WHERE patient_id = p_patient_id
    AND date BETWEEN start_date AND end_date;
END $$

CREATE PROCEDURE createTreatment(
    IN p_patient_id INT,
    IN p_staff_id INT,
    IN p_date DATE,
    IN p_description VARCHAR(255)
)
BEGIN
    START TRANSACTION;
    INSERT INTO Treatment (patient_id, staff_id, date, description)
    VALUES (p_patient_id, p_staff_id, p_date, p_description);
    COMMIT;
END $$

-- Department Procedures

CREATE PROCEDURE getAllDepartments()
BEGIN
    SELECT * FROM Department;
END $$

CREATE PROCEDURE getDepartmentById(
    IN p_department_id INT
)
BEGIN
    SELECT * FROM Department
    WHERE department_id = p_department_id;
END $$

CREATE PROCEDURE getDepartmentByName(
    IN p_department_name VARCHAR(100)
)
BEGIN
    SELECT * FROM Department
    WHERE department_name = p_department_name;
END $$

-- Staff Procedures

CREATE PROCEDURE getAllStaffs(IN p_order VARCHAR(4), IN p_departmentId INT)
BEGIN
    IF p_departmentId IS NOT NULL THEN
        SET @query = CONCAT(
            'SELECT * FROM Staff WHERE department_id = ', p_departmentId, ' ORDER BY last_name, first_name ', p_order
        );
    ELSE
        SET @query = CONCAT('SELECT * FROM Staff ORDER BY last_name, first_name ', p_order);
    END IF;

    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$

CREATE PROCEDURE getStaffByStaffId(IN p_staffId INT)
BEGIN
    SELECT * FROM Staff WHERE staff_id = p_staffId;
END $$

CREATE PROCEDURE createStaff(
    IN p_firstName VARCHAR(50),
    IN p_lastName VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_salary DECIMAL(10, 2),
    IN p_jobType VARCHAR(50),
    IN p_managerId INT,
    IN p_departmentId INT
)
BEGIN
    START TRANSACTION;
    INSERT INTO Staff (first_name, last_name, email, salary, job_type, manager_id, department_id)
    VALUES (p_firstName, p_lastName, p_email, p_salary, p_jobType, p_managerId, p_departmentId);
    COMMIT;
END $$

CREATE PROCEDURE updateStaff(
    IN p_staffId INT,
    IN p_firstName VARCHAR(50),
    IN p_lastName VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_salary DECIMAL(10, 2),
    IN p_jobType VARCHAR(50),
    IN p_managerId INT,
    IN p_departmentId INT
)
BEGIN
    START TRANSACTION;
    UPDATE Staff
    SET 
        first_name = p_firstName,
        last_name = p_lastName,
        email = p_email,
        salary = p_salary,
        job_type = p_jobType,
        manager_id = p_managerId,
        department_id = p_departmentId
    WHERE 
        staff_id = p_staffId;
    COMMIT;
END $$

DELIMITER ;
