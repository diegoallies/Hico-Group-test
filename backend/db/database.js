const mysql = require("mysql");
require("dotenv").config(); 
const payrollController = require("../controllers/payrollController");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect(async (error) => {
  if (error) throw error;

  await payrollController.createDatabaseIfNotExists(db);
 

  db.changeUser({ database: process.env.DB_DATABASE }, (err) => {
    if (err) throw err;
    console.log(`Using database: ${process.env.DB_DATABASE}`);

    payrollController.createTableIfNotExists(db);
    payrollController.updatePayrollSpInit(db);
    payrollController.deletePayrollSpInit(db);
    payrollController.ShowSinglePayrollSpInit(db);

  });
});

module.exports = db;
