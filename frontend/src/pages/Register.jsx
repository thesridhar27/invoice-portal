import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [focus, setFocus] = useState({ name: false, email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const res = await api.post('/auth.php?action=register', formData);

            if (res.data.message === "Success") {
                alert("Registration Successful! Please login.");
                navigate('/login');
            } else {
                setErrorMsg(res.data.error || "Registration failed");
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.error || "Server error. Ensure XAMPP is running.");
        }
    };

    const inputBox = "relative bg-white/50 rounded-2xl border border-white/20 transition-all focus-within:bg-white focus-within:border-[#1B6CA8] focus-within:shadow-lg";
    const labelStyle = "absolute left-4 transition-all pointer-events-none";

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 font-sans overflow-hidden" 
             style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #e1effe 100%)' }}>
            
            <div className="w-full max-w-lg bg-white/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl p-12 border border-white/60 z-10">
                <header className="text-center mb-10">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">Create Account</h2>
                    <p className="text-gray-500 font-medium">Join the Secure Portal today.</p>
                </header>

                {errorMsg && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-center text-sm font-bold">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className={inputBox}>
                        <label className={`${labelStyle} ${focus.name || formData.name ? 'top-1.5 text-[10px] font-black text-[#1B6CA8] uppercase tracking-widest' : 'top-4 text-gray-400'}`}>
                            Full Name
                        </label>
                        <input 
                            type="text" required
                            className="w-full px-4 pt-6 pb-2 bg-transparent outline-none text-gray-800"
                            onFocus={() => setFocus({...focus, name: true})}
                            onBlur={() => setFocus({...focus, name: false})}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div className={inputBox}>
                        <label className={`${labelStyle} ${focus.email || formData.email ? 'top-1.5 text-[10px] font-black text-[#1B6CA8] uppercase tracking-widest' : 'top-4 text-gray-400'}`}>
                            Email Address
                        </label>
                        <input 
                            type="email" required
                            className="w-full px-4 pt-6 pb-2 bg-transparent outline-none text-gray-800"
                            onFocus={() => setFocus({...focus, email: true})}
                            onBlur={() => setFocus({...focus, email: false})}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className={inputBox}>
                        <label className={`${labelStyle} ${focus.password || formData.password ? 'top-1.5 text-[10px] font-black text-[#1B6CA8] uppercase tracking-widest' : 'top-4 text-gray-400'}`}>
                            Password
                        </label>
                        <input 
                            type={showPassword ? "text" : "password"} required
                            className="w-full px-4 pt-6 pb-2 bg-transparent outline-none text-gray-800"
                            onFocus={() => setFocus({...focus, password: true})}
                            onBlur={() => setFocus({...focus, password: false})}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 bottom-3 text-[10px] font-bold text-gray-400 hover:text-[#1B6CA8] uppercase tracking-tighter"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button type="submit" className="w-full bg-[#1B6CA8] text-white p-5 rounded-2xl font-black text-lg shadow-xl hover:brightness-110 active:scale-95 transition-all mt-4">
                        Register Now
                    </button>
                </form>

                <footer className="mt-12 text-center text-sm font-medium text-gray-400">
                    Already have an account? <Link to="/login" className="text-[#1B6CA8] font-bold hover:underline">Sign In</Link>
                </footer>
            </div>
        </div>
    );
}