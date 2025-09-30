import React from 'react';

const ItemsTable = ({ items, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nombre</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Categoría</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Ubicación</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Estado</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Valor (Bs.)</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {items.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-4 font-medium">{item.nombre}</td>
                            <td className="py-3 px-4">{item.categoria_nombre}</td>
                            <td className="py-3 px-4">{item.ubicacion}</td>
                            <td className="py-3 px-4">{item.estado}</td>
                            <td className="py-3 px-4">{parseFloat(item.valor_estimado).toFixed(2)}</td>
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

export default ItemsTable;
