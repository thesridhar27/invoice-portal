import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // SAFE INITIALIZATION: Check if user exists in localStorage before parsing
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');
            // Ensure savedUser is a valid string and not "undefined"
            if (savedUser && savedUser !== "undefined") {
                return JSON.parse(savedUser);
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
        }
        return null;
    });

    const login = async (email, password) => {
        try {
            // Ensure the payload keys match exactly what your PHP expects
            const res = await api.post('/auth.php?action=login', { email, password });
            
            if (res.data && !res.data.error) {
                const userData = res.data;
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                return true;
            }
            return false;
        } catch (err) {
            console.error("Login API Error:", err.response?.data || err.message);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        // Optional: Redirect to login or refresh page
        window.location.href = '/login';
    };

    // Effect to keep the user synced or handle token expiration if added later
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};