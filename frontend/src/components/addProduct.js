import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const token = localStorage.getItem('token');
             const response = await axios.get('http://localhost:5000/categories', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
             });
        setCategories(response.data);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
       
    }


   const saveProduct = async (e) => {
    e.preventDefault();

    if (price < 1 || stock < 1) {
        setMsg("Harga dan stock tidak boleh negatif");
        return;
    }

    try {
        const token = localStorage.getItem('token')
        await axios.post('http://localhost:5000/products', {
            name: name,
            price: price,
            stock: stock,
            categoryId: categoryId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
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
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Masukkan nama product"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Price</label>
                        <div className="control">
                            <input
                                type="number"
                                className="input"
                                value={price}
                                min="0"
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Masukkan harga product"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Stock</label>
                        <div className="control">
                            <input
                                type="number"
                                className="input"
                                value={stock}
                                min="0"
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="Masukkan stock product"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Category</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">-- Pilih Category --</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <button type="submit" className="button is-success">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;