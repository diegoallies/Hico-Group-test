// EmployeeTable.jsx - Reusable employee table component
import React from "react";

const EmployeeTable = ({ payrolls, onSelect }) => (
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
      {payrolls.map((employee) => (
        <tr key={employee.id} onClick={() => onSelect(employee)}>
          <td>{employee.employeeId}</td>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>{employee.salutation}</td>
          <td>{employee.employeeProfileColor}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EmployeeTable;
