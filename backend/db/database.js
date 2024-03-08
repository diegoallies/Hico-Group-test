const mysql = require("mysql");
require("dotenv").config(); // Load environment variables from .env file

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "", // process.env.DB_DATABASE,
});

// open the MySQL connection
db.connect((error) => {
  if (error) throw error;
  console.log("DB connected");
});

module.exports = db;
