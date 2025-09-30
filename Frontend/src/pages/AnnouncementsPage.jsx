import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componentes
import AnnouncementsTable from '../components/announcements/AnnouncementsTable';
import AnnouncementFormModal from '../components/announcements/AnnouncementFormModal';
import ViewAnnouncementModal from '../components/announcements/ViewAnnouncementModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const AnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
    
    // Estados para controlar la visibilidad de cada modal
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    const { user } = useAuth();

    // --- FUNCIÓN PARA OBTENER DATOS (GET) ---
    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/comunicados/');

            if (Array.isArray(response.data)) {
                setAnnouncements(response.data);
            } else {
                console.warn("La respuesta de /api/comunicados/ no es un array. Se usará un array vacío.");
                setAnnouncements([]);
            }
        } catch (error) {
            console.error("Error al obtener los comunicados:", error);
            setAnnouncements([]);
        } finally {
            setLoading(false);
        }
    };

    // Carga inicial de datos
    useEffect(() => {
        fetchAnnouncements();
    }, []);

    // --- MANEJADORES DE ACCIONES ---
    const handleNew = () => {
        setCurrentAnnouncement(null);
        setIsFormModalOpen(true);
    };

    const handleView = (announcement) => {
        setCurrentAnnouncement(announcement);
        setIsViewModalOpen(true);
    };

    const handleEdit = (announcement) => {
        setCurrentAnnouncement(announcement);
        setIsFormModalOpen(true);
    };

    const handleDelete = (announcement) => {
        setCurrentAnnouncement(announcement);
        setIsDeleteModalOpen(true);
    };

    // --- LÓGICA CRUD (CREATE/POST y UPDATE/PUT) ---
    const handleSave = async (formData) => {
        try {
            // Usamos el ID del usuario logueado (simulado o real)
            const dataToSend = { ...formData, usuario: user.id }; 

            if (currentAnnouncement) {
                await axios.put(`/api/comunicados/${currentAnnouncement.id}/`, dataToSend);
            } else {
                await axios.post('/api/comunicados/', dataToSend);
            }
            setIsFormModalOpen(false);
            fetchAnnouncements();
        } catch (error) {
            console.error("Error al guardar el comunicado:", error);
            if (error.response) {
                console.error("Detalle del error del backend:", error.response.data);
            }
        }
    };

    // --- LÓGICA CRUD (DELETE) ---
    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/comunicados/${currentAnnouncement.id}/`);
            setIsDeleteModalOpen(false);
            fetchAnnouncements();
        } catch (error) {
            console.error("Error al eliminar el comunicado:", error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lista de Comunicados</h1>
                <Button onClick={handleNew}>Nuevo Comunicado</Button>
            </div>

            {loading ? (
                <p>Cargando comunicados...</p>
            ) : (
                <AnnouncementsTable 
                    announcements={announcements} 
                    onView={handleView}
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                />
            )}

            {/* --- Modales --- */}

            {isViewModalOpen && (
                <ViewAnnouncementModal
                    announcement={currentAnnouncement}
                    onClose={() => setIsViewModalOpen(false)}
                />
            )}

            {isFormModalOpen && (
                <AnnouncementFormModal
                    announcement={currentAnnouncement}
                    onClose={() => setIsFormModalOpen(false)}
                    onSave={handleSave}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    unitName={`el comunicado "${currentAnnouncement?.titulo}"`}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default AnnouncementsPage;