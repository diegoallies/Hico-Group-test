CREATE TABLE IF NOT EXISTS payroll_list (
    id INT AUTO_INCREMENT,
    employeeId INT,
    firstName VARCHAR(255) COLLATE utf8mb4_general_ci,
    lastName VARCHAR(255) COLLATE utf8mb4_general_ci,
    salutation VARCHAR(10) COLLATE utf8mb4_general_ci,
    employeeProfileColor VARCHAR(7) COLLATE utf8mb4_general_ci, 
    grossSalary VARCHAR(255),
    gender VARCHAR(15) COLLATE utf8mb4_general_ci,
    PRIMARY KEY(id)
);
