import React from 'react';
import ModuleCard from '../components/dashboard/ModuleCard';
import { FaBuilding, FaFileInvoiceDollar, FaBriefcase } from 'react-icons/fa'; // Añadimos FaBriefcase

const InternalAdminLandingPage = () => {
    const options = [
        { id: 1, title: 'Gestión de Unidades', icon: <FaBuilding />, color: 'gray', path: '/units' },
        { id: 2, title: 'Panel de Multas', icon: <FaFileInvoiceDollar />, color: 'red', path: '/internal-admin/fines' },
        // --- NUEVA TARJETA AÑADIDA ---
        { id: 3, title: 'Gestión de Cargos', icon: <FaBriefcase />, color: 'yellow', path: '/internal-admin/cargos' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Administración Interna</h1>
            <p className="text-gray-600 mb-6">Seleccione el módulo que desea gestionar.</p>
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

export default InternalAdminLandingPage;
