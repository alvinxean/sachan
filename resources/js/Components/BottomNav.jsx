import React from 'react';
import { Home, MessageSquare, User, Users } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function BottomNav({ role }) {
    const { url } = usePage(); // Untuk mendeteksi halaman aktif

    const menus = {
        superadmin: [
            { name: 'Utama', icon: Home, path: '/dashboard' },
            { name: 'Profil', icon: User, path: '/profil' },
        ],
        admin: [
            { name: 'Utama', icon: Home, path: '/dashboard' },
            { name: 'Pengguna', icon: Users, path: '/admin/users' },
            { name: 'Profil', icon: User, path: '/profil' },
        ],
        customer: [
            { name: 'Utama', icon: Home, path: '/dashboard' },
            { name: 'Forum', icon: MessageSquare, path: '/forum' },
            { name: 'Profil', icon: User, path: '/profil' },
        ],
    };

    const currentMenus = menus[role] || [];

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden">
            <div className={`grid h-full max-w-lg mx-auto ${currentMenus.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {currentMenus.map((menu) => {
                    const isActive = url === menu.path;
                    return (
                        <Link
                            key={menu.name}
                            href={menu.path}
                            className={`flex flex-col items-center justify-center transition-colors ${isActive ? 'text-orange-600' : 'text-slate-400 hover:text-orange-600'}`}
                        >
                            <menu.icon className="w-5 h-5 mb-1" />
                            <span className="text-[10px] font-bold">{menu.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}