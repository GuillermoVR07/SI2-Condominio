import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const FineFormModal = ({ fine, residents, employees, cuotas, onClose, onSave }) => {
    // ... (el resto del estado y useEffects se mantienen igual) ...
    const initialState = {
        motivo: '',
        monto: '',
        fecha_limite: '',
        estado: 'pendiente',
        residente: '',
        empleado: '',
        cuota: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [residentSearch, setResidentSearch] = useState('');
    const [filteredResidents, setFilteredResidents] = useState([]);

    // Cargar datos de la multa si estamos en modo edición
    useEffect(() => {
        if (fine) {
            setFormData({
                motivo: fine.motivo || '',
                monto: fine.monto || '',
                // Formatear fecha para el input type="date"
                fecha_limite: fine.fecha_limite ? fine.fecha_limite.split('T')[0] : '',
                estado: fine.estado || 'pendiente',
                residente: fine.residente || '',
                empleado: fine.empleado || '',
                cuota: fine.cuota || '',
            });
            // Si se edita, mostrar el nombre del residente actual en el buscador
            const currentResident = residents.find(r => r.id === fine.residente);
            if (currentResident) {
                setResidentSearch(currentResident.nombre_completo);
            }
        } else {
            setFormData(initialState);
            setResidentSearch(''); // Limpiar búsqueda al crear nuevo
        }
    }, [fine, residents]);

    // ... (el resto de la lógica se mantiene igual) ...
    // Lógica para el buscador de residentes
    useEffect(() => {
        if (residentSearch) {
            setFilteredResidents(
                residents.filter(r =>
                    r.nombre_completo.toLowerCase().includes(residentSearch.toLowerCase()) ||
                    r.ci.includes(residentSearch)
                )
            );
        } else {
            setFilteredResidents([]);
        }
    }, [residentSearch, residents]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleResidentSearchChange = (e) => {
        setResidentSearch(e.target.value);
        // Limpiar el ID del residente si se modifica la búsqueda
        if (formData.residente) {
            setFormData(prev => ({ ...prev, residente: '' }));
        }
    };

    const selectResident = (resident) => {
        setResidentSearch(resident.nombre_completo);
        setFormData(prev => ({ ...prev, residente: resident.id }));
        setFilteredResidents([]);
    };

    // Validación del formulario
    const validate = () => {
        const newErrors = {};
        if (!formData.motivo) newErrors.motivo = 'El motivo es obligatorio.';
        if (!formData.monto || isNaN(formData.monto) || formData.monto <= 0) newErrors.monto = 'El monto debe ser un número positivo.';
        if (!formData.fecha_limite) newErrors.fecha_limite = 'La fecha límite es obligatoria.';
        if (!formData.residente) newErrors.residente = 'Debe seleccionar un residente.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
        }
    };

    return (
        <Modal title={fine ? 'Editar Multa' : 'Crear Multa'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Motivo"
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    error={errors.motivo}
                    required
                />
                <Input
                    label="Monto"
                    name="monto"
                    type="number"
                    step="0.01"
                    value={formData.monto}
                    onChange={handleChange}
                    error={errors.monto}
                    required
                />
                <Input
                    label="Fecha Límite"
                    name="fecha_limite"
                    type="date"
                    value={formData.fecha_limite}
                    onChange={handleChange}
                    error={errors.fecha_limite}
                    required
                />
                
                {/* Buscador de Residente */}
                <div className="relative">
                    <Input
                        label="Residente"
                        type="text"
                        value={residentSearch}
                        onChange={handleResidentSearchChange}
                        placeholder="Buscar por nombre o CI..."
                        error={errors.residente}
                        required
                    />
                    {filteredResidents.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                            {filteredResidents.map(resident => (
                                <li
                                    key={resident.id}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => selectResident(resident)}
                                >
                                    {resident.nombre_completo} ({resident.ci})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <Select
                    label="Estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="pagada">Pagada</option>
                </Select>

                <Select
                    label="Empleado que emite (Opcional)"
                    name="empleado"
                    value={formData.empleado}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccionar Empleado --</option>
                    {employees && employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.nombre_completo}</option>
                    ))}
                </Select>

                <Select
                    label="Asociar a Cuota (Opcional)"
                    name="cuota"
                    value={formData.cuota}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccionar Cuota --</option>
                    {cuotas && cuotas.map(c => (
                        <option key={c.id} value={c.id}>{c.titulo} - {c.residente_nombre}</option>
                    ))}
                </Select>

                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
        </Modal>
    );
};

export default FineFormModal;