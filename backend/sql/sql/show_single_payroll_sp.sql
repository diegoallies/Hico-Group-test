CREATE PROCEDURE IF NOT EXISTS get_payroll_by_id(
    IN p_id INT 
)
BEGIN
   SELECT * FROM payroll_list WHERE id = p_id; 
END 