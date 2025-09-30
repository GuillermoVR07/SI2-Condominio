import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentsTable from '../components/payments/PaymentsTable';
import PaymentFormModal from '../components/payments/PaymentFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import Button from '../components/ui/Button';

const PaymentsPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Nuevo estado para errores de carga
    const [currentPayment, setCurrentPayment] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            setError(null); // Limpia errores anteriores
            const response = await axios.get('/api/pagos/');
            if (Array.isArray(response.data)) {
                setPayments(response.data);
            } else {
                setPayments([]);
            }
        } catch (error) {
            console.error("Error al obtener los pagos:", error);
            setError("No se pudieron cargar los pagos. El servidor encontró un problema.");
            setPayments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleNew = () => {
        setCurrentPayment(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (payment) => {
        setCurrentPayment(payment);
        setIsFormModalOpen(true);
    };

    const handleDelete = (payment) => {
        setCurrentPayment(payment);
        setIsDeleteModalOpen(true);
    };

    const handleSave = async (formData) => {
        // En una app real, el ID de usuario vendría del contexto de autenticación
        const dataToSend = { ...formData, user: 1 };
        try {
            if (currentPayment) {
                await axios.put(`/api/pagos/${currentPayment.id}/`, dataToSend);
            } else {
                await axios.post('/api/pagos/', dataToSend);
            }
            setIsFormModalOpen(false);
            fetchPayments();
        } catch (error) {
            console.error("Error al guardar el pago:", error.response?.data);
            // Mostramos una alerta al usuario sobre el error del servidor
            alert("Error del servidor: No se pudo guardar el pago. Revise la consola para más detalles.");
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/pagos/${currentPayment.id}/`);
            setIsDeleteModalOpen(false);
            fetchPayments();
        } catch (error) {
            console.error("Error al eliminar el pago:", error.response?.data);
            alert("Error del servidor: No se pudo eliminar el pago.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Panel de Pagos</h1>
                <Button onClick={handleNew}>Nuevo Pago</Button>
            </div>
            {loading ? (
                <p>Cargando pagos...</p>
            ) : error ? (
                // Muestra un mensaje de error si la carga inicial falla
                <div className="text-red-500 bg-red-100 p-4 rounded-md">{error}</div>
            ) : (
                <PaymentsTable payments={payments} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            {isFormModalOpen && (
                <PaymentFormModal
                    payment={currentPayment}
                    onClose={() => setIsFormModalOpen(false)}
                    onSave={handleSave}
                />
            )}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    unitName={`el pago de ${currentPayment?.monto_pagado} Bs.`}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default PaymentsPage;

