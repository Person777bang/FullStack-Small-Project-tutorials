import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { getUsers, deleteUser } from "../../service/userService";

import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { UserTable } from "../../components/organisms/UserTable";
import { SearchInput } from "../../components/molecules/SearchInput";
import { Pagination } from "../../components/molecules/Pagination";
import { Button } from "../../components/atoms/Button";

const ITEMS_PER_PAGE = 10; // di luar komponen, jadi bukan dependency

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // sesuaikan argumen dengan fungsi getUsers di userService kamu
      const data = await getUsers(search, currentPage, ITEMS_PER_PAGE);

      if (data && Array.isArray(data.users)) {
        setUsers(data.users);
        setTotalPages(data.totalPages || 1);
      } else if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }

      setMsg("");
    } catch (error) {
      setUsers([]);
      if (error.response) {
        setMsg(error.response.data.msg || "Gagal mengambil data dari server.");
      } else {
        setMsg("Gagal terhubung ke server backend.");
      }
    } finally {
      setLoading(false);
    }
  }, [search, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchUsers]);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  return (
    <DashboardLayout title="Daftar Pengguna">
      <div className="mb-5 is-flex is-justify-content-space-between is-align-items-center flex-wrap gap-2">
        <h1 className="title is-4 mb-0" style={{ color: "#0F172A" }}>
          Daftar Pengguna
        </h1>
        <Link to="/add">
          <Button variant="primary" size="small">
            + Tambah Pengguna
          </Button>
        </Link>
      </div>

      <div className="mb-4 is-flex is-justify-content-flex-end">
        <SearchInput
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Cari nama atau email..."
        />
      </div>

      {msg && <p className="has-text-danger mb-3">{msg}</p>}

      <UserTable
        users={users}
        startIndex={startIndex}
        onDelete={handleDeleteUser}
        loading={loading}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </DashboardLayout>
  );
};
