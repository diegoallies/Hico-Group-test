-- Stored Procedure for DELETE SINGLE payroll
DELIMITER //
CREATE PROCEDURE DeleteSinglePayroll(IN p_id INT)
BEGIN
    DELETE FROM payroll_list WHERE id = p_id;
END //
DELIMITER ;