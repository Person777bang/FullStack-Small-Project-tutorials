import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddAddress = () => {
    const [label, setLabel] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [phone, setPhone] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveAddress = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/addresses', {
                label, recipientName, phone, fullAddress, city, postalCode
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/addresses');
        } catch (error) {
            if (error.response) setMsg(error.response.data.msg);
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <div className="card-container">
                    <h1 className="page-title mb-4">Tambah Alamat Baru</h1>

                    <form onSubmit={saveAddress}>
                        <p className="has-text-danger">{msg}</p>

                        <div className="field">
                            <label className="label">Label Alamat</label>
                            <div className="control">
                                <input type="text" className="input" value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    placeholder="Contoh: Rumah, Kantor" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Nama Penerima</label>
                            <div className="control">
                                <input type="text" className="input" value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    placeholder="Nama lengkap penerima" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">No. Telepon</label>
                            <div className="control">
                                <input type="text" className="input" value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="08xxxxxxxxxx" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Alamat Lengkap</label>
                            <div className="control">
                                <textarea className="textarea" value={fullAddress}
                                    onChange={(e) => setFullAddress(e.target.value)}
                                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan" />
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="label">Kota</label>
                                    <div className="control">
                                        <input type="text" className="input" value={city}
                                            onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <label className="label">Kode Pos</label>
                                    <div className="control">
                                        <input type="text" className="input" value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="field is-flex">
                            <button type="submit" className="button btn-luxury mr-2">Simpan Alamat</button>
                            <Link to="/addresses" className="button btn-outline-luxury">Batal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddAddress;