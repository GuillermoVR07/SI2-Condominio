import React, { useState, useEffect } from 'react';

const AnnouncementFormModal = ({ announcement, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        contenido: '',
        tipo: 'Informativo', // Valor por defecto
    });

    // Este efecto llena el formulario con los datos existentes si se está editando
    useEffect(() => {
        if (announcement) {
            setFormData({
                titulo: announcement.titulo,
                contenido: announcement.contenido,
                tipo: announcement.tipo,
            });
        }
    }, [announcement]);

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
                <h2 className="text-2xl font-bold mb-6">{announcement ? 'Editar Comunicado' : 'Nuevo Comunicado'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input name="titulo" value={formData.titulo} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                        <select name="tipo" value={formData.tipo} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md">
                            {/* Los tipos están definidos aquí para coincidir con tu CharField del backend */}
                            <option value="Informativo">Informativo</option>
                            <option value="Urgente">Urgente</option>
                            {/* Si quieres añadir más tipos, simplemente agrégalos aquí y asegúrate de que tu backend los acepte */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contenido</label>
                        <textarea name="contenido" value={formData.contenido} onChange={handleChange} rows="5" className="mt-1 p-2 w-full border rounded-md" required />
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AnnouncementFormModal;