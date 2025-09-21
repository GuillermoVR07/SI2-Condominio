import React from 'react';

const UnitsTable = ({ units, onView, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Código</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Residente</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Placa</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Marca</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Estado</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {units.map((unit, index) => (
                        <tr key={unit.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-3 px-4">{unit.id}</td>
                            <td className="py-3 px-4 font-semibold">{unit.code}</td>
                            <td className="py-3 px-4">{unit.resident}</td>
                            <td className="py-3 px-4">{unit.plate}</td>
                            <td className="py-3 px-4">{unit.brand}</td>
                            <td className="py-3 px-4">
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${unit.status === 'Activa' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                    {unit.status}
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                <button onClick={() => onView(unit)} className="bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-blue-600 mr-2">Ver</button>
                                <button onClick={() => onEdit(unit)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                                <button onClick={() => onDelete(unit)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UnitsTable;