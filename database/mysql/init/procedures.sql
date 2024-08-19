USE HospitalManagementSystem;

-- Procedure to register a new patient
DELIMITER $$
CREATE PROCEDURE RegisterPatient(
    IN first_name VARCHAR(50), 
    IN last_name VARCHAR(50), 
    IN birth_date DATE, 
    IN address VARCHAR(255), 
    IN phone VARCHAR(20), 
    IN email VARCHAR(100), 
    IN allergies VARCHAR(255)
)
BEGIN
    INSERT INTO Patient (first_name, last_name, birth_date, address, phone, email, allergies)
    VALUES (first_name, last_name, birth_date, address, phone, email, allergies);
END $$
DELIMITER ;

-- Procedure to search for a patient by name
DELIMITER $$
CREATE PROCEDURE SearchPatientByName(
    IN search_first_name VARCHAR(50), 
    IN search_last_name VARCHAR(50)
)
BEGIN
    SELECT * FROM Patient
    WHERE first_name LIKE CONCAT('%', search_first_name, '%')
      AND last_name LIKE CONCAT('%', search_last_name, '%');
END $$
DELIMITER ;

-- Procedure to search for a patient by ID
DELIMITER $$
CREATE PROCEDURE SearchPatientByID(
    IN search_patient_id INT
)
BEGIN
    SELECT * FROM Patient
    WHERE patient_id = search_patient_id;
END $$
DELIMITER ;

-- Procedure to add a treatment record
DELIMITER $$
CREATE PROCEDURE AddTreatment(
    IN patient_id INT, 
    IN staff_id INT, 
    IN treatment_date DATE, 
    IN description TEXT
)
BEGIN
    INSERT INTO Treatment (patient_id, staff_id, date, description)
    VALUES (patient_id, staff_id, treatment_date, description);
END $$
DELIMITER ;

-- Procedure to add a custom object (notes, images, etc.) linked with MongoDB
DELIMITER $$
CREATE PROCEDURE AddCustomObject(
    IN entity_type ENUM('Patient', 'Staff', 'Appointment'),
    IN entity_id INT,
    IN document_type VARCHAR(50),
    IN document_id VARCHAR(255),
    IN description TEXT
)
BEGIN
    INSERT INTO DocumentReference (entity_type, entity_id, document_type, document_id, description)
    VALUES (entity_type, entity_id, document_type, document_id, description);
END $$
DELIMITER ;

-- Procedure to add a new staff member
DELIMITER $$
CREATE PROCEDURE AddStaff(
    IN first_name VARCHAR(50), 
    IN last_name VARCHAR(50), 
    IN email VARCHAR(100), 
    IN salary DECIMAL(10, 2), 
    IN job_type VARCHAR(50), 
    IN qualifications VARCHAR(255), 
    IN manager_id INT, 
    IN department_id INT
)
BEGIN
    INSERT INTO Staff (first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id)
    VALUES (first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id);
END $$
DELIMITER ;

-- Procedure to list staff by department
DELIMITER $$
CREATE PROCEDURE ListStaffByDepartment(
    IN department_id INT
)
BEGIN
    SELECT * FROM Staff WHERE department_id = department_id;
END $$
DELIMITER ;

-- Procedure to list staff by name (ascending or descending order)
DELIMITER $$
CREATE PROCEDURE ListStaffByName(
    IN order_direction ENUM('ASC', 'DESC')
)
BEGIN
    SET @sql = CONCAT('SELECT * FROM Staff ORDER BY last_name ', order_direction, ', first_name ', order_direction);
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;

-- Procedure to update staff information
DELIMITER $$
CREATE PROCEDURE UpdateStaffInfo(
    IN staff_id INT,
    IN new_first_name VARCHAR(50),
    IN new_last_name VARCHAR(50),
    IN new_email VARCHAR(100),
    IN new_salary DECIMAL(10, 2),
    IN new_job_type VARCHAR(50),
    IN new_qualifications VARCHAR(255),
    IN new_manager_id INT,
    IN new_department_id INT
)
BEGIN
    DECLARE old_job_type VARCHAR(50);
    DECLARE old_salary DECIMAL(10, 2);
    DECLARE old_department_id INT;

    -- Capture the old job information
    SELECT job_type, salary, department_id INTO old_job_type, old_salary, old_department_id
    FROM Staff WHERE staff_id = staff_id;

    -- Update the staff information
    UPDATE Staff
    SET first_name = new_first_name,
        last_name = new_last_name,
        email = new_email,
        salary = new_salary,
        job_type = new_job_type,
        qualifications = new_qualifications,
        manager_id = new_manager_id,
        department_id = new_department_id
    WHERE staff_id = staff_id;

    -- Insert into JobHistory if job, salary, or department has changed
    IF old_job_type <> new_job_type OR old_salary <> new_salary OR old_department_id <> new_department_id THEN
        INSERT INTO JobHistory (staff_id, change_date, previous_job, new_job, previous_salary, new_salary, previous_dept_id, new_dept_id)
        VALUES (staff_id, CURDATE(), old_job_type, new_job_type, old_salary, new_salary, old_department_id, new_department_id);
    END IF;
END $$
DELIMITER ;

-- Procedure to view staff schedule
DELIMITER $$
CREATE PROCEDURE ViewStaffSchedule(
    IN staff_id INT
)
BEGIN
    SELECT * FROM Schedule WHERE staff_id = staff_id;
END $$
DELIMITER ;

