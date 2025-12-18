import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'; // Importamos un ícono para el botón

// Reutilizamos el modal de formulario de cargos que ya creamos
import CargoFormModal from '../cargos/CargoFormModal';

const EmployeeFormModal = ({ employee, onClose, onSave }) => {
    const [formData, setFormData] = React.useState({
        nombre: '', apellido: '', ci: '', telefono: '', direccion: '', cargo: ''
    });
    const [cargos, setCargos] = React.useState([]);
    // --- NUEVO ESTADO PARA CONTROLAR EL MODAL DE CARGOS ---
    const [isCargoModalOpen, setIsCargoModalOpen] = React.useState(false);

    // Función para obtener los cargos, ahora la podemos llamar cuando queramos
    const fetchCargos = async () => {
        try {
            const response = await axios.get('/api/cargos-empleado/');
            if (Array.isArray(response.data)) {
                setCargos(response.data);
                // Si no estamos editando y no hay un cargo seleccionado, asignamos el primero por defecto
                if (!employee && response.data.length > 0 && !formData.cargo) {
                    setFormData(prev => ({ ...prev, cargo: response.data[0].id }));
                }
            }
        } catch (error) {
            console.error("Error al obtener los cargos:", error);
        }
    };

    React.useEffect(() => {
        fetchCargos();
    }, []); // Se ejecuta solo una vez al inicio

    React.useEffect(() => {
        if (employee) {
            // Aseguramos que el 'cargo' sea el ID, no el objeto completo
            setFormData({ ...employee, cargo: employee.cargo });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    // --- FUNCIÓN PARA GUARDAR EL NUEVO CARGO ---
    const handleSaveCargo = async (cargoData) => {
        try {
            // Hacemos el POST para crear el nuevo cargo
            const response = await axios.post('/api/cargos-empleado/', cargoData);
            
            // Cerramos el modal de cargos
            setIsCargoModalOpen(false);
            
            // Volvemos a cargar la lista de cargos actualizada
            await fetchCargos();

            // Seleccionamos automáticamente el cargo recién creado
            setFormData(prev => ({ ...prev, cargo: response.data.id }));

        } catch (error) {
            console.error("Error al guardar el nuevo cargo:", error.response?.data);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-xl w-1/2">
                    <h2 className="text-2xl font-bold mb-6">{employee ? 'Editar Empleado' : 'Nuevo Empleado'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required className="p-2 border rounded" />
                            <input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" required className="p-2 border rounded" />
                            <input name="ci" value={formData.ci} onChange={handleChange} placeholder="CI" required className="p-2 border rounded" />
                            <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" className="p-2 border rounded" />
                        </div>
                        <input name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" className="p-2 w-full border rounded" />
                        
                        {/* --- CAMPO DE CARGO CON BOTÓN --- */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cargo</label>
                            <div className="flex items-center space-x-2 mt-1">
                                <select name="cargo" value={formData.cargo} onChange={handleChange} required className="p-2 w-full border rounded">
                                    <option value="" disabled>Seleccione un cargo...</option>
                                    {cargos.map(cargo => (
                                        <option key={cargo.id} value={cargo.id}>{cargo.cargo}</option>
                                    ))}
                                </select>
                                <button 
                                    type="button" 
                                    onClick={() => setIsCargoModalOpen(true)}
                                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    title="Añadir nuevo cargo"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
                            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* --- MODAL ANIDADO PARA CREAR CARGOS --- */}
            {isCargoModalOpen && (
                <CargoFormModal 
                    onClose={() => setIsCargoModalOpen(false)}
                    onSave={handleSaveCargo}
                />
            )}
        </>
    );
};

export default EmployeeFormModal;

