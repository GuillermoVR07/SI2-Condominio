import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemFormModal = ({ item, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        nombre: '', descripcion: '', estado: '', fecha_adquisicion: '', tipo_adquisicion: '',
        valor_estimado: '0.00', vida_util: '', valor_residual: '0.00', fecha_baja: null,
        motivo_baja: null, ubicacion: '', categoria: '', area_comun: null
    });
    const [categories, setCategories] = useState([]);
    const [commonAreas, setCommonAreas] = useState([]);

    useEffect(() => {
        // Cargar datos para los menús desplegables
        const fetchDataForSelects = async () => {
            try {
                const [categoriesRes, areasRes] = await Promise.all([
                    axios.get('/api/categorias-inventario/'),
                    axios.get('/api/areas-comunes/')
                ]);
                if (Array.isArray(categoriesRes.data)) setCategories(categoriesRes.data);
                if (Array.isArray(areasRes.data)) setCommonAreas(areasRes.data);
            } catch (error) {
                console.error("Error al cargar datos para el formulario:", error);
            }
        };
        fetchDataForSelects();
    }, []);

    useEffect(() => {
        if (item) {
            setFormData({
                ...item,
                fecha_baja: item.fecha_baja || null,
                motivo_baja: item.motivo_baja || null,
                area_comun: item.area_comun || null,
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value === '' ? null : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-3/4 max-w-4xl max-h-screen overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{item ? 'Editar Ítem' : 'Nuevo Ítem de Inventario'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input name="nombre" value={formData.nombre || ''} onChange={handleChange} placeholder="Nombre del Ítem" required className="p-2 border rounded" />
                        <select name="categoria" value={formData.categoria || ''} onChange={handleChange} required className="p-2 border rounded">
                            <option value="" disabled>Seleccione una categoría...</option>
                            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
                        </select>
                        <select name="area_comun" value={formData.area_comun || ''} onChange={handleChange} className="p-2 border rounded">
                            <option value="">Sin Área Específica</option>
                            {commonAreas.map(area => <option key={area.id} value={area.id}>{area.nombre}</option>)}
                        </select>
                        <input name="ubicacion" value={formData.ubicacion || ''} onChange={handleChange} placeholder="Ubicación Específica" required className="p-2 border rounded" />
                        <input name="estado" value={formData.estado || ''} onChange={handleChange} placeholder="Estado (ej: Bueno, Regular)" required className="p-2 border rounded" />
                        <input name="tipo_adquisicion" value={formData.tipo_adquisicion || ''} onChange={handleChange} placeholder="Tipo de Adquisición (ej: Compra)" required className="p-2 border rounded" />
                    </div>
                    <textarea name="descripcion" value={formData.descripcion || ''} onChange={handleChange} placeholder="Descripción (opcional)" rows="3" className="p-2 w-full border rounded" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="text-sm">Fecha Adquisición</label>
                            <input type="date" name="fecha_adquisicion" value={formData.fecha_adquisicion || ''} onChange={handleChange} required className="p-2 w-full border rounded" />
                        </div>
                        <input type="number" name="valor_estimado" value={formData.valor_estimado || ''} onChange={handleChange} placeholder="Valor Estimado (Bs.)" required className="p-2 border rounded" />
                        <input type="number" name="vida_util" value={formData.vida_util || ''} onChange={handleChange} placeholder="Vida Útil (años)" className="p-2 border rounded" />
                        <input type="number" step="0.01" name="valor_residual" value={formData.valor_residual || ''} onChange={handleChange} placeholder="Valor Residual (Bs.)" className="p-2 border rounded" />
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Guardar Ítem</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemFormModal;
