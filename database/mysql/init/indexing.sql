USE HospitalManagementSystem;

-- Indexes for Patient table
CREATE INDEX idx_patient_name ON Patient (first_name, last_name);
CREATE INDEX idx_patient_email ON Patient (email);

-- Indexes for Department table
CREATE INDEX idx_department_name ON Department (department_name);

-- Indexes for Staff table
CREATE INDEX idx_staff_name ON Staff (first_name, last_name);
CREATE INDEX idx_staff_email ON Staff (email);
CREATE INDEX idx_staff_department ON Staff (department_id);
CREATE INDEX idx_staff_job_type ON Staff (job_type);

-- Indexes for JobHistory table
CREATE INDEX idx_jobhistory_staff ON JobHistory (staff_id);
CREATE INDEX idx_jobhistory_date ON JobHistory (change_date);
CREATE INDEX idx_jobhistory_prev_dept ON JobHistory (previous_dept_id);
CREATE INDEX idx_jobhistory_new_dept ON JobHistory (new_dept_id);

-- Indexes for Schedule table
CREATE INDEX idx_schedule_staff ON Schedule (staff_id);
CREATE INDEX idx_schedule_date ON Schedule (date);

-- Indexes for Appointment table
CREATE INDEX idx_appointment_patient ON Appointment (patient_id);
CREATE INDEX idx_appointment_staff ON Appointment (staff_id);
CREATE INDEX idx_appointment_date ON Appointment (date);
CREATE INDEX idx_appointment_start_time ON Appointment (start_time);
CREATE INDEX idx_appointment_end_time ON Appointment (end_time);

-- Indexes for Treatment table
CREATE INDEX idx_treatment_patient ON Treatment (patient_id);
CREATE INDEX idx_treatment_staff ON Treatment (staff_id);
CREATE INDEX idx_treatment_date ON Treatment (date);

-- Additional composite indexes for optimizing specific queries
CREATE INDEX idx_appointment_staff_date_time ON Appointment (staff_id, date, start_time, end_time);
CREATE INDEX idx_schedule_staff_date_time ON Schedule (staff_id, date, start_time, end_time);
