import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import axios from "axios";

function App() {
  const [editMode, setEditMode] = useState(false);
  const [payrollsList, setPayrollsList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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


  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* Employee List Table */}
        <h2>Employee List</h2>
        <table className="Table">
          <thead>
            <tr>
              <th scope="col">Employee #</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Salutation</th>
              <th scope="col">Profile Color</th>
            </tr>
          </thead>
          <tbody>
            {payrollsList.map((employee) => (
              <tr
                key={employee.id}
                onClick={() => handleEmployeeSelect(employee)}
              >
                <th scope="row">{employee.employeeId}</th>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.salutation}</td>
                <td>{employee.employeeProfileColor}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Employee Information Form */}
        <h2>Employee Information</h2>
        {selectedEmployee && (
          <div
            className="form"
            style={{ paddingBottom: "50px", paddingTop: "50px" }}
          >
            <form>
              <div className="form-wrapper">
                <div className="left-column">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={selectedEmployee.firstName || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        firstName: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={selectedEmployee.lastName || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        lastName: e.target.value,
                      })
                    }
                  />
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
                  {/* ... Other input fields and radio buttons similarly */}
                  <div>
                    <label>Gender:</label>
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
                <div className="right-column">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={`${selectedEmployee.firstName || ""} ${
                      selectedEmployee.lastName || ""
                    }`}
                    disabled
                  />
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
                  <div>
                    <label>Profile Color:</label>
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
                      checked={selectedEmployee.employeeProfileColor === "Blue"}
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
                      checked={selectedEmployee.employeeProfileColor === "Red"}
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
              </div>
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
