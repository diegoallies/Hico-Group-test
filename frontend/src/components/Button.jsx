// Button.jsx - Reusable button component
import React from "react";

const Button = ({ onClick, label, style }) => (
  <button type="submit" className={`btn ${style}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
