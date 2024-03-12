import React from "react";

const FormInput = ({ label, value, onChange, type = "text", disabled = false, alphabeticOnly = false }) => {
  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    if (alphabeticOnly) {
      inputValue = inputValue.replace(/[^A-Za-z\s]/g, '');
    }

    onChange(inputValue);
  };

  return (
    <div className="form-group">
      <label>{label}{<span className="required">*</span>}</label>
      <input
        type={type}
        className="form-control"
        value={value || ""}
        onChange={handleInputChange}
        disabled={disabled}
      />
    </div>
  );
};

export default FormInput;
