import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getProducts, deleteProduct } from "../../service/productService";

import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { ProductTable } from "../../components/organisms/ProductTable";
import { SearchInput } from "../../components/molecules/SearchInput";
import { Pagination } from "../../components/molecules/Pagination";
import { Button } from "../../components/atoms/Button";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(search, currentPage, itemsPerPage);

      // Ekstraksi data agar dipastikan berbentuk Array
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
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  };

  // Safe Guard: Memastikan data berbentuk Array sebelum dirender
  const productList = Array.isArray(products) ? products : [];
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <DashboardLayout title="Daftar Produk">
      <div className="mb-5 is-flex is-justify-content-space-between is-align-items-center flex-wrap gap-2">
        <h1 className="title is-4 mb-0" style={{ color: "#0F172A" }}>
          Daftar Produk
        </h1>
        <Link to="/products/add">
          <Button variant="primary" size="small">
            + Tambah Produk
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
          placeholder="Cari nama produk..."
        />
      </div>

      {msg && <p className="has-text-danger mb-3">{msg}</p>}

      <ProductTable
        products={productList}
        startIndex={startIndex}
        onDelete={handleDeleteProduct}
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
