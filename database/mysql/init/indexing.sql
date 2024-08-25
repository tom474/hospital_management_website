USE HospitalManagementSystem;

-- Patient Table Indexes
CREATE INDEX idx_patient_name ON Patient (last_name, first_name);
CREATE INDEX idx_patient_email ON Patient (email);
CREATE INDEX idx_patient_birth_date ON Patient (birth_date);

-- Staff Table Indexes
CREATE INDEX idx_staff_name ON Staff (last_name, first_name);
CREATE INDEX idx_staff_email ON Staff (email);
CREATE INDEX idx_staff_department ON Staff (department_id);
CREATE INDEX idx_staff_job_type ON Staff (job_type);

-- Department Table Indexes
CREATE INDEX idx_department_name ON Department (department_name);
CREATE INDEX idx_department_manager ON Department (manager_id);

-- JobHistory Table Indexes
CREATE INDEX idx_jobhistory_staff_id ON JobHistory (staff_id);
CREATE INDEX idx_jobhistory_change_date ON JobHistory (change_date);
CREATE INDEX idx_jobhistory_previous_dept_id ON JobHistory (previous_dept_id);
CREATE INDEX idx_jobhistory_new_dept_id ON JobHistory (new_dept_id);

-- Schedule Table Indexes
CREATE INDEX idx_schedule_staff_id ON Schedule (staff_id);
CREATE INDEX idx_schedule_date ON Schedule (date);

-- Appointment Table Indexes
CREATE INDEX idx_appointment_patient_id ON Appointment (patient_id);
CREATE INDEX idx_appointment_staff_id ON Appointment (staff_id);
CREATE INDEX idx_appointment_date ON Appointment (date);

-- Treatment Table Indexes
CREATE INDEX idx_treatment_patient_id ON Treatment (patient_id);
CREATE INDEX idx_treatment_staff_id ON Treatment (staff_id);
CREATE INDEX idx_treatment_date ON Treatment (date);
