import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componentes
import CargosTable from '../components/cargos/CargosTable';
import CargoFormModal from '../components/cargos/CargoFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import Button from '../components/ui/Button';

const CargosPage = () => {
    const [cargos, setCargos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCargo, setCurrentCargo] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchCargos = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/cargos-empleado/');
            if (Array.isArray(response.data)) {
                setCargos(response.data);
            } else {
                setCargos([]);
            }
        } catch (error) {
            console.error("Error al obtener los cargos:", error);
            setCargos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCargos();
    }, []);

    const handleNew = () => {
        setCurrentCargo(null);
        setIsFormModalOpen(true);
    };
    const handleEdit = (cargo) => {
        setCurrentCargo(cargo);
        setIsFormModalOpen(true);
    };
    const handleDelete = (cargo) => {
        setCurrentCargo(cargo);
        setIsDeleteModalOpen(true);
    };

    const handleSave = async (formData) => {
        try {
            if (currentCargo) {
                await axios.put(`/api/cargos-empleado/${currentCargo.id}/`, formData);
            } else {
                await axios.post('/api/cargos-empleado/', formData);
            }
            setIsFormModalOpen(false);
            fetchCargos();
        } catch (error) {
            console.error("Error al guardar el cargo:", error.response?.data);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/cargos-empleado/${currentCargo.id}/`);
            setIsDeleteModalOpen(false);
            fetchCargos();
        } catch (error) {
            console.error("Error al eliminar el cargo:", error.response?.data);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Cargos</h1>
                <Button onClick={handleNew}>Nuevo Cargo</Button>
            </div>
            {loading ? <p>Cargando cargos...</p> : (
                <CargosTable cargos={cargos} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            {isFormModalOpen && (
                <CargoFormModal cargo={currentCargo} onClose={() => setIsFormModalOpen(false)} onSave={handleSave} />
            )}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal unitName={`el cargo "${currentCargo?.cargo}"`} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
            )}
        </div>
    );
};

export default CargosPage;
