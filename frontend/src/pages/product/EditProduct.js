import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../service/productService";
import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { Button } from "../../components/atoms/Button";

export const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setName(data.name || data.product_name || "");
        setPrice(data.price || "");
        setStock(data.stock || "");
        setDescription(data.description || "");
      } catch (error) {
        if (error.response) setMsg(error.response.data.msg);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, {
        name,
        price: Number(price),
        stock: Number(stock),
        description,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  };

  return (
    <DashboardLayout title="Edit Produk">
      <div className="card p-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 className="title is-5 mb-4">Edit Produk</h2>
        {msg && <p className="has-text-danger mb-4">{msg}</p>}

        <form onSubmit={handleUpdate}>
          <div className="field mb-3">
            <label className="label is-size-7">NAMA PRODUK *</label>
            <div className="control">
              <input
                type="text"
                className="input"
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
            <Button type="submit" variant="primary">
              Perbarui
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
