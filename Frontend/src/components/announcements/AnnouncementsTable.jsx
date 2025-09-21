import React from 'react';

const AnnouncementsTable = ({ announcements, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Título</th>
                        <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Tipo</th>
                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Contenido</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Autor</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Fecha de Publicación</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {announcements.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-4">{item.title}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${item.type === 'Urgente' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'}`}>
                                    {item.type}
                                </span>
                            </td>
                            {/* Usamos clases de Tailwind para truncar el texto largo */}
                            <td className="py-3 px-4 max-w-xs truncate">{item.content}</td>
                            <td className="py-3 px-4">{item.author}</td>
                            <td className="py-3 px-4">{item.date}</td>
                            <td className="py-3 px-4">
                                <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                                <button onClick={() => onDelete(item)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AnnouncementsTable;