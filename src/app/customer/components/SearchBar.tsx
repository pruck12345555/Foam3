'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }: { onSearch?: (query: string) => void }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
        if (onSearch) onSearch(query.trim());
    };

    return (
        <div className="flex flex-grow justify-center">
            <form
                onSubmit={handleSearch}
                className="flex items-center bg-white rounded-full px-3 py-1 shadow-md w-full max-w-md"
            >
                <Search className="text-gray-500 mr-2" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-grow outline-none text-gray-700"
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition"
                >
                    Go
                </button>
            </form>
        </div>
    );
}
