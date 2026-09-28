import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";

export const UserTable = ({
  users = [],
  startIndex = 0,
  onDelete,
  loading = false,
}) => {
  return (
    <div
      style={{
        border: "1px solid #E2E8F0",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      <table className="table is-fullwidth is-hoverable mb-0">
        <thead style={{ backgroundColor: "#F8FAFC" }}>
          <tr>
            <th
              style={{
                color: "#475569",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                width: "60px",
              }}
            >
              No
            </th>
            <th
              style={{
                color: "#475569",
                fontSize: "0.75rem",
                textTransform: "uppercase",
              }}
            >
              Nama
            </th>
            <th
              style={{
                color: "#475569",
                fontSize: "0.75rem",
                textTransform: "uppercase",
              }}
            >
              Email
            </th>
            <th
              style={{
                color: "#475569",
                fontSize: "0.75rem",
                textTransform: "uppercase",
              }}
            >
              Umur
            </th>
            <th
              style={{
                color: "#475569",
                fontSize: "0.75rem",
                textTransform: "uppercase",
              }}
            >
              Gender
            </th>
            <th
              style={{
                color: "#475569",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                width: "160px",
              }}
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan="6"
                className="has-text-centered py-5"
                style={{ color: "#64748B", fontSize: "0.875rem" }}
              >
                Memuat data...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="has-text-centered py-5"
                style={{ color: "#64748B", fontSize: "0.875rem" }}
              >
                Tidak ada data ditemukan
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id || index} style={{ verticalAlign: "middle" }}>
                <td style={{ fontSize: "0.875rem", color: "#64748B" }}>
                  {startIndex + index + 1}
                </td>
                <td
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#0F172A",
                  }}
                >
                  {user.name}
                </td>
                <td style={{ fontSize: "0.875rem", color: "#475569" }}>
                  {user.email}
                </td>
                <td style={{ fontSize: "0.875rem", color: "#475569" }}>
                  {user.umur}
                </td>
                <td style={{ fontSize: "0.875rem", color: "#475569" }}>
                  {user.gender}
                </td>
                <td>
                  <div className="buttons are-small mb-0">
                    <Link to={`edit/${user.id}`}>
                      <Button variant="outline" size="small" className="mr-2">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
