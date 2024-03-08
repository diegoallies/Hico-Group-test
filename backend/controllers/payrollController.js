// controllers/payrollController.js

const db = require("../db/database");

// create db
exports.createDB = (req, res) => {
  let q = "CREATE DATABASE payroll";
  db.query(q, (err, result) => {
    if (err) throw err;
    return res.status(201).json("DB created");
  });
};
