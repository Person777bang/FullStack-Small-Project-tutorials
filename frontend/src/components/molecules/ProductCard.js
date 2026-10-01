import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";

const DEFAULT_IMAGE = "https://via.placeholder.com/300x200?text=No+Image";

export const ProductCard = ({ product, apiBaseUrl, onDelete }) => {
  // Resolusi URL Gambar
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${apiBaseUrl}/images/${product.image}`
    : DEFAULT_IMAGE;

  // Nama Kategori
  const categoryName =
    product.ProductCategory?.name || product.category_name || "Umum";

  return (
    <div className="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen">
      <div
        className="card"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {/* FOTO PRODUK & BADGE KATEGORI */}
        <div
          style={{
            position: "relative",
            height: "180px",
            backgroundColor: "#f8fafc",
          }}
        >
          <img
            src={imageUrl}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_IMAGE;
            }}
          />
          <span
            className="tag is-primary"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "0.7rem",
              fontWeight: "600",
              borderRadius: "6px",
            }}
          >
            {categoryName}
          </span>
        </div>

        {/* DETAIL PRODUK */}
        <div
          className="card-content"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <h3
            className="title is-6 mb-1"
            style={{
              color: "#1e293b",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.4em",
            }}
          >
            {product.name}
          </h3>

          <p className="has-text-weight-bold has-text-primary is-size-6 mb-1">
            Rp {Number(product.price || 0).toLocaleString("id-ID")}
          </p>

          <p className="is-size-7 has-text-grey mb-4">
            Stok:{" "}
            <strong
              className={
                product.stock > 0 ? "has-text-dark" : "has-text-danger"
              }
            >
              {product.stock > 0 ? `${product.stock} unit` : "Habis"}
            </strong>
          </p>

          {/* ACTION BUTTONS */}
          <div style={{ marginTop: "auto" }} className="is-flex gap-2">
            <Link to={`/products/edit/${product.id}`} style={{ flex: 1 }}>
              <Button variant="outline" size="small" style={{ width: "100%" }}>
                Edit
              </Button>
            </Link>
            <Button
              variant="danger"
              size="small"
              onClick={() => onDelete(product.id)}
              style={{ flex: 1 }}
            >
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
