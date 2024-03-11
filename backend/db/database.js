const mysql = require("mysql");
require("dotenv").config();
const PayrollModel = require("../models/payrollModel");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Open the MySQL connection
db.connect(async (error) => {
  if (error) throw error;

  try {
    // Step 1: Check if the database exists, create it if not
    await PayrollModel.createDatabaseIfNotExists(db);
    console.log()

    // Step 2: Use the created database
    db.changeUser({ database: process.env.DB_DATABASE }, (err) => {
      if (err) throw err;
      console.log(`Using database: ${process.env.DB_DATABASE}`);

      // Step 3: Check if the table exists, create it if not
      PayrollModel.createTableIfNotExists(db);
    });
  } catch (err) {
    console.error("Error:", err.message);
  }
});

module.exports = db;
