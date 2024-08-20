USE HospitalManagementSystem;

-- Trigger to automatically log job changes in the JobHistory table
CREATE TRIGGER trg_after_staff_update
AFTER UPDATE ON Staff
FOR EACH ROW
BEGIN
    -- Check if job type, salary, or department has changed
    IF OLD.job_type <> NEW.job_type OR OLD.salary <> NEW.salary OR OLD.department_id <> NEW.department_id THEN
        INSERT INTO JobHistory (staff_id, change_date, previous_job, new_job, previous_salary, new_salary, previous_dept_id, new_dept_id)
        VALUES (OLD.staff_id, CURDATE(), OLD.job_type, NEW.job_type, OLD.salary, NEW.salary, OLD.department_id, NEW.department_id);
    END IF;
END;

-- Trigger to automatically update the appointment status to 'Completed' after the end time has passed
CREATE TRIGGER trg_after_appointment_update
AFTER UPDATE ON Appointment
FOR EACH ROW
BEGIN
    IF NEW.status = 'Scheduled' AND NOW() > CONCAT(NEW.date, ' ', NEW.end_time) THEN
        UPDATE Appointment
        SET status = 'Completed'
        WHERE appointment_id = NEW.appointment_id;
    END IF;
END;

-- Trigger to prevent overlapping schedules for the same staff member on insert
CREATE TRIGGER trg_before_schedule_insert
BEFORE INSERT ON Schedule
FOR EACH ROW
BEGIN
    DECLARE conflict_count INT;

    SELECT COUNT(*) INTO conflict_count
    FROM Schedule
    WHERE staff_id = NEW.staff_id
      AND date = NEW.date
      AND (start_time < NEW.end_time AND end_time > NEW.start_time);

    IF conflict_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Schedule conflict detected with an existing schedule.';
    END IF;
END;

-- Trigger to prevent overlapping schedules for the same staff member on update
CREATE TRIGGER trg_before_schedule_update
BEFORE UPDATE ON Schedule
FOR EACH ROW
BEGIN
    DECLARE conflict_count INT;

    SELECT COUNT(*) INTO conflict_count
    FROM Schedule
    WHERE staff_id = NEW.staff_id
      AND date = NEW.date
      AND schedule_id <> OLD.schedule_id
      AND (start_time < NEW.end_time AND end_time > NEW.start_time);

    IF conflict_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Schedule conflict detected with an existing schedule.';
    END IF;
END;

-- Trigger to prevent deletion of a staff member if they have future appointments
CREATE TRIGGER trg_before_staff_delete
BEFORE DELETE ON Staff
FOR EACH ROW
BEGIN
    DECLARE future_appointments_count INT;

    SELECT COUNT(*) INTO future_appointments_count
    FROM Appointment
    WHERE staff_id = OLD.staff_id
      AND date >= CURDATE()
      AND status = 'Scheduled';

    IF future_appointments_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete staff member with future scheduled appointments.';
    END IF;
END;

-- Trigger to prevent deletion of a patient if they have future appointments
CREATE TRIGGER trg_before_patient_delete
BEFORE DELETE ON Patient
FOR EACH ROW
BEGIN
    DECLARE future_appointments_count INT;

    SELECT COUNT(*) INTO future_appointments_count
    FROM Appointment
    WHERE patient_id = OLD.patient_id
      AND date >= CURDATE()
      AND status = 'Scheduled';

    IF future_appointments_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete patient with future scheduled appointments.';
    END IF;
END;

-- Trigger to automatically update the appointment status to 'Completed' after the end time has passed upon insertion
CREATE TRIGGER trg_after_appointment_insert
AFTER INSERT ON Appointment
FOR EACH ROW
BEGIN
    IF NEW.status = 'Scheduled' AND NOW() > CONCAT(NEW.date, ' ', NEW.end_time) THEN
        UPDATE Appointment
        SET status = 'Completed'
        WHERE appointment_id = NEW.appointment_id;
    END IF;
END;

-- Trigger to automatically cancel appointments when a staff member is updated and is no longer available
CREATE TRIGGER trg_after_staff_update_for_appointments
AFTER UPDATE ON Staff
FOR EACH ROW
BEGIN
    IF OLD.department_id <> NEW.department_id OR OLD.job_type <> NEW.job_type THEN
        UPDATE Appointment
        SET status = 'Cancelled'
        WHERE staff_id = OLD.staff_id
          AND status = 'Scheduled'
          AND date >= CURDATE();
    END IF;
END;
