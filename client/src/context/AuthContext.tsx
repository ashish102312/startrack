import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

interface User {
    id: string;
    username: string;
    email: string;
    profilePic: string;
    bio: string;
    isVerified: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    axios.defaults.headers.common['x-auth-token'] = token;
                    const res = await axios.get(`${API_BASE_URL}/api/auth/me`);
                    // Ensure the ID is available in the user object
                    const userData = { ...res.data, id: res.data._id || res.data.id };
                    setUser(userData);
                } catch (error) {
                    console.error("Auth load error", error);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                    delete axios.defaults.headers.common['x-auth-token'];
                }
            } else {
                delete axios.defaults.headers.common['x-auth-token'];
            }
            setLoading(false);
        };

        loadUser();
    }, [token]);

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
        axios.defaults.headers.common['x-auth-token'] = newToken;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['x-auth-token'];
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, loading, token, login, logout, updateUser }}>
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
