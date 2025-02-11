import React from "react";
interface ATableProps {
    children: React.ReactNode;
}

const ATable = ({ children }: ATableProps) => {
    return (
        <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white rounded-lg bg-clip-border">

            <table className="w-full text-left table-auto min-w-max">
                {children}
            </table>

        </div>
    );
}

const ATHead = ({ children }: ATableProps) => {
    return <thead>{children}</thead>
}
const ATBody = ({ children }: ATableProps) => {
    return <tbody>{children}</tbody>
}

const ATr = ({ children }: ATableProps) => {
    return (
        <tr className="hover:bg-slate-50 border-b border-slate-200">
            {children}
        </tr>
    )
}

const ATh = ({ children }: ATableProps) => {
    return (
        <th className="p-4 border-b border-slate-300 bg-slate-50">
            <p className="block text-sm font-normal leading-none text-slate-500">{children}</p>
        </th>
    )
}

const ATd = ({ children }: ATableProps) => {
    return (
        <td className="px-4 py-2">
            <p className="block text-sm text-slate-800">{children}</p>
        </td>
    )
}

export { ATable, ATHead, ATBody, ATr, ATh, ATd };