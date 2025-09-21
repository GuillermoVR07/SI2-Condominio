import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaHome, FaUsers, FaCog, FaBuilding, FaBullhorn, FaShieldAlt, FaChartBar, FaBook } from 'react-icons/fa';

const Sidebar = () => {
  // AÑADE UN 'id' ÚNICO A CADA OBJETO
  const menuItems = [
    { id: 1, name: 'Inicio', icon: <FaHome />, path: '/' },
    { id: 2, name: 'Usuarios', icon: <FaUsers />, path: '/residents' },
    { id: 3, name: 'Administración Interna', icon: <FaCog />, path: '/units' },
    { id: 4, name: 'Finanzas y Áreas Comunes', icon: <FaBuilding />, path: '#' },
    { id: 5, name: 'Comunicación y Atención al Residente', icon: <FaBullhorn />, path: '/communications' },
    { id: 6, name: 'Seguridad y Accesos', icon: <FaShieldAlt />, path: '#' },
    { id: 7, name: 'Comunidad y Reportes', icon: <FaChartBar />, path: '#' },
    { id: 8, name: 'Bitácora', icon: <FaBook />, path: '#' },
    // Si tuvieras otro con el mismo nombre, el id lo haría único
    // { id: 9, name: 'Administración Interna', icon: <FaCog />, path: '/admin2' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
        Condominio Alejandria
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          // USA 'item.id' COMO KEY
          <Link
            key={item.id} 
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