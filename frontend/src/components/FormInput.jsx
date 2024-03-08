import React from "react";
import "../App.css";  // Make sure to import your CSS file

const FormInput = ({ label, value, onChange, type = "text", disabled = false }) => (
  <div className="form-group">
    <label>{label}:</label>
    {type === "text" ? (
      <input
        type={type}
        className="form-control"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    ) : (
      <input
        type={type}
        className="form-control"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </div>
);

export default FormInput;
