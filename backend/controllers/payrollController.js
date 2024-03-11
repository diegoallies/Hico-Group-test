// controllers/payrollController.js
const PayrollModel = require('../models/payrollModel');

exports.createDatabaseIfNotExists = async (db) => {
  try {
    await PayrollModel.createDatabaseIfNotExists(db);
  } catch (err) {
    throw err;
  }
};

exports.createTableIfNotExists = async (db) => {
  try {
    await PayrollModel.createTableIfNotExists(db);
  } catch (err) {
    throw err;
  }
};

// CREATE Payroll
exports.createList = async (req, res) => {
  const payrollData = req.body;

  try {
    await PayrollModel.createPayroll(payrollData);
    return res.status(200).json("Payroll created successfully");
  } catch (err) {
    return res.status(500).json({ error: "Error creating payroll", details: err.message });
  }
};

//SHOW payrolls
exports.showpayrolls = async (req, res) => {
  try {
    const payrolls = await PayrollModel.getPayrolls();
    return res.status(200).json(payrolls);
  } catch (err) {
    return res.status(500).json({ error: "Error fetching payrolls", details: err.message });
  }
};

//SHOW SINGLE payroll
exports.singlepayroll = async (req, res) => {
  const id = req.params.id;

  try {
    const payroll = await PayrollModel.getSinglePayroll(id);
    return res.status(200).json(payroll);
  } catch (err) {
    return res.status(500).json({ error: "Error fetching payroll", details: err.message });
  }
};

// UPDATE payroll
exports.updatepayroll = async (req, res) => {
  const id = req.params.id;
  const payrollData = req.body;

  try {
    await PayrollModel.updatePayroll(id, payrollData);
    return res.status(200).json("Payroll updated successfully");
  } catch (err) {
    return res.status(500).json({ error: "Error updating payroll", details: err.message });
  }
};

//DELETE SINGLE payroll
exports.deleteSinglepayroll = async (req, res) => {
  const id = req.params.id;

  try {
    await PayrollModel.deleteSinglePayroll(id);
    return res.status(200).json({ data: "Payroll deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Error deleting payroll", details: err.message });
  }
};
