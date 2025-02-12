import { Link } from '@inertiajs/react';

export default function IconButton({
    href,
    className = '',
    disabled,
    children,
    variant,
    title
}: any) {

    const buttonsVariants = () => {
        let btn = 'default'
        switch (variant) {
            case 'image': btn = 'bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500 active:bg-indigo-700'; break;
            case 'print': btn = 'bg-teal-600 text-white hover:bg-teal-500 focus:ring-teal-500 active:bg-teal-700'; break;
            case 'edit': btn = 'bg-orange-600 text-white hover:bg-orange-500 focus:ring-orange-500 active:bg-orange-700'; break;
            case 'order': btn = 'bg-cyan-600 text-white hover:bg-cyan-500 focus:ring-cyan-500 active:bg-cyan-700'; break;
            default: btn = 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500 active:bg-blue-700'; break;
        }
        return btn;
    }

    return (
        <Link
            title={title}
            href={href}
            className={
                `inline-flex items-center rounded-md border border-transparent p-1.5 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${disabled && 'opacity-25'
                }  ${buttonsVariants()}` + className
            }
            disabled={disabled}
        >
            {children}
        </Link>
    );
}
