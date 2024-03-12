// RadioInput.jsx - Reusable radio input component
import React from "react";

const RadioInput = ({ options, selectedValue, onChange }) => (
  <div className="form-group" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <label style={{ marginRight: "10px" }}>Gender</label>
    {options.map((option) => (
      <div key={option.value} style={{ display: "flex", alignItems: "center", marginRight: "15px" }}>
        <input
          type="radio"
          id={option.value}
          name="gender"
          value={option.value}
          checked={selectedValue === option.value}  // Ensure the selectedValue prop is used here
          onChange={() => onChange(option.value)}
          style={{ marginRight: "5px" }}
        />
        <label htmlFor={option.value}>{option.label}</label>
      </div>
    ))}
  </div>
);

export default RadioInput;
