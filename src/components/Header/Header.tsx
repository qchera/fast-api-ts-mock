import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

export const Header: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}><Link to="/">📦 ShipManager</Link></div>
            <nav className={styles.nav}>
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard">Мої посилки</Link>
                        <Link to="/create">Створити</Link>
                        <div className={styles.userParams}>
                            <span>Вітаю, <b>{user?.full_name}</b></span>
                            <button onClick={handleLogout} className={styles.logoutBtn}>Вийти</button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login">Увійти</Link>
                        <Link to="/register">Реєстрація</Link>
                    </>
                )}
            </nav>
        </header>
    );
};