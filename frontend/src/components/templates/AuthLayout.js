import React from "react";

export const AuthLayout = ({ children, title }) => {
  return (
    <div
      className="is-flex is-justify-content-center is-align-items-center"
      style={{
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        padding: "1.5rem",
      }}
    >
      <div
        className="card p-5"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
          border: "1px solid #E2E8F0",
          boxShadow: "none",
          backgroundColor: "#FFFFFF",
        }}
      >
        {title && (
          <h2
            className="title is-4 mb-5 has-text-centered"
            style={{ color: "#0F172A", fontWeight: 700 }}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};
