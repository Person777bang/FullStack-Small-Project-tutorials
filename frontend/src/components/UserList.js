import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getUsers();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/users?search_query=${encodeURIComponent(search)}&page=${currentPage}&limit=${itemsPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUser(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getUsers();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    navigate("/login");
  };

  return (
    <div className="columns mt-6 is-centered">
      <div className="column is-two-thirds">
        <h1 className="page-title">Data Pengguna</h1>

        <div className="card-container">
          <div className="mb-4 is-flex is-justify-content-space-between is-align-items-center">
            <div>
              <Link to={`/add`} className="button btn-luxury mr-2">
                + Add New
              </Link>
              <Link to={`/products`} className="button btn-outline-luxury mr-2">
                Product List
              </Link>
              <Link to={`/addresses`} className="button btn-outline-luxury">
                Alamat Saya
              </Link>
            </div>

            <div className="is-flex is-align-items-center">
              <input
                type="text"
                className="input search-input-compact mr-3"
                placeholder="Cari nama/email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={handleLogout} className="button is-danger">
                Logout
              </button>
            </div>
          </div>

          <p className="has-text-danger">{msg}</p>

          <table className="table is-fullwidth table-luxury">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Umur</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="has-text-centered">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.umur}</td>
                  <td>{user.gender}</td>
                  <td>
                    <Link
                      to={`edit/${user.id}`}
                      className="button action-btn btn-outline-luxury mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="button action-btn btn-luxury"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="is-flex is-justify-content-center is-align-items-center mt-4">
              <button
                className="button btn-outline-luxury mr-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Sebelumnya
              </button>
              <span className="mx-3">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                className="button btn-outline-luxury ml-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Selanjutnya
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
