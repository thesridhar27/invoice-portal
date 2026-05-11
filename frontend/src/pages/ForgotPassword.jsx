import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleForgot = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Pointing to auth.php with the forgot action
            const res = await api.post('/auth.php?action=forgot', { email });
            
            if (res.data.message) {
                setSent(true);
            } else {
                alert(res.data.error || "User not found");
            }
        } catch (err) {
            alert("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 relative font-sans overflow-hidden" 
             style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #e1effe 100%)' }}>
            
            <div className="w-full max-w-lg bg-white/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl p-12 border border-white/60 relative z-10 text-center">
                {!sent ? (
                    <>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-4">Reset Access</h2>
                        <p className="text-gray-500 mb-10 font-medium">Enter your email and we'll help you get back in.</p>
                        
                        <form onSubmit={handleForgot} className="space-y-6 text-left">
                            <div className="bg-white/50 rounded-2xl border border-white/20 focus-within:bg-white focus-within:border-[#1B6CA8] transition-all overflow-hidden">
                                <input 
                                    type="email" required placeholder="Account Email Address"
                                    className="w-full p-5 bg-transparent outline-none text-gray-800"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#1B6CA8] text-white p-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:brightness-110 active:scale-[0.98] transition-all"
                            >
                                {loading ? "Sending..." : "Recover Password"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="py-8">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100 shadow-lg shadow-green-100">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Check Email</h2>
                        <p className="text-gray-500 font-medium">Instructions have been sent to <br/><span className="text-[#1B6CA8] font-bold">{email}</span></p>
                    </div>
                )}

                <footer className="mt-10 border-t border-gray-100 pt-8">
                    <Link to="/login" className="text-sm font-black text-gray-400 uppercase tracking-widest hover:text-[#1B6CA8] transition-colors">
                        ← Back to Secure Login
                    </Link>
                </footer>
            </div>
        </div>
    );
}