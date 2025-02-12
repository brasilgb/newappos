import { ABoxContainer, ABoxContent, ABoxFooter, ABoxHead } from '@/Components/ABox';
import { BreadCrumbTop } from '@/Components/BreadCrumbTop';
import HeaderTop from '@/Components/HeaderTop';
import { useAppContext } from '@/Contexts/AppContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { IoHome } from 'react-icons/io5';

export default function Dashboard() {

    const { teste } = useAppContext();

    return (
        <AuthenticatedLayout
            header={
                <HeaderTop
                    icon={<IoHome />}
                    title='Dashboard'
                    breadcrumb=""
                />
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
