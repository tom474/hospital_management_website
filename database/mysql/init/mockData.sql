-- Use the HospitalManagementSystem database
USE HospitalManagementSystem;

-- Start a transaction to ensure data integrity
START TRANSACTION;

-- Disable triggers temporarily to prevent unintended side effects during data insertion
SET @DISABLE_TRIGGERS = TRUE;

-- Insert mock data into the Department table
INSERT INTO Department (department_name, manager_id) VALUES
    ('Cardiology', NULL),
    ('Neurology', NULL),
    ('Pediatrics', NULL),
    ('Orthopedics', NULL),
    ('General Surgery', NULL),
    ('Dermatology', NULL),
    ('Oncology', NULL),
    ('Radiology', NULL);

-- Insert mock data into the Staff table
INSERT INTO Staff (first_name, last_name, email, salary, job_type, qualifications, manager_id, department_id) VALUES
    ('John', 'Doe', 'john.doe@hospital.com', 120000.00, 'Doctor', 'MD, Cardiology', NULL, 1),
    ('Jane', 'Smith', 'jane.smith@hospital.com', 115000.00, 'Doctor', 'MD, Neurology', NULL, 2),
    ('Sarah', 'Johnson', 'sarah.johnson@hospital.com', 90000.00, 'Nurse', 'RN', NULL, 1),
    ('Michael', 'Brown', 'michael.brown@hospital.com', 95000.00, 'Nurse', 'RN', NULL, 3),
    ('Emily', 'Davis', 'emily.davis@hospital.com', 80000.00, 'Administrative', 'MBA, Hospital Management', NULL, 5),
    ('Chris', 'Taylor', 'chris.taylor@hospital.com', 130000.00, 'Doctor', 'MD, Pediatrics', NULL, 3),
    ('Laura', 'Wilson', 'laura.wilson@hospital.com', 125000.00, 'Doctor', 'MD, Oncology', NULL, 7),
    ('David', 'Anderson', 'david.anderson@hospital.com', 110000.00, 'Doctor', 'MD, Radiology', NULL, 8),
    ('Sophia', 'Moore', 'sophia.moore@hospital.com', 95000.00, 'Nurse', 'RN', NULL, 7),
    ('Daniel', 'Clark', 'daniel.clark@hospital.com', 90000.00, 'Nurse', 'RN', NULL, 8),
    ('Olivia', 'Martin', 'olivia.martin@hospital.com', 85000.00, 'Nurse', 'RN', NULL, 3),
    ('Ethan', 'Walker', 'ethan.walker@hospital.com', 140000.00, 'Doctor', 'MD, General Surgery', NULL, 2),
    ('Mia', 'White', 'mia.white@hospital.com', 120000.00, 'Doctor', 'MD, Dermatology', NULL, 5),
    ('Noah', 'Harris', 'noah.harris@hospital.com', 130000.00, 'Doctor', 'MD, Orthopedics', NULL, 4),
    ('Isabella', 'Robinson', 'isabella.robinson@hospital.com', 85000.00, 'Nurse', 'RN', NULL, 2),
    ('Liam', 'Lewis', 'liam.lewis@hospital.com', 150000.00, 'Doctor', 'MD, Cardiology', NULL, 1),
    ('Ava', 'Young', 'ava.young@hospital.com', 75000.00, 'Administrative', 'BS, Healthcare Admin', NULL, 3),
    ('William', 'King', 'william.king@hospital.com', 160000.00, 'Doctor', 'MD, Neurology', NULL, 6),
    ('Emily', 'Hall', 'emily.hall@hospital.com', 78000.00, 'Administrative', 'MBA, Healthcare Admin', NULL, 2),
    ('James', 'Allen', 'james.allen@hospital.com', 98000.00, 'Nurse', 'RN', NULL, 7),
    ('Amelia', 'Wright', 'amelia.wright@hospital.com', 102000.00, 'Nurse', 'RN', NULL, 1),
    ('Lucas', 'Scott', 'lucas.scott@hospital.com', 145000.00, 'Doctor', 'MD, Urology', NULL, 4),
    ('Charlotte', 'Torres', 'charlotte.torres@hospital.com', 76000.00, 'Administrative', 'BS, Business Admin', NULL, 5),
    ('Benjamin', 'Carter', 'benjamin.carter@hospital.com', 135000.00, 'Doctor', 'MD, Gastroenterology', NULL, 6),
    ('Abigail', 'Mitchell', 'abigail.mitchell@hospital.com', 92000.00, 'Nurse', 'RN', NULL, 2),
    ('Henry', 'Perez', 'henry.perez@hospital.com', 94000.00, 'Nurse', 'RN', NULL, 3),
    ('Grace', 'Roberts', 'grace.roberts@hospital.com', 115000.00, 'Doctor', 'MD, Endocrinology', NULL, 2),
    ('Mason', 'Edwards', 'mason.edwards@hospital.com', 128000.00, 'Doctor', 'MD, Pulmonology', NULL, 4),
    ('Ella', 'Collins', 'ella.collins@hospital.com', 80000.00, 'Nurse', 'RN', NULL, 5),
    ('Alexander', 'Stewart', 'alexander.stewart@hospital.com', 138000.00, 'Doctor', 'MD, Neurology', NULL, 7);


