import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

// Este componente recibe props (title, icon, color) para ser dinámico y reutilizable
const ModuleCard = ({ title, icon, color }) => {
  // Este objeto nos ayuda a convertir un nombre de color en una clase de Tailwind CSS
  const colorVariants = {
    blue: 'bg-blue-500',
    gray: 'bg-gray-500',
    green: 'bg-green-500',
    cyan: 'bg-cyan-500',
    yellow: 'bg-yellow-500',
    black: 'bg-slate-800',
    red: 'bg-red-600',
  };

  return (
    // Usamos la clase de color que corresponda según la prop 'color'
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
  );
};

export default ModuleCard;