// FormInput.jsx - Reusable form input component
import React from "react";

const FormInput = ({ label, value, onChange, type = "text" }) => (
  <div className="form-group">
    <label>{label}:</label>
    <input
      type={type}
      className="form-control"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default FormInput;
