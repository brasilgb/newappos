import { Link } from '@inertiajs/react';

export default function BackButton({ href }: any) {
    return (
        <Link
        title='Voltar a página anterior'
            href={route(href, {preserveState: true})}
            className="border-gray-500 text-gray-500 focus:ring-gray-300'} select-none rounded-lg border py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring active:opacity-[0.85]"
        >
            Voltar
        </Link>
    );
}
