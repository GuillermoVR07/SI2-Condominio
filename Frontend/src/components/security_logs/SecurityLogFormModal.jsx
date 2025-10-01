import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SecurityLogFormModal = ({ log, onClose, onSave }) => {
    // 1. CORRECCIÓN: Inicializamos todos los campos de texto/select con cadenas vacías
    const [formData, setFormData] = useState({
        tipo: 'ronda',
        origen: 'seguridad',
        ubicacion: '',
        descripcion: '',
        prioridad: 'baja',
        estado: 'pendiente',
        observaciones: '', // Antes era null
        resuelto_por: '', // Antes era null
    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/usuarios/');
                if (Array.isArray(response.data)) setUsers(response.data);
            } catch (error) { console.error("Error al cargar usuarios:", error); }
        };
        fetchUsers();
    }, []);

    // 2. CORRECCIÓN: Nos aseguramos de que los valores que vienen del 'log' no sean nulos
    useEffect(() => {
        if (log) {
            setFormData({
                tipo: log.tipo || 'ronda',
                origen: log.origen || 'seguridad',
                ubicacion: log.ubicacion || '',
                descripcion: log.descripcion || '',
                prioridad: log.prioridad || 'baja',
                estado: log.estado || 'pendiente',
                observaciones: log.observaciones || '', // Garantiza que sea string vacío
                resuelto_por: log.resuelto_por || '', // Garantiza que sea string vacío
            });
        }
    }, [log]);

    // 3. CORRECCIÓN: Simplificamos el handleChange para que siempre maneje strings
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-1/2">
                <h2 className="text-2xl font-bold mb-6">{log ? 'Editar' : 'Nuevo'} Registro de Seguridad</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <select name="tipo" value={formData.tipo} onChange={handleChange} className="p-2 border rounded">
                            <option value="ronda">Ronda</option>
                            <option value="incidente">Incidente</option>
                            <option value="reporte">Reporte</option>
                        </select>
                        <select name="origen" value={formData.origen} onChange={handleChange} className="p-2 border rounded">
                            <option value="seguridad">Seguridad</option>
                            <option value="residente">Residente</option>
                        </select>
                    </div>
                    {/* 4. CORRECCIÓN: Usamos '|| ""' como un seguro extra en cada 'value' */}
                    <input name="ubicacion" value={formData.ubicacion || ''} onChange={handleChange} placeholder="Ubicación" required className="p-2 w-full border rounded" />
                    <textarea name="descripcion" value={formData.descripcion || ''} onChange={handleChange} placeholder="Descripción detallada" rows="4" required className="p-2 w-full border rounded" />
                    <div className="grid grid-cols-2 gap-4">
                        <select name="prioridad" value={formData.prioridad} onChange={handleChange} className="p-2 border rounded">
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </select>
                         <select name="estado" value={formData.estado} onChange={handleChange} className="p-2 border rounded">
                            <option value="pendiente">Pendiente</option>
                            <option value="en_revision">En Revisión</option>
                            <option value="resuelto">Resuelto</option>
                        </select>
                    </div>
                    <select name="resuelto_por" value={formData.resuelto_por || ''} onChange={handleChange} className="p-2 w-full border rounded">
                        <option value="">Sin resolver / No aplica</option>
                        {users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}
                    </select>
                    <textarea name="observaciones" value={formData.observaciones || ''} onChange={handleChange} placeholder="Observaciones / Resolución" rows="3" className="p-2 w-full border rounded" />
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SecurityLogFormModal;
