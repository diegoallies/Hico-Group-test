import React, { useEffect, useState } from "react";
import Header from "./components/Header.tsx";
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
  GetPayrollById,
} from "./api/payrollApi.jsx";
import {
  FormInput,
  RadioInput,
  CheckboxInput,
  EmployeeTable,
  DropdownInput,
  Button,
  Pagination,
  NumberInput,
  CurrencyNumberInput,
} from "./components"; // Assuming you have an index.js file in the components folder

const ITEMS_PER_PAGE = 4;

const App = () => {
  const [payrollsList, setPayrollsList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false);

  const fetchPayrolls = async () => {
    try {
      const data = await getPayrolls();
      Array.isArray(data) ? setPayrollsList(data) : console.error('Data fetched is not an array:', data);
    } catch (error) {
      console.error('Error fetching payrolls:', error);
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
      console.error('Error saving employee:', error);
    }
  };

  const addNewPayroll = () => {
    setSelectedEmployee({
      employeeId: "",
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
      console.error('Error deleting employee:', error);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  useEffect(() => {
    if (selectedEmployee && selectedEmployee.salutation) {
      const newGender =
        selectedEmployee.salutation.toLowerCase() === 'dr'
          ? selectedEmployee.gender
          : selectedEmployee.salutation.toLowerCase() === 'mr'
          ? 'Male'
          : selectedEmployee.salutation.toLowerCase() === 'mrs' ||
            selectedEmployee.salutation.toLowerCase() === 'ms'
          ? 'Female'
          : 'Unspecified';

      if (newGender !== selectedEmployee.gender) {
        setSelectedEmployee((prevEmployee) => ({
          ...prevEmployee,
          gender: newGender,
        }));
      }
    }
  }, [selectedEmployee]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPayrolls = Array.isArray(payrollsList)
    ? payrollsList.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEmployeeSelect = async (employee) => {
    try {
      setIsLoadingEmployee(true);
      await fetchPayrollById(employee);
    } catch (error) {
      console.error('Error fetching payrolls:', error);
    } finally {
      setIsLoadingEmployee(false);
    }
  };

  const fetchPayrollById = async (employee) => {
    try {
      const data = await GetPayrollById(employee.id);
      setSelectedEmployee(data.result[0][0]);
    } catch (error) {
      console.error('Error fetching payrolls:', error);
    }
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
            <Button onClick={addNewPayroll} label="Add Payroll" style="btn-success" />
          </div>
          <EmployeeTable payrolls={currentPayrolls} onSelect={handleEmployeeSelect} />
          <Pagination totalPages={Math.ceil(payrollsList.length / ITEMS_PER_PAGE)} currentPage={currentPage} onPageChange={paginate} />
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
                    <FormInput label="Full Name" value={`${selectedEmployee.firstName || ''} ${selectedEmployee.lastName || ''}`} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, fullName: value })} className="full-width" disabled />
                    <CurrencyNumberInput label="Gross Salary" value={selectedEmployee.grossSalary} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, grossSalary: value })} className="full-width" />
                    <CheckboxInput options={colorOptions} selectedValues={selectedEmployee.employeeProfileColor} onChange={(value) => setSelectedEmployee({ ...selectedEmployee, employeeProfileColor: value })} />
                    <Button onClick={saveEmployee} label="Save Changes" style="btn-success" colorr={selectedEmployee.employeeProfileColor} />
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
};

export default App;
