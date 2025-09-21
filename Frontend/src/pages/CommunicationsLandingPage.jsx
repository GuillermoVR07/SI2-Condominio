import React from 'react';
import ModuleCard from '../components/dashboard/ModuleCard'; // Reutilizamos el componente!
import { FaBullhorn, FaHeadset } from 'react-icons/fa';

const CommunicationsLandingPage = () => {
    // Definimos las dos opciones que se mostrarán como tarjetas
    const options = [
        { id: 1, title: 'Comunicados', icon: <FaBullhorn />, color: 'cyan', path: '/communications/announcements' },
        { id: 2, title: 'Atención al Cliente', icon: <FaHeadset />, color: 'blue', path: '#' }, // Ruta pendiente
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Comunicación y Atención al Residente</h1>
            <p className="text-gray-600 mb-6">Seleccione una opción para continuar</p>

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

export default CommunicationsLandingPage;