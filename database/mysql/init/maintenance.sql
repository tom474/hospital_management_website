USE HospitalManagementSystem;

-- Archive Old Appointments: Move appointments older than a year to an archive table
DELIMITER $$
CREATE PROCEDURE ArchiveOldAppointments()
BEGIN
    DECLARE archive_cutoff_date DATE;
    SET archive_cutoff_date = DATE_SUB(CURDATE(), INTERVAL 1 YEAR);

    -- Create an archive table if it doesn't exist
    CREATE TABLE IF NOT EXISTS AppointmentArchive LIKE Appointment;

    -- Insert old appointments into the archive table
    INSERT INTO AppointmentArchive
    SELECT * FROM Appointment
    WHERE date < archive_cutoff_date;

    -- Delete the archived appointments from the main Appointment table
    DELETE FROM Appointment
    WHERE date < archive_cutoff_date;
END $$
DELIMITER ;

-- Rebuild Indexes: Rebuilds indexes to optimize query performance
DELIMITER $$
CREATE PROCEDURE RebuildIndexes()
BEGIN
    -- Drop and recreate indexes for the Patient table
    ALTER TABLE Patient DROP INDEX IF EXISTS idx_patient_name;
    ALTER TABLE Patient DROP INDEX IF EXISTS idx_patient_email;
    ALTER TABLE Patient ADD INDEX idx_patient_name (last_name, first_name);
    ALTER TABLE Patient ADD INDEX idx_patient_email (email);

    -- Drop and recreate indexes for the Staff table
    ALTER TABLE Staff DROP INDEX IF EXISTS idx_staff_name;
    ALTER TABLE Staff DROP INDEX IF EXISTS idx_staff_email;
    ALTER TABLE Staff DROP INDEX IF EXISTS idx_staff_job_type;
    ALTER TABLE Staff DROP INDEX IF EXISTS idx_staff_department;
    ALTER TABLE Staff ADD INDEX idx_staff_name (last_name, first_name);
    ALTER TABLE Staff ADD INDEX idx_staff_email (email);
    ALTER TABLE Staff ADD INDEX idx_staff_job_type (job_type);
    ALTER TABLE Staff ADD INDEX idx_staff_department (department_id);

    -- Drop and recreate indexes for the Appointment table
    ALTER TABLE Appointment DROP INDEX IF EXISTS idx_appointment_patient;
    ALTER TABLE Appointment DROP INDEX IF EXISTS idx_appointment_staff;
    ALTER TABLE Appointment DROP INDEX IF EXISTS idx_appointment_date;
    ALTER TABLE Appointment DROP INDEX IF EXISTS idx_appointment_time;
    ALTER TABLE Appointment DROP INDEX IF EXISTS idx_appointment_status;
    ALTER TABLE Appointment ADD INDEX idx_appointment_patient (patient_id);
    ALTER TABLE Appointment ADD INDEX idx_appointment_staff (staff_id);
    ALTER TABLE Appointment ADD INDEX idx_appointment_date (date);
    ALTER TABLE Appointment ADD INDEX idx_appointment_time (start_time, end_time);
    ALTER TABLE Appointment ADD INDEX idx_appointment_status (status);

    -- Drop and recreate indexes for the Treatment table
    ALTER TABLE Treatment DROP INDEX IF EXISTS idx_treatment_patient;
    ALTER TABLE Treatment DROP INDEX IF EXISTS idx_treatment_staff;
    ALTER TABLE Treatment DROP INDEX IF EXISTS idx_treatment_date;
    ALTER TABLE Treatment ADD INDEX idx_treatment_patient (patient_id);
    ALTER TABLE Treatment ADD INDEX idx_treatment_staff (staff_id);
    ALTER TABLE Treatment ADD INDEX idx_treatment_date (date);

    -- Drop and recreate indexes for the DocumentReference table
    ALTER TABLE DocumentReference DROP INDEX IF EXISTS idx_document_reference_entity;
    ALTER TABLE DocumentReference DROP INDEX IF EXISTS idx_document_reference_type;
    ALTER TABLE DocumentReference DROP INDEX IF EXISTS idx_document_reference_id;
    ALTER TABLE DocumentReference ADD INDEX idx_document_reference_entity (entity_type, entity_id);
    ALTER TABLE DocumentReference ADD INDEX idx_document_reference_type (document_type);
    ALTER TABLE DocumentReference ADD INDEX idx_document_reference_id (document_id);
