import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function DataDeletion() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4">
            <Head title="Petunjuk Penghapusan Data" />

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <header className="bg-slate-900 text-white p-8 text-center border-b-8 border-orange-500">
                    <h1 className="text-3xl font-extrabold uppercase tracking-tighter">
                        Sahabat<span className="text-orange-500 font-light">Chandra</span>
                    </h1>
                    <p className="mt-2 text-slate-300">Layanan Digital Terintegrasi untuk Manajemen Pra-Transaksi.</p>
                </header>

                <div className="p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-6">Instruksi Penghapusan Data</h1>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 text-slate-700 mb-8">
                        <p>Kami menghargai privasi Anda. Jika Anda ingin menghapus akun dan semua data terkait dari aplikasi Sahabat Chandra, silakan ikuti langkah-langkah di bawah ini.</p>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                        <h2 className="text-xl font-bold text-slate-900">Cara Mengajukan Penghapusan Data:</h2>
                        <ol className="list-decimal pl-6 space-y-4">
                            <li>
                                <strong>Kirim Email Permintaan:</strong> Kirimkan email ke <strong>admin@apikko.com</strong> (silakan ganti dengan email admin Anda) dengan subjek: <strong>"Permohonan Penghapusan Data - [Nama Lengkap Anda]"</strong>.
                            </li>
                            <li>
                                <strong>Informasi Akun:</strong> Pastikan Anda menyertakan alamat email yang terdaftar di akun Sahabat Chandra agar kami dapat mengidentifikasi data Anda dengan benar.
                            </li>
                            <li>
                                <strong>Proses Verifikasi & Penghapusan:</strong> Setelah kami menerima permintaan Anda, tim kami akan memproses penghapusan data secara permanen dari basis data kami dalam waktu 2-3 hari kerja.
                            </li>
                            <li>
                                <strong>Konfirmasi:</strong> Anda akan menerima email balasan sebagai konfirmasi bahwa data Anda telah berhasil dihapus secara permanen.
                            </li>
                        </ol>

                        <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-sm font-semibold text-slate-800">Catatan Penting:</p>
                            <p className="text-sm">Setelah data dihapus, Anda tidak dapat lagi memulihkan riwayat transaksi atau draf yang pernah dibuat sebelumnya. Semua informasi akan hilang secara permanen.</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center py-8 text-slate-400 text-sm border-t">
                    &copy; {currentYear} Haoti Sistema Hokindo. All rights reserved.
                </footer>
            </div>
        </div>
    );
}