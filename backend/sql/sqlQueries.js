"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayrollQuery =
  exports.updatePayrollSpInit =
  exports.updatePayrollQuery =
  exports.showSinglePayrollQuery =
  exports.showPayrollsQuery =
  exports.createListQuery =
  exports.createTableQuery =
  exports.createDatabaseQuery =
    void 0;
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");

const readSQLFile = (fileName) => {
  const filePath = path.join(__dirname, "sql", `${fileName}.sql`);
  return fs.readFileSync(filePath, "utf-8");
};
exports.createDatabaseQuery = readSQLFile("create_database");
exports.createTableQuery = readSQLFile("create_table");
exports.createListQuery = readSQLFile("insert_payroll");
exports.showPayrollsQuery = readSQLFile("show_payrolls");
exports.updatePayrollSpInit = readSQLFile("update_payroll_sp");
exports.deletePayrollSpInit = readSQLFile("delete_payroll_sp");
exports.ShowSinglePayrollSpInit = readSQLFile("show_single_payroll_sp");

exports.updatePayrollQuery = (id, employeeData) => {
  console.log(employeeData, "employeeData");
  return `CALL update_payroll(
            ${mysql.escape(id)},
            ${mysql.escape(employeeData.employeeId)},
            ${mysql.escape(employeeData.firstName)},
            ${mysql.escape(employeeData.lastName)},
            ${mysql.escape(employeeData.salutation)},
            ${mysql.escape(employeeData.employeeProfileColor)},
            ${mysql.escape(employeeData.grossSalary)}, 
            ${mysql.escape(employeeData.gender)}
        )`;
};

exports.deletePayrollQuery = (id) => {
  return `CALL delete_payroll(${mysql.escape(id)})`;
};

exports.showSinglePayrollQuery = (id) => {
  return `CALL get_payroll_by_id(${mysql.escape(id)})`;
};
