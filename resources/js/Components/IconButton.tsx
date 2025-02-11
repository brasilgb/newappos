import { Link } from '@inertiajs/react';
import { ButtonHTMLAttributes } from 'react';

export default function IconButton({
    href,
    className = '',
    disabled,
    children
}: any) {

    const buttonsVariants = (color: any) => {
        let btn = 'default'
        switch(color) {
            case 'default': btn = 'bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-500 active:bg-gray-700'; break;
            case 'delete': btn = 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500 active:bg-red-700'; break;
            case 'edit'  : btn = 'bg-orange-600 text-white hover:bg-orange-500 focus:ring-orange-500 active:bg-orange-700'; break;
        }
        return btn;
    }
    
    return (
        <Link
        href={href}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-blue-800 p-1.5 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-blue-900 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Link>
    );
}
