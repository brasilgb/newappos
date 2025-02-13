
export const colorStatus = (value: any) => {
    switch (value) {
        case 1:
            return "py-2 px-4 rounded-md bg-gray-300/50 border border-gray-300 text-gray-500 text-xs uppercase";;
        case 2:
            return "py-2 px-4 rounded-md bg-cyan-600/50 border border-cyan-600 text-cyan-800 text-xs uppercase";
        case 3:
            return "py-2 px-4 rounded-md bg-orange-600/50 border border-orange-600 text-orange-800 text-xs uppercase";
        case 4:
            return "py-2 px-4 rounded-md bg-sky-600/50 border border-sky-600 text-sky-800 text-xs uppercase";
        case 5:
            return "py-2 px-4 rounded-md bg-red-600/50 border border-red-600 text-red-800 text-xs uppercase";
        case 6:
            return "py-2 px-4 rounded-md bg-green-600/50 border border-green-600 text-green-800 text-xs uppercase";
        case 7:
            return "py-2 px-4 rounded-md bg-green-600/50 border border-green-600 text-green-800 text-xs uppercase";
        case 8:
            return "py-2 px-4 rounded-md bg-blue-600/50 border border-blue-600 text-blue-800 text-xs uppercase";
    }
};
