import React from 'react';

const ReservationsTable = ({ reservations, onEdit, onDelete, onRegisterPayment }) => {
    const statusStyles = {
        'pendiente': 'bg-yellow-100 text-yellow-800',
        'confirmada': 'bg-green-100 text-green-800',
        'cancelada': 'bg-red-100 text-red-800',
        'default': 'bg-gray-100 text-gray-800'
    };

    const formatStatus = (status) => {
        if (!status) return 'Indefinido';
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        // Asume que la fecha viene en formato YYYY-MM-DD y evita problemas de zona horaria
        const date = new Date(dateString + 'T00:00:00'); 
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Área Común</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Residente</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Fecha</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Horario</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Monto Total (Bs.)</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Estado</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {reservations.map((reserva) => (
                        <tr key={reserva.id} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-4 font-medium">{reserva.area_comun_nombre}</td>
                            <td className="py-3 px-4">{reserva.residente_nombre}</td>
                            <td className="py-3 px-4">{formatDate(reserva.fecha)}</td>
                            <td className="py-3 px-4">{reserva.hora_inicio} - {reserva.hora_fin}</td>
                            <td className="py-3 px-4">{parseFloat(reserva.monto_total).toFixed(2)}</td>
                            <td className="py-3 px-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusStyles[reserva.estado] || statusStyles.default}`}>
                                    {formatStatus(reserva.estado)}
                                </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                                <button onClick={() => onRegisterPayment(reserva)} className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-green-600 mr-2">Pagar</button>
                                <button onClick={() => onEdit(reserva)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                                <button onClick={() => onDelete(reserva)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationsTable;

