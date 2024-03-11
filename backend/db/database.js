const mysql = require("mysql");
require("dotenv").config(); // Load environment variables from .env file
const payrollController = require("../controllers/payrollController"); // Import payroll controller

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Open the MySQL connection
db.connect(async (error) => {
  if (error) throw error;

  // Step 1: Check if the database exists, create it if not
  await payrollController.createDatabaseIfNotExists(db);

  // Step 2: Use the created database
  db.changeUser({ database: process.env.DB_DATABASE }, (err) => {
    if (err) throw err;
    console.log(`Using database: ${process.env.DB_DATABASE}`);

    // Step 3: Check if the table exists, create it if not
    payrollController.createTableIfNotExists(db);
  });
});

module.exports = db;
