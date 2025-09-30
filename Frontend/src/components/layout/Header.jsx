import React from 'react';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // Importamos el hook

const Header = () => {
  const { user, logout } = useAuth(); // Obtenemos el usuario y la función de logout

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
      <div className="flex items-center space-x-6">
        {/* Mostramos el nombre del usuario si está logueado */}
        {user && (
          <span className="text-gray-600 font-medium">
            Hola, {user.username}
          </span>
        )}
        <button className="text-gray-500 hover:text-gray-700">
          <FaBell className="h-6 w-6" />
        </button>
        {/* Botón para cerrar sesión */}
        <button 
          onClick={logout} 
          className="text-gray-500 hover:text-red-500 flex items-center space-x-2"
          title="Cerrar Sesión"
        >
          <FaSignOutAlt className="h-6 w-6" />
          <span className="hidden md:inline">Salir</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
