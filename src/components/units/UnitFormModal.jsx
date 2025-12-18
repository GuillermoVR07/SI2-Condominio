import React, { useState, useEffect } from 'react';

const UnitFormModal = ({ unit, residents, onClose, onSave }) => {
    // ... (código del estado inicial sin cambios) ...
    const [formData, setFormData] = useState({
        codigo: '',
        placa: '',
        marca: '',
        estado: 'activa',
        personas_por_unidad: 1,
        tiene_mascotas: false,
        vehiculos: 0,
        residente: ''
    });

    // Estado para la búsqueda de residentes
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResidents, setFilteredResidents] = useState([]);
    const [isResidentListOpen, setIsResidentListOpen] = useState(false);

    useEffect(() => {
        if (unit) {
            setFormData({
                codigo: unit.codigo || '',
                placa: unit.placa || '',
                marca: unit.marca || '',
                estado: unit.estado || 'activa',
                personas_por_unidad: unit.personas_por_unidad || 1,
                tiene_mascotas: unit.tiene_mascotas || false,
                vehiculos: unit.vehiculos || 0,
                residente: unit.residente || ''
            });
            const currentResident = residents.find(r => r.id === unit.residente);
            if (currentResident) {
                setSearchTerm(currentResident.nombre_completo);
            }
        }
    }, [unit, residents]);

    // Filtrar residentes basado en el término de búsqueda (nombre o CI)
    useEffect(() => {
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const filtered = residents.filter(r =>
                r.nombre_completo.toLowerCase().includes(lowerCaseSearchTerm) ||
                r.ci.includes(searchTerm)
            );
            setFilteredResidents(filtered);
        } else {
            setFilteredResidents([]);
        }
    }, [searchTerm, residents]);

    // ... (código de los manejadores handleChange, handleSelectResident, handleSubmit sin cambios) ...
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleResidentSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setIsResidentListOpen(true);
    };

    const handleSelectResident = (resident) => {
        setFormData(prev => ({ ...prev, residente: resident.id }));
        setSearchTerm(resident.nombre_completo);
        setIsResidentListOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6">{unit ? 'Editar Unidad' : 'Nueva Unidad'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Código</label>
                            <input name="codigo" value={formData.codigo} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Buscar Residente (Nombre o CI)</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleResidentSearchChange}
                                onFocus={() => setIsResidentListOpen(true)}
                                placeholder="Escriba para buscar..."
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                            {isResidentListOpen && searchTerm && (
                                <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-40 overflow-y-auto">
                                    {filteredResidents.length > 0 ? (
                                        filteredResidents.map(r => (
                                            <li
                                                key={r.id}
                                                onClick={() => handleSelectResident(r)}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {r.nombre_completo} ({r.ci})
                                            </li>
                                        ))
                                    ) : (
                                        <li className="p-2 text-gray-500">No se encontraron residentes</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Placa del Vehículo</label>
                            <input 
                                name="placa" 
                                value={formData.placa} 
                                onChange={handleChange} 
                                className="mt-1 p-2 w-full border rounded-md"
                                placeholder="1234-ABC"
                                pattern="\d{1,4}-[A-Za-z]{3}"
                                title="Formato: 4 números, un guion, 3 letras (ej: 1234-ABC)"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Marca del Vehículo</label>
                            <input name="marca" value={formData.marca} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" />
                        </div>
                    </div>

                    {/* ... (resto del formulario sin cambios) ... */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Personas por Unidad</label>
                            <input type="number" name="personas_por_unidad" value={formData.personas_por_unidad} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" min="1" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nº de Vehículos</label>
                            <input type="number" name="vehiculos" value={formData.vehiculos} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" min="0" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado</label>
                            <select name="estado" value={formData.estado} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md">
                                <option value="activa">Activa</option>
                                <option value="inactiva">Inactiva</option>
                                <option value="mantenimiento">Mantenimiento</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" id="tiene_mascotas" name="tiene_mascotas" checked={formData.tiene_mascotas} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                        <label htmlFor="tiene_mascotas" className="ml-2 block text-sm text-gray-900">Tiene Mascotas</label>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UnitFormModal;