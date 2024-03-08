// db/database.js

var mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Encrypto@27",
  database: "",
});

// Open the MySQL connection
db.connect((error) => {
  if (error) throw error;
  console.log("Database Connected");
});

module.exports = db;
