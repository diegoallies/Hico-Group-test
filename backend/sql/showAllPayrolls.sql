
-- Stored Procedure for SHOW payrolls
DELIMITER //
CREATE PROCEDURE ShowPayrolls()
BEGIN
    SELECT * FROM payroll_list;
END //
DELIMITER ;