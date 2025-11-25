import React, {useEffect} from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {useDispatch, useSelector} from "react-redux";
import {clearUserData, setUserData} from "../../redux/slices/userSlice.ts";
import {getMe} from "../../services/userService.ts";
import {connectSocket} from "../../redux/actions/socketActions.ts";
import {selectUserData} from "../../redux/store.ts";
import type {User} from "../../types";

const Layout: React.FC = () => {
    const { logoutCtx } = useAuth();
    const dispatch = useDispatch();
    const userData: User | null = useSelector(selectUserData);

    const onLogout = () => {
        dispatch(clearUserData());
        logoutCtx();
    }

    useEffect(() => {
        if (!userData) {
            (async () => {
                return await getMe()
            } )().then((data) => {
                dispatch(setUserData(data));
            })
                .catch(console.error);
        }
        dispatch(connectSocket())
    }, [dispatch, userData]);

    return (
        <div className="app-layout">
            <nav className="navbar">
                <div className="nav-brand">FastAPI Admin</div>
                <div className="nav-links">
                    <p><strong>{userData?.fullName}</strong></p>
                    <Link to="/">Dashboard</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/shipments">Shipments</Link>
                    <button onClick={onLogout} className="btn-logout">Logout</button>
                </div>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;