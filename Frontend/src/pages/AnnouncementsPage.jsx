import React, { useState, useEffect } from 'react';

// Componentes que crearemos
import AnnouncementsTable from '../components/announcements/AnnouncementsTable';
import AnnouncementFormModal from '../components/announcements/AnnouncementFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal'; // Reutilizamos el modal de confirmación!
import Button from '../components/ui/Button';

// Datos de ejemplo
const mockAnnouncements = [
    { id: 1, title: "Ducimus quos quae adipisci dolor quos.", type: "Urgente", content: "Qui corrupti deleniti voluptatem quibusdam et dolo...", author: "admin", date: "06/03/2025 00:12" },
    { id: 2, title: "Aut illum consectetur adipisci odio id.", type: "Urgente", content: "Asperiores quia incidunt ut voluptatem fugiat tota...", author: "admin", date: "18/05/2025 06:23" },
    { id: 3, title: "Et voluptates dolores sed molestias.", type: "Informativo", content: "Rerum pariatur totam ad pariatur. Dolor modi praes...", author: "admin", date: "18/07/2025 20:32" },
];

const AnnouncementsPage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        // --- ESPACIO PARA API (GET) ---
        setTimeout(() => {
            setAnnouncements(mockAnnouncements);
            setLoading(false);
        }, 500);
    }, []);

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

    const handleSave = (formData) => {
        if (currentAnnouncement) {
            // --- ESPACIO PARA API (UPDATE/PUT) ---
            console.log("Actualizando comunicado:", formData);
        } else {
            // --- ESPACIO PARA API (CREATE/POST) ---
            console.log("Creando nuevo comunicado:", formData);
        }
        setIsFormModalOpen(false);
    };

    const confirmDelete = () => {
        // --- ESPACIO PARA API (DELETE) ---
        console.log("Eliminando comunicado:", currentAnnouncement.id);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lista de Comunicados</h1>
                <Button onClick={handleNew}>Nuevo Comunicado</Button>
            </div>

            {loading ? <p>Cargando...</p> : <AnnouncementsTable announcements={announcements} onEdit={handleEdit} onDelete={handleDelete} />}

            {isFormModalOpen && (
                <AnnouncementFormModal
                    announcement={currentAnnouncement}
                    onClose={() => setIsFormModalOpen(false)}
                    onSave={handleSave}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    unitName={currentAnnouncement?.title} // Le pasamos el título del comunicado
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default AnnouncementsPage;