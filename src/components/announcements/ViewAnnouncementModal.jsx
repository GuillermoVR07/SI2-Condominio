import React from 'react';

const ViewAnnouncementModal = ({ announcement, onClose }) => {
    // Función para formatear la fecha a un formato más legible
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    const typeStyles = {
        Urgente: 'bg-yellow-100 text-yellow-800',
        Informativo: 'bg-blue-100 text-blue-800',
        // Puedes añadir más estilos para otros tipos aquí
    };

    if (!announcement) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">{announcement.titulo}</h2>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${typeStyles[announcement.tipo] || 'bg-gray-100 text-gray-800'}`}>
                        {announcement.tipo}
                    </span>
                </div>
                
                <div className="text-sm text-gray-500 mb-6">
                    Publicado por: <span className="font-medium">{announcement.usuario_nombre || 'Admin'}</span> el {formatDate(announcement.fecha_publicacion)}
                </div>

                <div className="prose max-w-none text-gray-700 bg-gray-50 p-4 rounded-md">
                    {/* Usamos <pre> para respetar los saltos de línea y espacios del contenido */}
                    <pre className="whitespace-pre-wrap font-sans">{announcement.contenido}</pre>
                </div>
                
                <div className="mt-8 text-right">
                    <button onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-6 rounded hover:bg-gray-600">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAnnouncementModal;
