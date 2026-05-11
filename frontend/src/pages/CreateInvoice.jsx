import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function CreateInvoice() {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        client_name: '',
        amount: '',
        due_date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/invoices.php', { ...formData, user_id: user.id });
            alert("Invoice created successfully!");
            navigate('/');
        } catch (err) {
            alert("Error creating invoice");
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            {/* Navbar */}
            <nav className="bg-[#1B6CA8] text-white p-4 shadow-lg shrink-0">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        <span className="font-bold">Back to Dashboard</span>
                    </Link>
                    <h1 className="text-lg font-black uppercase tracking-widest">New Invoice</h1>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="flex-grow flex items-center justify-center p-6">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    
                    {/* LEFT SIDE: The Input Form (Full Height) */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col justify-center h-full">
                        <h2 className="text-3xl font-black text-gray-800 mb-8">Create Entry</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Client Name</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Company Name"
                                    className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#1B6CA8] focus:bg-white transition-all outline-none"
                                    onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Amount ($)</label>
                                <input 
                                    type="number" 
                                    required
                                    placeholder="0.00"
                                    className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#1B6CA8] focus:bg-white transition-all outline-none"
                                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Due Date</label>
                                <input 
                                    type="date" 
                                    required
                                    value={formData.due_date}
                                    className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#1B6CA8] focus:bg-white transition-all outline-none"
                                    onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-[#1B6CA8] text-white p-5 rounded-2xl font-black text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all mt-4"
                            >
                                Save to Database
                            </button>
                        </form>
                    </div>

                    {/* RIGHT SIDE: The Live Preview (Matches Height) */}
                    <div className="hidden lg:flex flex-col h-full">
                        <div className="bg-white flex-grow rounded-[2.5rem] shadow-2xl p-12 border-t-[14px] border-[#1B6CA8] flex flex-col justify-between relative overflow-hidden">
                            {/* Watermark/Decoration */}
                            <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-blue-50 rounded-full opacity-50 -z-10"></div>
                            
                            <div>
                                <div className="flex justify-between items-start mb-16">
                                    <div>
                                        <h3 className="text-4xl font-black text-[#1B6CA8]">BILL</h3>
                                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-1 italic">Draft Preview</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-gray-400 uppercase">Issue Date</p>
                                        <p className="font-bold text-gray-700">{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Recipient</p>
                                        <p className="text-3xl font-extrabold text-gray-800 leading-tight">
                                            {formData.client_name || 'Your Client Name'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Payment Terms</p>
                                        <p className="font-bold text-gray-600">Payable by {formData.due_date}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 border-t-4 border-double border-gray-100 flex justify-between items-center mt-auto">
                                <p className="text-xl font-black text-gray-400 uppercase tracking-tighter">Total Balance</p>
                                <p className="text-5xl font-black text-[#1B6CA8] tabular-nums">
                                    ${formData.amount || '0.00'}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}