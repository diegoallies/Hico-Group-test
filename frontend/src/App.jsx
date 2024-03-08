// App.jsx - Main component
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
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
import FormInput from "./components/FormInput";
import RadioInput from "./components/RadioInput";
import CheckboxInput from "./components/CheckboxInput";
import EmployeeTable from "./components/EmployeeTable";
import DropdownInput from "./components/DropdownInput";


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
      fetchPayrolls();
      clearSelectedEmployee();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const deleteEmployee = async () => {
    try {
      if (selectedEmployee && selectedEmployee.id) {
        await deletePayroll(selectedEmployee.id);
        fetchPayrolls();
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

          <EmployeeTable payrolls={currentPayrolls} onSelect={handleEmployeeSelect} />


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
                <FormInput label="First Name" value={selectedEmployee.firstName} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, firstName: value })} />
                <FormInput label="Last Name" value={selectedEmployee.lastName} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, lastName: value })} />

                <DropdownInput label="Salutation" value={selectedEmployee.salutation} options={salutationOptions} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, salutation: value })} />

                <RadioInput options={genderOptions} selectedValue={selectedEmployee.gender} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, gender: value })} />
              </div>
              <div className="right-column">
                <FormInput label="Full Name" value={`${selectedEmployee.firstName || ""} ${selectedEmployee.lastName || ""}`} disabled />
                <FormInput label="Gross Salary" type="number" value={selectedEmployee.grossSalary} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, grossSalary: value })} />
                
                <CheckboxInput options={colorOptions} selectedValues={selectedEmployee.employeeProfileColor} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, employeeProfileColor: value })} />
                <button type="submit" className="btn btn-success" onClick={saveEmployee}>
              Save Changes
            </button>
            <button type="submit" className="btn btn-warning" onClick={clearSelectedEmployee}>
              Cancel Changes
            </button>
            <button type="submit" className="btn btn-danger" onClick={deleteEmployee}>
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
