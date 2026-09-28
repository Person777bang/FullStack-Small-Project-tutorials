import React from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary | outline | danger | ghost
  size = "normal", // small | normal | medium
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  // Mapping variasi gaya tanpa bergantung pada gaya generik
  const variantClasses = {
    primary: "button btn-luxury",
    outline: "button btn-outline-luxury",
    danger: "button is-danger",
    ghost: "button is-white",
  };

  const sizeClasses = {
    small: "is-small",
    normal: "",
    medium: "is-medium",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variantClasses[variant] || "button"} 
        ${sizeClasses[size] || ""} 
        ${fullWidth ? "is-fullwidth" : ""} 
        ${className}
      `.trim()}
      style={{
        borderRadius: "6px",
        fontWeight: 500,
        transition: "all 0.15s ease-in-out",
      }}
    >
      {children}
    </button>
  );
};
