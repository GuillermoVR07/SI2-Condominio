import React from 'react';

const SecurityLogsTable = ({ logs, onView, onEdit, onDelete }) => {
    const priorityStyles = {
        'baja': 'bg-gray-200 text-gray-800',
        'media': 'bg-yellow-200 text-yellow-800',
        'alta': 'bg-red-200 text-red-800',
    };
    const statusStyles = {
        'pendiente': 'bg-blue-100 text-blue-800',
        'en_revision': 'bg-purple-100 text-purple-800',
        'resuelto': 'bg-green-100 text-green-800',
    };
    const formatDate = (dateString) => new Date(dateString).toLocaleString('es-ES');
    const formatText = (text) => text ? text.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()) : 'N/A';

    return (
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Tipo</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Fecha y Hora</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Ubicación</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Prioridad</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Estado</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {logs.map((log) => (
                    <tr key={log.id} className="border-b hover:bg-gray-100">
                        <td className="py-3 px-4 font-medium">{formatText(log.tipo)}</td>
                        <td className="py-3 px-4">{formatDate(log.fecha_hora)}</td>
                        <td className="py-3 px-4">{log.ubicacion}</td>
                        <td className="py-3 px-4">
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${priorityStyles[log.prioridad] || 'bg-gray-100'}`}>
                                {formatText(log.prioridad)}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyles[log.estado] || 'bg-gray-100'}`}>
                                {formatText(log.estado)}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <button onClick={() => onView(log)} className="bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-blue-600 mr-2">Ver</button>
                            <button onClick={() => onEdit(log)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                            <button onClick={() => onDelete(log)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SecurityLogsTable;