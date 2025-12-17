import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TareasTable = ({ tareas, onEdit, onDelete }) => {

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const getStatusChip = (status) => {
        const baseClasses = "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full";
        switch (status) {
            case 'Pendiente':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'En Progreso':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'Completada':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'Cancelada':
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };
    
    const getPriorityChip = (priority) => {
        switch (priority) {
            case 'Alta':
                return 'text-red-600 font-bold';
            case 'Media':
                return 'text-yellow-600 font-semibold';
            case 'Baja':
                return 'text-gray-600';
            default:
                return '';
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empleado Asignado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Límite</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
                        <th className="px-6 py-3 text-left text
-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tareas.length > 0 ? (
                        tareas.map((tarea) => (
                            <tr key={tarea.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{tarea.titulo}</div>
                                    <div className="text-sm text-gray-500 truncate max-w-xs">{tarea.descripcion}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {tarea.empleado_asignado_nombre || <span className="text-gray-400">No asignado</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {formatDate(tarea.fecha_limite)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={getPriorityChip(tarea.prioridad)}>{tarea.prioridad}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={getStatusChip(tarea.estado)}>{tarea.estado}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => onEdit(tarea)} className="text-indigo-600 hover:text-indigo-900 mr-4" title="Editar">
                                        <FaEdit size={18} />
                                    </button>
                                    <button onClick={() => onDelete(tarea)} className="text-red-600 hover:text-red-900" title="Eliminar">
                                        <FaTrashAlt size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                No se encontraron tareas.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TareasTable;
