USE HospitalManagementSystem;

-- View to display basic patient information without sensitive data like email and phone
CREATE VIEW PatientOverview AS
SELECT 
    patient_id,
    first_name,
    last_name,
    birth_date,
    allergies
FROM Patient;

-- View to show staff information excluding sensitive data like salary
CREATE VIEW StaffOverview AS
SELECT 
    staff_id,
    first_name,
    last_name,
    job_type,
    qualifications,
    department_id,
    manager_id
FROM Staff;

-- View to show staff information with department names instead of IDs and manager's name
CREATE VIEW StaffWithDepartment AS
SELECT 
    s.staff_id,
    s.first_name,
    s.last_name,
    s.job_type,
    s.qualifications,
    d.department_name,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM 
    Staff s
JOIN 
    Department d ON s.department_id = d.department_id
LEFT JOIN 
    Staff m ON s.manager_id = m.staff_id;

-- View to show department details along with manager names
CREATE VIEW DepartmentWithManager AS
SELECT 
    d.department_id,
    d.department_name,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM 
    Department d
LEFT JOIN 
    Staff m ON d.manager_id = m.staff_id;

-- View to display appointments with patient and staff names
CREATE VIEW AppointmentDetails AS
SELECT 
    a.appointment_id,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    CONCAT(s.first_name, ' ', s.last_name) AS staff_name,
    a.date,
    a.start_time,
    a.end_time,
    a.purpose,
    a.status
FROM 
    Appointment a
JOIN 
    Patient p ON a.patient_id = p.patient_id
JOIN 
    Staff s ON a.staff_id = s.staff_id;

-- View to display treatment details with patient and staff names
CREATE VIEW TreatmentDetails AS
SELECT 
    t.treatment_id,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    CONCAT(s.first_name, ' ', s.last_name) AS staff_name,
    t.date,
    t.description
FROM 
    Treatment t
JOIN 
    Patient p ON t.patient_id = p.patient_id
JOIN 
    Staff s ON t.staff_id = s.staff_id;

-- View to show job history of staff with department names
CREATE VIEW JobHistoryDetails AS
SELECT 
    j.job_history_id,
    CONCAT(s.first_name, ' ', s.last_name) AS staff_name,
    j.change_date,
    j.previous_job,
    j.new_job,
    j.previous_salary,
    j.new_salary,
    COALESCE(d1.department_name, 'N/A') AS previous_department,
    COALESCE(d2.department_name, 'N/A') AS new_department
FROM 
    JobHistory j
JOIN 
    Staff s ON j.staff_id = s.staff_id
LEFT JOIN 
    Department d1 ON j.previous_dept_id = d1.department_id
LEFT JOIN 
    Department d2 ON j.new_dept_id = d2.department_id;

-- View to display the schedule of all doctors with department and availability status, limited to 30 days from today
CREATE VIEW DoctorScheduleWithStatus AS
SELECT 
    s.staff_id,
    CONCAT(s.first_name, ' ', s.last_name) AS doctor_name,
    d.department_name,
    sc.date,
    sc.start_time,
    sc.end_time,
    IF(EXISTS(
        SELECT 1 
        FROM Appointment a 
        WHERE a.staff_id = s.staff_id 
        AND a.date = sc.date 
        AND a.start_time = sc.start_time
    ), 'Busy', 'Available') AS status
FROM 
    Staff s
JOIN 
    Schedule sc ON s.staff_id = sc.staff_id
JOIN 
    Department d ON s.department_id = d.department_id
WHERE 
    s.job_type = 'Doctor'
    AND sc.date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY);

-- View to summarize staff workload based on appointments
CREATE VIEW StaffWorkloadSummary AS
SELECT 
    s.staff_id,
    CONCAT(s.first_name, ' ', s.last_name) AS staff_name,
    s.job_type,
    COUNT(a.appointment_id) AS total_appointments
FROM 
    Staff s
LEFT JOIN 
    Appointment a ON s.staff_id = a.staff_id
GROUP BY 
    s.staff_id;

