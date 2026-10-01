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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      const list = Array.isArray(data) ? data : data?.categories || [];
      setCategories(list);
    } catch (error) {
      console.error("Gagal mengambil data kategori:", error);
      setMsg("Gagal memuat daftar kategori.");
    }
  };

  // HANDLER UNTUK UPLOAD BANYAK GAMBAR / SINGLE GAMBAR
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Hapus blob URL lama agar memory terbebaskan
    previews.forEach((url) => URL.revokeObjectURL(url));

    // Buat URL preview sementara untuk gambar yang baru dipilih
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!categoryId) {
      setMsg("Silakan pilih kategori terlebih dahulu.");
      return;
    }

    // MEMBUAT FORM DATA UNTUK MENGIRIM FILE DENGAN MULTER
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", Number(price));
    formData.append("stock", Number(stock));
    formData.append("description", description);
    formData.append("categoryId", Number(categoryId));

    // Tambahkan file ke key 'images' (sesuai backend Multer upload.array("images", 5))
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    setIsLoading(true);
    try {
      await createProduct(formData);
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
          {/* UPLOAD FOTO PRODUK (SINGLE / MULTIPLE) */}
          <div className="field mb-3">
            <label className="label is-size-7">
              FOTO PRODUK (BISA SINGLE / MULTIPLE)
            </label>
            <div className="control">
              <input
                type="file"
                className="input"
                multiple
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageChange}
              />
            </div>
            <p className="help">
              Pilih 1 atau beberapa foto sekaligus (JPG, PNG, WEBP)
            </p>
          </div>

          {/* PREVIEW GAMBAR */}
          {previews.length > 0 && (
            <div className="field mb-3">
              <label className="label is-size-7">PREVIEW FOTO</label>
              <div
                className="is-flex gap-2"
                style={{ overflowX: "auto", paddingBottom: "5px" }}
              >
                {previews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

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

          {/* NAMA PRODUK */}
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

          {/* HARGA */}
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

          {/* STOK */}
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

          {/* DESKRIPSI */}
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

          {/* TOMBOL AKSI */}
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
