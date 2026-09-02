import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email, password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('account', JSON.stringify(response.data.account));
            navigate('/');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-one-third">
                <h1 className="title has-text-centered">Login</h1>
                <form onSubmit={handleLogin}>
                    <p className="has-text-danger">{msg}</p>
                    <div className="field">
                        <label className="label">Email</label>
                        <input type="email" className="input" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <input type="password" className="input" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="button is-info is-fullwidth">Login</button>
                </form>
                <p className="mt-3 has-text-centered">
                    Belum punya akun? <Link to="/register">Register di sini</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;