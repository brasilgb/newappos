import React from 'react';
import TextInput from './TextInput';
import { useForm } from '@inertiajs/react';
import { IoSearch } from 'react-icons/io5';

interface SearchProps {
    placeholder: string;
    url: string;
    date?: boolean;
}

const SearchInput = ({ placeholder, url, date }: SearchProps) => {

    const { data, setData, post, get, processing, errors } = useForm({
        search: "",
    });
    
    function handleSubmit(e: any) {
        e.preventDefault();
        get(route(url));
    }

  return (
    <div className=" w-96 border border-gray-300 rounded-md pl-2">
            <form
                onSubmit={handleSubmit}
                className="flex items-center justify-between"
            >
                <div className="w-full">
                    <input
                        name="search"
                        value={data.search}
                        onChange={(e) => setData("search", e.target.value)}
                        className="w-full h-10 text-sm p-1 ring-0 focus:ring-0 shadow-none focus:shadow-none focus:outline-none border-none focus:border-none placeholder:text-gray-400"
                        type={date ? "date" : "search"}
                        placeholder={placeholder}
                        autoComplete="off"
                    />
                </div>
                <button type="submit" disabled={processing}>
                    <div className="mx-2 text-gray-500">
                        <IoSearch size={20} />
                    </div>
                </button>
            </form>
    </div>
  )
}

export default SearchInput;