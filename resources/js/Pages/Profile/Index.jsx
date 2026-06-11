import SuperAdminProfile from '@/Components/Profile/SuperAdminProfile';
import AdminProfile from '@/Components/Profile/AdminProfile';
import CustomerProfile from '@/Components/Profile/CustomerProfile';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import BottomNav from '@/Components/BottomNav';

export default function ProfileIndex() {
    const { role } = usePage().props;

    const renderProfileIndex = () => {
        switch (role) {
            case 'superadmin':
                return <SuperAdminProfile />;
            case 'admin':
                return <AdminProfile />;
            case 'customer':
                return <CustomerProfile />;
            default:
                return <div>Unknown</div>;
        }
    };
    return (
        <AuthenticatedLayout
        // header={
        //     <h2 className="text-xl font-semibold leading-tight text-gray-800">
        //         Dashboard
        //     </h2>
        // }
        >
            <Head title="Profile (Index)" />

            <div className="py-3">
                <div className="w-full">
                    <div className="overflow-hidden bg-white">
                        <div className="p-6 text-gray-900 pb-24">
                            {renderProfileIndex()}
                        </div>
                        <BottomNav role={role} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
