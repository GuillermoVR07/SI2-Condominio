import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClaimFormModal = ({ claim, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        tipo: 'reclamo', titulo: '', descripcion: '', estado: 'pendiente', residente: '', empleado: null, respuesta: ''
    });
    const [residentes, setResidentes] = useState([]);
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        const fetchDataForSelects = async () => {
            try {
                const [residentesRes, empleadosRes] = await Promise.all([
                    axios.get('/api/residentes/'),
                    axios.get('/api/empleados/')
                ]);
                if (Array.isArray(residentesRes.data)) setResidentes(residentesRes.data);
                if (Array.isArray(empleadosRes.data)) setEmpleados(empleadosRes.data);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };
        fetchDataForSelects();
    }, []);

    useEffect(() => { if (claim) setFormData({ ...claim, empleado: claim.empleado || null }); }, [claim]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value === '' ? null : value }));
    };

    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-1/2">
                <h2 className="text-2xl font-bold mb-6">{claim ? 'Editar' : 'Nuevo'} Reclamo o Sugerencia</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <select name="tipo" value={formData.tipo} onChange={handleChange} className="p-2 border rounded">
                            <option value="reclamo">Reclamo</option>
                            <option value="sugerencia">Sugerencia</option>
                        </select>
                        <select name="residente" value={formData.residente} onChange={handleChange} required className="p-2 border rounded">
                            <option value="" disabled>Seleccione un residente...</option>
                            {residentes.map(res => <option key={res.id} value={res.id}>{res.nombre_completo}</option>)}
                        </select>
                    </div>
                    <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" required className="p-2 w-full border rounded" />
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción detallada" rows="4" required className="p-2 w-full border rounded" />
                    <select name="estado" value={formData.estado} onChange={handleChange} className="p-2 w-full border rounded">
                        <option value="pendiente">Pendiente</option>
                        <option value="abierto">Abierto</option>
                        <option value="resuelto">Resuelto</option>
                    </select>
                    <textarea name="respuesta" value={formData.respuesta || ''} onChange={handleChange} placeholder="Respuesta del personal (opcional)" rows="3" className="p-2 w-full border rounded" />
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClaimFormModal;