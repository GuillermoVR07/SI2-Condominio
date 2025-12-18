import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ModuleCard = ({ title, icon, color, path }) => {
  const colorVariants = {
    blue: 'bg-blue-500',
    gray: 'bg-gray-500',
    green: 'bg-green-500',
    cyan: 'bg-cyan-500',
    yellow: 'bg-yellow-500',
    black: 'bg-slate-800',
    red: 'bg-red-600',
    teal: 'bg-teal-500',
  };

  const destination = path || '#';

  return (
  <Link to={destination}>
    <div
      className={`
        ${colorVariants[color] || 'bg-gray-500'} 
        text-white rounded-lg p-6 shadow-lg 
        flex flex-col justify-between 
        transform hover:-translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer
      `}
    >
      <div>
        {/* Aquí se muestra el ícono que pasamos como prop */}
        <div className="text-4xl mb-4">{icon}</div>
        {/* Y aquí el título */}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div
        className="
          mt-6 text-sm font-semibold flex items-center justify-between
          border-t border-white/20 pt-3
        "
      >
        Ver detalles
        <FaArrowRight />
      </div>
    </div>
  </Link>
  );
};

export default ModuleCard;