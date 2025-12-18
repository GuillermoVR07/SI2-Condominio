import React from 'react';
import ModuleCard from '../components/dashboard/ModuleCard';
import { FaBoxes, FaTags } from 'react-icons/fa';

const InventoryLandingPage = () => {
    const options = [
        { id: 1, title: 'Gestionar Ítems', icon: <FaBoxes />, color: 'yellow', path: '/inventario/items' },
        { id: 2, title: 'Gestionar Categorías', icon: <FaTags />, color: 'blue', path: '/inventario/categorias' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Inventario</h1>
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

export default InventoryLandingPage;
