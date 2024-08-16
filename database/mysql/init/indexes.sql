USE HospitalManagementSystem;

-- Patient Table Indexes
-- Index for searching patients by last name and first name.
CREATE INDEX idx_patient_name ON Patient(last_name, first_name);

-- Index for quick lookup of patients by email.
CREATE INDEX idx_patient_email ON Patient(email);

-- Staff Table Indexes
-- Index for searching staff members by last name and first name.
CREATE INDEX idx_staff_name ON Staff(last_name, first_name);

-- Index for quick lookup of staff members by email.
CREATE INDEX idx_staff_email ON Staff(email);

-- Index for filtering staff by job type (e.g., doctors, nurses).
CREATE INDEX idx_staff_job_type ON Staff(job_type);

-- Index for searching staff by department.
CREATE INDEX idx_staff_department ON Staff(department_id);

-- Department Table Indexes
-- Unique index on department name to ensure quick lookups and enforce uniqueness.
CREATE UNIQUE INDEX idx_department_name ON Department(department_name);

-- JobHistory Table Indexes
-- Index for quick access to job history records by staff member.
CREATE INDEX idx_jobhistory_staff ON JobHistory(staff_id);

-- Index for efficient filtering and sorting of job history records by date of change.
CREATE INDEX idx_jobhistory_date ON JobHistory(change_date);

-- Schedule Table Indexes
-- Index for quick access to schedules by staff member.
CREATE INDEX idx_schedule_staff ON Schedule(staff_id);

-- Index for efficient querying by day of the week.
CREATE INDEX idx_schedule_day ON Schedule(day_of_week);

-- Index for time-based filtering of staff schedules.
CREATE INDEX idx_schedule_start_time ON Schedule(start_time);

-- Appointment Table Indexes
-- Index for quick access to appointments by patient.
CREATE INDEX idx_appointment_patient ON Appointment(patient_id);

-- Index for quick access to appointments by staff member.
CREATE INDEX idx_appointment_staff ON Appointment(staff_id);

-- Index for efficient date-based filtering of appointments.
CREATE INDEX idx_appointment_date ON Appointment(date);

-- Index for time-based queries to check appointment scheduling.
CREATE INDEX idx_appointment_time ON Appointment(start_time, end_time);

-- Index for filtering appointments by status (Scheduled, Completed, Cancelled).
CREATE INDEX idx_appointment_status ON Appointment(status);

-- Treatment Table Indexes
-- Index for quick access to treatments by patient.
CREATE INDEX idx_treatment_patient ON Treatment(patient_id);

-- Index for quick access to treatments by staff member.
CREATE INDEX idx_treatment_staff ON Treatment(staff_id);

-- Index for date-based filtering and sorting of treatments.
CREATE INDEX idx_treatment_date ON Treatment(date);

-- DocumentReference Table Indexes
-- Composite index for efficient filtering of document references by entity type and ID.
CREATE INDEX idx_document_reference_entity ON DocumentReference(entity_type, entity_id);

-- Index for filtering document references by document type (e.g., notes, images).
CREATE INDEX idx_document_reference_type ON DocumentReference(document_type);

-- Index for quick lookup of document references by MongoDB document ID.
CREATE INDEX idx_document_reference_id ON DocumentReference(document_id);
