import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jika tidak ada token, arahkan kembali ke halaman login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
