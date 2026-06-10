import SuperAdminDashboard from '@/Components/Dashboard/SuperadminDashboard';
import AdminDashboard from '@/Components/Dashboard/AdminDashboard';
import CustomerDashboard from '@/Components/Dashboard/CustomerDashboard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import BottomNav from '@/Components/BottomNav';

export default function Dashboard() {
    const { role } = usePage().props;

    const renderDashboard = () => {
        switch (role) {
            case 'superadmin':
                return <SuperAdminDashboard />;
            case 'admin':
                return <AdminDashboard />;
            case 'customer':
                return <CustomerDashboard />;
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
            <Head title="Dashboard" />

            <div className="py-3">
                <div className="w-full">
                    <div className="overflow-hidden bg-white">
                        <div className="p-6 text-gray-900 pb-24">
                            {renderDashboard()}
                        </div>
                        <BottomNav role={role} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
