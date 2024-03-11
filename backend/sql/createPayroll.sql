-- Stored Procedure for CREATE Payroll
DELIMITER //
CREATE PROCEDURE CreatePayroll(
    IN p_employeeId INT,
    IN p_firstName VARCHAR(255),
    IN p_lastName VARCHAR(255),
    IN p_salutation VARCHAR(10),
    IN p_employeeProfileColor VARCHAR(7),
    IN p_grossSalary VARCHAR(255),
    IN p_gender VARCHAR(15)
)
BEGIN
    INSERT INTO payroll_list (
        employeeId,
        firstName,
        lastName,
        salutation,
        employeeProfileColor,
        grossSalary,
        gender
    ) VALUES (
        p_employeeId,
        p_firstName,
        p_lastName,
        p_salutation,
        p_employeeProfileColor,
        p_grossSalary,
        p_gender
    );
END //
DELIMITER ;
