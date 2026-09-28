import React from "react";

export const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  name = "",
  disabled = false,
  required = false,
  className = "",
  isError = false,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={`input ${isError ? "is-danger" : ""} ${className}`.trim()}
      style={{
        borderRadius: "6px",
        borderColor: isError ? "#EF4444" : "#E2E8F0",
        boxShadow: "none",
        fontSize: "0.875rem",
        color: "#0F172A",
      }}
    />
  );
};
