import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Layout: React.FC = () => {
    const { logoutCtx } = useAuth();

    return (
        <div className="app-layout">
            <nav className="navbar">
                <div className="nav-brand">FastAPI Admin</div>
                <div className="nav-links">
                    <Link to="/">Dashboard</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/shipments">Shipments</Link>
                    <button onClick={logoutCtx} className="btn-logout">Logout</button>
                </div>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;