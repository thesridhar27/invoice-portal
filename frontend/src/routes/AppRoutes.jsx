import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CreateInvoice from '../pages/CreateInvoice';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';

/**
 * PrivateRoute Component
 * Prevents unauthorized users from accessing the Dashboard or Create Invoice pages.
 */
const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    // If no user is logged in, send them to the login page
    return user ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ==========================
                    PUBLIC ROUTES
                    ========================== */}
                
                {/* Login Page */}
                <Route path="/login" element={<Login />} />
                
                {/* Registration Page */}
                <Route path="/register" element={<Register />} />
                
                {/* Password Recovery Page */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                

                {/* ==========================
                    PROTECTED ROUTES
                    (Requires Login)
                    ========================== */}

                {/* Home / Dashboard */}
                <Route 
                    path="/" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } 
                />

                {/* Create Invoice */}
                <Route 
                    path="/create-invoice" 
                    element={
                        <PrivateRoute>
                            <CreateInvoice />
                        </PrivateRoute>
                    } 
                />


                {/* ==========================
                    FALLBACK ROUTE
                    ========================== */}
                
                {/* Catch-all: Redirect unknown paths to Home/Login */}
                <Route path="*" element={<Navigate to="/" replace />} />
                
            </Routes>
        </BrowserRouter>
    );
}