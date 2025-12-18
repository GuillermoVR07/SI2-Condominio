import React from 'react';
import ModuleCard from '../components/dashboard/ModuleCard'; // Reutilizamos el componente
import { FaUserFriends, FaUserTie } from 'react-icons/fa';

const UsersLandingPage = () => {
    const options = [
        { id: 1, title: 'Gestionar Residentes', icon: <FaUserFriends />, color: 'blue', path: '/residents' },
        { id: 2, title: 'Gestionar Empleados', icon: <FaUserTie />, color: 'cyan', path: '/employees' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
            <p className="text-gray-600 mb-6">Seleccione el tipo de usuario que desea administrar.</p>
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

export default UsersLandingPage;
