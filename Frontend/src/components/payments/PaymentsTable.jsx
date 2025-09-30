import React from 'react';

const PaymentsTable = ({ payments, onEdit, onDelete }) => {
    const statusStyles = {
        'completado': 'bg-green-100 text-green-800',
        'pendiente': 'bg-yellow-100 text-yellow-800',
        'fallido': 'bg-red-100 text-red-800',
    };
    const formatDateTime = (dateTimeString) => new Date(dateTimeString).toLocaleString('es-ES');

    return (
        <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Tipo</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Monto (Bs.)</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Fecha</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Método</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Estado</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {payments.map((pago) => (
                    <tr key={pago.id} className="border-b hover:bg-gray-100">
                        <td className="py-3 px-4">{pago.id}</td>
                        <td className="py-3 px-4 capitalize">{pago.tipo}</td>
                        <td className="py-3 px-4">{parseFloat(pago.monto_pagado).toFixed(2)}</td>
                        <td className="py-3 px-4">{formatDateTime(pago.fecha_pago)}</td>
                        <td className="py-3 px-4 capitalize">{pago.metodo}</td>
                        <td className="py-3 px-4">
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyles[pago.estado] || 'bg-gray-100'}`}>
                                {pago.estado.charAt(0).toUpperCase() + pago.estado.slice(1)}
                            </span>
                        </td>
                        <td className="py-3 px-4">
                            <button onClick={() => onEdit(pago)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                            <button onClick={() => onDelete(pago)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PaymentsTable;