-- Update the Department table with manager IDs
UPDATE Department SET manager_id = 1 WHERE department_id = 1;
UPDATE Department SET manager_id = 2 WHERE department_id = 2;
UPDATE Department SET manager_id = 6 WHERE department_id = 3;
UPDATE Department SET manager_id = 7 WHERE department_id = 7;
UPDATE Department SET manager_id = 8 WHERE department_id = 8;

-- Insert mock data into the JobHistory table
INSERT INTO JobHistory (staff_id, change_date, previous_job, new_job, previous_salary, new_salary, previous_dept_id, new_dept_id) VALUES
    (1, '2022-01-01', 'Nurse', 'Doctor', 90000.00, 120000.00, NULL, 1),
    (2, '2021-06-15', 'Nurse', 'Receptionist', 80000.00, 115000.00, NULL, 2),
    (3, '2024-03-10', 'Doctor', 'Nurse', 85000.00, 90000.00, NULL, 1),
    (6, '2020-09-01', 'Nurse', 'Doctor', 110000.00, 130000.00, 3, 3),
    (7, '2022-02-20', 'Doctor', 'Nurse', 115000.00, 125000.00, 7, 7),
    (8, '2021-11-01', 'Receptionist', 'Nurse', 105000.00, 110000.00, 8, 8);

-- Insert mock data into the Schedule table
INSERT INTO Schedule (staff_id, start_time, end_time, date) VALUES
    (1, '08:00:00', '17:00:00', '2024-08-10'),
    (1, '08:00:00', '17:00:00', '2024-08-16'),
    (2, '08:00:00', '17:00:00', '2024-08-30'),
    (3, '18:00:00', '02:00:00', '2024-08-30'),
    (4, '08:00:00', '17:00:00', '2024-08-31'),
    (5, '18:00:00', '02:00:00', '2024-08-31'),
    (6, '08:00:00', '17:00:00', '2024-09-01'),
    (7, '18:00:00', '02:00:00', '2024-09-01'),
    (8, '08:00:00', '17:00:00', '2024-09-02'),
    (9, '18:00:00', '02:00:00', '2024-09-02'),
    (10, '08:00:00', '17:00:00', '2024-09-03'),
    (11, '18:00:00', '02:00:00', '2024-09-03'),
    (12, '08:00:00', '17:00:00', '2024-09-04'),
    (13, '18:00:00', '02:00:00', '2024-09-04'),
    (2, '08:00:00', '17:00:00', '2024-08-15'),
    (3, '08:00:00', '17:00:00', '2024-08-15'),
    (4, '08:00:00', '17:00:00', '2024-08-14'),
    (6, '18:00:00', '02:00:00', '2024-08-17'),
    (7, '18:00:00', '02:00:00', '2024-08-14'),
    (8, '18:00:00', '02:00:00', '2024-08-16'),
    (9, '08:00:00', '17:00:00', '2024-08-18'),
    (10, '18:00:00', '02:00:00', '2024-08-15'),
    (11, '08:00:00', '17:00:00', '2024-08-20'),
    (12, '18:00:00', '02:00:00', '2024-08-20'),
    (13, '08:00:00', '17:00:00', '2024-08-21'),
    (14, '18:00:00', '02:00:00', '2024-08-21'),
    (15, '08:00:00', '17:00:00', '2024-08-22'),
    (16, '18:00:00', '02:00:00', '2024-08-22'),
    (17, '08:00:00', '17:00:00', '2024-08-23'),
    (18, '18:00:00', '02:00:00', '2024-08-23'),
    (19, '08:00:00', '17:00:00', '2024-08-24'),
    (20, '18:00:00', '02:00:00', '2024-08-24'),
    (21, '08:00:00', '17:00:00', '2024-08-25'),
    (22, '18:00:00', '02:00:00', '2024-08-25'),
    (23, '08:00:00', '17:00:00', '2024-08-26'),
    (24, '18:00:00', '02:00:00', '2024-08-26'),
    (25, '08:00:00', '17:00:00', '2024-08-27'),
    (26, '18:00:00', '02:00:00', '2024-08-27'),
    (27, '08:00:00', '17:00:00', '2024-08-28'),
    (28, '18:00:00', '02:00:00', '2024-08-28'),
    (29, '08:00:00', '17:00:00', '2024-08-29'),
    (30, '18:00:00', '02:00:00', '2024-08-29');

