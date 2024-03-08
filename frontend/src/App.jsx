import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import axios from "axios";

function App() {
  const [payrollsList, setPayrollsList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Set the number of items per page

  const getPayrolls = async () => {
    try {
      const { data } = await axios.get("api/show/payrolls");
      setPayrollsList(data);
    } catch (error) {
      console.log(error, "the error axios");
    }
  };

  useEffect(() => {
    getPayrolls();
  }, []); // Empty dependency array to run only once

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayrolls = payrollsList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="employee-list">
          <h2>Employee List</h2>
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
                      <option value="">Select Salutation</option>
                      <option value="Mr">Mr</option>
                      <option value="Miss">Miss</option>
                      {/* Add other salutation options here */}
                    </select>
                  </div>
                  <div
                    className="form-group"
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <label>Gender:</label>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div>
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="Male"
                          checked={selectedEmployee.gender === "Male"}
                          onChange={() =>
                            setSelectedEmployee({
                              ...selectedEmployee,
                              gender: "Male",
                            })
                          }
                        />
                        <label htmlFor="male">Male</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="Female"
                          checked={selectedEmployee.gender === "Female"}
                          onChange={() =>
                            setSelectedEmployee({
                              ...selectedEmployee,
                              gender: "Female",
                            })
                          }
                        />
                        <label htmlFor="female">Female</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="unspecified"
                          name="gender"
                          value="Unspecified"
                          checked={selectedEmployee.gender === "Unspecified"}
                          onChange={() =>
                            setSelectedEmployee({
                              ...selectedEmployee,
                              gender: "Unspecified",
                            })
                          }
                        />
                        <label htmlFor="unspecified">Unspecified</label>
                      </div>
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
                      type="text"
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
                    <div>
                      <input
                        type="checkbox"
                        value="Green"
                        checked={
                          selectedEmployee.employeeProfileColor === "Green"
                        }
                        onChange={() =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            employeeProfileColor: "Green",
                          })
                        }
                      />{" "}
                      Green
                      <input
                        type="checkbox"
                        value="Blue"
                        checked={
                          selectedEmployee.employeeProfileColor === "Blue"
                        }
                        onChange={() =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            employeeProfileColor: "Blue",
                          })
                        }
                      />{" "}
                      Blue
                      <input
                        type="checkbox"
                        value="Red"
                        checked={
                          selectedEmployee.employeeProfileColor === "Red"
                        }
                        onChange={() =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            employeeProfileColor: "Red",
                          })
                        }
                      />{" "}
                      Red
                      <input
                        type="checkbox"
                        value="Default"
                        checked={
                          selectedEmployee.employeeProfileColor === "Default"
                        }
                        onChange={() =>
                          setSelectedEmployee({
                            ...selectedEmployee,
                            employeeProfileColor: "Default",
                          })
                        }
                      />{" "}
                      Default
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">
                    Save Changes
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
