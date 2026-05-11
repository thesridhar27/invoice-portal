import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [invoices, setInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchInvoices = async () => {
        // SAFETY GUARD: Don't call API if user isn't loaded yet
        if (!user || !user.id) {
            setLoading(false);
            return;
        }

        try {
            const res = await api.get(`/invoices.php?user_id=${user.id}`);
            setInvoices(res.data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, [user]);

    // Search & Progress Calculations
    const filteredInvoices = invoices.filter(inv => 
        inv.client_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paidCount = invoices.filter(inv => inv.status === 'paid').length;
    const progress = invoices.length > 0 ? (paidCount / invoices.length) * 100 : 0;
    const pendingBalance = invoices
        .filter(inv => inv.status === 'pending')
        .reduce((sum, inv) => sum + parseFloat(inv.total || 0), 0);

    const downloadPDF = (invoice) => {
        const doc = new jsPDF();
        doc.text("INVOICE", 14, 20);
        autoTable(doc, {
            startY: 30,
            head: [['Client', 'Status', 'Total']],
            body: [[invoice.client_name, invoice.status.toUpperCase(), `$${invoice.total}`]],
        });
        doc.save(`${invoice.client_name}_Invoice.pdf`);
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'pending' ? 'paid' : 'pending';
        await api.put('/invoices.php', { id, status: newStatus });
        fetchInvoices();
    };

    const deleteInvoice = async (id) => {
        if (window.confirm("Delete this invoice?")) {
            await api.delete(`/invoices.php?id=${id}`);
            fetchInvoices();
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-[#1B6CA8]">Loading Workspace...</div>;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
            <nav className="bg-[#1B6CA8] sticky top-0 z-50 text-white p-4 flex justify-between items-center shadow-xl mb-8">
                <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <h1 className="text-xl font-black tracking-tight">InvoicePortal</h1>
                </div>
                <div className="flex gap-4">
                    <Link to="/create-invoice" className="bg-white text-[#1B6CA8] px-5 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-100 transition-all">+ New Entry</Link>
                    <button onClick={logout} className="bg-red-500/20 hover:bg-red-500 px-4 py-2 rounded-xl font-bold text-sm transition-all border border-red-500/50">Logout</button>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h4 className="text-gray-400 text-xs font-black uppercase tracking-widest">Efficiency</h4>
                                <p className="text-2xl font-black">{progress.toFixed(0)}%</p>
                            </div>
                            <span className="text-xs font-bold text-[#1B6CA8] bg-blue-50 px-3 py-1 rounded-full">{paidCount}/{invoices.length} Paid</span>
                        </div>
                        <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                            <div className="bg-[#1B6CA8] h-full transition-all" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Pending</p>
                        <h3 className="text-3xl font-black text-orange-500">${pendingBalance.toFixed(2)}</h3>
                    </div>
                </div>

                <div className="relative mb-8">
                    <input type="text" placeholder="Search client..." className="w-full p-5 pl-12 rounded-2xl shadow-md outline-none focus:ring-4 focus:ring-blue-100 transition-all border-none" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-50">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Client</th>
                                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredInvoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-blue-50/20">
                                    <td className="p-6">
                                        <p className="font-bold text-gray-800">{inv.client_name}</p>
                                        <p className="text-xs text-gray-400">Due: {inv.due_date}</p>
                                    </td>
                                    <td className="p-6 font-black text-gray-900">${inv.total}</td>
                                    <td className="p-6">
                                        <button onClick={() => toggleStatus(inv.id, inv.status)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${inv.status === 'paid' ? 'bg-green-500 text-white' : 'bg-orange-100 text-orange-500'}`}>{inv.status}</button>
                                    </td>
                                    <td className="p-6 text-right space-x-4">
                                        <button onClick={() => downloadPDF(inv)} className="text-[#1B6CA8] font-bold text-xs">PDF</button>
                                        <button onClick={() => deleteInvoice(inv.id)} className="text-gray-300 hover:text-red-500 font-bold text-xs">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}