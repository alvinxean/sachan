// export default function CustomerDashboard() {
//     return (
//         <div><h3 className="text-lg font-bold text-gray-800">Dashboard</h3>
//             <p className="mt-3 text-gray-600">
//                 Halo Customer, ini adalah dashboard Anda.
//             </p>
//         </div>
//     );
// }

import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { PlusCircle, History, ArrowRight, RefreshCcw, ChevronRight, AlertTriangle, X } from 'lucide-react';

export default function CustomerDashboard() {
    const { auth } = usePage().props;
    const user = auth.user;
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showModalMonth, setShowModalMonth] = useState(false);
    const [showModalYear, setShowModalYear] = useState(false);

    const monthlyAmount = 8000;
    const monthlyLimit = 8000;
    const isExceededMonth = monthlyAmount > monthlyLimit;

    const yearlyAmount = 100000;
    const yearlyLimit = 100000;

    const isExceededYear = yearlyAmount > yearlyLimit;

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 800);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Dibuat': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Kedaluarsa': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'Batal': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    return (
        <div className="space-y-4">
            <div className=" flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Halo, {user.name}</h3>
                    <p className="text-gray-400 text-xs">Selamat datang kembali</p>
                </div>
                <button
                    onClick={handleRefresh}
                    className=" hover:bg-slate-50 transition-all"
                >
                    <RefreshCcw className={`w-3.5 h-3.5 text-orange-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div
                    onClick={() => isExceededMonth && setShowModalMonth(true)}
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededMonth
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-blue-50/50 border-blue-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededMonth ? "text-amber-600" : "text-blue-600"}`}>
                        Total Bulan Ini
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1 flex items-center justify-center gap-1.5 relative">
                        {monthlyAmount.toLocaleString()}
                        {isExceededMonth && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                    </p>
                    <p className={`text-[11px] ${isExceededMonth ? "text-amber-500 font-bold" : "text-blue-500"}`}>
                        {isExceededMonth ? "Limit Terlampaui" : "1 Transaksi"}
                    </p>
                </div>

                {showModalMonth && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <button onClick={() => setShowModalMonth(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Limit Bulanan Terlampaui</h3>
                            <p className="text-sm text-gray-500 mt-1 mb-6">
                                Transaksi bulan ini sebesar {monthlyAmount.toLocaleString()} telah melewati batas maksimal sebesar {monthlyLimit.toLocaleString()}.
                            </p>
                        </div>
                    </div>
                )}

                <div
                    onClick={() => isExceededYear && setShowModalYear(true)}
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededYear
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-emerald-50/50 border-emerald-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededYear ? "text-amber-600" : "text-emerald-600"}`}>
                        Total Tahun Ini
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1 flex items-center justify-center gap-1.5 relative">
                        {yearlyAmount.toLocaleString()}
                        {isExceededYear && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                    </p>
                    <p className={`text-[11px] ${isExceededYear ? "text-amber-500" : "text-emerald-500"}`}>
                        {isExceededYear ? "Limit Terlampaui" : "Akumulasi"}
                    </p>
                </div>

                {showModalYear && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-red-100 rounded-full text-red-600">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <button onClick={() => setShowModalYear(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Limit Terlampaui</h3>
                            <p className="text-sm text-gray-500 mt-1 mb-6">
                                Transaksi Anda sudah mencapai {yearlyAmount.toLocaleString()}, yang mana sudah melebihi limit 100.000 per tahun.
                            </p>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => console.log('Redirect to recipients')}
                    className="bg-purple-50/50 p-2.5 rounded-lg border border-purple-100 text-center transition-all hover:bg-purple-100/50"
                >
                    <p className="text-[11px] uppercase text-purple-600 font-bold tracking-normal">Total Penerima</p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button className="group flex items-center justify-between p-3 bg-white border border-slate-200 hover:border-orange-200 hover:bg-orange-50/50 text-slate-800 rounded-xl transition-all">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <PlusCircle className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-sm">Buat Transaksi</h4>
                            <p className="text-slate-400 text-[12px] font-medium">Buat form transaksi untuk kirim uang</p>
                        </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-600 transition-colors" />
                </button>

                <button className="group flex items-center justify-between p-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl transition-all">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                            <History className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-sm">Riwayat Transaksi</h4>
                            <p className="text-slate-400 text-[12px] font-medium">Cek riwayat transaksi</p>
                        </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </button>
            </div>

            <div className="pt-4">
                <div className="mb-3">
                    <h4 className="text-sm font-bold text-gray-900">Form Transaksi</h4>
                    <p className="text-gray-400 text-xs">Menampilkan 5 data terakhir hari ini</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {[
                            { name: 'Budi Santoso', bank: 'Bank BCA', rek: '1234567890', amount: '6.500 HKD', status: 'Dibuat', date: '03 Jun 2026, 13:00' },
                            { name: 'Siti Aminah', bank: 'Bank Mandiri', rek: '0987654321', amount: '1.200 HKD', status: 'Kedaluarsa', date: '04 Jun 2026, 13:00' },
                            { name: 'Andi Wijaya', bank: 'Bank BNI', rek: '1122334455', amount: '3.790 HKD', status: 'Batal', date: '05 Jun 2026, 13:00' },
                            { name: 'Alce Fero', bank: 'Bank BTN', rek: '14335312334', amount: '2.400 HKD', status: 'Dibuat', date: '06 Jun 2026, 13:00' },
                            { name: 'Deny Setiwa', bank: 'Bank BSI', rek: '33872849762', amount: '2.000 HKD', status: 'Dibuat', date: '07 Jun 2026, 13:00' },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-bold text-gray-900">{item.name}</p>
                                        <p className="text-[11px] text-slate-600">
                                            {item.bank} • <span className="text-slate-600">{item.rek}</span>
                                        </p>
                                        <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wide">
                                            {item.date}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-[12px] font-bold text-gray-800">{item.amount}</p>
                                    <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold border ${getStatusBadge(item.status)}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-2 text-[11px] font-bold text-orange-600 hover:bg-orange-50 transition-colors border-t border-slate-100 uppercase tracking-wide">
                        Lihat Selengkapnya
                    </button>
                </div>
            </div>
        </div>
    );
}