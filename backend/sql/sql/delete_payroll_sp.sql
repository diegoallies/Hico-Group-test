CREATE PROCEDURE IF NOT EXISTS delete_payroll(
    IN p_id INT 
)
BEGIN
    DELETE FROM payroll_list WHERE id = p_id;
END 