import React from 'react';
import ModuleCard from '../components/dashboard/ModuleCard';
import { FaExclamationCircle, FaShieldAlt } from 'react-icons/fa';

const CommunityReportsLandingPage = () => {
    const options = [
        { id: 1, title: 'Reclamos y Sugerencias', icon: <FaExclamationCircle />, color: 'red', path: '/reclamos' },
        { id: 2, title: 'Registros de Seguridad', icon: <FaShieldAlt />, color: 'black', path: '/registros-seguridad' }, 
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Comunidad y Reportes</h1>
            <p className="text-gray-600 mb-6">Seleccione una sección para administrar.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {options.map((opt) => (
                    <ModuleCard
                        key={opt.id}
                        title={opt.title}
                        icon={opt.icon}
                        color={opt.color}
                        path={opt.path}
                    />
                ))}
            </div>
        </div>
    );
};

export default CommunityReportsLandingPage;
