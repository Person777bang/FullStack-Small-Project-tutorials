import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../atoms/Button";

export const Navbar = ({ title = "Dashboard" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    navigate("/login");
  };

  return (
    <nav
      className="navbar is-white mb-5"
      style={{
        borderBottom: "1px solid #E2E8F0",
        padding: "0.5rem 1.5rem",
      }}
    >
      <div className="navbar-brand">
        <span
          className="navbar-item"
          style={{ fontWeight: 700, fontSize: "1.125rem", color: "#0F172A" }}
        >
          {title}
        </span>
      </div>

      <div className="navbar-menu is-active">
        <div className="navbar-end is-flex is-align-items-center">
          <Link
            to="/"
            className="navbar-item"
            style={{ fontSize: "0.875rem", color: "#475569", fontWeight: 500 }}
          >
            Pengguna
          </Link>
          <Link
            to="/products"
            className="navbar-item"
            style={{ fontSize: "0.875rem", color: "#475569", fontWeight: 500 }}
          >
            Produk
          </Link>
          <Link
            to="/addresses"
            className="navbar-item"
            style={{ fontSize: "0.875rem", color: "#475569", fontWeight: 500 }}
          >
            Alamat Saya
          </Link>
          <div className="navbar-item pl-3">
            <Button variant="danger" size="small" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
