import React, { createContext, useState, useContext, useEffect } from 'react';
import type {User} from '../types';
import { authService } from '../api/services';

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (token: string) => {
        localStorage.setItem('access_token', token);
        fetchUser();
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const fetchUser = async () => {
        try {
            const response = await authService.me();
            setUser(response.data);
            setIsAuthenticated(true);
        } catch {
            logout();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            fetchUser();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
    {children}
    </AuthContext.Provider>
);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)!;