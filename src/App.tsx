import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { CreateShipment } from './pages/CreateShipment';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import type {JSX} from "react";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    // Проста перевірка на наявність токена в localStorage для запобігання миготіння
    const token = localStorage.getItem('access_token');
    if (!isAuthenticated && !token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="/dashboard" element={
                            <ProtectedRoute><Dashboard /></ProtectedRoute>
                        } />

                        <Route path="/create" element={
                            <ProtectedRoute><CreateShipment /></ProtectedRoute>
                        } />

                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;