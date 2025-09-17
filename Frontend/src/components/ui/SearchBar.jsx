import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Buscar por nombre, apellido o CI"
                className="w-full pl-4 pr-20 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-white border border-gray-300 text-gray-600 px-4 py-1 rounded-md hover:bg-gray-100"
            >
                Buscar
            </button>
        </div>
    );
};

export default SearchBar;