const db = require('../db/database.js');
const sqlQueries = require('../sql/sqlQueries.js');

// CREATE DATABASE
exports.createDB = (req, res) => {
  db.query(sqlQueries.createDatabaseQuery, (err, result) => {
    if (err) throw err;
    return res.status(201).json("DB created");
  });
};

// CREATE TABLE
exports.createTable = (req, res) => {
  db.query(sqlQueries.createTableQuery, (err, result) => {
    if (err) throw err;
    return res.status(201).json("TABLE CREATED");
  });
};

// // CREATE Payroll
// exports.createList = (req, res) => {
//   const q = sqlQueries.createListQuery;

//   const {
//     employeeId,
//     firstName,
//     lastName,
//     salutation,
//     employeeProfileColor,
//     grossSalary,
//     gender,
//   } = req.body;

//   const payrollData = {
//     employeeId,
//     firstName,
//     lastName,
//     salutation,
//     employeeProfileColor,
//     grossSalary,
//     gender,
//   };

//   db.query(q, payrollData, (err, result) => {
//     if (err) return res.json(err);
//     return res.status(200).json(result);
//   });
// };

// CREATE Payroll
exports.createList = (req, res) => {
  const q = sqlQueries.createListQuery;
  console.log(q, 'thi s')

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

// CREATE TABLE IF NOT EXISTS
exports.createTableIfNotExists = (db) => {
  db.query(sqlQueries.createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table 'payroll_list' is ready");
    }
  });
};

// CREATE DATABASE IF NOT EXISTS
exports.createDatabaseIfNotExists = async (db) => {
  return new Promise((resolve, reject) => {
    db.query(sqlQueries.createDatabaseQuery, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Database '${process.env.DB_DATABASE}' is ready`);
        resolve();
      }
    });
  });
};

//SHOW payrolls
exports.showpayrolls = (req, res) => {
  const q = sqlQueries.showPayrollsQuery;

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

//SHOW SINGLE payroll
exports.singlepayroll = (req, res) => {
  const q = sqlQueries.showSinglePayrollQuery(req.params.id);

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

  const q = sqlQueries.updatePayrollQuery(req.params.id, {
    employeeId,
    firstName,
    lastName,
    salutation,
    employeeProfileColor,
    grossSalary,
    gender,
  });

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

//DELETE SINGLE payroll
exports.deleteSinglepayroll = (req, res) => {
  const q = sqlQueries.deletePayrollQuery(req.params.id);

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json({ data: "payroll deleted" });
  });
};
