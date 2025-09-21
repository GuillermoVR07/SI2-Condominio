import React, { useState } from 'react';

const FineFormModal = ({ fine, onClose, onSave }) => {
    const [formData, setFormData] = useState(
        fine || { user: '', reason: '', amount: '', dueDate: '', status: 'Pendiente' }
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
                <h2 className="text-2xl font-bold mb-6">{fine ? 'Editar Multa' : 'Nueva Multa'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="user" value={formData.user} onChange={handleChange} placeholder="Nombre del Usuario" className="p-2 w-full border rounded-md" required />
                    <textarea name="reason" value={formData.reason} onChange={handleChange} placeholder="Motivo de la multa" rows="3" className="p-2 w-full border rounded-md" required />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Monto (Bs.)" className="p-2 w-full border rounded-md" required />
                        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="p-2 w-full border rounded-md" required />
                    </div>
                    <select name="status" value={formData.status} onChange={handleChange} className="p-2 w-full border rounded-md">
                        <option value="Pendiente">Pendiente</option>
                        <option value="Pagada">Pagada</option>
                        <option value="Anulada">Anulada</option>
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

export default FineFormModal;