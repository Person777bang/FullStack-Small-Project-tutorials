import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, getCategories } from "../../service/productService";
import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { Button } from "../../components/atoms/Button";

export const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      // Mengantisipasi response array langsung atau pembungkusan di dalam object
      const list = Array.isArray(data) ? data : data?.categories || [];
      setCategories(list);
    } catch (error) {
      console.error("Gagal mengambil data kategori:", error);
      setMsg("Gagal memuat daftar kategori.");
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!categoryId) {
      setMsg("Silakan pilih kategori terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    try {
      await createProduct({
        name,
        price: Number(price),
        stock: Number(stock),
        description,
        categoryId: Number(categoryId),
      });
      navigate("/products");
    } catch (error) {
      if (error.response && error.response.data) {
        setMsg(error.response.data.msg || "Gagal menyimpan produk");
      } else {
        setMsg("Terjadi kesalahan pada server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Tambah Produk">
      <div className="card p-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 className="title is-5 mb-4">Tambah Produk Baru</h2>
        {msg && <p className="has-text-danger mb-4">{msg}</p>}

        <form onSubmit={saveProduct}>
          {/* DROPDOWN KATEGORI */}
          <div className="field mb-3">
            <label className="label is-size-7">KATEGORI *</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option value="">-- Pilih Kategori --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name ||
                        cat.category_name ||
                        cat.nama_kategori ||
                        `Kategori #${cat.id}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field mb-3">
            <label className="label is-size-7">NAMA PRODUK *</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Nama Produk"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mb-3">
            <label className="label is-size-7">HARGA (RP) *</label>
            <div className="control">
              <input
                type="number"
                className="input"
                placeholder="100000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mb-3">
            <label className="label is-size-7">STOK *</label>
            <div className="control">
              <input
                type="number"
                className="input"
                placeholder="10"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mb-4">
            <label className="label is-size-7">DESKRIPSI</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Deskripsi produk..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="is-flex is-justify-content-flex-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/products")}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
