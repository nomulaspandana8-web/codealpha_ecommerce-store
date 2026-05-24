import React, { useState } from 'react';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {

        const res = await axios.post(
            'http://localhost:5000/api/auth/login',
            {
                email,
                password
            }
        );

        localStorage.setItem('token', res.data.token);

        alert('Login Successful');
    };

    return (
        <div>

            <h1>Login</h1>

            <input
                type='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={loginUser}>
                Login
            </button>

        </div>
    );
}

export default Login;