import React from 'react';

const ViewUnitModal = ({ unit, onClose }) => {
    if (!unit) return null;

    // Componente auxiliar para mostrar cada detalle
    const DetailItem = ({ label, value }) => (
        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Detalles de la Unidad: {unit.codigo}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                </div>
                
                <div className="border-t border-gray-200">
                    <dl>
                        <DetailItem label="Código de Unidad" value={unit.codigo} />
                        <DetailItem label="Residente Asignado" value={unit.residente_nombre || "No asignado"} />
                        <DetailItem 
                            label="Estado" 
                            value={<span className={`capitalize px-2 py-1 text-xs font-bold rounded-full ${unit.estado === 'activa' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{unit.estado}</span>} 
                        />
                        <DetailItem label="Placa del Vehículo" value={unit.placa || "N/A"} />
                        <DetailItem label="Marca del Vehículo" value={unit.marca || "N/A"} />
                        <DetailItem label="Personas por Unidad" value={unit.personas_por_unidad} />
                        <DetailItem label="Número de Vehículos" value={unit.vehiculos} />
                        <DetailItem label="Tiene Mascotas" value={unit.tiene_mascotas ? "Sí" : "No"} />
                    </dl>
                </div>

                <div className="mt-6 flex justify-end">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUnitModal;