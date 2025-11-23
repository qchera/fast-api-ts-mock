import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import {useDispatch} from "react-redux";
import {setError} from "../redux/slices/errorSlice.ts";

const LoginPage: React.FC = () => {
    const [loginParam, setLoginParam] = useState('');
    const [password, setPassword] = useState('');
    const { loginCtx } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log("Attempting login...");
            if (!loginParam) {
                dispatch(setError("Your email or username can't be empty"))
            }
            if (!password) {
                dispatch(setError("Your password can't be empty"))
            }
            const token = await login(loginParam, password);

            console.log("Login success, received token:", token);

            if (token) {
                console.log("Saving token:", token.substring(0, 10) + "...");
                loginCtx(token);

                setTimeout(() => {
                    navigate('/');
                }, 100);
            } else {
                console.error("No token found in response", token);
            }
        } catch (err: any) {
            console.error("Login error:", err);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email / Username</label>
                        <input
                            id="email"
                            type="text"
                            value={loginParam}
                            onChange={(e) => setLoginParam(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary">Sign In</button>
                </form>
                <div className="auth-link">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;