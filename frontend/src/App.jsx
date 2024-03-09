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
import Button from "./components/Button"; 
import Pagination from "./components/Pagination";  
import NumberInput from "./components/NumberInput.jsx";
import CurrencyNumberInput from "./components/CurrencyNumberInput.jsx";


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

  const AddNewPayroll = () => {
    setSelectedEmployee({
      firstName: "",
      lastName: "",
      salutation: "", 
      gender: "", 
      grossSalary: "",
      employeeProfileColor: 'Default',
    });
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

useEffect(() => {
  if (selectedEmployee && selectedEmployee.salutation) {
    const newGender = selectedEmployee.salutation.toLowerCase() === "dr" ? selectedEmployee.gender : 
                      selectedEmployee.salutation.toLowerCase() === "mr" ? "Male" :
                      selectedEmployee.salutation.toLowerCase() === "mrs" || selectedEmployee.salutation.toLowerCase() === "ms" ? "Female" :
                      "Unspecified";

    setSelectedEmployee((prevEmployee) => ({
      ...prevEmployee,
      gender: newGender
    }));
  }
}, [selectedEmployee]);

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
            <Button onClick={AddNewPayroll} label="Add Payroll" style="btn-success" />
          </div>
          <EmployeeTable payrolls={currentPayrolls} onSelect={handleEmployeeSelect} />
          <Pagination totalPages={Math.ceil(payrollsList.length / itemsPerPage)} currentPage={currentPage} onPageChange={paginate} />
        </div>

        {selectedEmployee && (
        <div className="employee-information">
          <h2 style={{ marginBottom: '35px' }}> Employee Information</h2>
          <form>
            <div className="form-wrapper">
              <div className="left-column">
                <FormInput label="First Name" value={selectedEmployee.firstName} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, firstName: value })} alphabeticOnly />
                <FormInput label="Last Name" value={selectedEmployee.lastName} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, lastName: value })} alphabeticOnly />
                <DropdownInput label="Salutation" value={selectedEmployee.salutation} options={salutationOptions} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, salutation: value })} />
                <RadioInput options={genderOptions} selectedValue={selectedEmployee.gender} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, gender: value })} />
                <NumberInput label="Employee ID" value={selectedEmployee.employeeId} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, employeeId: value })} />
              </div>

              <div className="right-column">
                <FormInput label="Full Name" value={`${selectedEmployee.firstName || ""} ${selectedEmployee.lastName || ""}`} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, fullName: value })} className="full-width" disabled />
                <CurrencyNumberInput label="Gross Salary" value={selectedEmployee.grossSalary} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, grossSalary: value })} className="full-width" />
                <CheckboxInput options={colorOptions} selectedValues={selectedEmployee.employeeProfileColor} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, employeeProfileColor: value })}  />
                <Button onClick={saveEmployee} label="Save Changes" style="btn-success" colorr={selectedEmployee.employeeProfileColor}  />
                <Button onClick={clearSelectedEmployee} label="Cancel Changes" style="btn-warning" />
                <Button onClick={deleteEmployee} label="Delete Payroll" style="btn-danger" />
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
