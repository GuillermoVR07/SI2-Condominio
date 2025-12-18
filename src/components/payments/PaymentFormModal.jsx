import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentFormModal = ({ payment, prefilled, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        tipo: 'reserva', cuota: null, multa: null, reserva: null, monto_pagado: '0.00', metodo: 'qr', estado: 'completado', observacion: ''
    });

    // Estados para las listas de deudas pendientes
    const [pendingReservations, setPendingReservations] = useState([]);
    const [pendingFines, setPendingFines] = useState([]);
    const [pendingDues, setPendingDues] = useState([]);

    // Carga las listas de deudas pendientes cuando el modal se monta
    useEffect(() => {
        const fetchPendingDebts = async () => {
            try {
                const [reservasRes, multasRes, cuotasRes] = await Promise.all([
                    axios.get('/api/reservas/?estado=pendiente'),
                    axios.get('/api/multas/?estado=pendiente'),
                    // Asumiendo que tu API de cuotas también acepta este filtro
                    axios.get('/api/cuotas/?estado=pendiente') 
                ]);
                if (Array.isArray(reservasRes.data)) setPendingReservations(reservasRes.data);
                if (Array.isArray(multasRes.data)) setPendingFines(multasRes.data);
                if (Array.isArray(cuotasRes.data)) setPendingDues(cuotasRes.data);
            } catch (error) {
                console.error("Error al cargar deudas pendientes:", error);
            }
        };

        if (!prefilled) { // Solo carga estas listas si no es un pago rápido desde reservas
            fetchPendingDebts();
        }
    }, [prefilled]);

    // Lógica para pre-llenar el formulario
    useEffect(() => {
        if (payment) setFormData(payment);
        if (prefilled) setFormData(prev => ({ ...prev, ...prefilled }));
    }, [payment, prefilled]);

    // Efecto para autocompletar el monto cuando se selecciona una deuda
    useEffect(() => {
        let selectedDebt = null;
        if (formData.tipo === 'reserva' && formData.reserva) {
            selectedDebt = pendingReservations.find(r => r.id === parseInt(formData.reserva));
            if(selectedDebt) setFormData(prev => ({ ...prev, monto_pagado: selectedDebt.monto_total }));
        } else if (formData.tipo === 'multa' && formData.multa) {
            selectedDebt = pendingFines.find(m => m.id === parseInt(formData.multa));
            if(selectedDebt) setFormData(prev => ({ ...prev, monto_pagado: selectedDebt.monto }));
        } else if (formData.tipo === 'cuota' && formData.cuota) {
            selectedDebt = pendingDues.find(c => c.id === parseInt(formData.cuota));
            if(selectedDebt) setFormData(prev => ({ ...prev, monto_pagado: selectedDebt.monto }));
        }
    }, [formData.reserva, formData.multa, formData.cuota, pendingReservations, pendingFines, pendingDues]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        // Reinicia la selección de la deuda si se cambia el tipo
        if (name === 'tipo') {
            setFormData(prev => ({ ...prev, tipo: value, reserva: null, multa: null, cuota: null, monto_pagado: '0.00' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-1/2">
                <h2 className="text-2xl font-bold mb-6">{payment ? 'Editar Pago' : 'Registrar Nuevo Pago'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Solo muestra el selector de tipo si NO es un pago pre-llenado */}
                    {!prefilled && (
                        <select name="tipo" value={formData.tipo} onChange={handleChange} required className="p-2 border rounded w-full">
                            <option value="reserva">Pago de Reserva</option>
                            <option value="multa">Pago de Multa</option>
                            <option value="cuota">Pago de Cuota</option>
                        </select>
                    )}

                    {/* Selector dinámico para Reservas */}
                    {!prefilled && formData.tipo === 'reserva' && (
                        <select name="reserva" value={formData.reserva || ''} onChange={handleChange} required className="p-2 border rounded w-full">
                            <option value="" disabled>Seleccione una reserva pendiente...</option>
                            {pendingReservations.map(r => <option key={r.id} value={r.id}>{r.area_comun_nombre} - {r.residente_nombre} ({r.fecha})</option>)}
                        </select>
                    )}

                    {/* Selector dinámico para Multas */}
                    {!prefilled && formData.tipo === 'multa' && (
                         <select name="multa" value={formData.multa || ''} onChange={handleChange} required className="p-2 border rounded w-full">
                            <option value="" disabled>Seleccione una multa pendiente...</option>
                            {pendingFines.map(m => <option key={m.id} value={m.id}>{m.motivo} - {m.residente_nombre}</option>)}
                        </select>
                    )}
                    
                    {/* (Opcional) Selector dinámico para Cuotas */}
                    {!prefilled && formData.tipo === 'cuota' && (
                        <select name="cuota" value={formData.cuota || ''} onChange={handleChange} required className="p-2 border rounded w-full">
                            <option value="" disabled>Seleccione una cuota pendiente...</option>
                            {pendingDues.map(c => <option key={c.id} value={c.id}>{c.titulo} - {c.residente_nombre}</option>)}
                        </select>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                        <input name="monto_pagado" type="number" step="0.01" value={formData.monto_pagado} onChange={handleChange} placeholder="Monto Pagado" required className="p-2 border rounded bg-gray-100" readOnly />
                        <select name="metodo" value={formData.metodo} onChange={handleChange} required className="p-2 border rounded">
                            <option value="qr">QR</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta</option>
                        </select>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Guardar Pago</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentFormModal;

