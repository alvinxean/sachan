import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const user = auth.user;
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Head title="Selamat Datang" />

            <div className="relative min-h-screen bg-white text-slate-800 overflow-hidden flex flex-col justify-between font-sans">
                {/* Background Blobs */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

                {/* Header: Link Dashboard muncul jika user login, jika tidak header kosong */}
                <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-end items-center relative z-10">
                    {user && (
                        <Link href={route('dashboard')} className="font-medium text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition duration-200">
                            Dashboard ({user.name}) →
                        </Link>
                    )}
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 text-center">
                    <div className="max-w-xl w-full">
                        <span className="inline-block text-m font-semibold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                            Mari mengenal
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                            Sahabat <span className="text-blue-600">Chandra</span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                            Layanan info khusus pelanggan Chandra Hongkong
                        </p>

                        {/* Tombol Masuk muncul jika belum login */}
                        {!user ? (
                            <Link href={route('login')} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-8 py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 active:scale-95 transition-all duration-200">
                                Masuk ke Aplikasi
                            </Link>
                        ) : (
                            /* Jika sudah login, tampilkan area info user dan logout */
                            <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-md mx-auto shadow-sm">
                                <div className="text-sm text-slate-600">
                                    Anda masuk sebagai <span className="font-bold text-slate-800">{user.name}</span>
                                </div>
                                <div className="flex justify-center">
                                    <Link href={route('logout')} method="post" as="button" className="text-center bg-white hover:bg-red-50 text-gray-500 hover:text-red-600 border border-slate-200 hover:border-red-200 font-semibold text-sm px-6 py-2.5 rounded-xl active:scale-95 transition-all duration-150">
                                        Log Out
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full text-center py-8 text-xs text-slate-400 relative z-10 flex flex-col items-center gap-2">
                    <div className="flex gap-4 mb-2">
                        <Link href="/privacy-policy" className="hover:text-blue-600 transition">Kebijakan Privasi</Link>
                        <Link href="/terms-of-service" className="hover:text-blue-600 transition">Ketentuan Layanan</Link>
                    </div>
                    <div>
                        &copy; {currentYear} Haoti Sistema Hokindo. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
}