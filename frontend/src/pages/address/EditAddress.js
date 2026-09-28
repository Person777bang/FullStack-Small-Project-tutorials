import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAddressById, updateAddress } from "../../service/addressService";
import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { Button } from "../../components/atoms/Button";

export const EditAddress = () => {
  const [recipientName, setRecipientName] = useState("");
  const [label, setLabel] = useState("");
  const [phone, setPhone] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await getAddressById(id);
        const data = response.data || response;

        setRecipientName(data.recipientName || "");
        setLabel(data.label || "");
        setPhone(data.phone || "");
        setFullAddress(data.fullAddress || "");
        setCity(data.city || "");
        setPostalCode(data.postalCode || "");
      } catch (error) {
        if (error.response) setMsg(error.response.data.msg);
      }
    };

    fetchAddress();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateAddress(id, {
        label,
        recipientName,
        phone,
        fullAddress,
        city,
        postalCode,
      });
      navigate("/addresses");
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  };

  return (
    <DashboardLayout title="Edit Alamat">
      <div className="card p-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h2 className="title is-5 mb-4">Edit Alamat</h2>
        {msg && <p className="has-text-danger mb-4">{msg}</p>}

        <form onSubmit={handleUpdate}>
          <div className="field mb-3">
            <label className="label is-size-7">NAMA PENERIMA *</label>
            <div className="control">
              <input
                type="text"
                className="input"
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
              Perbarui
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
