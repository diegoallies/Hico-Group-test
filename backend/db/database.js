const mysql = require("mysql");
require("dotenv").config(); // Load environment variables from .env file

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Open the MySQL connection
db.connect(async (error) => {
  if (error) throw error;

  // Check if the database exists, create it if not
  await createDatabaseIfNotExists();

  // Use the created database
  db.changeUser({ database: process.env.DB_DATABASE }, (err) => {
    if (err) throw err;
    console.log(`Using database: ${process.env.DB_DATABASE}`);

    // Check if the table exists, create it if not
    createTableIfNotExists();
  });
});

async function createDatabaseIfNotExists() {
  return new Promise((resolve, reject) => {
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`;

    db.query(createDatabaseQuery, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Database '${process.env.DB_DATABASE}' is ready`);
        resolve();
      }
    });
  });
}

function createTableIfNotExists() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS payroll_list (
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

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table 'payroll_list' is ready");
    }
  });
}

module.exports = db;
