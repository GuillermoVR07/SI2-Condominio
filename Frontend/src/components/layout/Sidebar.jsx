import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaHome, 
    FaUsers, 
    FaCog, 
    FaDollarSign, 
    FaTree, 
    FaComments, 
    FaShieldAlt, 
    FaChartBar, 
    FaBook 
} from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { id: 1, name: 'Inicio', icon: <FaHome />, path: '/' },
    { id: 2, name: 'Usuarios', icon: <FaUsers />, path: '/users' },
    { id: 3, name: 'Administración Interna', icon: <FaCog />, path: '/internal-admin' },
    { id: 4, name: 'Finanzas', icon: <FaDollarSign />, path: '/finanzas/pagos' },
    { id: 10, name: 'Áreas Comunes', icon: <FaTree />, path: '/areas-comunes' }, 
    { id: 5, name: 'Comunicación y Atención al Residente', icon: <FaComments />, path: '/communications' },
    { id: 6, name: 'Seguridad y Accesos', icon: <FaShieldAlt />, path: '#' },
    { id: 7, name: 'Comunidad y Reportes', icon: <FaChartBar />, path: '/comunidad-y-reportes' },
    { id: 8, name: 'Bitácora', icon: <FaBook />, path: '/bitacora' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
        Condominio Alejandria
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
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