// models/payrollModel.js
const fs = require('fs');
const path = require('path');
const db = require("../db/database.js");

class PayrollModel {
  static loadSQLFile(fileName) {
    const filePath = path.join(__dirname, '../sql/', fileName);

    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      console.error(`Error reading SQL file ${fileName}:`, error);
      throw error;
    }
  }

  static async createDatabaseIfNotExists() {
    const createDatabaseQuery = this.loadSQLFile('createDatabase.sql');

    return new Promise((resolve, reject) => {
      db.query(createDatabaseQuery, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log("Database 'payroll_database' is ready");
          resolve();
        }
      });
    });
  }

  static async createTableIfNotExists() {
    const createTableQuery = this.loadSQLFile('createTable.sql');

    return new Promise((resolve, reject) => {
      db.query(createTableQuery, (err) => {
        if (err) {
          console.error("Error creating table:", err);
          reject(err);
        } else {
          console.log("Table 'payroll_list' is ready");
          resolve();
        }
      });
    });
  }

  static async createPayroll(payrollData) {
    const createPayrollProcedure = this.loadSQLFile('createPayroll.sql');

    return new Promise((resolve, reject) => {
      db.query(createPayrollProcedure, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getPayrolls() {
    const showPayrollsProcedure = this.loadSQLFile('showAllPayrolls.sql');

    return new Promise((resolve, reject) => {
      db.query(showPayrollsProcedure, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getSinglePayroll(id) {
    const showSinglePayrollProcedure = this.loadSQLFile('showSinglePayroll.sql');

    return new Promise((resolve, reject) => {
      db.query(showSinglePayrollProcedure, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static async updatePayroll(id, payrollData) {
    const updatePayrollProcedure = this.loadSQLFile('updatePayroll.sql');

    return new Promise((resolve, reject) => {
      db.query(updatePayrollProcedure, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async deleteSinglePayroll(id) {
    const deleteSinglePayrollProcedure = this.loadSQLFile('deletePayroll.sql');

    return new Promise((resolve, reject) => {
      db.query(deleteSinglePayrollProcedure, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = PayrollModel;
