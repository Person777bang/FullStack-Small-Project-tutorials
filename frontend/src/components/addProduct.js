import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
    }

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/products', {
                name, price, categoryId
            });
            navigate('/products');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveProduct}>
                    <p className="has-text-danger">{msg}</p>
                    <div className="field">
                        <label className="label">Name</label>
                        <input type="text" className="input" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="field">
                        <label className="label">Price</label>
                        <input type="number" className="input" value={price}
                            onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="field">
                        <label className="label">Category</label>
                        <div className="select is-fullwidth">
                            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                <option value="">-- Pilih Category --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="button is-success">Save</button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;