import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componentes
import ClaimsTable from '../components/claims/ClaimsTable';
import ClaimFormModal from '../components/claims/ClaimFormModal';
import ClaimViewModal from '../components/claims/ClaimViewModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import Button from '../components/ui/Button';

const ClaimsPage = () => {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentClaim, setCurrentClaim] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const API_URL = '/api/reclamos/';

    const fetchClaims = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            if (Array.isArray(response.data)) setClaims(response.data);
            else setClaims([]);
        } catch (error) {
            console.error("Error al obtener los reclamos:", error);
            setClaims([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchClaims(); }, []);

    const handleNew = () => { setCurrentClaim(null); setIsFormModalOpen(true); };
    const handleView = (claim) => { setCurrentClaim(claim); setIsViewModalOpen(true); };
    const handleEdit = (claim) => { setCurrentClaim(claim); setIsFormModalOpen(true); };
    const handleDelete = (claim) => { setCurrentClaim(claim); setIsDeleteModalOpen(true); };

    const handleSave = async (formData) => {
        try {
            if (currentClaim) {
                await axios.put(`${API_URL}${currentClaim.id}/`, formData);
            } else {
                await axios.post(API_URL, formData);
            }
            setIsFormModalOpen(false);
            fetchClaims();
        } catch (error) {
            console.error("Error al guardar el reclamo:", error.response?.data);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${API_URL}${currentClaim.id}/`);
            setIsDeleteModalOpen(false);
            fetchClaims();
        } catch (error) {
            console.error("Error al eliminar el reclamo:", error.response?.data);
            alert("No se pudo eliminar el reclamo.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Panel de Reclamos y Sugerencias</h1>
                <Button onClick={handleNew}>Nuevo Reclamo/Sugerencia</Button>
            </div>
            {loading ? <p>Cargando...</p> : (
                <ClaimsTable claims={claims} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            {isFormModalOpen && (
                <ClaimFormModal claim={currentClaim} onClose={() => setIsFormModalOpen(false)} onSave={handleSave} />
            )}
            {isViewModalOpen && (
                <ClaimViewModal claim={currentClaim} onClose={() => setIsViewModalOpen(false)} />
            )}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal unitName={`el ${currentClaim?.tipo} "${currentClaim?.titulo}"`} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
            )}
        </div>
    );
};

export default ClaimsPage;
