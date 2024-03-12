// payrollApi.js

import axios from "axios";

const getPayrolls = async () => {
  try {
    const { data } = await axios.get("api/show/payrolls");
    return data;
  } catch (error) {
    console.error("Error fetching payrolls:", error);
    throw error;
  }
};

const updatePayroll = async (id, payrollData) => {
  try {
    await axios.put(`api/update/payroll/${id}`, payrollData);
  } catch (error) {
    console.error(`Error updating payroll with ID ${id}:`, error);
    throw error;
  }
};

const createPayroll = async (payrollData) => {
  try {
    await axios.post("api/create/list", payrollData);
  } catch (error) {
    console.error("Error creating payroll:", error);
    throw error;
  }
};

const deletePayroll = async (id) => {
  try {
    await axios.delete(`api/delete/payroll/${id}`);
  } catch (error) {
    console.error(`Error deleting payroll with ID ${id}:`, error);
    throw error;
  }
};

const GetPayrollById = async (id) => {
  try {
    const { data } = await axios.get(`api/payroll/${id}`);
    return data;
  } catch (error) {
    console.error(`Error getting payroll with ID ${id}:`, error);
    throw error;
  }
};

export { getPayrolls, updatePayroll, createPayroll, deletePayroll , GetPayrollById};
