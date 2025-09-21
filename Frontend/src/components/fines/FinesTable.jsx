import React from 'react';

const FinesTable = ({ fines, onEdit, onDelete }) => {
    const statusStyles = {
        Pagada: 'bg-green-200 text-green-800',
        Pendiente: 'bg-yellow-200 text-yellow-800',
        Anulada: 'bg-red-200 text-red-800',
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Usuario</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Motivo</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Monto (Bs.)</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Emitida</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Vencimiento</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Estado</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {fines.map((fine) => (
                        <tr key={fine.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-4">{fine.user}</td>
                            <td className="py-3 px-4">{fine.reason}</td>
                            <td className="py-3 px-4">{fine.amount.toFixed(2)}</td>
                            <td className="py-3 px-4">{fine.issuedDate}</td>
                            <td className="py-3 px-4">{fine.dueDate}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${statusStyles[fine.status]}`}>
                                    {fine.status}
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                <button onClick={() => onEdit(fine)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                                <button onClick={() => onDelete(fine)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FinesTable;