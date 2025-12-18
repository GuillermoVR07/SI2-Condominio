import React, { useState, useEffect } from 'react';

const CargoFormModal = ({ cargo, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        cargo: '',
        estado: 'activo'
    });

    useEffect(() => {
        if (cargo) {
            setFormData(cargo);
        }
    }, [cargo]);

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
            <div className="bg-white p-8 rounded-lg shadow-xl w-1/3">
                <h2 className="text-2xl font-bold mb-6">{cargo ? 'Editar Cargo' : 'Nuevo Cargo'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Nombre del Cargo" required className="p-2 w-full border rounded" />
                    <select name="estado" value={formData.estado} onChange={handleChange} className="p-2 w-full border rounded">
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CargoFormModal;