-- Procedure to update staff schedule (handle potential appointment conflicts)
DELIMITER $$
CREATE PROCEDURE UpdateStaffSchedule(
    IN schedule_id INT,
    IN new_start_time TIME,
    IN new_end_time TIME,
    IN new_date DATE
)
BEGIN
    -- Check for conflicts with existing appointments
    DECLARE conflict_count INT;

    SELECT COUNT(*) INTO conflict_count
    FROM Appointment
    WHERE staff_id = (SELECT staff_id FROM Schedule WHERE schedule_id = schedule_id)
      AND date = new_date
      AND ((start_time < new_end_time AND end_time > new_start_time));

    -- If no conflicts, update the schedule
    IF conflict_count = 0 THEN
        UPDATE Schedule
        SET start_time = new_start_time,
            end_time = new_end_time,
            date = new_date
        WHERE schedule_id = schedule_id;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Schedule conflict detected with an existing appointment.';
    END IF;
END $$
DELIMITER ;

-- Procedure to view the working schedule of all doctors for a given duration
DELIMITER $$
CREATE PROCEDURE ViewDoctorsSchedule(
    IN start_date DATE,
    IN end_date DATE
)
BEGIN
    SELECT s.staff_id, CONCAT(s.first_name, ' ', s.last_name) AS doctor_name, sc.date, sc.start_time, sc.end_time,
           IF(EXISTS(SELECT 1 FROM Appointment a WHERE a.staff_id = s.staff_id AND a.date BETWEEN start_date AND end_date), 'Busy', 'Available') AS status
    FROM Staff s
    JOIN Schedule sc ON s.staff_id = sc.staff_id
    WHERE s.job_type = 'Doctor' AND sc.date BETWEEN start_date AND end_date;
END $$
DELIMITER ;

-- Procedure to book an appointment
DELIMITER $$
CREATE PROCEDURE BookAppointment(
    IN patient_id INT, 
    IN staff_id INT, 
    IN appointment_date DATE, 
    IN start_time TIME, 
    IN end_time TIME, 
    IN purpose VARCHAR(255)
)
BEGIN
    DECLARE conflict_count INT;

    -- Check for conflicts with existing appointments
    SELECT COUNT(*) INTO conflict_count
    FROM Appointment
    WHERE staff_id = staff_id
      AND date = appointment_date
      AND ((start_time < end_time AND end_time > start_time));

    -- If no conflicts, insert the appointment
    IF conflict_count = 0 THEN
        INSERT INTO Appointment (patient_id, staff_id, date, start_time, end_time, purpose, status)
        VALUES (patient_id, staff_id, appointment_date, start_time, end_time, purpose, 'Scheduled');
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Appointment conflict detected.';
    END IF;
END $$
DELIMITER ;

-- Procedure to cancel an appointment
DELIMITER $$
CREATE PROCEDURE CancelAppointment(
    IN appointment_id INT
)
BEGIN
    UPDATE Appointment
    SET status = 'Cancelled'
    WHERE appointment_id = appointment_id;
END $$
DELIMITER ;

-- Procedure to add a note to an appointment
DELIMITER $$
CREATE PROCEDURE AddAppointmentNote(
    IN appointment_id INT,
    IN note TEXT
)
BEGIN
    -- Assuming notes are stored in the DocumentReference table with a specific document_type
    INSERT INTO DocumentReference (entity_type, entity_id, document_type, document_id, description)
    VALUES ('Appointment', appointment_id, 'Note', UUID(), note);
END $$
DELIMITER ;

-- Procedure to view a patient's treatment history for a given duration
DELIMITER $$
CREATE PROCEDURE ViewPatientTreatmentHistory(
    IN patient_id INT,
    IN start_date DATE,
    IN end_date DATE
)
BEGIN
    SELECT * FROM Treatment
    WHERE patient_id = patient_id
      AND date BETWEEN start_date AND end_date;
END $$
DELIMITER ;

-- Procedure to view all patient treatments in a given duration
DELIMITER $$
CREATE PROCEDURE ViewAllTreatmentsInDuration(
    IN start_date DATE,
    IN end_date DATE
)
BEGIN
    SELECT * FROM Treatment
    WHERE date BETWEEN start_date AND end_date;
END $$
DELIMITER ;

-- Procedure to view the job change history of a staff member
DELIMITER $$
CREATE PROCEDURE ViewStaffJobHistory(
    IN staff_id INT
)
BEGIN
    SELECT * FROM JobHistory
    WHERE staff_id = staff_id;
END $$
DELIMITER ;

-- Procedure to view the work of a doctor in a given duration
DELIMITER $$
CREATE PROCEDURE ViewDoctorWorkInDuration(
    IN staff_id INT,
    IN start_date DATE,
    IN end_date DATE
)
BEGIN
    SELECT * FROM Appointment
    WHERE staff_id = staff_id
      AND date BETWEEN start_date AND end_date;
END $$
DELIMITER ;

-- Procedure to view the work of all doctors in a given duration
DELIMITER $$
CREATE PROCEDURE ViewAllDoctorsWorkInDuration(
    IN start_date DATE,
    IN end_date DATE
)
BEGIN
    SELECT s.staff_id, CONCAT(s.first_name, ' ', s.last_name) AS doctor_name, COUNT(a.appointment_id) AS total_appointments
    FROM Staff s
    JOIN Appointment a ON s.staff_id = a.staff_id
    WHERE s.job_type = 'Doctor'
      AND a.date BETWEEN start_date AND end_date
    GROUP BY s.staff_id;
END $$
DELIMITER ;
