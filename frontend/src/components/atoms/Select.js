import React from "react";

export const Select = ({
  value,
  onChange,
  options = [], // Format: [{ value: 'L', label: 'Laki-laki' }, ...]
  name = "",
  placeholder = "Pilih Opsi",
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`select is-fullwidth ${className}`.trim()}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          borderRadius: "6px",
          borderColor: "#E2E8F0",
          fontSize: "0.875rem",
          color: "#0F172A",
        }}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
