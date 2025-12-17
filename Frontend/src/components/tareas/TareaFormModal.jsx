import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const TareaFormModal = ({ isOpen, onClose, onSave, tarea, empleados }) => {
    const initialState = {
        titulo: '',
        descripcion: '',
        fecha_limite: '',
        estado: 'Pendiente',
        prioridad: 'Media',
        empleado_asignado: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen) {
            if (tarea) {
                // If editing, populate form with task data
                setFormData({
                    titulo: tarea.titulo || '',
                    descripcion: tarea.descripcion || '',
                    fecha_limite: tarea.fecha_limite || '',
                    estado: tarea.estado || 'Pendiente',
                    prioridad: tarea.prioridad || 'Media',
                    empleado_asignado: tarea.empleado_asignado || '',
                });
            } else {
                // If creating, reset to initial state
                setFormData(initialState);
            }
            setErrors({}); // Clear errors when modal opens
        }
    }, [isOpen, tarea]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.titulo) newErrors.titulo = 'El título es obligatorio.';
        if (!formData.empleado_asignado) newErrors.empleado_asignado = 'Debe asignar un empleado.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Ensure null is sent for empty optional fields
            const dataToSave = {
                ...formData,
                fecha_limite: formData.fecha_limite || null,
                empleado_asignado: formData.empleado_asignado || null,
            };
            onSave(dataToSave);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Modal title={tarea ? 'Editar Tarea' : 'Crear Nueva Tarea'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Título"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    error={errors.titulo}
                    required
                />
                
                <div>
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Añade detalles sobre la tarea..."
                    />
                </div>

                <Select
                    label="Asignar a Empleado"
                    name="empleado_asignado"
                    value={formData.empleado_asignado}
                    onChange={handleChange}
                    error={errors.empleado_asignado}
                    required
                >
                    <option value="" disabled>-- Seleccionar Empleado --</option>
                    {empleados.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.nombre_completo}</option>
                    ))}
                </Select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Fecha Límite"
                        name="fecha_limite"
                        type="date"
                        value={formData.fecha_limite}
                        onChange={handleChange}
                    />
                    <Select
                        label="Prioridad"
                        name="prioridad"
                        value={formData.prioridad}
                        onChange={handleChange}
                    >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </Select>
                </div>

                <Select
                    label="Estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Completada">Completada</option>
                    <option value="Cancelada">Cancelada</option>
                </Select>

                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button type="submit">{tarea ? 'Actualizar' : 'Crear'} Tarea</Button>
                </div>
            </form>
        </Modal>
    );
};

export default TareaFormModal;
