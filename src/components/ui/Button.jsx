import React from 'react';

const Button = ({ children, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600 transition-colors ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;