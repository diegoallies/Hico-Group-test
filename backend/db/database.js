const mysql = require("mysql");
require("dotenv").config();

// Connection Configuration (using environment variables)
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
    // Leave out the database name initially, as we'll check for it
};

// Connect to MySQL without specifying a database
const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
    if (error) { 
        console.error("Error connecting to MySQL:", error);
        return; // Exit on major connection error
    } 

    // 1. Check if the database exists
    connection.query("SHOW DATABASES LIKE 'payroll_database'", (error, results) => {
        if (error) {
            console.error("Error checking database existence:", error);
            return;
        }

        if (results.length === 0) {
            // Database doesn't exist, create it
            createDatabase(connection);
        } else {
            // Database exists, proceed to create the table
            createTable(connection);
        }
    });
});

function createDatabase(connection) {
    connection.query("CREATE DATABASE payroll_database", (error, result) => {
        if (error) {
            console.error("Error creating database:", error);
            return;
        }
        console.log("Database 'payroll_database' created.");
        createTable(connection); // Proceed to table creation
    });
}

function createTable(connection) {
    connection.query("USE payroll_database");  // Switch to the database 

    const tableCreationQuery = `
        CREATE TABLE payroll_list (
            id INT AUTO_INCREMENT,
            /* Other columns... */
            PRIMARY KEY(id)
        )
    `;

    connection.query(tableCreationQuery, (error, result) => {
        if (error) {
            console.error("Error creating table:", error);
            return;
        }
        console.log("Table 'payroll_list' created.");
        // Start your main backend application logic here...
    });
}
