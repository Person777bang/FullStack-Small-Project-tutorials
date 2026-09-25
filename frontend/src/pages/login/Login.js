import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Import service
import { loginUser } from "../../service/authService";

import { AuthLayout } from "../../components/templates/AuthLayout";
import { FormField } from "../../components/molecules/FormField";
import { Input } from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const response = await loginUser(email, password);

      const token = response.accessToken || response.token;
      localStorage.setItem("token", token);

      if (response.user) {
        localStorage.setItem("account", JSON.stringify(response.user));
      }

      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg || "Email atau password salah.");
      } else {
        setMsg("Gagal terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login">
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2
          className="title is-4 mb-4"
          style={{ color: "#0F172A", textAlign: "center" }}
        >
          Masuk ke Akun Anda
        </h2>

        {msg && (
          <div
            className="notification is-danger is-light p-3 mb-4"
            style={{ borderRadius: "6px", fontSize: "0.875rem" }}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleLogin}>
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

          <div className="mt-5">
            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={loading}
              style={{ width: "100%" }}
            >
              {loading ? "Memproses..." : "Masuk"}
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
          Belum punya akun?{" "}
          <Link to="/register" style={{ color: "#2563EB", fontWeight: 600 }}>
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
