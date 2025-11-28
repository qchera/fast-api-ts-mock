import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {login} from '../services/authService';
import { useAuth } from '../context/AuthContext';
import {useDispatch, useSelector} from "react-redux";
import {clearError, setError} from "../redux/slices/errorSlice.ts";
import {selectError} from "../redux/store.ts";

const LoginPage: React.FC = () => {
    const [loginParam, setLoginParam] = useState('');
    const [password, setPassword] = useState('');
    const { loginCtx } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const errorMessage = useSelector(selectError)
    const [localError, setLocalError] = useState<string | null>(null)

    useEffect(() => {
        if (errorMessage && errorMessage !== localError) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocalError(errorMessage);
        }
    }, [errorMessage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError())

        try {
            console.log("Attempting login...");
            if (!loginParam) {
                dispatch(setError("Your email or username can't be empty"))
                return
            }
            if (!password) {
                dispatch(setError("Your password can't be empty"))
                return
            }
            const token = await login(loginParam, password);

            console.log("Login success, received token:", token);

            if (token) {
                console.log("Saving token:", token.substring(0, 10) + "...");
                loginCtx(token);

                setTimeout(() => {
                    navigate('/', { replace: true });
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
                {localError && <div className="error-msg">{localError}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email / Username</label>
                        <input
                            id="email"
                            type="text"
                            value={loginParam}
                            onChange={(e) => setLoginParam(e.target.value.trim())}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value.trim())}
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