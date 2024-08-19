USE HospitalManagementSystem;

-- Patient Table Indexes
-- Composite index for efficient searching by last name, first name, and email
CREATE INDEX idx_patient_name_email ON Patient(last_name, first_name, email);

-- Index for fast lookups by email alone, ensuring uniqueness
CREATE UNIQUE INDEX idx_patient_email ON Patient(email);

-- Staff Table Indexes
-- Composite index for searching staff by last name, first name, and email
CREATE INDEX idx_staff_name_email ON Staff(last_name, first_name, email);

-- Index for quick lookups by job type
CREATE INDEX idx_staff_job_type ON Staff(job_type);

-- Composite index for filtering by department and manager, which may often be used together
CREATE INDEX idx_staff_department_manager ON Staff(department_id, manager_id);

-- Department Table Indexes
-- Unique index on department name for quick lookups and to enforce uniqueness
CREATE UNIQUE INDEX idx_department_name ON Department(department_name);

-- JobHistory Table Indexes
-- Composite index for quick access to job history records by staff member and date of change
CREATE INDEX idx_jobhistory_staff_date ON JobHistory(staff_id, change_date);

-- Schedule Table Indexes
-- Composite index for efficient querying of schedules by staff, date, and start time
CREATE INDEX idx_schedule_staff_date_time ON Schedule(staff_id, date, start_time);

-- Appointment Table Indexes
-- Composite index for efficient filtering of appointments by patient, date, and time
CREATE INDEX idx_appointment_patient_date_time ON Appointment(patient_id, date, start_time, end_time);

-- Composite index for filtering appointments by staff, date, and status
CREATE INDEX idx_appointment_staff_date_status ON Appointment(staff_id, date, status);

-- Treatment Table Indexes
-- Composite index for filtering treatments by patient and date
CREATE INDEX idx_treatment_patient_date ON Treatment(patient_id, date);

-- Composite index for filtering treatments by staff and date
CREATE INDEX idx_treatment_staff_date ON Treatment(staff_id, date);

-- DocumentReference Table Indexes
-- Composite index for filtering document references by entity type, entity ID, and document type
CREATE INDEX idx_document_reference_entity_type ON DocumentReference(entity_type, entity_id, document_type);

-- Index for fast lookups by MongoDB document ID
CREATE INDEX idx_document_reference_id ON DocumentReference(document_id);
