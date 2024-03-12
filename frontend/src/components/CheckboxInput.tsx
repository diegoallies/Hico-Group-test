// CheckboxInput.jsx - Reusable checkbox input component
import React from "react";

const CheckboxInput = ({ options, selectedValues, onChange }) => (
  <div className="form-group">
    <label>Profile Color</label>
    <div className="color-options">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="checkbox"
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  </div>
);

export default CheckboxInput;
