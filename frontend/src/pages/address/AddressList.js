import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAddresses, deleteAddress } from "../../service/addressService";

import { DashboardLayout } from "../../components/templates/DashboardLayout";
import { AddressTable } from "../../components/organisms/AddressTable";
import { SearchInput } from "../../components/molecules/SearchInput";
import { Pagination } from "../../components/molecules/Pagination";
import { Button } from "../../components/atoms/Button";

export const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAddresses();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, currentPage]);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const data = await getAddresses(search, currentPage, itemsPerPage);

      // Ekstraksi data agar dipastikan berbentuk Array
      if (data && Array.isArray(data.addresses)) {
        setAddresses(data.addresses);
        setTotalPages(data.totalPages || 1);
      } else if (data && Array.isArray(data.data)) {
        setAddresses(data.data);
        if (data.totalPages) setTotalPages(data.totalPages);
      } else if (Array.isArray(data)) {
        setAddresses(data);
      } else {
        setAddresses([]);
      }

      setMsg("");
    } catch (error) {
      setAddresses([]);
      if (error.response) {
        setMsg(error.response.data.msg || "Gagal mengambil data alamat.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      fetchAddresses();
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
  };

  // Safe Guard: Memastikan data berbentuk Array sebelum dirender
  const addressList = Array.isArray(addresses) ? addresses : [];
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <DashboardLayout title="Daftar Alamat">
      <div className="mb-5 is-flex is-justify-content-space-between is-align-items-center flex-wrap gap-2">
        <h1 className="title is-4 mb-0" style={{ color: "#0F172A" }}>
          Daftar Alamat
        </h1>
        <Link to="/addresses/add">
          <Button variant="primary" size="small">
            + Tambah Alamat
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
          placeholder="Cari jalan, kota, atau provinsi..."
        />
      </div>

      {msg && <p className="has-text-danger mb-3">{msg}</p>}

      <AddressTable
        addresses={addressList}
        startIndex={startIndex}
        onDelete={handleDeleteAddress}
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
