const db = require("../db/database.js");

//CREATE DATABASE
exports.createDB = (req, res) => {
  let q = "CREATE DATABASE payroll_database";
  db.query(q, (err, result) => {
    if (err) throw err;
    return res.status(201).json("DB created");
  });
};

// CREATE TABLE
exports.createTable = (req, res) => {
  let q = `
        CREATE TABLE payroll_list (
            id INT AUTO_INCREMENT,
            employeeId INT,
            firstName VARCHAR(255) COLLATE utf8mb4_general_ci,
            lastName VARCHAR(255) COLLATE utf8mb4_general_ci,
            salutation VARCHAR(10) COLLATE utf8mb4_general_ci,
            employeeProfileColor VARCHAR(7) COLLATE utf8mb4_general_ci, 
            grossSalary VARCHAR(255),
            gender VARCHAR(15) COLLATE utf8mb4_general_ci,
            PRIMARY KEY(id)
        )
    `;

  db.query(q, (err, result) => {
    if (err) throw err;
    return res.status(201).json("TABLE CREATED");
  });
};

// CREATE Payroll
exports.createList = (req, res) => {
  const q = "INSERT INTO payroll_list SET ?";

  const {
    employeeId,
    firstName,
    lastName,
    salutation,
    employeeProfileColor,
    grossSalary,
    gender,
  } = req.body;

  const payrollData = {
    employeeId,
    firstName,
    lastName,
    salutation,
    employeeProfileColor,
    grossSalary,
    gender,
  };

  db.query(q, payrollData, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

//SHOW payrollS
exports.showpayrolls = (req, res) => {
  const q = "SELECT * FROM payroll_list";

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

//SHOW SINGLE payroll
exports.singlepayroll = (req, res) => {
  const q = `SELECT * FROM payroll_list where id=${req.params.id}`;

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result[0]);
  });
};

// UPDATE payroll
exports.updatepayroll = (req, res) => {
  const {
    employeeId,
    firstName,
    lastName,
    salutation,
    employeeProfileColor,
    grossSalary,
    gender,
  } = req.body;

  const q = `
        UPDATE payroll_list 
        SET 
            employeeId = '${employeeId}',
            firstName = '${firstName}',
            lastName = '${lastName}',
            salutation = '${salutation}',
            employeeProfileColor = '${employeeProfileColor}',
            grossSalary = '${grossSalary}',
            gender = '${gender}'
        WHERE id = ${req.params.id}
    `;

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

//DELETE SINGLE payroll
exports.deleteSinglepayroll = (req, res) => {
  const q = `DELETE FROM payroll_list  WHERE id=${req.params.id}`;

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json({ data: "payroll deleted" });
  });
};
