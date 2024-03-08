// DropdownInput.jsx - Reusable dropdown input component
import React from "react";

const DropdownInput = ({ label, value, options, onChange }) => (
  <div className="form-group">
    <label>{label}:</label>
    <select
      className="form-control"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.length > 0 ? (
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      ) : (
        <option value="" disabled>
          Select Salutation
        </option>
      )}
    </select>
  </div>
);

export default DropdownInput;
