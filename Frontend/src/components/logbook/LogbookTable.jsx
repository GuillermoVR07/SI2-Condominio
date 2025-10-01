import React from 'react';

const LogbookTable = ({ entries }) => {
    // Función para formatear la fecha a un formato legible
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Fecha y Hora</th>
                        <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Usuario</th>
                        <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Acción Realizada</th>
                        <th className="w-1/2 py-3 px-4 uppercase font-semibold text-sm">Detalles</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {entries.map((entry) => (
                        <tr key={entry.id} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-4 text-sm">{formatDate(entry.fecha_hora)}</td>
                            <td className="py-3 px-4 font-medium">{entry.usuario_nombre}</td>
                            <td className="py-3 px-4 font-semibold text-blue-600">{entry.accion}</td>
                            <td className="py-3 px-4 text-sm">{entry.detalles}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogbookTable;
