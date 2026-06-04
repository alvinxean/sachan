import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function TermsOfService() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4">
            <Head title="Syarat & Ketentuan" />

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <header className="bg-slate-900 text-white p-8 text-center border-b-8 border-orange-500">
                    <h1 className="text-3xl font-extrabold uppercase tracking-tighter">
                        Sahabat<span className="text-orange-500 font-light">Chandra</span>
                    </h1>
                    <p className="mt-2 text-slate-300">Layanan Digital Terintegrasi untuk Manajemen Pra-Transaksi.</p>
                </header>

                <div className="p-8 md:p-12">
                    {/* Navigation Tabs */}
                    {/* <div className="flex gap-4 border-b pb-4 mb-8">
                        <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-800 px-6 py-2 font-semibold">Kebijakan Privasi</Link>
                        <Link href="/terms-of-service" className="bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold">Syarat & Ketentuan</Link>
                    </div> */}

                    <h1 className="text-3xl font-bold text-slate-900 mb-6">Syarat dan Ketentuan Layanan</h1>

                    {/* Notice Box */}
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-6 italic text-slate-700 mb-8">
                        <strong>Pemberitahuan Resmi:</strong> Harap meninjau dokumen ini dengan seksama. Dengan mengakses dan menggunakan aplikasi Sahabat Chandra, Anda secara sadar menyatakan persetujuan untuk terikat secara hukum pada seluruh ketentuan operasional yang ditetapkan oleh Perusahaan.
                    </div>

                    {/* Content */}
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                        <p>Ketentuan Penggunaan ini merupakan perjanjian formal dan mengikat secara hukum yang mengatur hubungan kontraktual antara pengguna (selanjutnya disebut "Pengguna") dan Perusahaan selaku penyedia platform. Akses Anda ke layanan ini tunduk pada ketaatan penuh terhadap aturan yang berlaku.</p>

                        <h2 className="text-xl font-bold text-slate-900 mt-8">1. Definisi dan Ruang Lingkup Layanan</h2>
                        <p>Sahabat Chandra menyediakan infrastruktur digital mandiri yang dirancang untuk mengoptimalkan pengalaman pelanggan di gerai Chandra. Layanan ini mencakup namun tidak terbatas pada:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Digitalisasi Pra-Transaksi:</strong> Penyusunan draf data transaksi secara mandiri sebelum proses verifikasi fisik.</li>
                            <li><strong>Manajemen Finansial:</strong> Pemantauan riwayat dan akumulasi transaksi secara real-time.</li>
                            <li><strong>Interaksi Digital:</strong> Saluran komunikasi interaktif untuk dukungan pelanggan dan informasi terkini.</li>
                        </ul>

                        <h2 className="text-xl font-bold text-slate-900 mt-8">2. Kewajiban dan Tanggung Jawab Pengguna</h2>
                        <p>Pengguna wajib memberikan data yang akurat, otentik, dan terkini saat pendaftaran. Keamanan kredensial akun adalah tanggung jawab mutlak Pengguna. Perusahaan tidak bertanggung jawab atas segala kerugian yang timbul akibat kelalaian Pengguna dalam menjaga kerahasiaan data akun atau penyalahgunaan oleh pihak ketiga.</p>

                        <h2 className="text-xl font-bold text-slate-900 mt-8">3. Validasi dan Penyelesaian Transaksi</h2>
                        <p>Seluruh draf yang dihasilkan oleh sistem <strong>bukan merupakan bukti pembayaran sah</strong>. Transaksi dinyatakan resmi hanya setelah melalui verifikasi identitas, penyerahan dana fisik, dan validasi oleh petugas kasir di gerai fisik yang berwenang.</p>

                        <h2 className="text-xl font-bold text-slate-900 mt-8">4. Kode Etik dan Integritas Platform</h2>
                        <p>Pengguna dilarang keras melakukan manipulasi informasi, penyebaran konten diskriminatif (SARA), tindakan asusila, atau upaya serangan siber (phishing, malware). Perusahaan berhak melakukan tindakan korektif termasuk pembekuan akun tanpa pemberitahuan sebelumnya.</p>
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