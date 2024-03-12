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

// CREATE Payroll
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

// CREATE SP for updating payroll
exports.updatePayrollSpInit = (db) => {
  db.query(sqlQueries.updatePayrollSpInit, (err) => {
    if (err) {
      console.error("Error creating sp:", err);
    } else {
      console.log("SP CREATED SUCCESSFULLY");
    }
  });
};
// CREATE SP for updating payroll
exports.deletePayrollSpInit = (db) => {
  db.query(sqlQueries.deletePayrollSpInit, (err) => {
    if (err) {
      console.error("Error creating sp delete:", err);
    } else {
      console.log("SP delete CREATED SUCCESSFULLY");
    }
  });
};

// CREATE SP for viewing individual payroll
exports.ShowSinglePayrollSpInit = (db) => {
  db.query(sqlQueries.ShowSinglePayrollSpInit, (err) => {
    if (err) {
      console.error("Error creating sp delete:", err);
    } else {
      console.log("SP view single CREATED SUCCESSFULLY");
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

  // Create the employeeData object
  const employeeData = {
    employeeId,
    firstName,
    lastName,
    salutation,
    employeeProfileColor,
    grossSalary,
    gender,
  }

  console.log(employeeData , 'employeeData')

  const q = sqlQueries.updatePayrollQuery(req.params.id, employeeData);

  db.query(q, (err, result) => {
    if (err) {
      console.error("Error updating payroll:", err); 
      return res.status(500).json({ error: "Error updating payroll" }); 
    }

    return res.status(200).json({ message: "Payroll updated successfully" });
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

//show SINGLE payroll
exports.singlepayroll = (req, res) => {
  const q = sqlQueries.showSinglePayrollQuery(req.params.id);

  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json({ result });
  });
};

//SHOW SINGLE payroll
// exports.singlepayroll = (req, res) => {
//   const q = sqlQueries.showSinglePayrollQuery(req.params.id);

//   db.query(q, (err, result) => {
//     if (err) return res.json(err);
//     return res.status(200).json(result[0]);
//   });
// };
