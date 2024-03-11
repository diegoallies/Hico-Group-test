-- Stored Procedure for SHOW SINGLE payroll
DELIMITER //
CREATE PROCEDURE ShowSinglePayroll(IN p_id INT)
BEGIN
    SELECT * FROM payroll_list WHERE id = p_id;
END //
DELIMITER ;