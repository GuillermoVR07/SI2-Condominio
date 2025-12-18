import React from 'react';

const SecurityLogViewModal = ({ log, onClose }) => {
    if (!log) return null;
    const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleString('es-ES') : 'N/A';
    const formatText = (text) => text ? text.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()) : 'N/A';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Detalle del Registro de Seguridad</h2>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <p><strong>Tipo:</strong> {formatText(log.tipo)}</p>
                    <p><strong>Origen:</strong> {formatText(log.origen)}</p>
                    <p><strong>Fecha y Hora:</strong> {formatDate(log.fecha_hora)}</p>
                    <p><strong>Ubicación:</strong> {log.ubicacion}</p>
                    <p><strong>Prioridad:</strong> {formatText(log.prioridad)}</p>
                    <p><strong>Estado:</strong> {formatText(log.estado)}</p>
                    <p><strong>Reportado por:</strong> {log.user_nombre}</p>
                    <p><strong>Resuelto por:</strong> {log.resuelto_por_nombre || 'No resuelto'}</p>
                </div>
                <div className="mt-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Descripción:</h3>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{log.descripcion}</p>
                </div>
                {log.observaciones && (
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Observaciones:</h3>
                        <p className="text-gray-600 bg-blue-50 p-3 rounded-md">{log.observaciones}</p>
                    </div>
                )}
                <div className="mt-8 text-right">
                    <button onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-6 rounded hover:bg-gray-600">Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default SecurityLogViewModal;