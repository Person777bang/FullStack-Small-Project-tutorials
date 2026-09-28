import React from "react";
import { Label } from "../atoms/Label";

export const FormField = ({
  label,
  htmlFor,
  required = false,
  error = "",
  children,
  className = "",
}) => {
  return (
    <div className={`field mb-4 ${className}`.trim()}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      <div className="control">{children}</div>
      {error && (
        <p className="help is-danger mt-1" style={{ fontSize: "0.75rem" }}>
          {error}
        </p>
      )}
    </div>
  );
};
