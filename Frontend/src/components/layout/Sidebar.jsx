import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaHome, FaUsers, FaCog, FaBuilding, FaBullhorn, FaShieldAlt, FaChartBar, FaBook } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { name: 'Inicio', icon: <FaHome /> },
    { name: 'Usuarios', icon: <FaUsers />, path: '/residents' },
    { name: 'Administración Interna', icon: <FaCog /> },
    { name: 'Finanzas y Áreas Comunes', icon: <FaBuilding /> },
    { name: 'Comunicación y Atención al Residente', icon: <FaBullhorn /> },
    { name: 'Seguridad y Accesos', icon: <FaShieldAlt /> },
    { name: 'Comunidad y Reportes', icon: <FaChartBar /> },
    { name: 'Bitácora', icon: <FaBook /> },

    { name: 'Administración Interna', icon: <FaCog />, path: '#' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
        Condominio Alejandria
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          // Cambia la etiqueta <a> por <Link>
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};


export default Sidebar;