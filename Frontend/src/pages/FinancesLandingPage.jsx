import React from 'react';
import ModuleCard from '../components/dashboard/ModuleCard';
import { FaMoneyBillWave, FaReceipt, FaFileInvoiceDollar } from 'react-icons/fa';

const FinancesLandingPage = () => {
    const options = [
        { id: 1, title: 'Panel de Pagos', icon: <FaMoneyBillWave />, color: 'green', path: '/finanzas/pagos' },
        { id: 2, title: 'Gestión de Cuotas', icon: <FaReceipt />, color: 'blue', path: '#' }, // Ruta pendiente
        { id: 3, title: 'Gestión de Multas', icon: <FaFileInvoiceDollar />, color: 'red', path: '/internal-admin/fines' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestión Financiera</h1>
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

export default FinancesLandingPage;
