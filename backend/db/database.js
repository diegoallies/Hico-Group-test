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

  // Step 1: Check if the database exists, create if not
  await payrollController.createDatabaseIfNotExists(db);
 

  // Step 2: Use the created database
  db.changeUser({ database: process.env.DB_DATABASE }, (err) => {
    if (err) throw err;
    console.log(`Using database: ${process.env.DB_DATABASE}`);

    payrollController.createTableIfNotExists(db);
    payrollController.updatePayrollSpInit(db)

  });
});

module.exports = db;
