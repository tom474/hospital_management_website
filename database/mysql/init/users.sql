USE HospitalManagementSystem;

-- Create _noid views for tables with AUTO_INCREMENT columns

-- View for inserting into the Patient table without patient_id
DROP VIEW IF EXISTS Patient_noid;
CREATE VIEW Patient_noid AS 
SELECT 
    first_name, 
    last_name, 
    birth_date, 
    address, 
    phone, 
    email, 
    allergies 
FROM Patient;

-- View for inserting into the Staff table without staff_id
DROP VIEW IF EXISTS Staff_noid;
CREATE VIEW Staff_noid AS 
SELECT 
    first_name, 
    last_name, 
    email, 
    salary, 
    job_type, 
    qualifications, 
    manager_id, 
    department_id 
FROM Staff;

-- View for inserting into the Appointment table without appointment_id
DROP VIEW IF EXISTS Appointment_noid;
CREATE VIEW Appointment_noid AS 
SELECT 
    patient_id, 
    staff_id, 
    date, 
    start_time, 
    end_time, 
    purpose, 
    status 
FROM Appointment;

-- View for inserting into the Treatment table without treatment_id
DROP VIEW IF EXISTS Treatment_noid;
CREATE VIEW Treatment_noid AS 
SELECT 
    patient_id, 
    staff_id, 
    date, 
    description 
FROM Treatment;

-- Creating system_admin role with full access
DROP USER IF EXISTS 'system_admin'@'localhost';
CREATE USER 'system_admin'@'localhost' IDENTIFIED BY '1';
GRANT ALL PRIVILEGES ON HospitalManagementSystem.* TO 'system_admin'@'localhost';

-- Creating roles and assigning privileges
CREATE ROLE doctor_role;
CREATE ROLE nurse_role;
CREATE ROLE receptionist_role;

-- 
-- Admin User Privileges
/*
 The Admin shall be able to:
    - CRUD all system users (admin, doctor, nurse, receptionist): manage user accounts, reset passwords, and assign roles.
    - Manage user roles and permissions: security management including patient data access restrictions.
    - Monitor and log user activities for auditing purposes.
    - Perform database backups, restoration, and optimization tasks.
    - Generate, view, and schedule comprehensive reports.
    - Manage system-wide settings such as appointment durations, department structures, and notifications.

 Summary: The Admin has unlimited CRUD privileges across the entire database, including user management, security management, database operations, and system configuration.
 */
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin123';
GRANT ALL PRIVILEGES ON HospitalManagementSystem.* TO 'admin'@'localhost';

-- 
-- Doctor User Privileges
/*
 The Doctor shall be able to:
    - View patient profiles, medical history, and treatment history.
    - Add and update patient treatments, including uploading diagnostic images and notes.
    - Manage their personal schedule and appointments, ensuring no scheduling conflicts.
    - View the schedules of other staff for coordination.
    - Collaborate with other healthcare providers on patient care.
    - Generate and view reports on their work history and patient treatment history.

 Summary: The Doctor has CRUD privileges on patients, treatments, and appointments. They can view schedules and collaborate with other staff, and generate reports related to their work and patient care.
 */
CREATE USER 'doctor'@'localhost' IDENTIFIED BY 'doctor123';
GRANT doctor_role TO 'doctor'@'localhost';

-- Granting privileges to doctor_role
GRANT SELECT, INSERT, UPDATE ON Patient_noid TO doctor_role; -- Access patient profiles, medical history, and treatments
GRANT SELECT, INSERT, UPDATE ON Treatment_noid TO doctor_role; -- Add and update patient treatments
GRANT SELECT, INSERT, UPDATE, DELETE ON Appointment_noid TO doctor_role; -- Manage appointments, add notes
GRANT SELECT ON Staff TO doctor_role; -- View staff schedules
GRANT SELECT, INSERT, UPDATE ON DocumentReference TO doctor_role; -- Access and manage unstructured data

-- 
-- Nurse User Privileges
/*
 The Nurse shall be able to:
    - View patient profiles and treatment history, with limited access based on their role.
    - Assist in updating patient treatments as directed by doctors.
    - Record and update nursing notes and other relevant unstructured data.
    - View assigned doctors' schedules and assist in managing patient appointments.
    - Coordinate with other nurses and doctors on patient care.
    - Generate and view reports related to patient care and nursing activities.

 Summary: The Nurse has privileges to view and update patient treatments, manage appointments, and assist in patient care documentation. They can view relevant schedules and coordinate with other healthcare providers.
 */
CREATE USER 'nurse'@'localhost' IDENTIFIED BY 'nurse123';
GRANT nurse_role TO 'nurse'@'localhost';

-- Granting privileges to nurse_role
GRANT SELECT ON Patient_noid TO nurse_role; -- View patient profiles and treatment history
GRANT INSERT, UPDATE ON Treatment_noid TO nurse_role; -- Assist in updating patient treatments
GRANT SELECT, INSERT, UPDATE ON Appointment_noid TO nurse_role; -- Assist in managing patient appointments and add notes
GRANT SELECT ON Staff TO nurse_role; -- View staff schedules
GRANT SELECT, INSERT, UPDATE ON DocumentReference TO nurse_role; -- Manage nursing-related unstructured data

-- 
-- Receptionist User Privileges
/*
 The Receptionist shall be able to:
    - Register new patients and update existing patient information.
    - Book, update, or cancel patient appointments, ensuring no double-booking of doctors.
    - View doctors' and other staff schedules to manage appointments efficiently.
    - View and manage their own work schedule.
    - Assist doctors and nurses by managing patient appointment details and schedules.
    - Generate basic reports related to appointment statistics and trends.

 Summary: The Receptionist has CRUD privileges on patients and appointments. They can view schedules, manage appointments, and assist in basic reporting.
 */
CREATE USER 'receptionist'@'localhost' IDENTIFIED BY 'receptionist123';
GRANT receptionist_role TO 'receptionist'@'localhost';

-- Granting privileges to receptionist_role
GRANT SELECT, INSERT, UPDATE ON Patient_noid TO receptionist_role; -- Register new patients and update information
GRANT SELECT, INSERT, UPDATE, DELETE ON Appointment_noid TO receptionist_role; -- Manage appointments, ensure no double-booking
GRANT SELECT ON Staff TO receptionist_role; -- View staff schedules
GRANT SELECT, INSERT, UPDATE ON Schedule TO receptionist_role; -- Manage own schedule and appointment details

-- Restricting INSERT privileges directly on the tables (if not using roles, or as a backup)
REVOKE INSERT ON Patient FROM 'doctor'@'localhost', 'nurse'@'localhost', 'receptionist'@'localhost';
REVOKE INSERT ON Staff FROM 'receptionist'@'localhost';
REVOKE INSERT ON Appointment FROM 'doctor'@'localhost', 'nurse'@'localhost', 'receptionist'@'localhost';
REVOKE INSERT ON Treatment FROM 'doctor'@'localhost', 'nurse'@'localhost';

-- Ensure privileges are properly assigned
FLUSH PRIVILEGES;
