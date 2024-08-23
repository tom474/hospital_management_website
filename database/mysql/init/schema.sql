-- Create the database
CREATE DATABASE IF NOT EXISTS HospitalManagementSystem;
USE HospitalManagementSystem;

-- Create tables
CREATE TABLE IF NOT EXISTS Patient (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    allergies VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    manager_id INT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    salary DECIMAL(10, 2) NOT NULL CHECK (salary >= 0),
    job_type VARCHAR(50) NOT NULL,
    qualifications VARCHAR(255),
    manager_id INT,
    department_id INT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS JobHistory (
    job_history_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT NOT NULL,
    change_date DATE NOT NULL,
    previous_job VARCHAR(100) NOT NULL,
    new_job VARCHAR(100) NOT NULL,
    previous_salary DECIMAL(10, 2) NOT NULL CHECK (previous_salary >= 0),
    new_salary DECIMAL(10, 2) NOT NULL CHECK (new_salary >= 0),
    previous_dept_id INT,
    new_dept_id INT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Schedule (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    date DATE NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Appointment (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    staff_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    purpose VARCHAR(255) NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Scheduled',
    UNIQUE (staff_id, date, start_time, end_time)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Treatment (
    treatment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    staff_id INT NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS DocumentReference (
    doc_ref_id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('Patient', 'Staff', 'Appointment') NOT NULL,
    entity_id INT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    document_id VARCHAR(255) NOT NULL,
    description TEXT
) ENGINE=InnoDB;

-- Add foreign keys after table creation

ALTER TABLE Staff
ADD CONSTRAINT fk_staff_manager
FOREIGN KEY (manager_id) REFERENCES Staff(staff_id) ON DELETE SET NULL,
ADD CONSTRAINT fk_staff_department
FOREIGN KEY (department_id) REFERENCES Department(department_id) ON DELETE SET NULL;

ALTER TABLE JobHistory
ADD CONSTRAINT fk_jobhistory_staff
FOREIGN KEY (staff_id) REFERENCES Staff(staff_id) ON DELETE CASCADE,
ADD CONSTRAINT fk_jobhistory_prev_dept
FOREIGN KEY (previous_dept_id) REFERENCES Department(department_id),
ADD CONSTRAINT fk_jobhistory_new_dept
FOREIGN KEY (new_dept_id) REFERENCES Department(department_id);

ALTER TABLE Schedule
ADD CONSTRAINT fk_schedule_staff
FOREIGN KEY (staff_id) REFERENCES Staff(staff_id) ON DELETE CASCADE;

ALTER TABLE Appointment
ADD CONSTRAINT fk_appointment_patient
FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) ON DELETE CASCADE,
ADD CONSTRAINT fk_appointment_staff
FOREIGN KEY (staff_id) REFERENCES Staff(staff_id) ON DELETE CASCADE;

ALTER TABLE Treatment
ADD CONSTRAINT fk_treatment_patient
FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) ON DELETE CASCADE,
ADD CONSTRAINT fk_treatment_staff
FOREIGN KEY (staff_id) REFERENCES Staff(staff_id) ON DELETE CASCADE;

ALTER TABLE DocumentReference
ADD CONSTRAINT fk_docref_entity_patient
FOREIGN KEY (entity_id) REFERENCES Patient(patient_id) ON DELETE CASCADE;

-- Note: Foreign key constraints for other entity types in DocumentReference table can be handled similarly based on your data model.