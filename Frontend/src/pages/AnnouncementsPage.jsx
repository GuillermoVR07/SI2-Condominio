import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componentes
import AnnouncementsTable from '../components/announcements/AnnouncementsTable';
import AnnouncementFormModal from '../components/announcements/AnnouncementFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal'; // Reutilizamos este modal
import Button from '../components/ui/Button';

const AnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

    // Estados para controlar la visibilidad de los modales
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // --- FUNCIÓN PARA OBTENER DATOS (GET) ---
    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/announcements'); // <-- URL de tu API para comunicados

            // **Programación Defensiva**: Verificamos si la respuesta es un array
            if (Array.isArray(response.data)) {
                setAnnouncements(response.data);
            } else {
                console.warn("La respuesta de la API para comunicados no es un array. Se usará un array vacío.");
                setAnnouncements([]);
            }
        } catch (error) {
            console.error("Error al obtener los comunicados:", error);
            setAnnouncements([]); // Evita que la app se rompa si la API falla
        } finally {
            setLoading(false);
        }
    };

    // useEffect se ejecuta una vez para cargar los datos iniciales
    useEffect(() => {
        fetchAnnouncements();
    }, []);

    // --- MANEJADORES DE ACCIONES ---

    const handleNew = () => {
        setCurrentAnnouncement(null);
        setIsFormModalOpen(true);
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
            if (currentAnnouncement) {
                // UPDATE (PUT)
                await axios.put(`/api/announcements/${currentAnnouncement.id}`, formData);
            } else {
                // CREATE (POST)
                await axios.post('/api/announcements', formData);
            }
            setIsFormModalOpen(false);
            fetchAnnouncements(); // Recarga los datos para ver los cambios inmediatamente
        } catch (error) {
            console.error("Error al guardar el comunicado:", error);
        }
    };

    // --- LÓGICA CRUD (DELETE) ---
    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/announcements/${currentAnnouncement.id}`);
            setIsDeleteModalOpen(false);
            fetchAnnouncements(); // Recarga los datos para que el comunicado eliminado desaparezca
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
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
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
                    unitName={`el comunicado "${currentAnnouncement?.title}"`}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default AnnouncementsPage;
