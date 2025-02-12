import Footer from '@/Components/Footer';
import NavBar from '@/Components/NavBar';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    children,
    header
}: PropsWithChildren<{ header?: ReactNode }>) {

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div>
                <NavBar />
                {header && (
                    <header className="bg-white shadow w-full">
                        <div className="mx-auto container px-0 py-3 w-full">
                            {header}
                        </div>
                    </header>
                )}
            </div>
            <main className='flex-col flex-grow'>
                {children}
            </main>
            <Footer />
        </div>
    );
}
