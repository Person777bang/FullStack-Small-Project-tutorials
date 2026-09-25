import React from "react";
import { Input } from "../atoms/Input";

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Cari data...",
  className = "",
}) => {
  return (
    <div
      className={`control has-icons-left ${className}`.trim()}
      style={{ width: "260px" }}
    >
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="search-input-compact"
      />
      <span className="icon is-small is-left" style={{ color: "#94A3B8" }}>
        🔍
      </span>
    </div>
  );
};
