import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/services';
import styles from './Auth.module.css';
import type {AxiosError} from "axios";

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await authService.register(formData);
            alert('Successfully registered! Please log in.');
            navigate('/login');
        } catch (err) {
            const axiosError = err as AxiosError<{ detail: string }>;
            const msg = axiosError.response?.data?.detail || 'Registration failed';
            setError(msg);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Реєстрація</h2>
                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    <input
                        name="full_name"
                        type="text"
                        placeholder="Повне ім'я"
                        value={formData.full_name}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button}>Зареєструватися</button>
                </form>

                <Link to="/login" className={styles.link}>
                    Вже є акаунт? Увійти
                </Link>
            </div>
        </div>
    );
};