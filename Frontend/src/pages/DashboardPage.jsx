import React from 'react';
import { Link } from 'react-router-dom';
import ModuleCard from '../components/dashboard/ModuleCard';

// Importamos los íconos que vamos a usar, incluyendo los nuevos
import { 
    FaUsers, 
    FaCog, 
    FaDollarSign, // Para Finanzas
    FaTree,       // Para Áreas Comunes
    FaComments, 
    FaShieldAlt, 
    FaChartBar, 
    FaBook 
} from 'react-icons/fa';

const DashboardPage = () => {
    // --- mockModules MODIFICADO ---
    const mockModules = [
        { id: 1, title: 'Usuarios', icon: <FaUsers />, color: 'blue', path: '/users' },
        { id: 2, title: 'Administración Interna', icon: <FaCog />, color: 'gray', path: '/internal-admin' },
        { id: 3, title: 'Finanzas', icon: <FaDollarSign />, color: 'green', path: '/finanzas/pagos' }, 
        { id: 8, title: 'Áreas Comunes', icon: <FaTree />, color: 'teal', path: '/areas-comunes' },
        { id: 4, title: 'Comunicación y Atención al Residente', icon: <FaComments />, color: 'cyan', path: '/communications' },
        { id: 5, title: 'Seguridad y Accesos', icon: <FaShieldAlt />, color: 'yellow', path: '/security' },
        { id: 6, title: 'Comunidad y Reportes', icon: <FaChartBar />, color: 'black', path: '/community' },
        { id: 7, title: 'Bitácora', icon: <FaBook />, color: 'red', path: '/log' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Sistema de Gestión de Condominios</h1>
            <p className="text-gray-600 mb-6">Panel principal</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockModules.map((module) => (
                    <ModuleCard
                        key={module.id}
                        title={module.title}
                        icon={module.icon}
                        color={module.color}
                        path={module.path}
                    />
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;