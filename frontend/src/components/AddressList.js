import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const AddressList = () => {
    const [addresses, setAddresses] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getAddresses();
    }, []);

    const getAddresses = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/addresses', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAddresses(response.data);
        } catch (error) {
            if (error.response) setMsg(error.response.data.msg);
        }
    }

    const deleteAddress = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/addresses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            getAddresses();
        } catch (error) {
            if (error.response) setMsg(error.response.data.msg);
        }
    }

    const setPrimary = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:5000/addresses/${id}/primary`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            getAddresses();
        } catch (error) {
            if (error.response) setMsg(error.response.data.msg);
        }
    }

    return (
        <div className="columns mt-6 is-centered">
            <div className="column is-two-thirds">
                <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
                    <h1 className="page-title">Alamat Saya</h1>
                    <Link to={`/addresses/add`} className='button btn-luxury'>+ Tambah Alamat</Link>
                </div>

                <p className="has-text-danger">{msg}</p>

                {addresses.length === 0 && (
                    <div className="notification is-light has-text-centered">
                        Belum ada alamat tersimpan. Klik "+ Tambah Alamat" untuk menambahkan.
                    </div>
                )}

                <div className="address-grid">
                    {addresses.map((address) => (
                        <div
                            key={address.id}
                            className={`address-card ${address.isPrimary ? 'address-card-active' : ''}`}
                        >
                            {address.isPrimary && (
                                <span className="address-badge">Alamat Utama</span>
                            )}

                            <h3 className="address-label">{address.label}</h3>
                            <p className="address-name">{address.recipientName} · {address.phone}</p>
                            <p className="address-detail">{address.fullAddress}</p>
                            <p className="address-detail">{address.city}, {address.postalCode}</p>

                            <div className="address-actions mt-3">
                                {!address.isPrimary && (
                                    <button
                                        onClick={() => setPrimary(address.id)}
                                        className='button btn-luxury action-btn mr-2'
                                    >
                                        Gunakan Alamat Ini
                                    </button>
                                )}
                                <Link to={`/addresses/edit/${address.id}`} className='button btn-outline-luxury action-btn mr-2'>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteAddress(address.id)}
                                    className='button is-danger action-btn'
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AddressList;