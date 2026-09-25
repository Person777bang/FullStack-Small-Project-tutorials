import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Import service
import { getUserById, updateUser } from "../../service/userService";

import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { FormField } from "../../components/molecules/FormField";
import { Input } from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";

export const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUserById();
  }, [id]);

  const fetchUserById = async () => {
    try {
      const data = await getUserById(id);
      setName(data.name || "");
      setEmail(data.email || "");
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, { name, email, password, confPassword });
      navigate("/");
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  };

  return (
    <DashboardLayout title="Edit Pengguna">
      <div
        className="p-5"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          border: "1px solid #E2E8F0",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h2 className="title is-5 mb-4" style={{ color: "#0F172A" }}>
          Edit Data Pengguna
        </h2>
        {msg && <p className="has-text-danger mb-3">{msg}</p>}

        <form onSubmit={handleUpdateUser}>
          <FormField label="Nama Lengkap" required>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Email" required>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Password Baru (Kosongkan jika tidak diubah)">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </FormField>

          <FormField label="Konfirmasi Password Baru">
            <Input
              type="password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              placeholder="••••••••"
            />
          </FormField>

          <div className="is-flex is-justify-content-flex-end gap-2 mt-5">
            <Button
              variant="outline"
              size="small"
              onClick={() => navigate("/")}
              className="mr-2"
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="small">
              Update
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
