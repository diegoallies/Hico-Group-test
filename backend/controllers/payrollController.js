const db = require("../db/database.js");
const sqlQueries = require("../sql/sqlQueries.js");

exports.createDB = (req, res) => {
  db.query(sqlQueries.createDatabaseQuery, (err, result) => {
    if (err) throw err;
    return res.status(201).json("DB created");
  });
};

exports.createTable = (req, res) => {
  db.query(sqlQueries.createTableQuery, (err, result) => {
    if (err) throw err;
    return res.status(201).json("TABLE CREATED");
  });
};

exports.createList = (req, res) => {
  const q = sqlQueries.createListQuery;

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

exports.createTableIfNotExists = (db) => {
  db.query(sqlQueries.createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      // console.log("Table 'payroll_list' is ready");
    }
  });
};

exports.updatePayrollSpInit = (db) => {
  db.query(sqlQueries.updatePayrollSpInit, (err) => {
    if (err) {
      console.error("Error creating sp:", err);
    } else {
      // console.log("SP CREATED SUCCESSFULLY");
    }
  });
};

exports.deletePayrollSpInit = (db) => {
  db.query(sqlQueries.deletePayrollSpInit, (err) => {
    if (err) {
      console.error("Error creating sp delete:", err);
    } else {
      // console.log("SP CREATED SUCCESSFULLY");
    }
  });
};

exports.ShowSinglePayrollSpInit = (db) => {
  db.query(sqlQueries.ShowSinglePayrollSpInit, (err) => {
    if (err) {
      console.error("Error creating sp delete:", err);
    } else {
      // console.log("SP CREATED SUCCESSFULLY");
    }
  });
};

exports.createDatabaseIfNotExists = async (db) => {
  return new Promise((resolve, reject) => {
    db.query(sqlQueries.createDatabaseQuery, (err) => {
      if (err) {
        reject(err);
      } else {
        // console.log(`Database '${process.env.DB_DATABASE}' is ready`);
        resolve();
      }
    });
  });
};

exports.showpayrolls = (req, res) => {
  const q = sqlQueries.showPayrollsQuery;

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

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

  const employeeData = {
    employeeId,
    firstName,
    lastName,
    salutation,
    employeeProfileColor,
    grossSalary,
    gender,
  };

  console.log(employeeData, "employeeData");

  const q = sqlQueries.updatePayrollQuery(req.params.id, employeeData);

  db.query(q, (err, result) => {
    if (err) {
      console.error("Error updating payroll:", err);
      return res.status(500).json({ error: "Error updating payroll" });
    }

    return res.status(200).json({ message: "Payroll updated successfully" });
  });
};

exports.deleteSinglepayroll = (req, res) => {
  const q = sqlQueries.deletePayrollQuery(req.params.id);

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json({ data: "payroll deleted" });
  });
};

exports.singlepayroll = (req, res) => {
  const q = sqlQueries.showSinglePayrollQuery(req.params.id);

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json({ result });
  });
};
