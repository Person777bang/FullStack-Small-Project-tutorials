import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getProducts();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/products?search_query=${encodeURIComponent(search)}&page=${currentPage}&limit=${itemsPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
          <Link to={`/products/add`} className="button is-success">
            Add Product
          </Link>
          <input
            type="text"
            className="input search-input-compact"
            placeholder="Cari nama produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <p className="has-text-danger">{msg}</p>

        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="has-text-centered">
                  Tidak ada data ditemukan
                </td>
              </tr>
            )}
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.ProductCategory?.name}</td>
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
  );
};

export default ProductList;
