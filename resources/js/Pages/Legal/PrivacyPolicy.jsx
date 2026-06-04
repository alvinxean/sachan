import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function PrivacyPolicy() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4">
            <Head title="Kebijakan Privasi" />

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <header className="bg-slate-900 text-white p-8 text-center border-b-8 border-orange-500">
                    <h1 className="text-3xl font-extrabold uppercase tracking-tighter">
                        Sahabat<span className="text-orange-500 font-light">Chandra</span>
                    </h1>
                    <p className="mt-2 text-slate-300">Layanan Digital Terintegrasi untuk Manajemen Pra-Transaksi.</p>
                </header>

                <div className="p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-6">Kebijakan Privasi</h1>

                    <div className="bg-orange-50 border-l-4 border-orange-500 p-6 italic text-slate-700 mb-8">
                        <strong>Komitmen Privasi:</strong> Perusahaan menjunjung tinggi integritas data pribadi Anda dengan menerapkan standar keamanan enkripsi terkini untuk menjamin kerahasiaan informasi transaksi.
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                        <p>Perusahaan berkomitmen penuh untuk melindungi privasi pelanggan Sahabat Chandra. Kebijakan ini menjelaskan bagaimana Perusahaan mengumpulkan, menggunakan, dan melindungi data pribadi Anda sesuai dengan regulasi perlindungan data yang berlaku di Republik Indonesia.</p>

                        <h2 className="text-xl font-bold text-slate-900 mt-8">1. Data yang Perusahaan Himpun</h2>
                        <p>Perusahaan mengumpulkan data yang relevan untuk menunjang operasional layanan, yang mencakup:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Identitas Personal:</strong> Nama lengkap, nomor telepon (WhatsApp), dan data identitas diri.</li>
                            <li><strong>Log Transaksi:</strong> Riwayat draf transaksi, metrik kirim uang, dan aktivitas interaksi.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-slate-900 mt-8">2. Tujuan Penggunaan Data</h2>
                        <p>Data yang dihimpun digunakan semata-mata untuk meningkatkan efisiensi antrean, menyediakan analisis keuangan personal, serta menjaga stabilitas operasional sistem dari potensi ancaman keamanan.</p>

                        <h2 className="text-xl font-bold text-slate-900 mt-8">3. Proteksi dan Keamanan Data</h2>
                        <p>Perusahaan mengimplementasikan protokol keamanan berlapis, termasuk enkripsi <em>end-to-end</em> untuk akses database. Akses internal dibatasi hanya untuk personel yang berwenang melalui sistem otentikasi yang ketat.</p>

                        <h2 className="text-xl font-bold text-slate-900 mt-8">4. Prinsip Non-Komersialisasi Data</h2>
                        <p>Sebagai bentuk komitmen integritas, Perusahaan tidak akan melakukan penjualan, penyewaan, atau pertukaran data pribadi pelanggan kepada pihak eksternal untuk tujuan pemasaran tanpa persetujuan eksplisit dari Pengguna.</p>
                    </div>
                </div>

                <footer className="text-center py-8 text-slate-400 text-sm border-t">
                    &copy; {currentYear} Haoti Sistema Hokindo. All rights reserved.
                </footer>
            </div>
        </div>
    );
}