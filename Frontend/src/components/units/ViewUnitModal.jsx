import React from 'react';

const ViewUnitModal = ({ unit, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-1/3">
                <h2 className="text-2xl font-bold mb-4">Detalles de la Unidad: {unit.code}</h2>
                <div className="space-y-2">
                    <p><strong>Residente:</strong> {unit.resident}</p>
                    <p><strong>Placa:</strong> {unit.plate}</p>
                    <p><strong>Marca:</strong> {unit.brand}</p>
                    <p><strong>Capacidad:</strong> {unit.capacity}</p>
                    <p><strong>Estado:</strong> {unit.status}</p>
                    <p><strong>Personas:</strong> {unit.people}</p>
                    <p><strong>Mascotas:</strong> {unit.pets}</p>
                    <p><strong>Vehículos:</strong> {unit.vehicles}</p>
                </div>
                <div className="mt-6 text-right">
                    <button onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUnitModal;