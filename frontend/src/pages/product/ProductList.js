import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { getProducts, deleteProduct } from "../../service/productService";

import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { SearchInput } from "../../components/molecules/SearchInput";
import { Pagination } from "../../components/molecules/Pagination";
import { ProductCard } from "../../components/molecules/ProductCard";
import { Button } from "../../components/atoms/Button";

const ITEMS_PER_PAGE = 8;
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Ambil data user yang sedang login dari localStorage (sesuai pola Login.js)
  const user = JSON.parse(localStorage.getItem("account")) || {};

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
        setTotalPages(1);
      } else {
        setProducts([]);
      }

      setMsg("");
    } catch (error) {
      setProducts([]);
      if (error.response) {
        setMsg(error.response.data?.msg || "Gagal mengambil data produk.");
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
    if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?"))
      return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data?.msg || "Gagal menghapus produk.");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

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
          onChange={handleSearchChange}
          placeholder="Cari nama produk..."
        />
      </div>

      {msg && <p className="has-text-danger mb-4">{msg}</p>}

      {loading ? (
        <div className="has-text-centered my-6">
          <p className="has-text-grey">Memuat data produk...</p>
        </div>
      ) : (
        <div className="columns is-multiline mb-5">
          {products.length > 0 ? (
            products.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                user={user}
                apiBaseUrl={API_BASE_URL}
                onDelete={handleDeleteProduct}
              />
            ))
          ) : (
            <div className="column is-12 has-text-centered my-6">
              <p className="has-text-grey">Tidak ada produk yang ditemukan.</p>
            </div>
          )}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </DashboardLayout>
  );
};
