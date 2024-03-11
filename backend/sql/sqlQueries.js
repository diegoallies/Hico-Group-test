"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayrollQuery = exports.updatePayrollQuery = exports.showSinglePayrollQuery = exports.showPayrollsQuery = exports.createListQuery = exports.createTableQuery = exports.createDatabaseQuery = void 0;
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

// Function to read SQL queries from files
const readSQLFile = (fileName) => {
    const filePath = path.join(__dirname, 'sql', `${fileName}.sql`);
    return fs.readFileSync(filePath, 'utf-8');
};
exports.createDatabaseQuery = readSQLFile('create_database');
exports.createTableQuery = readSQLFile('create_table');
exports.createListQuery = readSQLFile('insert_payroll');
exports.showPayrollsQuery = readSQLFile('show_payrolls');
exports.showSinglePayrollQuery = readSQLFile('show_single_payroll');
// Inside sqlQueries.js
// ...

exports.updatePayrollQuery = (id, employeeData) => {
    const sql = readSQLFile('update_payroll');

    let i = 0; // Declare 'i' 
    const updatedSql = sql.replace(/\?/g, () => {
        const value = employeeData[Object.keys(employeeData)[i++]]; 
        return mysql.escape(value); 
    });

    return updatedSql;
};

exports.deletePayrollQuery = readSQLFile('delete_payroll');
