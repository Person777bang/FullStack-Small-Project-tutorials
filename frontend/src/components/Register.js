import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {
                name, email, password, confirmPassword
            });
            setMsg(response.data.msg);
            setTimeout(() => navigate('/login'), 1000);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-one-third">
                <h1 className="title has-text-centered">Register</h1>
                <form onSubmit={handleRegister}>
                    <p className="has-text-danger">{msg}</p>
                    <div className="field">
                        <label className="label">Name</label>
                        <input type="text" className="input" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>
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
                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <input type="password" className="input" value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="button is-success is-fullwidth">Register</button>
                </form>
                <p className="mt-3 has-text-centered">
                    Sudah punya akun? <Link to="/login">Login di sini</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;