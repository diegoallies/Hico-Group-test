import React from "react";

const NumberInput = ({ label, value, onChange, className = "", disabled = false }) => {
  const formatNumberWithSpaces = (number) => {
    // Ensure that the input is treated as a string
    const stringValue = number.toString();

    // Remove any non-digit characters (except dots) from the input
    const cleanedNumber = stringValue.replace(/[^\d.]/g, '');
    
    // Check if the input is a valid number
    const numericValue = parseFloat(cleanedNumber);
    
    if (!isNaN(numericValue)) {
      // Format the numeric value with spaces
      const formattedNumber = new Intl.NumberFormat('en-US').format(numericValue);
      return formattedNumber.replace(/,/g, ' ');
    }
    return cleanedNumber; // If not a valid number, return the cleaned input
  };

  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        value={formatNumberWithSpaces(value)}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default NumberInput;
