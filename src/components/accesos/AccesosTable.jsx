import React from 'react';
import { FaEdit, FaTrashAlt, FaImage } from 'react-icons/fa';

const AccesosTable = ({ registros, onEdit, onDelete }) => {

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateTimeString).toLocaleString('es-ES', options);
    };

    const getAccessTypeChip = (type) => {
        const baseClasses = "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full";
        switch (type) {
            case 'Entrada':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'Salida':
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800`;
        }
    };
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Acceso</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persona</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CI</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Persona</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registrado por</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {registros.length > 0 ? (
                        registros.map((registro) => (
                            <tr key={registro.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {formatDateTime(registro.fecha_hora)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={getAccessTypeChip(registro.tipo_acceso)}>{registro.tipo_acceso}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {registro.nombre_completo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {registro.ci || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {registro.tipo_persona}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {registro.registrado_por_username || 'Sistema'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {registro.foto_url ? (
                                        <a href={registro.foto_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                                            <FaImage size={20} />
                                        </a>
                                    ) : (
                                        <span className="text-gray-400">N/A</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => onEdit(registro)} className="text-indigo-600 hover:text-indigo-900 mr-4" title="Editar">
                                        <FaEdit size={18} />
                                    </button>
                                    <button onClick={() => onDelete(registro)} className="text-red-600 hover:text-red-900" title="Eliminar">
                                        <FaTrashAlt size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                                No se encontraron registros de acceso.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AccesosTable;
