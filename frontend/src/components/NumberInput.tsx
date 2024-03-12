// NumberInput.jsx
import React from "react";

const NumberInput = ({ label, value, onChange, className = "", disabled = false }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    onChange(inputValue);
  };

  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
      />
    </div>
  );
};

export default NumberInput;
