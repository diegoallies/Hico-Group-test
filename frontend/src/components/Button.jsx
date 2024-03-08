// Button.jsx - Reusable button component
import React from "react";

const Button = ({ onClick, label, style , colorr}) => (
  <button type="submit" className={`btn ${style}`} onClick={onClick} style={{ backgroundColor: `${colorr}` }}>
    {label}
  </button>
);

export default Button;
