import { Link } from '@inertiajs/react';
import React from 'react'

interface PaginationProps {
    data: any;
}

const Pagination = ({ data }: PaginationProps) => {
    return (
        <section className='flex items-center justify-between w-full py-1'>
            <div>
                <p className='block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-500'>Página {data?.current_page} de {data?.last_page}</p>
            </div>
            <div className='flex gap-4'>
                <Link
                    className={`${data?.from === 1 ? 'pointer-events-none text-gray-300' : ' border-gray-500 text-gray-500 focus:ring-gray-300'} select-none rounded-lg border py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring active:opacity-[0.85]`}
                    href={data?.prev_page_url}
                >
                    Anterior
                </Link>
                <Link
                    className={`${data?.from === data?.total ? 'pointer-events-none text-gray-300' : ' border-gray-500 text-gray-500 focus:ring-gray-300'} select-none rounded-lg border py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase transition-all hover:opacity-75 focus:ring active:opacity-[0.85]`}
                    href={data?.next_page_url}
                >
                    Proxima
                </Link>
            </div>
        </section>
    )
}

export default Pagination