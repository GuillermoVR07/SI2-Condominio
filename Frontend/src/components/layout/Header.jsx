import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
      <div className="flex items-center space-x-6">
        <button className="text-gray-500 hover:text-gray-700">
          <FaBell className="h-6 w-6" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <FaUserCircle className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;