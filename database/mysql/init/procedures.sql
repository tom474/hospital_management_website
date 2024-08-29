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

CREATE PROCEDURE searchPatientsById(
    IN p_patient_id VARCHAR(10)
)
BEGIN
    SELECT * FROM Patient
    WHERE patient_id LIKE CONCAT('%', p_patient_id, '%');
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

CREATE PROCEDURE getAllAppointments()
BEGIN
    SELECT * FROM Appointment;
END $$

CREATE PROCEDURE getAllAppointmentsInDuration(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT * FROM Appointment
    WHERE date BETWEEN p_start_date AND p_end_date;
END $$

CREATE PROCEDURE getAppointmentById(
    IN p_appointment_id INT
)
BEGIN
    SELECT * FROM Appointment
    WHERE appointment_id = p_appointment_id;
END $$

CREATE PROCEDURE getAppointmentsByPatientId(
    IN p_patient_id INT
)
BEGIN
    SELECT * FROM Appointment
    WHERE patient_id = p_patient_id;
END $$

CREATE PROCEDURE getAppointmentsByPatientIdInDuration(
    IN p_patient_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT * FROM Appointment
    WHERE patient_id = p_patient_id
    AND date BETWEEN p_start_date AND p_end_date;
END $$

CREATE PROCEDURE getAppointmentsByStaffId(
    IN p_staff_id INT
)
BEGIN
    SELECT * FROM Appointment
    WHERE staff_id = p_staff_id;
END $$

CREATE PROCEDURE getAppointmentsByStaffIdInDuration(
    IN p_staff_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT * FROM Appointment
    WHERE staff_id = p_staff_id
    AND date BETWEEN p_start_date AND p_end_date;
END $$

CREATE PROCEDURE createAppointment(
    IN p_patient_id INT,
    IN p_staff_id INT,
    IN p_date DATE,
    IN p_start_time TIME,
    IN p_end_time TIME,
    IN p_purpose VARCHAR(255)
)
BEGIN
    START TRANSACTION;
    INSERT INTO Appointment (patient_id, staff_id, date, start_time, end_time, purpose)
    VALUES (p_patient_id, p_staff_id, p_date, p_start_time, p_end_time, p_purpose);
    COMMIT;
END $$

CREATE PROCEDURE updateAppointment(
    IN p_appointment_id INT,
    IN p_status ENUM('Scheduled', 'Completed', 'Cancelled')
)
BEGIN
    START TRANSACTION;
    UPDATE Appointment
    SET 
        status = p_status
    WHERE 
        appointment_id = p_appointment_id;
    COMMIT;
END $$

-- JobHistory Procedures

CREATE PROCEDURE getAllJobHistories()
BEGIN
    SELECT * FROM JobHistory
    ORDER BY change_date DESC;
END $$

CREATE PROCEDURE getAllJobHistoryByStaffId(IN p_staff_id INT)
BEGIN
    SELECT * FROM JobHistory
    WHERE staff_id = p_staff_id
    ORDER BY change_date DESC;
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

CREATE PROCEDURE getTreatmentsByPatientId(
    IN p_patient_id INT
)
BEGIN
    SELECT * FROM Treatment
    WHERE patient_id = p_patient_id;
END $$

CREATE PROCEDURE getTreatmentsByPatientIdInDuration(
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

CREATE PROCEDURE getAllStaffs(
    IN p_order VARCHAR(7),
    IN p_department_id INT,
    IN p_job_type VARCHAR(50)
)
BEGIN
    SET @query = 'SELECT * FROM Staff';
    
    SET @whereClause = ' WHERE 1=1';
    
    IF p_department_id IS NOT NULL THEN
        SET @whereClause = CONCAT(@whereClause, ' AND department_id = ', p_department_id);
    END IF;
    
    IF p_job_type IS NOT NULL THEN
        SET @whereClause = CONCAT(@whereClause, ' AND job_type = ''', p_job_type, '''');
    END IF;
    
    SET @query = CONCAT(@query, @whereClause);
    
    IF p_order = 'ASC' THEN
        SET @query = CONCAT(@query, ' ORDER BY first_name ASC, last_name ASC');
    ELSEIF p_order = 'DESC' THEN
        SET @query = CONCAT(@query, ' ORDER BY first_name DESC, last_name DESC');
    END IF;
    
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$

CREATE PROCEDURE getStaffById(
    IN p_staff_id INT
)
BEGIN
    SELECT * FROM Staff
    WHERE staff_id = p_staff_id;
END $$

CREATE PROCEDURE createStaff(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_salary DECIMAL(10, 2),
    IN p_job_type VARCHAR(50),
    IN p_qualifications VARCHAR(255),
    IN p_manager_id INT,
    IN p_department_id INT
)
BEGIN
    START TRANSACTION;
    INSERT INTO Staff (first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id)
    VALUES (p_first_name, p_last_name, p_email, p_salary, p_job_type, p_qualifications, p_manager_id, p_department_id);
    COMMIT;
END $$

CREATE PROCEDURE updateStaff(
    IN p_staff_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_salary DECIMAL(10, 2),
    IN p_job_type VARCHAR(50),
    IN p_qualifications VARCHAR(255),
    IN p_manager_id INT,
    IN p_department_id INT
)
BEGIN
    START TRANSACTION;
    UPDATE Staff
    SET 
        first_name = p_first_name,
        last_name = p_last_name,
        email = p_email,
        salary = p_salary,
        job_type = p_job_type,
        qualifications = p_qualifications,
        manager_id = p_manager_id,
        department_id = p_department_id
    WHERE 
        staff_id = p_staff_id;
    COMMIT;
END $$

CREATE PROCEDURE getAvailableStaffsInDuration(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    -- Temporary table for storing intermediate results
    CREATE TEMPORARY TABLE TempAvailableSlots (
        staff_id INT,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100),
        job_type VARCHAR(50),
        department_name VARCHAR(100),
        date DATE,
        start_time TIME,
        end_time TIME
    );

    -- Insert the initial slots before the first appointment or full schedule if no appointments
    INSERT INTO TempAvailableSlots (staff_id, first_name, last_name, email, job_type, department_name, date, start_time, end_time)
    SELECT 
        staff_id,
        first_name,
        last_name,
        email,
        job_type,
        department_name,
        date,
        schedule_start_time AS start_time,
        IFNULL(MIN(appointment_start_time), schedule_end_time) AS end_time
    FROM 
        StaffScheduleWithAppointments
    WHERE 
        date BETWEEN p_start_date AND p_end_date
    GROUP BY 
        staff_id, first_name, last_name, email, job_type, department_name, date, schedule_start_time, schedule_end_time;

    -- Insert the slots between appointments
    INSERT INTO TempAvailableSlots (staff_id, first_name, last_name, email, job_type, department_name, date, start_time, end_time)
    SELECT 
        staff_id,
        first_name,
        last_name,
        email,
        job_type,
        department_name,
        date,
        appointment_end_time AS start_time,
        LEAD(appointment_start_time, 1, schedule_end_time) OVER (PARTITION BY staff_id, date ORDER BY appointment_start_time) AS end_time
    FROM 
        StaffScheduleWithAppointments
    WHERE 
        date BETWEEN p_start_date AND p_end_date
        AND appointment_start_time IS NOT NULL;

    -- Remove any invalid slots (where start_time >= end_time)
    DELETE FROM TempAvailableSlots
    WHERE 
        start_time >= end_time;

    -- Return the available slots for all staff
    SELECT 
        staff_id,
        first_name,
        last_name,
        email,
        job_type,
        department_name,
        date,
        start_time,
        end_time
    FROM 
        TempAvailableSlots
    ORDER BY 
        staff_id, date, start_time;

    -- Drop the temporary table
    DROP TEMPORARY TABLE IF EXISTS TempAvailableSlots;
END $$

CREATE PROCEDURE getBusyStaffsInDuration(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT 
        a.staff_id,
        st.first_name,
        st.last_name,
        st.email,
        st.job_type,
        d.department_name,
        a.date,
        a.start_time,
        a.end_time,
        a.purpose,
        a.status
    FROM 
        Appointment a
    INNER JOIN 
        Staff st ON a.staff_id = st.staff_id
    INNER JOIN 
        Department d ON st.department_id = d.department_id
    WHERE 
        a.date BETWEEN p_start_date AND p_end_date
    ORDER BY 
        a.date, a.start_time;
END $$

CREATE PROCEDURE getWorksInDuration(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    -- Select appointments within the given date range
    SELECT 
        a.staff_id,
        st.first_name AS staff_first_name,
        st.last_name AS staff_last_name,
        p.patient_id,
        p.first_name AS patient_first_name,
        p.last_name AS patient_last_name,
        a.date,
        CONCAT('Appointment: ', a.purpose) AS work_description
    FROM 
        Appointment a
    INNER JOIN 
        Staff st ON a.staff_id = st.staff_id
    INNER JOIN 
        Patient p ON a.patient_id = p.patient_id
    WHERE 
        a.date BETWEEN p_start_date AND p_end_date
    
    UNION ALL
    
    -- Select treatments within the given date range
    SELECT 
        t.staff_id,
        st.first_name AS staff_first_name,
        st.last_name AS staff_last_name,
        p.patient_id,
        p.first_name AS patient_first_name,
        p.last_name AS patient_last_name,
        t.date,
        CONCAT('Treatment: ', t.description) AS work_description
    FROM 
        Treatment t
    INNER JOIN 
        Staff st ON t.staff_id = st.staff_id
    INNER JOIN 
        Patient p ON t.patient_id = p.patient_id
    WHERE 
        t.date BETWEEN p_start_date AND p_end_date
    
    ORDER BY 
        date, staff_id;
END $$

CREATE PROCEDURE getWorksByStaffIdInDuration(
    IN p_staff_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    -- Select appointments for the specific staff within the given date range
    SELECT 
        a.staff_id,
        st.first_name AS staff_first_name,
        st.last_name AS staff_last_name,
        p.patient_id,
        p.first_name AS patient_first_name,
        p.last_name AS patient_last_name,
        a.date,
        CONCAT('Appointment: ', a.purpose) AS work_description
    FROM 
        Appointment a
    INNER JOIN 
        Staff st ON a.staff_id = st.staff_id
    INNER JOIN 
        Patient p ON a.patient_id = p.patient_id
    WHERE 
        a.staff_id = p_staff_id
        AND a.date BETWEEN p_start_date AND p_end_date
    
    UNION ALL
    
    -- Select treatments for the specific staff within the given date range
    SELECT 
        t.staff_id,
        st.first_name AS staff_first_name,
        st.last_name AS staff_last_name,
        p.patient_id,
        p.first_name AS patient_first_name,
        p.last_name AS patient_last_name,
        t.date,
        CONCAT('Treatment: ', t.description) AS work_description
    FROM 
        Treatment t
    INNER JOIN 
        Staff st ON t.staff_id = st.staff_id
    INNER JOIN 
        Patient p ON t.patient_id = p.patient_id
    WHERE 
        t.staff_id = p_staff_id
        AND t.date BETWEEN p_start_date AND p_end_date
    
    ORDER BY 
        date, staff_id;
END $$

DELIMITER ;
