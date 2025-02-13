import { Link } from "@inertiajs/react";
import React, {Fragment} from "react";
interface PageTopProps {
    children?: React.ReactNode;
    links?: any;
}
export const BreadCrumbTop = ({ links }: PageTopProps) => {
    return (
        <div>
            <ul className="flex items-center justify-end text-sm text-gray-600">
                <li>
                    <Link className="text-blue-600" href="/">
                        Dashboard
                    </Link>
                </li>
                <li className="px-1.5 text-gray-400">/</li>
                {links.map((link: any, idx: number) => (
                    <Fragment key={idx}>
                        <li>
                            {link.url !== null ? (
                                <Link className="text-blue-600" href={link.url}>
                                    {link.label}
                                </Link>
                            ) : (
                                link.label
                            )}
                        </li>
                        {link.url !== null && (
                            <li className="px-1.5 text-gray-400">/</li>
                        )}
                    </Fragment>
                ))}
            </ul>
        </div>
    );
};