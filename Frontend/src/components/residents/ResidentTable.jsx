import React from 'react';

const ResidentTable = ({ residents }) => {

    const handleEdit = (id) => {
        console.log(`Editar residente con ID: ${id}`);
        // Aquí iría la lógica para abrir un modal o ir a una página de edición
    };

    const handleDelete = (id) => {
        console.log(`Eliminar residente con ID: ${id}`);
        // Aquí iría la lógica para mostrar una confirmación y llamar a la API de borrado
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nombre completo</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">CI</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Tipo de Residente</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {residents.map((resident, index) => (
                        <tr key={resident.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="text-left py-3 px-4">{resident.id}</td>
                            <td className="text-left py-3 px-4">{resident.name}</td>
                            <td className="text-left py-3 px-4">{resident.ci}</td>
                            <td className="text-left py-3 px-4">{resident.email}</td>
                            <td className="text-left py-3 px-4">{resident.type}</td>
                            <td className="text-left py-3 px-4">
                                <button 
                                    onClick={() => handleEdit(resident.id)}
                                    className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => handleDelete(resident.id)}
                                    className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600"
                                >
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

export default ResidentTable;