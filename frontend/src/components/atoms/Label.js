import React from "react";

export const Label = ({
  children,
  htmlFor,
  required = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`label mb-1 ${className}`.trim()}
      style={{
        fontSize: "0.8125rem",
        fontWeight: 600,
        color: "#334155",
        textTransform: "uppercase",
        letterSpacing: "0.025em",
      }}
    >
      {children}
      {required && (
        <span style={{ color: "#EF4444", marginLeft: "4px" }}>*</span>
      )}
    </label>
  );
};
