import React from 'react';

const EmployeesTable = ({ employees, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nombre Completo</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">CI</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Teléfono</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Cargo</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {employees.map((employee) => (
                        <tr key={employee.id} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-4">{employee.id}</td>
                            <td className="py-3 px-4">{employee.nombre_completo}</td>
                            <td className="py-3 px-4">{employee.ci}</td>
                            <td className="py-3 px-4">{employee.telefono}</td>
                            <td className="py-3 px-4">{employee.cargo_nombre}</td>
                            <td className="py-3 px-4">
                                <button onClick={() => onEdit(employee)} className="bg-yellow-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-yellow-600 mr-2">Editar</button>
                                <button onClick={() => onDelete(employee)} className="bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeesTable;
