"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayrollQuery = exports.updatePayrollQuery = exports.showSinglePayrollQuery = exports.showPayrollsQuery = exports.createListQuery = exports.createTableQuery = exports.createDatabaseQuery = void 0;
const fs = require('fs');
const path = require('path');
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
exports.updatePayrollQuery = readSQLFile('update_payroll');
exports.deletePayrollQuery = readSQLFile('delete_payroll');
