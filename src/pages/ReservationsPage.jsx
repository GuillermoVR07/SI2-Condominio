import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationsTable from '../components/reservations/ReservationsTable';
import ReservationFormModal from '../components/reservations/ReservationFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import Button from '../components/ui/Button';
import PaymentFormModal from '../components/payments/PaymentFormModal'; // <-- IMPORTA EL MODAL DE PAGO

const ReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentReservation, setCurrentReservation] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [apiError, setApiError] = useState(null);

    // --- NUEVOS ESTADOS PARA EL MODAL DE PAGO ---
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [reservationForPayment, setReservationForPayment] = useState(null);

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/reservas/');
            if (Array.isArray(response.data)) {
                setReservations(response.data);
            } else {
                setReservations([]);
            }
        } catch (error) {
            console.error("Error al obtener las reservas:", error);
            setReservations([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const openFormModal = () => {
        setApiError(null);
        setIsFormModalOpen(true);
    };

    const handleNew = () => {
        setCurrentReservation(null);
        openFormModal();
    };

    const handleEdit = (reservation) => {
        setCurrentReservation(reservation);
        openFormModal();
    };

    const handleDelete = (reservation) => {
        setCurrentReservation(reservation);
        setIsDeleteModalOpen(true);
    };

    // --- NUEVA FUNCIÓN PARA ABRIR EL MODAL DE PAGO ---
    const handleRegisterPayment = (reservation) => {
        setReservationForPayment(reservation);
        setIsPaymentModalOpen(true);
    };

    const handleSave = async (formData) => {
        try {
            setApiError(null);
            if (currentReservation) {
                await axios.put(`/api/reservas/${currentReservation.id}/`, formData);
            } else {
                await axios.post('/api/reservas/', formData);
            }
            setIsFormModalOpen(false);
            fetchReservations();
        } catch (error) {
            console.error("Error al guardar la reserva:", error.response?.data);
            setApiError(error.response?.data || { detail: "Ocurrió un error desconocido." });
        }
    };

    // --- FUNCIÓN DE ELIMINAR CON MENSAJE MEJORADO ---
    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/reservas/${currentReservation.id}/`);
            setIsDeleteModalOpen(false);
            fetchReservations();
        } catch (error) {
            console.error("Error al eliminar la reserva:", error);
            let errorMessage = "Error del servidor. No se pudo eliminar la reserva.";
            // Mensaje coherente si el backend devuelve un error de conflicto (ej: 409) o un error 500
            // Django REST Framework a menudo usa 400 para ProtectedError
            if (error.response && (error.response.status === 400 || error.response.status === 500)) {
                errorMessage = "No se puede eliminar la reserva porque tiene pagos u otros registros asociados. Primero elimine esos registros.";
            } else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            }
            alert(errorMessage);
        }
    };
    
    // --- NUEVA FUNCIÓN PARA GUARDAR EL PAGO ---
    const handleSavePayment = async (paymentData) => {
        // En una app real, el ID de usuario vendría del contexto de autenticación
        const dataToSend = { ...paymentData, user: 1 }; 
        try {
            await axios.post('/api/pagos/', dataToSend);
            setIsPaymentModalOpen(false);
            // Opcional: podrías recargar las reservas para actualizar su estado de pago
            fetchReservations(); 
        } catch (error) {
            console.error("Error al registrar el pago:", error.response?.data);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Panel de Reservas</h1>
                <Button onClick={handleNew}>Nueva Reserva</Button>
            </div>
            {loading ? <p>Cargando reservas...</p> : (
                <ReservationsTable 
                    reservations={reservations} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                    onRegisterPayment={handleRegisterPayment} // <-- PASA LA NUEVA FUNCIÓN
                />
            )}
            
            {isFormModalOpen && (
                <ReservationFormModal 
                    reservation={currentReservation} 
                    onClose={() => setIsFormModalOpen(false)} 
                    onSave={handleSave}
                    apiError={apiError}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal 
                    unitName={`la reserva de ${currentReservation?.area_comun_nombre} por ${currentReservation?.residente_nombre}`} 
                    onClose={() => setIsDeleteModalOpen(false)} 
                    onConfirm={confirmDelete} 
                />
            )}

            {/* --- MODAL PARA REGISTRAR PAGO --- */}
            {isPaymentModalOpen && (
                <PaymentFormModal
                    onClose={() => setIsPaymentModalOpen(false)}
                    onSave={handleSavePayment}
                    // Pre-llenamos el formulario con datos de la reserva
                    prefilled={{
                        tipo: 'reserva',
                        reserva: reservationForPayment.id,
                        monto_pagado: reservationForPayment.monto_total,
                    }}
                />
            )}
        </div>
    );
};

export default ReservationsPage;

