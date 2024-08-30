USE HospitalManagementSystem;

-- OUT result:
--     -1 on rollback
--     0 on successful commit
--     1 on data not exists or illegal operation
--     2 on illegal argument value



-- Patient Procedures
DROP PROCEDURE IF EXISTS getAllPatients;    
DELIMITER $$
CREATE PROCEDURE getAllPatients()
BEGIN
    SELECT * FROM Patient FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getPatientById;
DELIMITER $$
CREATE PROCEDURE getPatientById(IN p_patient_id INT)
BEGIN
    SELECT * FROM Patient WHERE patient_id = p_patient_id FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS searchPatientsById;
DELIMITER $$
CREATE PROCEDURE searchPatientsById(
    IN p_patient_id VARCHAR(10)
)
BEGIN
    SELECT * FROM Patient
    WHERE patient_id LIKE CONCAT('%', p_patient_id, '%') FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS searchPatientsByName;
DELIMITER $$
CREATE PROCEDURE searchPatientsByName(IN p_name VARCHAR(255))
BEGIN
    SELECT * FROM Patient WHERE first_name LIKE CONCAT('%', p_name, '%') OR last_name LIKE CONCAT('%', p_name, '%') FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS createPatient;
DELIMITER $$
CREATE PROCEDURE createPatient(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_birth_date DATE,
    IN p_address VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_allergies VARCHAR(255),
    OUT p_result INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_result = -1;
    END;

    START TRANSACTION;

    IF p_email IS NULL OR p_phone IS NULL OR p_first_name IS NULL OR p_last_name IS NULL OR p_birth_date IS NULL THEN
        SET p_result = 2;
        ROLLBACK;
    ELSEIF EXISTS (SELECT 1 FROM Patient WHERE email = p_email) THEN
        SET p_result = 1;
        ROLLBACK;
    ELSEIF EXISTS (SELECT 1 FROM Patient WHERE phone = p_phone) THEN
        SET p_result = 1;
        ROLLBACK;
    ELSE
        INSERT INTO Patient (first_name, last_name, birth_date, address, email, phone, allergies)
        VALUES (p_first_name, p_last_name, p_birth_date, p_address, p_email, p_phone, p_allergies);
        
        COMMIT;

        SET p_result = 0;
    END IF;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS updatePatientInformation;
DELIMITER $$
CREATE PROCEDURE updatePatientInformation(
    IN p_patient_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_birth_date DATE,
    IN p_address VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_allergies VARCHAR(255),
    OUT p_result INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_result = -1;
    END;

    START TRANSACTION;
    
    IF (SELECT COUNT(*) FROM Patient WHERE patient_id = p_patient_id) = 0 THEN
        SET p_result = 1;
        ROLLBACK;
    ELSEIF p_email IS NULL OR p_phone IS NULL OR p_first_name IS NULL OR p_last_name IS NULL OR p_birth_date IS NULL THEN
        SET p_result = 2;
        ROLLBACK;
    ELSEIF EXISTS (SELECT 1 FROM Patient WHERE email = p_email AND patient_id != p_patient_id) THEN
        SET p_result = 1;
        ROLLBACK;
    ELSEIF EXISTS (SELECT 1 FROM Patient WHERE phone = p_phone AND patient_id != p_patient_id) THEN
        SET p_result = 1;
        ROLLBACK;
    ELSE
        SELECT * FROM Patient WHERE patient_id = p_patient_id FOR UPDATE;

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

        SET p_result = 0;
        COMMIT;
    END IF;
END $$
DELIMITER ;

-- Appointment Procedures

DROP PROCEDURE IF EXISTS getAllAppointments;
DELIMITER $$
CREATE PROCEDURE getAllAppointments()
BEGIN
    SELECT * FROM Appointment FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllAppointmentsInDuration;
DELIMITER $$
CREATE PROCEDURE getAllAppointmentsInDuration(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT * FROM Appointment
    WHERE date BETWEEN p_start_date AND p_end_date FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAppointmentById;
DELIMITER $$
CREATE PROCEDURE getAppointmentById(
    IN p_appointment_id INT
)
BEGIN
    SELECT * FROM Appointment
    WHERE appointment_id = p_appointment_id FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAppointmentsByPatientId;
DELIMITER $$
CREATE PROCEDURE getAppointmentsByPatientId(
    IN p_patient_id INT
)
BEGIN
    SELECT * FROM Appointment
    WHERE patient_id = p_patient_id FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAppointmentsByPatientIdInDuration;
DELIMITER $$
CREATE PROCEDURE getAppointmentsByPatientIdInDuration(
    IN p_patient_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT * FROM Appointment
    WHERE patient_id = p_patient_id
    AND date BETWEEN p_start_date AND p_end_date FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAppointmentsByStaffId;
DELIMITER $$
CREATE PROCEDURE getAppointmentsByStaffId(
    IN p_staff_id INT
)
BEGIN
    SELECT * FROM Appointment
    WHERE staff_id = p_staff_id FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAppointmentsByStaffIdInDuration;
DELIMITER $$
CREATE PROCEDURE getAppointmentsByStaffIdInDuration(
    IN p_staff_id INT,
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT * FROM Appointment
    WHERE staff_id = p_staff_id
    AND date BETWEEN p_start_date AND p_end_date FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS createAppointment;
DELIMITER $$
CREATE PROCEDURE createAppointment(
    IN p_patient_id INT,
    IN p_staff_id INT,
    IN p_date DATE,
    IN p_start_time TIME,
    IN p_end_time TIME,
    IN p_purpose VARCHAR(255),
    OUT p_result INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_result = -1;
    END;

    START TRANSACTION;
    
    -- Validate the arguments
    IF p_patient_id IS NULL OR p_staff_id IS NULL OR p_date IS NULL OR p_start_time IS NULL OR p_end_time IS NULL OR p_purpose IS NULL THEN
        SET p_result = 2;
        ROLLBACK;
    -- Check if the patient exists
    ELSEIF (SELECT COUNT(*) FROM Patient WHERE patient_id = p_patient_id) = 0 THEN 
        SET p_result = 1;
        ROLLBACK;
    -- Check if the staff exists
    ELSEIF (SELECT COUNT(*) FROM Staff WHERE staff_id = p_staff_id) = 0 THEN
        SET p_result = 1;
        ROLLBACK;
    -- Check for appointment clashes for the same staff
    ELSEIF EXISTS (
        SELECT 1 
        FROM Appointment 
        WHERE staff_id = p_staff_id 
        AND date = p_date 
        AND (
            (p_start_time >= start_time AND p_start_time < end_time) OR
            (p_end_time > start_time AND p_end_time <= end_time) OR
            (p_start_time < start_time AND p_end_time > end_time)
        )
    ) THEN
        SET p_result = 3;
        ROLLBACK;
    -- Check for appointment clashes for the same patient
    ELSEIF EXISTS (
        SELECT 1 
        FROM Appointment 
        WHERE patient_id = p_patient_id 
        AND date = p_date 
        AND (
            (p_start_time >= start_time AND p_start_time < end_time) OR
            (p_end_time > start_time AND p_end_time <= end_time) OR
            (p_start_time < start_time AND p_end_time > end_time)
        )
    ) THEN
        SET p_result = 3;
        ROLLBACK;
    -- Insert the appointment if all checks pass
    ELSE 
        INSERT INTO Appointment (patient_id, staff_id, date, start_time, end_time, purpose)
        VALUES (p_patient_id, p_staff_id, p_date, p_start_time, p_end_time, p_purpose);

        SET p_result = 0;
        COMMIT;
    END IF;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS updateAppointment;
DELIMITER $$
CREATE PROCEDURE updateAppointment(
    IN p_appointment_id INT,
    IN p_status ENUM('Scheduled', 'Completed', 'Cancelled'),
    OUT p_result INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_result = -1;
    END;

    START TRANSACTION;
    -- Check if the appointment exists
    IF (SELECT COUNT(*) FROM Appointment WHERE appointment_id = p_appointment_id) = 0 THEN
        SET p_result = 1;
        ROLLBACK;
    ELSE 
        SELECT * FROM Appointment WHERE appointment_id = p_appointment_id FOR UPDATE;

        UPDATE Appointment
        SET status = p_status
        WHERE appointment_id = p_appointment_id;
        SET p_result = 0;
        COMMIT;
    END IF;
END $$
DELIMITER ;


-- JobHistory Procedures

DROP PROCEDURE IF EXISTS getAllJobHistories;
DELIMITER $$
CREATE PROCEDURE getAllJobHistories()
BEGIN
    SELECT * FROM JobHistory
    ORDER BY change_date DESC FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllJobHistoryByStaffId;
DELIMITER $$
CREATE PROCEDURE getAllJobHistoryByStaffId(IN p_staff_id INT)
BEGIN
    SELECT * FROM JobHistory
    WHERE staff_id = p_staff_id
    ORDER BY change_date DESC FOR SHARE;
END $$
DELIMITER ;

-- Schedule Procedures
DROP PROCEDURE IF EXISTS getAllSchedules;
DELIMITER $$
CREATE PROCEDURE getAllSchedulesByStaffId(IN p_staff_id INT)
BEGIN
    SELECT * FROM Schedule
    WHERE staff_id = p_staff_id FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS addSchedule;
DELIMITER $$
CREATE PROCEDURE addSchedule(
    IN p_staff_id INT,
    IN p_start_time TIME,
    IN p_end_time TIME,
    IN p_date DATE,
    OUT p_result INT
)
BEGIN
    DECLARE schedule_exists INT DEFAULT 0;

    -- Check if there is an overlapping schedule
    SELECT COUNT(*) INTO schedule_exists
    FROM Schedule
    WHERE staff_id = p_staff_id
    AND date = p_date
    AND (
        (p_start_time < end_time AND p_end_time > start_time) 
    );

    IF schedule_exists > 0 THEN
        SET p_result = -1;
        ROLLBACK;

    -- No conflict, insert the new schedule
    ELSE
        INSERT INTO Schedule (staff_id, start_time, end_time, date)
        VALUES (p_staff_id, p_start_time, p_end_time, p_date);
        
        SET p_result = 0;
        COMMIT;
    END IF;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS updateSchedule;
DELIMITER $$
CREATE PROCEDURE updateSchedule(
    IN p_schedule_id INT,
    IN p_staff_id INT,
    IN p_start_time TIME,
    IN p_end_time TIME,
    IN p_date DATE,
    OUT p_result INT
)
updateSchedule:BEGIN
    DECLARE schedule_exists INT DEFAULT 0;
    DECLARE conflict_exists INT DEFAULT 0;
    DECLARE staff_exists INT DEFAULT 0;

    -- Check if the schedule_id exists
    SELECT COUNT(*) INTO schedule_exists
    FROM Schedule
    WHERE schedule_id = p_schedule_id;

    -- Check if the staff exists
    SELECT COUNT(*) INTO staff_exists
    FROM Staff
    WHERE staff_id = p_staff_id;

    IF schedule_exists = 0 THEN
        -- Schedule ID does not exist
        SET p_result = 1;
        ROLLBACK;
        LEAVE updateSchedule;
    END IF;

    IF staff_exists = 0 THEN
        -- Staff ID does not exist
        SET p_result = 1;
        ROLLBACK;
        LEAVE updateSchedule;
    END IF;
    
    -- Check for overlapping schedules excluding the current one
    SELECT COUNT(*) INTO conflict_exists
    FROM Schedule
    WHERE staff_id = p_staff_id
    AND date = p_date
    AND schedule_id != p_schedule_id
    AND (
        (p_start_time < end_time AND p_end_time > start_time) -- Overlaps with existing schedule
    );

    IF conflict_exists > 0 THEN
        SET p_result = -1;
        ROLLBACK;
    ELSE
        SELECT * FROM Schedule WHERE schedule_id = p_schedule_id FOR UPDATE;

        UPDATE Schedule
        SET 
            staff_id = p_staff_id,
            start_time = p_start_time,
            end_time = p_end_time,
            date = p_date
        WHERE 
            schedule_id = p_schedule_id;
        
        -- Indicate successful update
        SET p_result = 0;
        COMMIT;
    END IF;
END $$
DELIMITER ;

-- Treatment Procedures
DROP PROCEDURE IF EXISTS getAllTreatments;
DELIMITER $$
CREATE PROCEDURE getAllTreatments()
BEGIN
    SELECT * FROM Treatment FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllTreatmentsInDuration;
DELIMITER $$
CREATE PROCEDURE getAllTreatmentsInDuration(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    SELECT * FROM Treatment
    WHERE date BETWEEN p_start_date AND p_end_date FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getTreatmentsByPatientId;
DELIMITER $$
CREATE PROCEDURE getTreatmentsByPatientId(
    IN p_patient_id INT
)
BEGIN
    SELECT * FROM Treatment
    WHERE patient_id = p_patient_id FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getTreatmentsByPatientIdInDuration;
DELIMITER $$
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
DELIMITER ;

DELIMITER $$

CREATE PROCEDURE createTreatment(
    IN p_patient_id INT,
    IN p_staff_id INT,
    IN p_date DATE,
    IN p_description VARCHAR(255),
    OUT p_result INT
)
createTreatment:BEGIN
    DECLARE patient_exists INT DEFAULT 0;
    DECLARE staff_exists INT DEFAULT 0;

    -- Check if all inputs are non-null and non-empty
    IF p_patient_id IS NULL OR p_staff_id IS NULL OR p_date IS NULL OR p_description IS NULL OR p_description = '' THEN
        SET p_result = 2;
        LEAVE createTreatment;
    END IF;

    -- Check if the patient exists
    SELECT COUNT(*) INTO patient_exists
    FROM Patient
    WHERE patient_id = p_patient_id;

    IF patient_exists = 0 THEN
        SET p_result = 1;
        LEAVE createTreatment;
    END IF;

    -- Check if the staff exists
    SELECT COUNT(*) INTO staff_exists
    FROM Staff
    WHERE staff_id = p_staff_id;

    IF staff_exists = 0 THEN
        SET p_result = 1;  
        LEAVE createTreatment;
    END IF;

    -- Inserting the treatment record
    START TRANSACTION;

    INSERT INTO Treatment (patient_id, staff_id, date, description)
    VALUES (p_patient_id, p_staff_id, p_date, p_description);

    COMMIT;

    SET p_result = 0;
END $$

DELIMITER ;


-- Department Procedures
DROP PROCEDURE IF EXISTS getAllDepartments;
DELIMITER $$
CREATE PROCEDURE getAllDepartments()
BEGIN
    SELECT * FROM Department FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getDepartmentById;
DELIMITER $$
CREATE PROCEDURE getDepartmentById(
    IN p_department_id INT
)
BEGIN
    SELECT * FROM Department
    WHERE department_id = p_department_id FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getDepartmentByName;
DELIMITER $$
CREATE PROCEDURE getDepartmentByName(
    IN p_department_name VARCHAR(100)
)
BEGIN
    SELECT * FROM Department
    WHERE department_name = p_department_name FOR SHARE;
END $$
DELIMITER ;

-- Staff Procedures
DROP PROCEDURE IF EXISTS getAllStaffs;
DELIMITER $$
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
DELIMITER ;

DROP PROCEDURE IF EXISTS getStaffById;
DELIMITER $$
CREATE PROCEDURE getStaffById(
    IN p_staff_id INT
)
BEGIN
    SELECT * FROM Staff
    WHERE staff_id = p_staff_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS createStaff;
DELIMITER $$
CREATE PROCEDURE createStaff(
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_salary DECIMAL(10, 2),
    IN p_job_type VARCHAR(50),
    IN p_qualifications VARCHAR(255),
    IN p_manager_id INT,
    IN p_department_id INT,
    OUT p_result INT
)
createStaff:BEGIN
    DECLARE email_exists INT DEFAULT 0;
    DECLARE department_exists INT DEFAULT 0;
    START TRANSACTION;

    -- Check for null or empty values (manager_id can be null)
    IF p_first_name IS NULL OR p_last_name IS NULL OR p_email IS NULL OR p_salary IS NULL OR 
        p_job_type IS NULL OR p_qualifications IS NULL OR p_department_id IS NULL OR 
        p_first_name = '' OR p_last_name = '' OR p_email = '' OR p_job_type = '' OR p_qualifications = '' THEN
        SET p_result = 2; 
        ROLLBACK;
        LEAVE createStaff;
    END IF;

    -- Validate job_type
    IF p_job_type NOT IN ('Doctor', 'Nurse', 'Receptionist') THEN
        SET p_result = 2;
        ROLLBACK;
        LEAVE createStaff;
    END IF;

    -- Check if email already exists
    SELECT COUNT(*) INTO email_exists
    FROM Staff
    WHERE email = p_email;

    IF email_exists > 0 THEN
        SET p_result = 1; 
        ROLLBACK;
        LEAVE createStaff;
    END IF;

    -- Check if the department exists
    SELECT COUNT(*) INTO department_exists
    FROM Department
    WHERE department_id = p_department_id;

    IF department_exists = 0 THEN
        SET p_result = 1;
        ROLLBACK;
        LEAVE createStaff;
    END IF;

    -- If all checks pass, insert the new staff record

    INSERT INTO Staff (first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id)
    VALUES (p_first_name, p_last_name, p_email, p_salary, p_job_type, p_qualifications, p_manager_id, p_department_id);

    COMMIT;

    -- Indicate successful insertion
    SET p_result = 0;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS updateStaff;
DELIMITER $$

CREATE PROCEDURE updateStaff(
    IN p_staff_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_salary DECIMAL(10, 2),
    IN p_job_type VARCHAR(50),
    IN p_qualifications VARCHAR(255),
    IN p_manager_id INT,
    IN p_department_id INT,
    OUT p_result INT
)
proc_end:BEGIN
    DECLARE staff_exists INT DEFAULT 0;
    DECLARE email_exists INT DEFAULT 0;
    DECLARE department_exists INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_result = -1;
    END;
    -- Start the transaction
    START TRANSACTION;
    -- Check for null or empty values (manager_id can be null)
    IF p_first_name IS NULL OR p_last_name IS NULL OR p_email IS NULL OR p_salary IS NULL OR 
       p_job_type IS NULL OR p_qualifications IS NULL OR p_department_id IS NULL OR 
       p_first_name = '' OR p_last_name = '' OR p_email = '' OR p_job_type = '' OR p_qualifications = '' THEN
        SET p_result = 2; 
        ROLLBACK;
        LEAVE proc_end;
    END IF;

    -- Validate job_type
    IF p_job_type NOT IN ('Doctor', 'Nurse', 'Receptionist') THEN
        SET p_result = 2;
        ROLLBACK;
        LEAVE proc_end;
    END IF;

    -- Check if the staff_id exists
    SELECT COUNT(*) INTO staff_exists
    FROM Staff
    WHERE staff_id = p_staff_id;

    IF staff_exists = 0 THEN
        SET p_result = 1;  -- Staff ID does not exist
        ROLLBACK;
        LEAVE proc_end;
    END IF;

    -- Check if email already exists for a different staff member
    SELECT COUNT(*) INTO email_exists
    FROM Staff
    WHERE email = p_email AND staff_id != p_staff_id;

    IF email_exists > 0 THEN
        SET p_result = 1;  
        ROLLBACK;
        LEAVE proc_end;
    END IF;

    -- Check if the department exists
    SELECT COUNT(*) INTO department_exists
    FROM Department
    WHERE department_id = p_department_id;

    IF department_exists = 0 THEN
        SET p_result = 1;
        ROLLBACK;
        LEAVE proc_end;
    END IF;

    -- If all checks pass, update the staff record
    SELECT * FROM Staff WHERE staff_id = p_staff_id FOR UPDATE;

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

    SET p_result = 0;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getAvailableStaffsInDuration;
DELIMITER $$
CREATE PROCEDURE getAvailableStaffsInDuration(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

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
        staff_id, date, start_time FOR SHARE;

    -- Drop the temporary table
    DROP TEMPORARY TABLE IF EXISTS TempAvailableSlots;

    COMMIT;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getBusyStaffsInDuration;
DELIMITER $$
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
        a.date, a.start_time FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getWorksInDuration;
DELIMITER $$
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
        date, staff_id FOR SHARE;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS getWorksByStaffIdInDuration;
DELIMITER $$
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
        date, staff_id FOR SHARE;
END $$

DELIMITER ;
