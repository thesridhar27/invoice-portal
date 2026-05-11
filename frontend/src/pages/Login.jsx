import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(""); 
        try {
            const success = await login(formData.email, formData.password);
            if (success) navigate('/');
            else setErrorMsg("Invalid email or password.");
        } catch (err) {
            setErrorMsg("Connection error.");
        }
    };

    // Clean, Static Labels (No floating overlap)
    const inputWrapper = "flex flex-col bg-white border border-gray-200 rounded-2xl p-4 mb-4 transition-all focus-within:border-[#1B6CA8] focus-within:shadow-sm";
    const labelStyle = "text-[10px] font-bold text-[#1B6CA8] uppercase tracking-wider mb-1";
    const inputStyle = "bg-transparent outline-none text-gray-700 text-base w-full";

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f3f7fa] p-4">
            
            {/* The Card - Force width with style to prevent stretching */}
            <div 
                className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-white"
                style={{ width: '100%', maxWidth: '400px' }}
            >
                
                <header className="text-center mb-8">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Secure Portal</h2>
                    <p className="text-gray-400 text-xs mt-1 font-medium italic">Log in to manage your invoices.</p>
                </header>

                {errorMsg && (
                    <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-center text-[10px] font-bold border border-red-100">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Email Group */}
                    <div className={inputWrapper}>
                        <label className={labelStyle}>Email Address</label>
                        <input 
                            type="email" 
                            required
                            placeholder="name@example.com"
                            className={inputStyle}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    {/* Password Group */}
                    <div className={inputWrapper}>
                        <label className={labelStyle}>Password</label>
                        <div className="flex items-center">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                required
                                placeholder="••••••••"
                                className={inputStyle}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-[10px] font-bold text-gray-400 hover:text-[#1B6CA8] uppercase ml-2"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-[#1B6CA8] text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:brightness-105 transition-all mt-2 active:scale-95">
                        Sign In
                    </button>
                </form>

                <footer className="mt-10 text-center text-[11px] font-medium text-gray-400">
                    New here? <Link to="/register" className="text-[#1B6CA8] font-bold hover:underline">Create Account</Link>
                </footer>
            </div>
        </div>
    );
}