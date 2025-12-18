import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationFormModal = ({ reservation, onClose, onSave, apiError }) => {
    const [formData, setFormData] = useState({
        area_comun: '', residente: '', fecha: '', hora_inicio: '', hora_fin: '', monto_total: '0.00', estado: 'pendiente', observacion: ''
    });
    const [areas, setAreas] = useState([]); // <-- Ahora solo guardará áreas disponibles
    const [allAreas, setAllAreas] = useState([]); // Guardamos todas para obtener el monto
    const [residentes, setResidentes] = useState([]);

    useEffect(() => {
        // Cargar datos para los menús desplegables
        const fetchDataForSelects = async () => {
            try {
                const [areasRes, residentesRes] = await Promise.all([
                    axios.get('/api/areas-comunes/'),
                    axios.get('/api/residentes/')
                ]);

                if (Array.isArray(areasRes.data)) {
                    // --- VALIDACIÓN PRINCIPAL: FILTRAMOS LAS ÁREAS ---
                    const availableAreas = areasRes.data.filter(area => area.estado === 'disponible');
                    setAreas(availableAreas);
                    setAllAreas(areasRes.data); // Guardamos todas para poder obtener el monto después
                }
                
                if (Array.isArray(residentesRes.data)) {
                    setResidentes(residentesRes.data);
                }
            } catch (error) {
                console.error("Error al cargar datos para el formulario:", error);
            }
        };
        fetchDataForSelects();
    }, []);

    // Efecto para autocompletar el monto cuando se selecciona un área
    useEffect(() => {
        if (formData.area_comun) {
            const selectedArea = allAreas.find(area => area.id === parseInt(formData.area_comun, 10));
            if (selectedArea) {
                setFormData(prev => ({ ...prev, monto_total: selectedArea.monto }));
            }
        }
    }, [formData.area_comun, allAreas]);

    useEffect(() => {
        if (reservation) {
            setFormData(reservation);
        }
    }, [reservation]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-1/2">
                <h2 className="text-2xl font-bold mb-6">{reservation ? 'Editar Reserva' : 'Nueva Reserva'}</h2>
                
                {/* --- SECCIÓN PARA MOSTRAR ERRORES DEL BACKEND --- */}
                {apiError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{JSON.stringify(apiError)}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <select name="area_comun" value={formData.area_comun} onChange={handleChange} required className="p-2 border rounded">
                            <option value="" disabled>Seleccione un área disponible...</option>
                            {/* El dropdown ahora solo muestra áreas disponibles */}
                            {areas.map(area => <option key={area.id} value={area.id}>{area.nombre}</option>)}
                        </select>
                        <select name="residente" value={formData.residente} onChange={handleChange} required className="p-2 border rounded">
                            <option value="" disabled>Seleccione un residente...</option>
                            {residentes.map(res => <option key={res.id} value={res.id}>{res.nombre_completo}</option>)}
                        </select>
                        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required className="p-2 border rounded" />
                        <select name="estado" value={formData.estado} onChange={handleChange} required className="p-2 border rounded">
                            <option value="pendiente">Pendiente</option>
                            <option value="confirmada">Confirmada</option>
                            <option value="cancelada">Cancelada</option>
                        </select>
                        <input type="time" name="hora_inicio" value={formData.hora_inicio} onChange={handleChange} required className="p-2 border rounded" />
                        <input type="time" name="hora_fin" value={formData.hora_fin} onChange={handleChange} required className="p-2 border rounded" />
                    </div>
                    <input type="number" step="0.01" name="monto_total" value={formData.monto_total} onChange={handleChange} placeholder="Monto Total (Bs.)" required readOnly className="p-2 w-full border rounded bg-gray-100" />
                    <textarea name="observacion" value={formData.observacion} onChange={handleChange} placeholder="Observaciones (opcional)" rows="3" className="p-2 w-full border rounded" />
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReservationFormModal;

