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
import { RefreshCcw, ChevronRight, Database, AlertTriangle, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CustomerDashboard() {
    const { auth } = usePage().props;
    const user = auth.user;
    const [isRefreshing, setIsRefreshing] = useState(false);

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

    const getLogIcon = (action) => {
        if (action.includes('Update') || action.includes('Verifikasi') || action.includes('Blokir'))
            return { icon: Database, color: 'text-blue-500', bg: 'bg-blue-50' }; // CRUD Aksi
        if (action.includes('Error'))
            return { icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' }; // Error Fatal
        if (action.includes('Auto'))
            return { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' }; // Sistem/Warning
        return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' }; // Default/Info
    };

    const logs = [
        { user: '[Admin] Budi', action: 'Update Limit', target: 'Siti Aminah', time: '03 Jun, 13:00' },
        { user: 'System', action: 'API Error 500', target: 'Payment Gateway', time: '04 Jun, 14:30' },
        { user: '[Admin] Sarah', action: 'Blokir Akun', target: 'Andi Wijaya', time: '04 Jun, 15:00' },
        { user: 'System', action: 'Auto-Reject', target: 'Deny Setiwa', time: '07 Jun, 16:00' },
    ];

    const getToday = () => new Date().toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(getToday());
    const [endDate, setEndDate] = useState(getToday());


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
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededMonth
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-blue-50/50 border-blue-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededMonth ? "text-amber-600" : "text-blue-600"}`}>
                        Total Admin
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>

                <div
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededYear
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-emerald-50/50 border-emerald-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededYear ? "text-amber-600" : "text-emerald-600"}`}>
                        Total Pelanggan
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>

                <div
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededYear
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-purple-50/50 border-purple-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededYear ? "text-amber-600" : "text-purple-600"}`}>
                        Batasi Pengguna
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>
            </div>

            <div className="mb-3 flex justify-between items-center px-1">
                <h4 className="text-sm font-bold text-gray-900">Catatan Aktivitas</h4>
                <div className="flex items-center gap-2 bg-white">
                    <div className="relative flex-1">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full text-[11px] font-bold text-slate-600 bg-slate-50 border-none rounded-lg focus:ring-1 focus:ring-orange-500 uppercase py-1.5 px-2"
                        />
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <div className="relative flex-1">
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full text-[11px] font-bold text-slate-600 bg-slate-50 border-none rounded-lg focus:ring-1 focus:ring-orange-500 uppercase py-1.5 px-2"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {logs.map((log, index) => {
                        const { icon: Icon, color, bg } = getLogIcon(log.action);
                        return (
                            <div key={index} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    {/* Ikon Kategori */}
                                    <div className={`p-1.5 rounded-lg ${bg}`}>
                                        <Icon className={`w-4 h-4 ${color}`} />
                                    </div>

                                    <div>
                                        <p className="text-[13px] font-bold text-gray-900">{log.action}</p>
                                        <p className="text-[11px] text-slate-600">
                                            {log.user} <span className="text-slate-300 mx-1">•</span> {log.target}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-[10px] text-slate-400 font-medium uppercase">{log.time.split(',')[0]}</p>
                                    <p className="text-[10px] text-slate-400">{log.time.split(',')[1]}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button className="w-full py-2 text-[11px] font-bold text-orange-600 hover:bg-orange-50 transition-colors border-t border-slate-100 uppercase tracking-wide">
                    Lihat Selengkapnya
                </button>
            </div>

            <div className="mb-3">
                <h4 className="text-sm font-bold text-gray-900">Status Transaksi</h4>
                {/* <p className="text-gray-400 text-xs">Menampilkan 5 data terakhir hari ini</p> */}
            </div>

            {/* Form Transaksi */}
            <div className="grid grid-cols-3 gap-2">
                <div
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededMonth
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-blue-50/50 border-blue-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededMonth ? "text-amber-600" : "text-blue-600"}`}>
                        Dibuat
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>

                <div
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededYear
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-emerald-50/50 border-emerald-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededYear ? "text-amber-600" : "text-emerald-600"}`}>
                        Diubah
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>

                <div
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededYear
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-purple-50/50 border-purple-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededYear ? "text-amber-600" : "text-purple-600"}`}>
                        Dibatalkan
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededMonth
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-blue-50/50 border-blue-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededMonth ? "text-amber-600" : "text-blue-600"}`}>
                        Proses
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>

                <div
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededYear
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-emerald-50/50 border-emerald-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededYear ? "text-amber-600" : "text-emerald-600"}`}>
                        Sukses
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>

                <div
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededYear
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-purple-50/50 border-purple-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededYear ? "text-amber-600" : "text-purple-600"}`}>
                        Kedaluarsa
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <h4 className="text-sm font-bold text-gray-900">Kelola Transaksi</h4>
                {/* <p className="text-gray-400 text-xs">Menampilkan 5 data terakhir hari ini</p> */}
            </div>

            {/* Kelola Transaksi */}
            <div className="grid grid-cols-3 gap-2">
                <div
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededMonth
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-blue-50/50 border-blue-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededMonth ? "text-amber-600" : "text-blue-600"}`}>
                        Limit Transaksi
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>

                <div
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededYear
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-emerald-50/50 border-emerald-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededYear ? "text-amber-600" : "text-emerald-600"}`}>
                        Limit Bulan
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>

                <div
                    className={`p-2.5 rounded-lg border text-center transition-all ${isExceededYear
                        ? "bg-amber-50/50 border-amber-200 cursor-pointer hover:bg-amber-50"
                        : "bg-purple-50/50 border-purple-100"
                        }`}
                >
                    <p className={`text-[11px] uppercase font-bold tracking-normal ${isExceededYear ? "text-amber-600" : "text-purple-600"}`}>
                        Limit Tahun
                    </p>
                    <p className="text-base font-bold text-gray-800 py-1">12</p>
                    <div className="flex items-center justify-center gap-0.5">
                        <p className="text-[11px] text-slate-500">Lihat Detail</p>
                        <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                </div>
            </div>




        </div>
    );
}