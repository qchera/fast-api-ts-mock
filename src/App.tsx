import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage.tsx';
import UsersPage from './pages/UsersPage';
import ShipmentsPage from './pages/ShipmentsPage';
import './App.css';
import RegisterPage from "./pages/RegisterPage";
import store from "./redux/store";
import {Provider} from "react-redux";
import GlobalErrorListener from "./components/error/GlobalErrorListener";
import {ToastContainer} from "react-toastify";

const ProtectedRoute: React.FC = () => {
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/shipments" element={<ShipmentsPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Router>
                    <GlobalErrorListener />
                    <ToastContainer />
                    <AppRoutes />
                </Router>
            </AuthProvider>
        </Provider>
    );
};

export default App;