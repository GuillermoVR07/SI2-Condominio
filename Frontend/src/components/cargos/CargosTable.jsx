import React from 'react';

const CargosTable = ({ cargos, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Cargo</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Estado</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {cargos.map((cargo) => (
                        <tr key={cargo.id} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-4">{cargo.id}</td>
                            <td className="py-3 px-4">{cargo.cargo}</td>
                            <td className="py-3 px-4">{cargo.estado}</td>
                            <td className="py-3 px-4">
                                <button onClick={() => onEdit(cargo)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                                <button onClick={() => onDelete(cargo)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CargosTable;
