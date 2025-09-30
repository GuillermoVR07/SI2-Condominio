import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componentes
import AreasTable from '../components/areas/AreasTable';
import AreaFormModal from '../components/areas/AreaFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import Button from '../components/ui/Button';

const AreasPage = () => {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentArea, setCurrentArea] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchAreas = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/areas-comunes/');
            if (Array.isArray(response.data)) {
                setAreas(response.data);
            } else {
                setAreas([]);
            }
        } catch (error) {
            console.error("Error al obtener las áreas comunes:", error);
            setAreas([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAreas();
    }, []);

    const handleNew = () => {
        setCurrentArea(null);
        setIsFormModalOpen(true);
    };
    const handleEdit = (area) => {
        setCurrentArea(area);
        setIsFormModalOpen(true);
    };
    const handleDelete = (area) => {
        setCurrentArea(area);
        setIsDeleteModalOpen(true);
    };

    const handleSave = async (formData) => {
        try {
            if (currentArea) {
                await axios.put(`/api/areas-comunes/${currentArea.id}/`, formData);
            } else {
                await axios.post('/api/areas-comunes/', formData);
            }
            setIsFormModalOpen(false);
            fetchAreas();
        } catch (error) {
            console.error("Error al guardar el área común:", error.response?.data);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/areas-comunes/${currentArea.id}/`);
            setIsDeleteModalOpen(false);
            fetchAreas();
        } catch (error) {
            console.error("Error al eliminar el área común:", error.response?.data);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Áreas Comunes</h1>
                <Button onClick={handleNew}>Nueva Área</Button>
            </div>
            {loading ? <p>Cargando áreas...</p> : (
                <AreasTable areas={areas} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            {isFormModalOpen && (
                <AreaFormModal area={currentArea} onClose={() => setIsFormModalOpen(false)} onSave={handleSave} />
            )}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal unitName={`el área "${currentArea?.nombre}"`} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
            )}
        </div>
    );
};

export default AreasPage;
