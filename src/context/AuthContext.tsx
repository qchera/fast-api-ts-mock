import { createContext, useState, useContext, type ReactNode } from 'react';
import type { FC } from 'react';
import { logoutApi } from '../services/authService';

interface AuthContextType {
    token: string | null;
    loginCtx: (token: string) => void;
    logoutCtx: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const loginCtx = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logoutCtx = async () => {
        try {
            if (token) {
                await logoutApi();
            }
        } catch (error) {
            console.error("Logout API failed, forcing local logout", error);
        } finally {
            localStorage.removeItem('token');
            setToken(null);
            window.location.href = '/login';
        }
    };

    return (
        <AuthContext.Provider value={{ token, loginCtx, logoutCtx }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};