-- Insert mock data into the Patient table
INSERT INTO Patient (first_name, last_name, birth_date, address, phone, email, allergies) VALUES
    ('James', 'Wilson', '1985-04-12', '123 Elm Street', '0902123245', 'james.wilson@example.com', 'Penicillin'),
    ('Mary', 'Johnson', '1992-07-22', '456 Oak Avenue', '090321452', 'mary.johnson@example.com', 'None'),
    ('Robert', 'Smith', '1978-03-30', '789 Pine Road', '0907423281', 'robert.smith@example.com', 'Aspirin'),
    ('Patricia', 'Brown', '2000-11-15', '321 Maple Lane', '0904835301', 'patricia.brown@example.com', 'None'),
    ('Linda', 'Davis', '1968-05-08', '654 Cedar Court', '090321245', 'linda.davis@example.com', 'Peanuts'),
    ('Michael', 'Scott', '1980-06-15', '124 Birch Street', '0902126434', 'michael.scott@example.com', 'Gluten'),
    ('Angela', 'Martin', '1972-09-18', '998 Spruce Avenue', '0925486428', 'angela.martin@example.com', 'None'),
    ('Dwight', 'Schrute', '1970-01-20', '172 Beet Farm Road', '090145653', 'dwight.schrute@example.com', 'None'),
    ('Pam', 'Beesly', '1979-03-25', '84 Dunder Way', '0901254252', 'pam.beesly@example.com', 'None'),
    ('Jim', 'Halpert', '1978-10-01', '243 Branch Lane', '0906582123', 'jim.halpert@example.com', 'None'),
    ('Kevin', 'Malone', '1972-06-01', '515 Ice Cream Lane', '0902145554', 'kevin.malone@example.com', 'Lactose'),
    ('Kelly', 'Kapoor', '1984-02-05', '999 Fashion Ave', '0903154772', 'kelly.kapoor@example.com', 'None'),
    ('Ryan', 'Howard', '1982-01-10', '101 Temp Street', '0901256347', 'ryan.howard@example.com', 'None'),
    ('Stanley', 'Hudson', '1958-02-19', '88 Pretzel Way', '0902186493', 'stanley.hudson@example.com', 'None'),
    ('Phyllis', 'Vance', '1961-07-12', '24 Bob Avenue', '0903257865', 'phyllis.vance@example.com', 'None'),
    ('Oscar', 'Martinez', '1973-11-20', '202 Accounting St', '0904178291', 'oscar.martinez@example.com', 'None'),
    ('Toby', 'Flenderson', '1969-09-22', '303 HR Lane', '0905486374', 'toby.flenderson@example.com', 'None'),
    ('Meredith', 'Palmer', '1965-12-11', '67 Supplier Ave', '0904129875', 'meredith.palmer@example.com', 'Alcohol'),
    ('Creed', 'Bratton', '1943-11-01', '412 Strange St', '0906582987', 'creed.bratton@example.com', 'None'),
    ('Jan', 'Levinson', '1967-04-15', '753 Corporate Way', '0902147586', 'jan.levinson@example.com', 'None');

