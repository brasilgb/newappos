import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import { useAppContext } from '@/Contexts/AppContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {

    const { teste } = useAppContext();

    return (
        <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Dashboard
            </h2>
        }
        >
            <Head title="Dashboard" />
            <ABoxContainer>
                <ABoxContent>
                    content
                </ABoxContent>
            </ABoxContainer>
        </AuthenticatedLayout>
    );
}
