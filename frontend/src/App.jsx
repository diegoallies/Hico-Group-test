import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import axios from "axios";
import {
  genderOptions,
  salutationOptions,
  colorOptions,
} from "./configData/config.ts";
import {
  getPayrolls,
  updatePayroll,
  createPayroll,
  deletePayroll,
} from "../src/api/payrollApi.jsx";

function App() {
  const [payrollsList, setPayrollsList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const fetchPayrolls = async () => {
    try {
      const data = await getPayrolls();
      setPayrollsList(data);
    } catch (error) {
      console.error("Error fetching payrolls:", error);
    }
  };

  const saveEmployee = async () => {
    try {
      if (selectedEmployee && selectedEmployee.id) {
        await updatePayroll(selectedEmployee.id, selectedEmployee);
      } else {
        await createPayroll(selectedEmployee);
      }
      getPayrolls();
      clearSelectedEmployee();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const deleteEmployee = async () => {
    try {
      if (selectedEmployee && selectedEmployee.id) {
        await deletePayroll(selectedEmployee.id);
        getPayrolls();
        clearSelectedEmployee();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayrolls = payrollsList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const clearSelectedEmployee = () => {
    setSelectedEmployee(null);
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="employee-list">
          <div className="headd">
            <h2>Current Employees</h2>
            <button
              type="button"
              className="btn btn-success"
              onClick={clearSelectedEmployee}
            >
              Add Employee
            </button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Employee #</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Salutation</th>
                <th>Profile Color</th>
              </tr>
            </thead>
            <tbody>
              {currentPayrolls.map((employee) => (
                <tr
                  key={employee.id}
                  onClick={() => handleEmployeeSelect(employee)}
                >
                  <td>{employee.employeeId}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.salutation}</td>
                  <td>{employee.employeeProfileColor}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination buttons */}
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(payrollsList.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>

        {selectedEmployee && (
          <div className="employee-information">
            <h2>Employee Information</h2>
            <form>
              <div className="form-wrapper">
                <div className="left-column">
                  <div className="form-group">
                    <label>First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedEmployee.firstName || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedEmployee.lastName || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Salutation:</label>
                    <select
                      className="form-control"
                      value={selectedEmployee.salutation || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          salutation: e.target.value,
                        })
                      }
                    >
                      {salutationOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    className="form-group"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <label>Gender:</label>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {genderOptions.map((option) => (
                        <div className="radio-item" key={option.value}>
                          <input
                            type="radio"
                            id={option.value}
                            name="gender"
                            value={option.value}
                            checked={selectedEmployee.gender === option.value}
                            onChange={() =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                gender: option.value,
                              })
                            }
                          />
                          <label htmlFor={option.value}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="right-column">
                  <div className="form-group">
                    <label>Full Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={`${selectedEmployee.firstName || ""} ${
                        selectedEmployee.lastName || ""
                      }`}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Gross Salary:</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Gross Salary"
                      value={selectedEmployee.grossSalary || ""}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          grossSalary: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Profile Color:</label>
                    <div className="color-options">
                      {colorOptions.map((option) => (
                        <label key={option.value}>
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={
                              selectedEmployee.employeeProfileColor ===
                              option.value
                            }
                            onChange={() =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                employeeProfileColor: option.value,
                              })
                            }
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={saveEmployee}
                  >
                    Save Changes
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={clearSelectedEmployee}
                    v
                  >
                    Cancel Changes
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={deleteEmployee}
                  >
                    Delete Payroll
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