-- Insert mock data into the Appointment table
INSERT INTO Appointment (patient_id, staff_id, date, start_time, end_time, purpose, status) VALUES
    (1, 1, '2024-08-10', '09:00:00', '09:30:00', 'Medical Checkup', 'Completed'),
    (1, 1, '2024-08-10', '13:00:00', '14:00:00', 'Medical Checkup', 'Completed'),
    (2, 2, '2024-08-15', '11:00:00', '11:45:00', 'Consultation', 'Completed'),
    (2, 2, '2024-08-15', '14:00:00', '15:00:00', 'Consultation', 'Completed'),
    (3, 3, '2024-08-15', '14:00:00', '14:30:00', 'Lab Test', 'Scheduled'),
    (4, 6, '2024-08-20', '10:00:00', '10:30:00', 'Dermatology Consultation', 'Scheduled'),
    (5, 1, '2024-08-25', '13:00:00', '13:30:00', 'Dermatology Consultation', 'Cancelled'),
    (6, 7, '2024-08-15', '15:00:00', '15:30:00', 'Dermatology Consultation', 'Completed'),
    (7, 8, '2024-08-18', '10:00:00', '10:45:00', 'Vaccination', 'Scheduled'),
    (8, 1, '2024-08-22', '14:00:00', '14:45:00', 'Consultation', 'Scheduled'),
    (9, 2, '2024-08-23', '11:00:00', '11:30:00', 'Lab Test', 'Scheduled'),
    (10, 7, '2024-08-24', '09:00:00', '09:30:00', 'Consultation', 'Scheduled'),
    (3, 2, '2024-09-01', '10:00:00', '10:30:00', 'Consultation', 'Scheduled'),
    (4, 3, '2024-09-02', '11:00:00', '11:30:00', 'Follow-up', 'Scheduled'),
    (5, 4, '2024-09-03', '14:00:00', '14:30:00', 'Routine Checkup', 'Scheduled'),
    (6, 6, '2024-09-04', '09:00:00', '09:30:00', 'Pediatric Checkup', 'Scheduled'),
    (7, 7, '2024-09-05', '13:00:00', '13:30:00', 'Consultation', 'Scheduled'),
    (8, 8, '2024-09-06', '15:00:00', '15:30:00', 'Radiology Scan', 'Scheduled'),
    (9, 9, '2024-09-07', '10:00:00', '10:30:00', 'Consultation', 'Scheduled'),
    (10, 10, '2024-09-08', '11:00:00', '11:30:00', 'Lab Test', 'Scheduled'),
    (1, 11, '2024-09-09', '14:00:00', '14:30:00', 'Cardiology Consultation', 'Scheduled'),
    (2, 12, '2024-09-10', '09:00:00', '09:30:00', 'Dermatology Checkup', 'Scheduled');

-- Insert mock data into the Treatment table
INSERT INTO Treatment (patient_id, staff_id, date, description) VALUES
    (1, 1, '2024-08-10', 'Routine checkup; all vital signs normal.'),
    (2, 2, '2024-08-12', 'Neurology consultation; patient reports migraines. MRI recommended.'),
    (3, 3, '2024-08-15', 'Follow-up visit; healing well after surgery.'),
    (4, 6, '2024-08-20', 'Pediatric checkup; patient in good health, vaccinations updated.'),
    (5, 1, '2024-08-25', 'Cardiology consultation; ECG showed normal results.'),
    (6, 7, '2024-08-15', 'Oncology consultation; reviewing chemotherapy progress.'),
    (7, 8, '2024-08-18', 'Radiology scan; chest X-ray, no abnormalities found.'),
    (8, 1, '2024-08-22', 'Cardiology follow-up; slight improvement in blood pressure.'),
    (9, 2, '2024-08-23', 'Neurology follow-up; patient reports reduced frequency of migraines.'),
    (10, 7, '2024-08-24', 'Oncology follow-up; continuing treatment plan.'),
    (3, 2, '2024-09-01', 'Neurology consultation; patient experiencing minor headaches. Adjusted medication.'),
    (4, 3, '2024-09-02', 'Post-surgery follow-up; patient healing well, no complications.'),
    (5, 4, '2024-09-03', 'Routine checkup; patient in good health, no issues noted.'),
    (6, 6, '2024-09-04', 'Pediatric checkup; all vaccinations up to date, no health concerns.'),
    (7, 7, '2024-09-05', 'Oncology consultation; patient responding well to treatment.'),
    (8, 8, '2024-09-06', 'Radiology scan; no abnormalities detected in chest X-ray.'),
    (9, 9, '2024-09-07', 'Routine consultation; patient reported minor back pain, recommended physical therapy.'),
    (10, 10, '2024-09-08', 'Lab test results; blood work within normal ranges, no issues detected.'),
    (1, 11, '2024-09-09', 'Cardiology consultation; slight improvement in heart condition, continue current medication.'),
    (2, 12, '2024-09-10', 'Dermatology checkup; mild skin irritation, prescribed topical cream.');

-- Re-enable triggers after data insertion
SET @DISABLE_TRIGGERS = FALSE;

-- Commit the transaction to save all changes
COMMIT;
