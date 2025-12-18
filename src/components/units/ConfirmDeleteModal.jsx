import React from 'react';

const ConfirmDeleteModal = ({ unitName, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-1/3">
                <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                <p>¿Estás seguro de que deseas eliminar la unidad <strong>{unitName}</strong>? Esta acción no se puede deshacer.</p>
                <div className="mt-6 flex justify-end space-x-4">
                    <button onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">
                        Cancelar
                    </button>
                    <button onClick={onConfirm} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;