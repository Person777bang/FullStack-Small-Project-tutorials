import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAddress } from "../../service/addressService";
import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { Button } from "../../components/atoms/Button";

export const AddAddress = () => {
  const [recipientName, setRecipientName] = useState("");
  const [label, setLabel] = useState("");
  const [phone, setPhone] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const saveAddress = async (e) => {
    e.preventDefault();
    try {
      // Key disesuaikan persis dengan req.body di AddressController.js
      await createAddress({
        label,
        recipientName,
        phone,
        fullAddress,
        city,
        postalCode,
      });
      navigate("/addresses");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg || "Gagal menyimpan data.");
      }
    }
  };

  return (
    <DashboardLayout title="Tambah Alamat">
      <div className="card p-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 className="title is-5 mb-4">Tambah Alamat Baru</h2>
        {msg && <p className="has-text-danger mb-4">{msg}</p>}

        <form onSubmit={saveAddress}>
          <div className="field mb-3">
            <label className="label is-size-7">NAMA PENERIMA *</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Contoh: Sasa"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mb-3">
            <label className="label is-size-7">LABEL ALAMAT *</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Contoh: Rumah / Kantor"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mb-3">
            <label className="label is-size-7">NO. TELEPON *</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Contoh: 0819272398"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mb-3">
            <label className="label is-size-7">JALAN / ALAMAT LENGKAP *</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Jl. Makah No. 12"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mb-3">
            <label className="label is-size-7">KOTA *</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Bekasi"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mb-4">
            <label className="label is-size-7">KODE POS *</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="17111"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="is-flex is-justify-content-flex-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/addresses")}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
