import React from 'react';

const AnnouncementsTable = ({ announcements, onView, onEdit, onDelete }) => {
    // Función para formatear la fecha a un formato más legible
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Título</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Tipo</th>
                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Contenido</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Autor</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Fecha de Publicación</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {announcements.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-4">{item.titulo}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${item.tipo === 'Urgente' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'}`}>
                                    {item.tipo}
                                </span>
                            </td>
                            <td className="py-3 px-4 max-w-xs truncate" title={item.contenido}>{item.contenido}</td>
                            <td className="py-3 px-4">{item.usuario_nombre}</td>
                            <td className="py-3 px-4">{formatDate(item.fecha_publicacion)}</td>
                            <td className="py-3 px-4">
                                <button 
                                    onClick={() => onView(item)} 
                                    className="bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-blue-600 mr-2">
                                    Ver
                                </button>
                                <button 
                                    onClick={() => onEdit(item)} 
                                    className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">
                                    Editar
                                </button>
                                <button 
                                    onClick={() => onDelete(item)} 
                                    className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnnouncementsTable;