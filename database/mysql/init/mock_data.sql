USE HospitalManagementSystem;

-- Insert mock data into the Department table
INSERT INTO Department (department_name, manager_id) VALUES
('Cardiology', NULL),
('Neurology', NULL),
('Pediatrics', NULL),
('Orthopedics', NULL),
('General Surgery', NULL);

-- Insert mock data into the Staff table
INSERT INTO Staff (first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id) VALUES
('John', 'Doe', 'john.doe@hospital.com', 120000.00, 'Doctor', 'MD, Cardiology', NULL, 1),
('Jane', 'Smith', 'jane.smith@hospital.com', 115000.00, 'Doctor', 'MD, Neurology', NULL, 2),
('Sarah', 'Johnson', 'sarah.johnson@hospital.com', 90000.00, 'Nurse', 'RN', NULL, 1),
('Michael', 'Brown', 'michael.brown@hospital.com', 95000.00, 'Nurse', 'RN', NULL, 3),
('Emily', 'Davis', 'emily.davis@hospital.com', 80000.00, 'Administrative', 'MBA, Hospital Management', NULL, 5),
('Chris', 'Taylor', 'chris.taylor@hospital.com', 130000.00, 'Doctor', 'MD, Pediatrics', NULL, 3);

-- Update the Department table with manager IDs
UPDATE Department SET manager_id = 1 WHERE department_id = 1;
UPDATE Department SET manager_id = 2 WHERE department_id = 2;
UPDATE Department SET manager_id = 6 WHERE department_id = 3;

-- Insert mock data into the JobHistory table
INSERT INTO JobHistory (staff_id, change_date, previous_job, new_job, previous_salary, new_salary, previous_dept_id, new_dept_id) VALUES
(1, '2022-01-01', 'Resident Doctor', 'Doctor', 90000.00, 120000.00, NULL, 1),
(2, '2021-06-15', 'Assistant Doctor', 'Doctor', 80000.00, 115000.00, NULL, 2),
(3, '2023-03-10', 'Nurse', 'Head Nurse', 85000.00, 90000.00, NULL, 1),
(6, '2020-09-01', 'Pediatrician', 'Chief Pediatrician', 110000.00, 130000.00, 3, 3);

-- Insert mock data into the Schedule table
INSERT INTO Schedule (staff_id, start_time, end_time, day_of_week, is_booked) VALUES
(1, '08:00:00', '16:00:00', 'Monday', FALSE),
(1, '08:00:00', '16:00:00', 'Wednesday', FALSE),
(2, '10:00:00', '18:00:00', 'Tuesday', FALSE),
(3, '08:00:00', '14:00:00', 'Friday', FALSE),
(4, '09:00:00', '17:00:00', 'Monday', TRUE),
(6, '07:00:00', '15:00:00', 'Thursday', FALSE);

-- Insert mock data into the Patient table
INSERT INTO Patient (first_name, last_name, birth_date, address, phone, email, allergies) VALUES
('James', 'Wilson', '1985-04-12', '123 Elm Street', '555-1234', 'james.wilson@example.com', 'Penicillin'),
('Mary', 'Johnson', '1992-07-22', '456 Oak Avenue', '555-5678', 'mary.johnson@example.com', 'None'),
('Robert', 'Smith', '1978-03-30', '789 Pine Road', '555-9012', 'robert.smith@example.com', 'Aspirin'),
('Patricia', 'Brown', '2000-11-15', '321 Maple Lane', '555-3456', 'patricia.brown@example.com', 'None'),
('Linda', 'Davis', '1968-05-08', '654 Cedar Court', '555-7890', 'linda.davis@example.com', 'Peanuts');

-- Insert mock data into the Appointment table
INSERT INTO Appointment (patient_id, staff_id, date, start_time, end_time, purpose, status) VALUES
(1, 1, '2023-08-10', '09:00:00', '09:30:00', 'Routine Checkup', 'Completed'),
(2, 2, '2023-08-12', '11:00:00', '11:45:00', 'Neurology Consultation', 'Completed'),
(3, 3, '2023-08-15', '14:00:00', '14:30:00', 'Follow-up Visit', 'Scheduled'),
(4, 6, '2023-08-20', '10:00:00', '10:30:00', 'Pediatric Checkup', 'Scheduled'),
(5, 1, '2023-08-25', '13:00:00', '13:30:00', 'Cardiology Consultation', 'Cancelled');

-- Insert mock data into the Treatment table
INSERT INTO Treatment (patient_id, staff_id, date, description) VALUES
(1, 1, '2023-08-10', 'Routine checkup; all vital signs normal.'),
(2, 2, '2023-08-12', 'Neurology consultation; patient reports migraines. MRI recommended.'),
(3, 3, '2023-08-15', 'Follow-up visit; healing well after surgery.'),
(4, 6, '2023-08-20', 'Pediatric checkup; patient in good health, vaccinations updated.'),
(5, 1, '2023-08-25', 'Cardiology consultation; ECG showed normal results.');

-- Insert mock data into the DocumentReference table
INSERT INTO DocumentReference (entity_type, entity_id, document_type, document_id, description) VALUES
('Patient', 1, 'Doctor Note', 'doc_001', 'Routine checkup note.'),
('Patient', 2, 'Lab Result', 'doc_002', 'MRI results showing no abnormalities.'),
('Appointment', 3, 'Doctor Note', 'doc_003', 'Follow-up visit note.'),
('Staff', 4, 'Certificate', 'doc_004', 'Pediatric Advanced Life Support certification.'),
('Patient', 5, 'Diagnostic Image', 'doc_005', 'ECG image.');

