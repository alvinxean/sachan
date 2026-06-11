import React from 'react';
import { Home, MessageSquare, User, Users } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function BottomNav({ role }) {
    const currentRoute = route().current();
    const menus = {
        superadmin: [
            { name: 'Utama', icon: Home, routeName: 'dashboard' },
            { name: 'Profil', icon: User, routeName: 'profile.index' },
        ],
        admin: [
            { name: 'Utama', icon: Home, routeName: 'dashboard' },
            { name: 'Profil', icon: User, routeName: 'profile.index' },
        ],
        customer: [
            { name: 'Utama', icon: Home, routeName: 'dashboard' },
            { name: 'Profil', icon: User, routeName: 'profile.index' },
        ],
    };

    const currentMenus = menus[role] || [];

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden">
            <div className={`grid h-full max-w-lg mx-auto ${currentMenus.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {currentMenus.map((menu) => {
                    const isActive = currentRoute === menu.routeName;
                    return (
                        <Link
                            key={menu.name}
                            href={route(menu.routeName)}
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