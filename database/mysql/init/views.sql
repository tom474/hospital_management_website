USE HospitalManagementSystem;

-- View to display basic patient information without sensitive data like email and phone
CREATE VIEW PatientOverview AS
SELECT 
    patient_id,
    first_name,
    last_name,
    birth_date,
    address,
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

-- View to show staff information with department names instead of IDs
CREATE VIEW StaffWithDepartment AS
SELECT 
    s.staff_id,
    s.first_name,
    s.last_name,
    s.job_type,
    s.qualifications,
    d.department_name,
    s.manager_id
FROM 
    Staff s
JOIN 
    Department d ON s.department_id = d.department_id;

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

-- View to display the schedule of all doctors with department and availability status
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
    s.job_type = 'Doctor';

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
    Staff s ON t.staff_id = s.staff_id
WHERE 
    t.date BETWEEN '2023-01-01' AND '2023-12-31';  -- Adjust the date range as needed