END $$
DELIMITER ;

-- Cleanup Orphaned Document References: Removes document references that no longer link to valid entities
DELIMITER $$
CREATE PROCEDURE CleanupOrphanedDocumentReferences()
BEGIN
    -- Delete orphaned document references related to Patients
    DELETE FROM DocumentReference
    WHERE entity_type = 'Patient'
    AND entity_id NOT IN (SELECT patient_id FROM Patient);

    -- Delete orphaned document references related to Staff
    DELETE FROM DocumentReference
    WHERE entity_type = 'Staff'
    AND entity_id NOT IN (SELECT staff_id FROM Staff);

    -- Delete orphaned document references related to Appointments
    DELETE FROM DocumentReference
    WHERE entity_type = 'Appointment'
    AND entity_id NOT IN (SELECT appointment_id FROM Appointment);
END $$
DELIMITER ;

-- Optimize Tables: Runs the OPTIMIZE TABLE command on all tables to improve performance
DELIMITER $$
CREATE PROCEDURE OptimizeTables()
BEGIN
    -- List of tables to optimize
    DECLARE finished INT DEFAULT 0;
    DECLARE table_name VARCHAR(255);

    -- Cursor to iterate over table names
    DECLARE table_cursor CURSOR FOR
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = DATABASE();

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;

    OPEN table_cursor;

    read_loop: LOOP
        FETCH table_cursor INTO table_name;
        IF finished THEN
            LEAVE read_loop;
        END IF;

        SET @sql = CONCAT('OPTIMIZE TABLE ', table_name);
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END LOOP;

    CLOSE table_cursor;
END $$
DELIMITER ;

-- Schedule Cleanup: Removes old schedules that are no longer needed
DELIMITER $$
CREATE PROCEDURE CleanupOldSchedules()
BEGIN
    DECLARE cutoff_date DATE;
    SET cutoff_date = DATE_SUB(CURDATE(), INTERVAL 6 MONTH);

    -- Delete schedules older than 6 months without future related appointments
    DELETE FROM Schedule
    WHERE date < cutoff_date
    AND staff_id NOT IN (
        SELECT staff_id FROM Appointment WHERE date >= CURDATE()
    );
END $$
DELIMITER ;

-- Archive Old Job History: Move job history records older than a specified number of years to an archive table
DELIMITER $$
CREATE PROCEDURE ArchiveOldJobHistory(IN archive_years INT)
BEGIN
    DECLARE archive_cutoff_date DATE;
    SET archive_cutoff_date = DATE_SUB(CURDATE(), INTERVAL archive_years YEAR);

    -- Create an archive table if it doesn't exist
    CREATE TABLE IF NOT EXISTS JobHistoryArchive LIKE JobHistory;

    -- Insert old job history records into the archive table
    INSERT INTO JobHistoryArchive
    SELECT * FROM JobHistory
    WHERE change_date < archive_cutoff_date;

    -- Delete the archived job history records from the main JobHistory table
    DELETE FROM JobHistory
    WHERE change_date < archive_cutoff_date;
END $$
DELIMITER ;

-- Run all maintenance tasks in sequence
DELIMITER $$
CREATE PROCEDURE RunAllMaintenanceTasks()
BEGIN
    CALL ArchiveOldAppointments();
    CALL RebuildIndexes();
    CALL CleanupOrphanedDocumentReferences();
    CALL OptimizeTables();
    CALL CleanupOldSchedules();
    CALL ArchiveOldJobHistory(5);  -- Adjust the number of years as needed
END $$
DELIMITER ;
