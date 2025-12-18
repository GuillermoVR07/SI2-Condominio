import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const UnitsTable = ({ units, onView, onEdit, onDelete, requestSort, sortConfig }) => {
    
    // Componente para las cabeceras de la tabla que permite ordenar
    const SortableHeader = ({ columnKey, title }) => {
        const isSorted = sortConfig.key === columnKey;
        const direction = sortConfig.direction;

        return (
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm cursor-pointer" onClick={() => requestSort(columnKey)}>
                <div className="flex items-center">
                    {title}
                    <span className="ml-2">
                        {isSorted ? (direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                    </span>
                </div>
            </th>
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <SortableHeader columnKey="id" title="ID" />
                        <SortableHeader columnKey="codigo" title="Código" />
                        <SortableHeader columnKey="residente_nombre" title="Residente" />
                        <SortableHeader columnKey="placa" title="Placa" />
                        <SortableHeader columnKey="marca" title="Marca" />
                        <SortableHeader columnKey="estado" title="Estado" />
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {units.map((unit, index) => (
                        <tr key={unit.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="py-3 px-4">{unit.id}</td>
                            <td className="py-3 px-4 font-semibold">{unit.codigo}</td>
                            <td className="py-3 px-4">{unit.residente_nombre}</td>
                            <td className="py-3 px-4">{unit.placa}</td>
                            <td className="py-3 px-4">{unit.marca}</td>
                            <td className="py-3 px-4">
                                <span className={`capitalize px-2 py-1 text-xs font-bold rounded-full ${unit.estado === 'activa' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                    {unit.estado}
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