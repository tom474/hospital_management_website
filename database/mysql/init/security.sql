USE HospitalManagementSystem;

-- Creating system_admin role with full access
CREATE USER 'system_admin'@'localhost' IDENTIFIED BY 'UniqueSecurePasswordForAdmin';
GRANT ALL PRIVILEGES ON HospitalManagementSystem.* TO 'system_admin'@'localhost';

-- Creating roles and assigning privileges
CREATE ROLE doctor_role;
CREATE ROLE nurse_role;
CREATE ROLE receptionist_role;

-- Granting privileges to doctor_role
GRANT SELECT, INSERT, UPDATE ON Patient_noid TO doctor_role;
GRANT SELECT, INSERT, UPDATE ON Treatment_noid TO doctor_role;
GRANT SELECT ON Appointment TO doctor_role;
GRANT INSERT, UPDATE ON Appointment_noid TO doctor_role;
GRANT SELECT ON Staff TO doctor_role;
GRANT SELECT ON DocumentReference TO doctor_role;

-- Granting privileges to nurse_role
GRANT SELECT, INSERT, UPDATE ON Patient_noid TO nurse_role;
GRANT SELECT, INSERT ON Treatment_noid TO nurse_role;
GRANT SELECT ON Appointment TO nurse_role;
GRANT INSERT ON Appointment_noid TO nurse_role;
GRANT SELECT ON Staff TO nurse_role;
GRANT SELECT ON DocumentReference TO nurse_role;

-- Granting privileges to receptionist_role
GRANT SELECT, INSERT ON Patient_noid TO receptionist_role;
GRANT SELECT, INSERT ON Appointment_noid TO receptionist_role;
GRANT SELECT ON Staff TO receptionist_role;
GRANT SELECT, INSERT, UPDATE ON Schedule TO receptionist_role;

-- Creating users and assigning roles
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'UniqueSecurePasswordForAdmin';
CREATE USER 'doctor'@'localhost' IDENTIFIED BY 'UniqueSecurePasswordForDoctor';
CREATE USER 'nurse'@'localhost' IDENTIFIED BY 'UniqueSecurePasswordForNurse';
CREATE USER 'receptionist'@'localhost' IDENTIFIED BY 'UniqueSecurePasswordForReceptionist';

-- Assigning full access to the admin user
GRANT ALL PRIVILEGES ON HospitalManagementSystem.* TO 'admin'@'localhost';

-- Assigning roles to the users
GRANT doctor_role TO 'doctor'@'localhost';
GRANT nurse_role TO 'nurse'@'localhost';
GRANT receptionist_role TO 'receptionist'@'localhost';

-- Create _noid views for tables with AUTO_INCREMENT columns

-- View for inserting into the Patient table without patient_id
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
CREATE VIEW Treatment_noid AS 
SELECT 
    patient_id, 
    staff_id, 
    date, 
    description 
FROM Treatment;

-- Restricting INSERT privileges directly on the tables (if not using roles, or as a backup)
REVOKE INSERT ON Patient FROM 'doctor'@'localhost', 'nurse'@'localhost', 'receptionist'@'localhost';
REVOKE INSERT ON Staff FROM 'receptionist'@'localhost';
REVOKE INSERT ON Appointment FROM 'doctor'@'localhost', 'nurse'@'localhost', 'receptionist'@'localhost';
REVOKE INSERT ON Treatment FROM 'doctor'@'localhost', 'nurse'@'localhost';

-- Ensure privileges are properly assigned
FLUSH PRIVILEGES;
