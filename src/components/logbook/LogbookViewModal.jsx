import React from 'react';

const LogbookViewModal = ({ entry, onClose }) => {
    if (!entry) return null;
    const formatDate = (dateString) => new Date(dateString).toLocaleString('es-ES');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{entry.titulo}</h2>
                <div className="text-sm text-gray-500 mb-6">
                    Registrado por: <span className="font-medium">{entry.usuario_nombre}</span> el {formatDate(entry.fecha_hora)}
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">Descripción Completa:</h3>
                    <pre className="text-gray-600 bg-gray-50 p-3 rounded-md whitespace-pre-wrap font-sans">{entry.descripcion}</pre>
                </div>
                <div className="mt-8 text-right">
                    <button onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-6 rounded hover:bg-gray-600">Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default LogbookViewModal;