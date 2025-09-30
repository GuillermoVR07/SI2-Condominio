import React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// Componente interno para cabeceras de tabla ordenables
const SortableHeader = ({ children, sortKey, sortConfig, requestSort }) => {
    const isSorted = sortConfig.key === sortKey;
    const icon = isSorted ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />;
    return (
        <th 
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => requestSort(sortKey)}
        >
            <div className="flex items-center">
                {children}
                <span className="ml-2">{icon}</span>
            </div>
        </th>
    );
};

const FinesTable = ({ fines, onView, onEdit, onDelete, requestSort, sortConfig }) => {
    
    // Formatea la fecha para mejor legibilidad
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Devuelve un chip de color según el estado de la multa
    const getStatusChip = (status) => {
        const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
        switch (status) {
            case 'pagada':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'pendiente':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <SortableHeader sortKey="motivo" sortConfig={sortConfig} requestSort={requestSort}>Motivo</SortableHeader>
                        <SortableHeader sortKey="monto" sortConfig={sortConfig} requestSort={requestSort}>Monto</SortableHeader>
                        <SortableHeader sortKey="residente_nombre" sortConfig={sortConfig} requestSort={requestSort}>Residente</SortableHeader>
                        <SortableHeader sortKey="fecha_emision" sortConfig={sortConfig} requestSort={requestSort}>Fecha Emisión</SortableHeader>
                        <SortableHeader sortKey="fecha_limite" sortConfig={sortConfig} requestSort={requestSort}>Fecha Límite</SortableHeader>
                        <SortableHeader sortKey="estado" sortConfig={sortConfig} requestSort={requestSort}>Estado</SortableHeader>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {fines.length > 0 ? (
                        fines.map((fine) => (
                            <tr key={fine.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fine.motivo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bs {parseFloat(fine.monto).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fine.residente_nombre || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(fine.fecha_emision)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(fine.fecha_limite)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={getStatusChip(fine.estado)}>
                                        {fine.estado}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                <button onClick={() => onView(fine)} className="bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-blue-600 mr-2">Ver</button>
                                <button onClick={() => onEdit(fine)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                                <button onClick={() => onDelete(fine)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">Eliminar</button>
                            </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                                No se encontraron multas.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FinesTable;