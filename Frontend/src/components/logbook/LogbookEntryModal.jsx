import React, { useState } from 'react';

const LogbookEntryModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({ titulo: '', descripcion: '' });

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
                <h2 className="text-2xl font-bold mb-6">Nueva Entrada en Bitácora</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" required className="p-2 w-full border rounded" />
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción detallada de lo que se hizo" rows="6" required className="p-2 w-full border rounded" />
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogbookEntryModal;