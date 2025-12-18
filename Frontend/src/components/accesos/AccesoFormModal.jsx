import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const AccesoFormModal = ({ isOpen, onClose, onSave, registro }) => {
    const initialState = {
        tipo_persona: 'Residente',
        nombre_completo: '',
        ci: '',
        motivo: '',
        tipo_acceso: 'Entrada',
        foto: null, // For file upload
        residente_id: null,
        empleado_id: null,
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [fotoPreview, setFotoPreview] = useState(null); // To display image preview

    // Data for searchable dropdowns
    const [allResidentes, setAllResidentes] = useState([]);
    const [filteredResidentes, setFilteredResidentes] = useState([]);
    const [residenteSearchTerm, setResidenteSearchTerm] = useState('');
    const [isResidenteListOpen, setIsResidenteListOpen] = useState(false);

    const [allEmpleados, setAllEmpleados] = useState([]);
    const [filteredEmpleados, setFilteredEmpleados] = useState([]);
    const [empleadoSearchTerm, setEmpleadoSearchTerm] = useState('');
    const [isEmpleadoListOpen, setIsEmpleadoListOpen] = useState(false);

    // --- Fetch initial data (Residentes, Empleados) ---
    useEffect(() => {
        if (isOpen) {
            const fetchLookupData = async () => {
                try {
                    const [residenteRes, empleadoRes] = await Promise.all([
                        axios.get('/api/residentes/'),
                        axios.get('/api/empleados/')
                    ]);
                    setAllResidentes(residenteRes.data || []);
                    setAllEmpleados(empleadoRes.data || []);
                } catch (err) {
                    console.error("Error fetching lookup data:", err);
                }
            };
            fetchLookupData();
        }
    }, [isOpen]);

    // --- Populate form on edit or reset on new ---
    useEffect(() => {
        if (isOpen) {
            if (registro) {
                // Pre-fill form for editing
                setFormData({
                    tipo_persona: registro.tipo_persona || 'Residente',
                    nombre_completo: registro.nombre_completo || '',
                    ci: registro.ci || '',
                    motivo: registro.motivo || '',
                    tipo_acceso: registro.tipo_acceso || 'Entrada',
                    foto: null, // Clear file input
                    residente_id: registro.residente_id || null, // Assuming backend sends these
                    empleado_id: registro.empleado_id || null, // Assuming backend sends these
                });
                setFotoPreview(registro.foto_url || null);

                // If editing an existing resident/employee log, set their search term
                if (registro.tipo_persona === 'Residente' && registro.residente_nombre) {
                    setResidenteSearchTerm(registro.residente_nombre);
                } else if (registro.tipo_persona === 'Empleado' && registro.empleado_nombre) {
                    setEmpleadoSearchTerm(registro.empleado_nombre);
                }

            } else {
                setFormData(initialState);
                setFotoPreview(null);
                setResidenteSearchTerm('');
                setEmpleadoSearchTerm('');
            }
            setErrors({});
        }
    }, [isOpen, registro]);

    // --- Search filtering logic for Residents ---
    useEffect(() => {
        if (residenteSearchTerm && formData.tipo_persona === 'Residente') {
            const lowerTerm = residenteSearchTerm.toLowerCase();
            const filtered = allResidentes.filter(r =>
                r.nombre_completo.toLowerCase().includes(lowerTerm) ||
                r.ci.toLowerCase().includes(lowerTerm)
            );
            setFilteredResidentes(filtered);
        } else {
            setFilteredResidentes([]);
        }
    }, [residenteSearchTerm, allResidentes, formData.tipo_persona]);

    // --- Search filtering logic for Employees ---
    useEffect(() => {
        if (empleadoSearchTerm && formData.tipo_persona === 'Empleado') {
            const lowerTerm = empleadoSearchTerm.toLowerCase();
            const filtered = allEmpleados.filter(e =>
                e.nombre_completo.toLowerCase().includes(lowerTerm) ||
                e.ci.toLowerCase().includes(lowerTerm)
            );
            setFilteredEmpleados(filtered);
        } else {
            setFilteredEmpleados([]);
        }
    }, [empleadoSearchTerm, allEmpleados, formData.tipo_persona]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Reset related search terms and IDs if person type changes
        if (name === 'tipo_persona') {
            setResidenteSearchTerm('');
            setEmpleadoSearchTerm('');
            setFormData(prev => ({ ...prev, residente_id: null, empleado_id: null, nombre_completo: '', ci: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, foto: file }));
        if (file) {
            setFotoPreview(URL.createObjectURL(file));
        } else {
            setFotoPreview(registro?.foto_url || null);
        }
    };

    const handleSelectResidente = (residente) => {
        setFormData(prev => ({
            ...prev,
            residente_id: residente.id,
            nombre_completo: residente.nombre_completo,
            ci: residente.ci
        }));
        setResidenteSearchTerm(residente.nombre_completo);
        setIsResidenteListOpen(false);
    };

    const handleSelectEmpleado = (empleado) => {
        setFormData(prev => ({
            ...prev,
            empleado_id: empleado.id,
            nombre_completo: empleado.nombre_completo,
            ci: empleado.ci
        }));
        setEmpleadoSearchTerm(empleado.nombre_completo);
        setIsEmpleadoListOpen(false);
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.tipo_persona) newErrors.tipo_persona = 'El tipo de persona es obligatorio.';
        if (!formData.tipo_acceso) newErrors.tipo_acceso = 'El tipo de acceso es obligatorio.';

        if (formData.tipo_persona === 'Residente') {
            if (!formData.residente_id) newErrors.residente_id = 'Debe seleccionar un residente.';
        } else if (formData.tipo_persona === 'Empleado') {
            if (!formData.empleado_id) newErrors.empleado_id = 'Debe seleccionar un empleado.';
        } else { // Visitante, Proveedor, Otro
            if (!formData.nombre_completo) newErrors.nombre_completo = 'El nombre completo es obligatorio.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const dataToSave = new FormData();
            dataToSave.append('tipo_persona', formData.tipo_persona);
            dataToSave.append('tipo_acceso', formData.tipo_acceso);
            dataToSave.append('motivo', formData.motivo || ''); // Ensure motive is sent even if empty

            if (formData.tipo_persona === 'Residente' && formData.residente_id) {
                dataToSave.append('residente_id', formData.residente_id);
            } else if (formData.tipo_persona === 'Empleado' && formData.empleado_id) {
                dataToSave.append('empleado_id', formData.empleado_id);
            } else { // For visitors, etc., use the free-text fields
                dataToSave.append('nombre_completo', formData.nombre_completo);
                if (formData.ci) dataToSave.append('ci', formData.ci);
            }

            if (formData.foto) dataToSave.append('foto', formData.foto);

            onSave(dataToSave);
        }
    };

    if (!isOpen) {
        return null;
    }

    const renderPersonInput = () => {
        if (formData.tipo_persona === 'Residente') {
            return (
                <div className="relative">
                    <Input
                        label="Buscar Residente"
                        type="text"
                        value={residenteSearchTerm}
                        onChange={(e) => { setResidenteSearchTerm(e.target.value); setIsResidenteListOpen(true); }}
                        onFocus={() => setIsResidenteListOpen(true)}
                        onBlur={() => setTimeout(() => setIsResidenteListOpen(false), 100)} // Delay to allow click
                        placeholder="Buscar por nombre o CI..."
                        error={errors.residente_id}
                        required
                    />
                    {isResidenteListOpen && residenteSearchTerm && filteredResidentes.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                            {filteredResidentes.map(r => (
                                <li
                                    key={r.id}
                                    onClick={() => handleSelectResidente(r)}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {r.nombre_completo} ({r.ci})
                                </li>
                            ))}
                        </ul>
                    )}
                     {isResidenteListOpen && residenteSearchTerm && filteredResidentes.length === 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                            <li className="p-2 text-gray-500">No se encontraron residentes.</li>
                        </ul>
                    )}
                </div>
            );
        } else if (formData.tipo_persona === 'Empleado') {
            return (
                <div className="relative">
                    <Input
                        label="Buscar Empleado"
                        type="text"
                        value={empleadoSearchTerm}
                        onChange={(e) => { setEmpleadoSearchTerm(e.target.value); setIsEmpleadoListOpen(true); }}
                        onFocus={() => setIsEmpleadoListOpen(true)}
                        onBlur={() => setTimeout(() => setIsEmpleadoListOpen(false), 100)}
                        placeholder="Buscar por nombre o CI..."
                        error={errors.empleado_id}
                        required
                    />
                    {isEmpleadoListOpen && empleadoSearchTerm && filteredEmpleados.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                            {filteredEmpleados.map(e => (
                                <li
                                    key={e.id}
                                    onClick={() => handleSelectEmpleado(e)}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                >
                                    {e.nombre_completo} ({e.ci}) - {e.cargo_nombre}
                                </li>
                            ))}
                        </ul>
                    )}
                    {isEmpleadoListOpen && empleadoSearchTerm && filteredEmpleados.length === 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                            <li className="p-2 text-gray-500">No se encontraron empleados.</li>
                        </ul>
                    )}
                </div>
            );
        } else { // Visitante, Proveedor, Otro
            return (
                <>
                    <Input
                        label="Nombre Completo"
                        name="nombre_completo"
                        value={formData.nombre_completo}
                        onChange={handleChange}
                        error={errors.nombre_completo}
                        required
                    />
                    <Input
                        label="Cédula de Identidad (CI)"
                        name="ci"
                        value={formData.ci}
                        onChange={handleChange}
                        error={errors.ci}
                        placeholder="Opcional"
                    />
                </>
            );
        }
    };


    return (
        <Modal title={registro ? 'Editar Registro de Acceso' : 'Nuevo Registro de Acceso'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Select
                    label="Tipo de Persona"
                    name="tipo_persona"
                    value={formData.tipo_persona}
                    onChange={handleChange}
                    error={errors.tipo_persona}
                    required
                >
                    <option value="Residente">Residente</option>
                    <option value="Visitante">Visitante</option>
                    <option value="Empleado">Empleado</option>
                    <option value="Proveedor">Proveedor</option>
                    <option value="Otro">Otro</option>
                </Select>

                {renderPersonInput()}

                <div>
                    <label htmlFor="motivo" className="block text-sm font-medium text-gray-700">Motivo</label>
                    <textarea
                        id="motivo"
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Motivo de entrada/salida (opcional)"
                    />
                </div>

                <Select
                    label="Tipo de Acceso"
                    name="tipo_acceso"
                    value={formData.tipo_acceso}
                    onChange={handleChange}
                    error={errors.tipo_acceso}
                    required
                >
                    <option value="Entrada">Entrada</option>
                    <option value="Salida">Salida</option>
                </Select>

                <div>
                    <label htmlFor="foto" className="block text-sm font-medium text-gray-700">Foto (opcional)</label>
                    <input
                        type="file"
                        id="foto"
                        name="foto"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {fotoPreview && (
                        <div className="mt-2">
                            <img src={fotoPreview} alt="Vista previa de la foto" className="max-w-xs h-auto rounded-md shadow-sm" />
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button type="submit">{registro ? 'Actualizar' : 'Crear'} Registro</Button>
                </div>
            </form>
        </Modal>
    );
};

export default AccesoFormModal;
