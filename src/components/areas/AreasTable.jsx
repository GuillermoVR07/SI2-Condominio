import React from 'react';

const AreasTable = ({ areas, onEdit, onDelete }) => {

    // 1. Objeto para mapear los estados a estilos de Tailwind CSS
    const statusStyles = {
        'disponible': 'bg-green-100 text-green-800',
        'en_mantenimiento': 'bg-yellow-100 text-yellow-800',
        'no_disponible': 'bg-red-100 text-red-800',
        'default': 'bg-gray-100 text-gray-800'
    };

    // 2. Función para formatear el texto del estado
    const formatStatus = (status) => {
        if (!status) return 'Indefinido';
        const formatted = status.replace(/_/g, ' '); // Reemplaza guiones bajos por espacios
        return formatted.charAt(0).toUpperCase() + formatted.slice(1); // Pone la primera letra en mayúscula
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nombre</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Monto (Bs.)</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Estado</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {areas.map((area) => (
                        <tr key={area.id} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-4">{area.id}</td>
                            <td className="py-3 px-4 font-medium">{area.nombre}</td>
                            <td className="py-3 px-4">{parseFloat(area.monto).toFixed(2)}</td>
                            
                            {/* 3. Celda de Estado actualizada */}
                            <td className="py-3 px-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyles[area.estado] || statusStyles.default}`}>
                                    {formatStatus(area.estado)}
                                </span>
                            </td>

                            <td className="py-3 px-4">
                                <button onClick={() => onEdit(area)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                                <button onClick={() => onDelete(area)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AreasTable;

