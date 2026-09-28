import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Import service
import { registerUser } from "../../service/authService";

import { AuthLayout } from "../../components/templates/AuthLayout";
import { FormField } from "../../components/molecules/FormField";
import { Input } from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await registerUser({ name, email, password, confPassword });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMsg(
          error.response.data.msg || "Terjadi kesalahan saat pendaftaran.",
        );
      } else {
        setMsg("Gagal terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Register">
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2
          className="title is-4 mb-4"
          style={{ color: "#0F172A", textAlign: "center" }}
        >
          Buat Akun Baru
        </h2>

        {msg && (
          <div
            className="notification is-danger is-light p-3 mb-4"
            style={{ borderRadius: "6px", fontSize: "0.875rem" }}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <FormField label="Nama Lengkap" required>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lengkap"
              required
            />
          </FormField>

          <FormField label="Email" required>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
            />
          </FormField>

          <FormField label="Password" required>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </FormField>

          <FormField label="Konfirmasi Password" required>
            <Input
              type="password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </FormField>

          <div className="mt-5">
            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Memproses..." : "Daftar"}
            </Button>
          </div>
        </form>

        <p
          className="mt-4"
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            color: "#64748B",
          }}
        >
          Sudah punya akun?{" "}
          <Link to="/login" style={{ color: "#2563EB", fontWeight: 600 }}>
            Masuk di sini
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
