CREATE DATABASE IF NOT EXISTS HospitalManagementSystem;
USE HospitalManagementSystem;

-- Create the Patient table
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

-- Create the Staff table
CREATE TABLE IF NOT EXISTS Staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    salary DECIMAL(10, 2) NOT NULL CHECK (salary >= 0),
    job_type VARCHAR(50) NOT NULL,
    qualifications VARCHAR(255),
    manager_id INT,
    department_id INT,
    FOREIGN KEY (manager_id) REFERENCES Staff(staff_id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES Department(department_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Create the Department table
CREATE TABLE IF NOT EXISTS Department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES Staff(staff_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Create the JobHistory table
CREATE TABLE IF NOT EXISTS JobHistory (
    job_history_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT NOT NULL,
    change_date DATE NOT NULL,
    previous_job VARCHAR(100) NOT NULL,
    new_job VARCHAR(100) NOT NULL,
    previous_salary DECIMAL(10, 2) NOT NULL CHECK (previous_salary >= 0),
    new_salary DECIMAL(10, 2) NOT NULL CHECK (new_salary >= 0),
    previous_dept_id INT,
    new_dept_id INT,
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id) ON DELETE CASCADE,
    FOREIGN KEY (previous_dept_id) REFERENCES Department(department_id),
    FOREIGN KEY (new_dept_id) REFERENCES Department(department_id)
) ENGINE=InnoDB;

-- Create the Schedule table
CREATE TABLE IF NOT EXISTS Schedule (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL CHECK (end_time > start_time),
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create the Appointment table
CREATE TABLE IF NOT EXISTS Appointment (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    staff_id INT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL CHECK (end_time > start_time),
    purpose VARCHAR(255) NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Scheduled',
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id) ON DELETE CASCADE,
    CONSTRAINT unique_appointment UNIQUE (staff_id, date, start_time, end_time)
) ENGINE=InnoDB;

-- Create the Treatment table
CREATE TABLE IF NOT EXISTS Treatment (
    treatment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    staff_id INT NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create the DocumentReference table to link with MongoDB
CREATE TABLE IF NOT EXISTS DocumentReference (
    doc_ref_id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('Patient', 'Staff', 'Appointment') NOT NULL,
    entity_id INT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    document_id VARCHAR(255) NOT NULL, -- This stores the unique identifier of the document in MongoDB
    description TEXT,
    FOREIGN KEY (entity_id) REFERENCES Patient(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (entity_id) REFERENCES Staff(staff_id) ON DELETE CASCADE,
    FOREIGN KEY (entity_id) REFERENCES Appointment(appointment_id) ON DELETE CASCADE
) ENGINE=InnoDB;