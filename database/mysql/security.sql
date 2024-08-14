USE HospitalManagementSystem;

-- Creating system_admin role with full access
CREATE USER 'system_admin'@'localhost' IDENTIFIED BY 'securepassword';
GRANT ALL PRIVILEGES ON HospitalManagementSystem.* TO 'system_admin'@'localhost';

-- Creating roles and users
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'securepassword';
CREATE USER 'doctor'@'localhost' IDENTIFIED BY 'securepassword';
CREATE USER 'nurse'@'localhost' IDENTIFIED BY 'securepassword';
CREATE USER 'receptionist'@'localhost' IDENTIFIED BY 'securepassword';

-- Granting full access to the admin user
GRANT ALL PRIVILEGES ON HospitalManagementSystem.* TO 'admin'@'localhost';

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

-- Assigning realistic privileges

-- Doctors
GRANT SELECT, INSERT, UPDATE ON Patient_noid TO 'doctor'@'localhost';
GRANT SELECT, INSERT, UPDATE ON Treatment_noid TO 'doctor'@'localhost';
GRANT SELECT ON Appointment TO 'doctor'@'localhost';
GRANT INSERT, UPDATE ON Appointment_noid TO 'doctor'@'localhost';
GRANT SELECT ON Staff TO 'doctor'@'localhost';
GRANT SELECT ON DocumentReference TO 'doctor'@'localhost';

-- Nurses
GRANT SELECT, INSERT, UPDATE ON Patient_noid TO 'nurse'@'localhost';
GRANT SELECT, INSERT ON Treatment_noid TO 'nurse'@'localhost';
GRANT SELECT ON Appointment TO 'nurse'@'localhost';
GRANT INSERT ON Appointment_noid TO 'nurse'@'localhost';
GRANT SELECT ON Staff TO 'nurse'@'localhost';
GRANT SELECT ON DocumentReference TO 'nurse'@'localhost';

-- Receptionists
GRANT SELECT, INSERT ON Patient_noid TO 'receptionist'@'localhost';
GRANT SELECT, INSERT ON Appointment_noid TO 'receptionist'@'localhost';
GRANT SELECT ON Staff TO 'receptionist'@'localhost';
GRANT SELECT, INSERT, UPDATE ON Schedule TO 'receptionist'@'localhost';

-- Restricting INSERT privileges to views only
REVOKE INSERT ON Patient FROM 'doctor'@'localhost', 'nurse'@'localhost', 'receptionist'@'localhost';
REVOKE INSERT ON Staff FROM 'receptionist'@'localhost';
REVOKE INSERT ON Appointment FROM 'doctor'@'localhost', 'nurse'@'localhost', 'receptionist'@'localhost';
REVOKE INSERT ON Treatment FROM 'doctor'@'localhost', 'nurse'@'localhost';

-- Ensure privileges are properly assigned
FLUSH PRIVILEGES;
