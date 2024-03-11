-- Stored Procedure for UPDATE payroll
DELIMITER //
CREATE PROCEDURE UpdatePayroll(
    IN p_id INT,
    IN p_employeeId INT,
    IN p_firstName VARCHAR(255),
    IN p_lastName VARCHAR(255),
    IN p_salutation VARCHAR(10),
    IN p_employeeProfileColor VARCHAR(7),
    IN p_grossSalary VARCHAR(255),
    IN p_gender VARCHAR(15)
)
BEGIN
    UPDATE payroll_list
    SET
        employeeId = p_employeeId,
        firstName = p_firstName,
        lastName = p_lastName,
        salutation = p_salutation,
        employeeProfileColor = p_employeeProfileColor,
        grossSalary = p_grossSalary,
        gender = p_gender
    WHERE id = p_id;
END //
DELIMITER ;
