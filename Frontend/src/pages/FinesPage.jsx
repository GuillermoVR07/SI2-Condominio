import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Componentes
import FinesTable from '../components/fines/FinesTable';
import FineFormModal from '../components/fines/FineFormModal';
import FineViewModal from '../components/fines/FineViewModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';

const FinesPage = () => {
    // Estados de datos
    const [fines, setFines] = useState([]);
    const [residents, setResidents] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [cuotas, setCuotas] = useState([]);
    
    // Estados de UI
    const [loading, setLoading] = useState(true);
    const [currentFine, setCurrentFine] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'fecha_emision', direction: 'descending' });

    // Estados de modales
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // --- OBTENCIÓN DE DATOS ---
    const fetchData = async () => {
        setLoading(true);
        try {
            const [finesRes, residentsRes, employeesRes, cuotasRes] = await Promise.all([
                axios.get('/api/multas/'),
                axios.get('/api/residentes/'),
                axios.get('/api/empleados/'),
                axios.get('/api/cuotas/')
            ]);
            setFines(Array.isArray(finesRes.data) ? finesRes.data : []);
            setResidents(Array.isArray(residentsRes.data) ? residentsRes.data : []);
            setEmployees(Array.isArray(employeesRes.data) ? employeesRes.data : []);
            setCuotas(Array.isArray(cuotasRes.data) ? cuotasRes.data : []);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- LÓGICA DE BÚSQUEDA Y ORDENAMIENTO (CLIENT-SIDE) ---
    const filteredFines = useMemo(() => {
        if (!searchTerm) return fines;
        const term = searchTerm.toLowerCase();
        return fines.filter(fine =>
            fine.motivo?.toLowerCase().includes(term) ||
            fine.residente_nombre?.toLowerCase().includes(term) ||
            fine.empleado_nombre?.toLowerCase().includes(term) ||
            fine.estado?.toLowerCase().includes(term)
        );
    }, [fines, searchTerm]);

    const sortedFines = useMemo(() => {
        let sortableItems = [...filteredFines];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [filteredFines, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // --- MANEJADORES DE ACCIONES CRUD ---
    const handleNew = () => {
        setCurrentFine(null);
        setIsFormModalOpen(true);
    };
    const handleView = (fine) => {
        setCurrentFine(fine);
        setIsViewModalOpen(true);
    };
    const handleEdit = (fine) => {
        setCurrentFine(fine);
        setIsFormModalOpen(true);
    };
    const handleDelete = (fine) => {
        setCurrentFine(fine);
        setIsDeleteModalOpen(true);
    };

    const handleSave = async (formData) => {
        // Limpiar datos opcionales si están vacíos
        const payload = { ...formData };
        if (!payload.empleado) delete payload.empleado;
        if (!payload.cuota) delete payload.cuota;

        try {
            if (currentFine) {
                await axios.put(`/api/multas/${currentFine.id}/`, payload);
            } else {
                await axios.post('/api/multas/', payload);
            }
            setIsFormModalOpen(false);
            fetchData(); // Recargar todos los datos
        } catch (error) {
            console.error("Error al guardar la multa:", error.response?.data || error.message);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/multas/${currentFine.id}/`);
            setIsDeleteModalOpen(false);
            fetchData(); // Recargar
        } catch (error) {
            console.error("Error al eliminar la multa:", error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Multas</h1>
            
            <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                    <SearchBar 
                        onSearch={setSearchTerm}
                        placeholder="Buscar por motivo, residente, estado..."
                    />
                </div>
                <Button onClick={handleNew}>Nueva Multa</Button>
            </div>

            {loading ? (
                <p>Cargando datos...</p>
            ) : (
                <FinesTable 
                    fines={sortedFines}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    requestSort={requestSort}
                    sortConfig={sortConfig}
                />
            )}
            
            <div className="mt-6 flex justify-center">
                <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
            </div>

            {isFormModalOpen && (
                <FineFormModal
                    fine={currentFine}
                    residents={residents}
                    employees={employees}
                    cuotas={cuotas}
                    onClose={() => setIsFormModalOpen(false)}
                    onSave={handleSave}
                />
            )}

            {isViewModalOpen && (
                <FineViewModal
                    fine={currentFine}
                    onClose={() => setIsViewModalOpen(false)}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    title="Confirmar Eliminación"
                    message={`¿Estás seguro de que deseas eliminar la multa por "${currentFine?.motivo}"? Esta acción no se puede deshacer.`}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default FinesPage;