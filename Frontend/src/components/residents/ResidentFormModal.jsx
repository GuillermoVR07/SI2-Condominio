import React, { useState, useEffect } from 'react';

const ResidentFormModal = ({ resident, onClose, onSave }) => {
    // Inicializa el estado del formulario con los datos del residente si se está editando, o vacío si es nuevo.
    const [formData, setFormData] = useState({
        name: '',
        ci: '',
        email: '',
        type: 'Propietario'
    });

    // useEffect se usa para llenar el formulario cuando se abre para editar.
    useEffect(() => {
        if (resident) {
            setFormData(resident);
        }
    }, [resident]);

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
                <h2 className="text-2xl font-bold mb-6">{resident ? 'Editar Residente' : 'Nuevo Residente'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CI</label>
                            <input name="ci" value={formData.ci} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Tipo de Residente</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md">
                                <option value="Propietario">Propietario</option>
                                <option value="Inquilino">Inquilino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md" required />
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

export default ResidentFormModal;
