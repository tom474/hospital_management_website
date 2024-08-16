USE HospitalManagementSystem;

-- Partition the Appointment table by year
ALTER TABLE Appointment 
PARTITION BY RANGE (YEAR(date)) (
    PARTITION p_before_2023 VALUES LESS THAN (2023),
    PARTITION p_2023 VALUES LESS THAN (2024),
    PARTITION p_2024 VALUES LESS THAN (2025),
    PARTITION p_2025 VALUES LESS THAN (2026),
    PARTITION p_2026 VALUES LESS THAN (2027),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Partition the Treatment table by year
ALTER TABLE Treatment 
PARTITION BY RANGE (YEAR(date)) (
    PARTITION p_before_2023 VALUES LESS THAN (2023),
    PARTITION p_2023 VALUES LESS THAN (2024),
    PARTITION p_2024 VALUES LESS THAN (2025),
    PARTITION p_2025 VALUES LESS THAN (2026),
    PARTITION p_2026 VALUES LESS THAN (2027),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Partition the JobHistory table by year
ALTER TABLE JobHistory 
PARTITION BY RANGE (YEAR(change_date)) (
    PARTITION p_before_2023 VALUES LESS THAN (2023),
    PARTITION p_2023 VALUES LESS THAN (2024),
    PARTITION p_2024 VALUES LESS THAN (2025),
    PARTITION p_2025 VALUES LESS THAN (2026),
    PARTITION p_2026 VALUES LESS THAN (2027),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Partition the Schedule table by day of the week
ALTER TABLE Schedule 
PARTITION BY LIST (day_of_week) (
    PARTITION p_monday VALUES IN ('Monday'),
    PARTITION p_tuesday VALUES IN ('Tuesday'),
    PARTITION p_wednesday VALUES IN ('Wednesday'),
    PARTITION p_thursday VALUES IN ('Thursday'),
    PARTITION p_friday VALUES IN ('Friday'),
    PARTITION p_saturday VALUES IN ('Saturday'),
    PARTITION p_sunday VALUES IN ('Sunday')
);

-- Partition the DocumentReference table by entity type
ALTER TABLE DocumentReference 
PARTITION BY LIST (entity_type) (
    PARTITION p_patient VALUES IN ('Patient'),
    PARTITION p_staff VALUES IN ('Staff'),
    PARTITION p_appointment VALUES IN ('Appointment')
);
