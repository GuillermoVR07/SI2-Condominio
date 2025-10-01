import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Componentes
import SecurityLogsTable from '../components/security_logs/SecurityLogsTable';
import SecurityLogFormModal from '../components/security_logs/SecurityLogFormModal';
import SecurityLogViewModal from '../components/security_logs/SecurityLogViewModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import Button from '../components/ui/Button';

const SecurityLogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentLog, setCurrentLog] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { user } = useAuth();

    const API_URL = '/api/registros-seguridad/';

    const fetchSecurityLogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            if (Array.isArray(response.data)) setLogs(response.data);
            else setLogs([]);
        } catch (error) {
            console.error("Error al obtener los registros de seguridad:", error);
            setLogs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSecurityLogs(); }, []);

    const handleNew = () => { setCurrentLog(null); setIsFormModalOpen(true); };
    const handleView = (log) => { setCurrentLog(log); setIsViewModalOpen(true); };
    const handleEdit = (log) => { setCurrentLog(log); setIsFormModalOpen(true); };
    const handleDelete = (log) => { setCurrentLog(log); setIsDeleteModalOpen(true); };

    const handleSave = async (formData) => {
        // Adjuntamos el ID del usuario que crea/edita el registro
        const dataToSend = { ...formData, user: user.id };
        try {
            if (currentLog) {
                await axios.put(`${API_URL}${currentLog.id}/`, dataToSend);
            } else {
                await axios.post(API_URL, dataToSend);
            }
            setIsFormModalOpen(false);
            fetchSecurityLogs();
        } catch (error) {
            console.error("Error al guardar el registro:", error.response?.data);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${API_URL}${currentLog.id}/`);
            setIsDeleteModalOpen(false);
            fetchSecurityLogs();
        } catch (error) {
            console.error("Error al eliminar el registro:", error.response?.data);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Registros de Seguridad</h1>
                <Button onClick={handleNew}>Nuevo Registro</Button>
            </div>
            {loading ? <p>Cargando registros...</p> : (
                <SecurityLogsTable logs={logs} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            {isFormModalOpen && (
                <SecurityLogFormModal log={currentLog} onClose={() => setIsFormModalOpen(false)} onSave={handleSave} />
            )}
            {isViewModalOpen && (
                <SecurityLogViewModal log={currentLog} onClose={() => setIsViewModalOpen(false)} />
            )}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal unitName={`el registro de tipo "${currentLog?.tipo}"`} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
            )}
        </div>
    );
};

export default SecurityLogsPage;