-- View to summarize doctor performance based on completed appointments
CREATE VIEW DoctorPerformanceSummary AS
SELECT 
    s.staff_id,
    CONCAT(s.first_name, ' ', s.last_name) AS doctor_name,
    COUNT(a.appointment_id) AS completed_appointments
FROM 
    Staff s
JOIN 
    Appointment a ON s.staff_id = a.staff_id
WHERE 
    s.job_type = 'Doctor'
    AND a.status = 'Completed'
GROUP BY 
    s.staff_id;

-- View to show a detailed report of all patient treatments within a specific duration
-- This view should be filtered by date when queried, as SQL views do not support parameters
CREATE VIEW PatientTreatmentReport AS
SELECT 
    t.treatment_id,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    CONCAT(s.first_name, ' ', s.last_name) AS doctor_name,
    t.date,
    t.description
FROM 
    Treatment t
JOIN 
    Patient p ON t.patient_id = p.patient_id
JOIN 
    Staff s ON t.staff_id = s.staff_id;

-- Additional Views

-- View to provide a summary of doctor workload (scheduled, completed, canceled)
CREATE VIEW DoctorWorkloadSummary AS
SELECT 
    s.staff_id,
    CONCAT(s.first_name, ' ', s.last_name) AS doctor_name,
    COUNT(CASE WHEN a.status = 'Scheduled' THEN 1 END) AS scheduled_appointments,
    COUNT(CASE WHEN a.status = 'Completed' THEN 1 END) AS completed_appointments,
    COUNT(CASE WHEN a.status = 'Cancelled' THEN 1 END) AS cancelled_appointments
FROM 
    Staff s
LEFT JOIN 
    Appointment a ON s.staff_id = a.staff_id
WHERE 
    s.job_type = 'Doctor'
GROUP BY 
    s.staff_id;

-- View to log changes to staff job titles, departments, and salaries over time
CREATE VIEW StaffActivityLog AS
SELECT 
    s.staff_id,
    CONCAT(s.first_name, ' ', s.last_name) AS staff_name,
    j.change_date,
    j.previous_job,
    j.new_job,
    j.previous_salary,
    j.new_salary,
    COALESCE(d1.department_name, 'N/A') AS previous_department,
    COALESCE(d2.department_name, 'N/A') AS new_department
FROM 
    JobHistory j
JOIN 
    Staff s ON j.staff_id = s.staff_id
LEFT JOIN 
    Department d1 ON j.previous_dept_id = d1.department_id
LEFT JOIN 
    Department d2 ON j.new_dept_id = d2.department_id;

-- View to provide a comprehensive view of patient data along with their latest appointment and treatment details
CREATE VIEW PatientDetailedInfo AS
SELECT 
    p.patient_id,
    CONCAT(p.first_name, ' ', p.last_name) AS patient_name,
    p.birth_date,
    p.address,
    p.allergies,
    a.date AS last_appointment_date,
    a.purpose AS last_appointment_purpose,
    t.date AS last_treatment_date,
    t.description AS last_treatment_description
FROM 
    Patient p
LEFT JOIN 
    Appointment a ON p.patient_id = a.patient_id AND a.date = (SELECT MAX(date) FROM Appointment WHERE patient_id = p.patient_id)
LEFT JOIN 
    Treatment t ON p.patient_id = t.patient_id AND t.date = (SELECT MAX(date) FROM Treatment WHERE patient_id = p.patient_id);

-- View to display staff schedules with appointments
CREATE OR REPLACE VIEW StaffScheduleWithAppointments AS
SELECT 
    s.staff_id,
    st.first_name,
    st.last_name,
    st.email,
    st.job_type,
    d.department_name,
    s.date,
    s.start_time AS schedule_start_time,
    s.end_time AS schedule_end_time,
    a.start_time AS appointment_start_time,
    a.end_time AS appointment_end_time
FROM 
    Schedule s
INNER JOIN 
    Staff st ON s.staff_id = st.staff_id
INNER JOIN 
    Department d ON st.department_id = d.department_id
LEFT JOIN 
    Appointment a ON s.staff_id = a.staff_id AND s.date = a.date;
