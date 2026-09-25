import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";

export const ProductTable = ({
  products = [],
  startIndex = 0,
  onDelete,
  loading,
}) => {
  if (loading) {
    return <div className="p-4 has-text-centered">Memuat data produk...</div>;
  }

  const list = Array.isArray(products) ? products : [];

  return (
    <div className="table-container">
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>NO</th>
            <th>NAMA PRODUK</th>
            <th>HARGA</th>
            <th>STOK</th>
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
                  <strong>{item.name || item.product_name || "-"}</strong>
                </td>
                <td>Rp {(item.price || 0).toLocaleString("id-ID")}</td>
                <td>{item.stock ?? "-"}</td>
                <td>
                  <div className="buttons are-small">
                    <Link
                      to={`/products/edit/${item.id}`}
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
