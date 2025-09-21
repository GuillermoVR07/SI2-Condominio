import React, { useState } from 'react';

const UnitFormModal = ({ unit, onClose, onSave }) => {
    // Si estamos editando, usamos los datos de la unidad. Si no, empezamos con un formulario vacío.
    const [formData, setFormData] = useState(
        unit || { code: '', resident: '', plate: '', brand: '', status: 'Activa' }
    );

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
                <h2 className="text-2xl font-bold mb-6">{unit ? 'Editar Unidad' : 'Nueva Unidad'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <input name="code" value={formData.code} onChange={handleChange} placeholder="Código (ej. U-101)" className="p-2 border rounded" />
                        <input name="resident" value={formData.resident} onChange={handleChange} placeholder="Nombre del Residente" className="p-2 border rounded" />
                        <input name="plate" value={formData.plate} onChange={handleChange} placeholder="Placa" className="p-2 border rounded" />
                        <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Marca del Vehículo" className="p-2 border rounded" />
                        <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded">
                            <option value="Activa">Activa</option>
                            <option value="Inactiva">Inactiva</option>
                        </select>
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