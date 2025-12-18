import React from 'react';
import Modal from '../ui/Modal'; 
import Button from '../ui/Button';

const FineViewModal = ({ fine, onClose }) => {
    if (!fine) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const detailItem = (label, value) => (
        <div className="py-2">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-md text-gray-900">{value || 'No especificado'}</p>
        </div>
    );

    return (
        <Modal title="Detalles de la Multa" onClose={onClose}>
            <div className="space-y-3">
                {detailItem("Motivo", fine.motivo)}
                {detailItem("Monto", `$${parseFloat(fine.monto).toFixed(2)}`)}
                {detailItem("Estado", fine.estado)}
                {detailItem("Residente Afectado", fine.residente_nombre)}
                {detailItem("Emitida por", fine.empleado_nombre)}
                {detailItem("Fecha de Emisión", formatDate(fine.fecha_emision))}
                {detailItem("Fecha Límite de Pago", formatDate(fine.fecha_limite))}
                {detailItem("Asociada a Cuota", fine.cuota_titulo)}
            </div>
            <div className="mt-6 flex justify-end">
                <Button onClick={onClose} variant="secondary">Cerrar</Button>
            </div>
        </Modal>
    );
};

export default FineViewModal;