// RadioInput.jsx - Reusable radio input component
import React from "react";

const RadioInput = ({ options, selectedValue, onChange }) => (
  <div className="form-group" style={{ display: "flex", flexDirection: "row" }}>
    <label>Gender:</label>
    <div style={{ display: "flex", flexDirection: "row" }}>
      {options.map((option) => (
        <div className="radio-item" key={option.value}>
          <input
            type="radio"
            id={option.value}
            name="gender"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  </div>
);

export default RadioInput;
