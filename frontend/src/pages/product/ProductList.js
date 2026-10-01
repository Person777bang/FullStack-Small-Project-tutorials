import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { getProducts, deleteProduct } from "../../service/productService";

import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { SearchInput } from "../../components/molecules/SearchInput";
import { Pagination } from "../../components/molecules/Pagination";
import { Button } from "../../components/atoms/Button";

// Menggunakan kelipatan 4 (8 items) agar tatanan grid rapat dan presisi
const ITEMS_PER_PAGE = 8;

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // URL backend untuk mengakses gambar dari folder public/images
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts(search, currentPage, ITEMS_PER_PAGE);

      if (data && Array.isArray(data.products)) {
        setProducts(data.products);
        setTotalPages(data.totalPages || 1);
      } else if (data && Array.isArray(data.data)) {
        setProducts(data.data);
        if (data.totalPages) setTotalPages(data.totalPages);
      } else if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }

      setMsg("");
    } catch (error) {
      setProducts([]);
      if (error.response) {
        setMsg(error.response.data.msg || "Gagal mengambil data produk.");
      }
    } finally {
      setLoading(false);
    }
  }, [search, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchProducts]);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        if (error.response) setMsg(error.response.data.msg);
      }
    }
  };

  const productList = Array.isArray(products) ? products : [];

  return (
    <DashboardLayout title="Daftar Produk">
      <div className="mb-5 is-flex is-justify-content-space-between is-align-items-center flex-wrap gap-2">
        <div>
          <h1 className="title is-4 mb-1" style={{ color: "#0F172A" }}>
            Katalog Produk
          </h1>
          <p className="is-size-7 has-text-grey">
            Kelola daftar stok & foto produk dalam tampilan visual katalog
          </p>
        </div>
        <Link to="/products/add">
          <Button variant="primary" size="small">
            + Tambah Produk
          </Button>
        </Link>
      </div>

      <div className="mb-5 is-flex is-justify-content-flex-end">
        <SearchInput
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Cari nama produk..."
        />
      </div>

      {msg && <p className="has-text-danger mb-4">{msg}</p>}

      {/* STATE LOADING */}
      {loading ? (
        <div className="has-text-centered my-6">
          <p className="has-text-grey">Memuat data produk...</p>
        </div>
      ) : (
        /* DIBUAT BERBENTUK E-COMMERCE CARD GRID UNTUK MEMBEDAKAN DENGAN USER & ADDRESS */
        <div className="columns is-multiline mb-5">
          {productList.map((item) => {
            // URL Foto Produk (Menggunakan URL server backend atau image placeholder)
            let imageUrl = "https://via.placeholder.com/300x200?text=No+Image";
            if (item.image) {
              imageUrl = item.image.startsWith("http")
                ? item.image
                : `${API_BASE_URL}/images/${item.image}`;
            }

            return (
              <div
                key={item.id}
                className="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen"
              >
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
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=No+Image";
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
                      {item.ProductCategory?.name ||
                        item.category_name ||
                        "Umum"}
                    </span>
                  </div>

                  {/* KONTEN DETAIL PRODUK */}
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
                      {item.name}
                    </h3>

                    <p className="has-text-weight-bold has-text-primary is-size-6 mb-1">
                      Rp {Number(item.price || 0).toLocaleString("id-ID")}
                    </p>

                    <p className="is-size-7 has-text-grey mb-4">
                      Stok:{" "}
                      <strong
                        className={
                          item.stock > 0 ? "has-text-dark" : "has-text-danger"
                        }
                      >
                        {item.stock > 0 ? `${item.stock} unit` : "Habis"}
                      </strong>
                    </p>

                    {}
                    <div
                      style={{ marginTop: "auto" }}
                      className="is-flex gap-2"
                    >
                      <Link
                        to={`/products/edit/${item.id}`}
                        style={{ flex: 1 }}
                      >
                        <Button
                          variant="outline"
                          size="small"
                          style={{ width: "100%" }}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleDeleteProduct(item.id)}
                        style={{ flex: 1 }}
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {productList.length === 0 && (
            <div className="column is-12 has-text-centered my-6">
              <p className="has-text-grey">Tidak ada produk yang ditemukan.</p>
            </div>
          )}
        </div>
      )}

      {/* PAGINASI */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </DashboardLayout>
  );
};
