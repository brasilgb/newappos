import React, { ReactNode } from 'react'

interface HeaderTopProps {
    title: string;
    icon: ReactNode;
    breadcrumb: ReactNode;
}

const HeaderTop = ({ title, icon, breadcrumb }: HeaderTopProps) => {
    return (
        <div className='flex items justify-between'>
            <div className='flex items-center justify-left gap-2 text-gray-600 font-medium'>
                <h2 className=' text-2xl'>{icon}</h2>
                <h2 className=' text-xl'>{title}</h2>
            </div>
            <div className='flex items-center justify-right'>
                {breadcrumb}
            </div>
        </div>
    )
}

export default HeaderTop