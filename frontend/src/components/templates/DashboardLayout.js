import React from "react";
import { Navbar } from "../organisms/Navbar";

export const DashboardLayout = ({ children, title = "Dashboard" }) => {
  return (
    <div style={{ backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      {/* Organism Navbar */}
      <Navbar title={title} />

      {/* Main Container */}
      <main className="container is-max-desktop px-4 pb-6">{children}</main>
    </div>
  );
};
