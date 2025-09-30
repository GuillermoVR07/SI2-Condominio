import React from 'react';
import ModuleCard from '../components/dashboard/ModuleCard';
import { FaTree, FaCalendarAlt, FaBoxes } from 'react-icons/fa';

const CommonAreasLandingPage = () => {
    const options = [
        { id: 1, title: 'Gestionar Áreas', icon: <FaTree />, color: 'green', path: '/areas-comunes/manage' },
        { id: 2, title: 'Panel de Reservas', icon: <FaCalendarAlt />, color: 'blue', path: '/areas-comunes/reservas' },
        { id: 3, title: 'Gestionar Inventario', icon: <FaBoxes />, color: 'yellow', path: '/inventario' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Áreas Comunes</h1>
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

export default CommonAreasLandingPage;
