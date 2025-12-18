import React from 'react';

const ClaimsTable = ({ claims, onView, onEdit, onDelete }) => {
    const statusStyles = {
        'pendiente': 'bg-yellow-100 text-yellow-800',
        'abierto': 'bg-blue-100 text-blue-800',
        'resuelto': 'bg-green-100 text-green-800',
    };
    const formatDate = (dateString) => new Date(dateString).toLocaleString('es-ES');

    return (
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Título</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Tipo</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Residente</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Fecha</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Estado</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {claims.map((claim) => (
                    <tr key={claim.id} className="border-b hover:bg-gray-100">
                        <td className="py-3 px-4 font-medium">{claim.titulo}</td>
                        <td className="py-3 px-4 capitalize">{claim.tipo}</td>
                        <td className="py-3 px-4">{claim.residente_nombre}</td>
                        <td className="py-3 px-4">{formatDate(claim.fecha_creacion)}</td>
                        <td className="py-3 px-4">
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyles[claim.estado] || 'bg-gray-100'}`}>
                                {claim.estado.charAt(0).toUpperCase() + claim.estado.slice(1)}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <button onClick={() => onView(claim)} className="bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-blue-600 mr-2">Ver</button>
                            <button onClick={() => onEdit(claim)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                            <button onClick={() => onDelete(claim)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ClaimsTable;
