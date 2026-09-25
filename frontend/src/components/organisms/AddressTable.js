import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";

export const AddressTable = ({
  addresses = [],
  startIndex = 0,
  onDelete,
  loading,
}) => {
  if (loading) {
    return <div className="p-4 has-text-centered">Memuat data alamat...</div>;
  }

  const list = Array.isArray(addresses) ? addresses : [];

  return (
    <div className="table-container">
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>NO</th>
            <th>LABEL / PENERIMA</th>
            <th>ALAMAT LENGKAP</th>
            <th>KOTA</th>
            <th style={{ width: "150px" }}>AKSI</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="5" className="has-text-centered py-5">
                Tidak ada data ditemukan
              </td>
            </tr>
          ) : (
            list.map((item, index) => (
              <tr key={item.id || index}>
                <td>{startIndex + index + 1}</td>
                <td>
                  <strong>{item.label || "Alamat"}</strong>
                  {item.name || item.recipientName ? (
                    <span className="is-size-7 has-text-grey d-block">
                      ({item.name || item.recipientName})
                    </span>
                  ) : null}
                </td>
                {/* Menampilkan alamat jalan secara fleksibel */}
                <td>
                  {item.address || item.street || item.fullAddress || "-"}
                </td>
                <td>{item.city || "-"}</td>
                <td>
                  <div className="buttons are-small">
                    <Link
                      to={`/addresses/edit/${item.id}`}
                      className="button is-warning is-light"
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => onDelete(item.id)}
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
