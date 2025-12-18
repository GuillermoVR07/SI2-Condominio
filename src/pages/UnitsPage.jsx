import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Componentes
import UnitsTable from '../components/units/UnitsTable';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';
import UnitFormModal from '../components/units/UnitFormModal';
import ViewUnitModal from '../components/units/ViewUnitModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';

const UnitsPage = () => {
    const [units, setUnits] = useState([]);
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUnit, setCurrentUnit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    // Estados para modales
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const fetchUnits = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/unidades/`); 
            setUnits(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error al obtener las unidades:", error);
            setUnits([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredUnits = useMemo(() => {
        if (!searchTerm) {
            return units;
        }
        return units.filter(unit => {
            const term = searchTerm.toLowerCase();
            return (
                unit.codigo?.toLowerCase().includes(term) ||
                unit.placa?.toLowerCase().includes(term) ||
                unit.residente_nombre?.toLowerCase().includes(term)
            );
        });
    }, [units, searchTerm]);

    const sortedUnits = useMemo(() => {
        let sortableUnits = [...filteredUnits];
        if (sortConfig.key !== null) {
            sortableUnits.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'placa') {
                    aValue = parseInt(a.placa?.split('-')[0] || 0, 10);
                    bValue = parseInt(b.placa?.split('-')[0] || 0, 10);
                }
                
                if (aValue === null || aValue === undefined) aValue = '';
                if (bValue === null || bValue === undefined) bValue = '';

                if (typeof aValue === 'string') aValue = aValue.toLowerCase();
                if (typeof bValue === 'string') bValue = bValue.toLowerCase();

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUnits;
    }, [filteredUnits, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const fetchResidents = async () => {
        try {
            const response = await axios.get('/api/residentes/');
            setResidents(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error al obtener los residentes:", error);
        }
    };

    useEffect(() => {
        fetchUnits();
        fetchResidents();
    }, []);

    // --- MANEJADORES DE ACCIONES (LÓGICA RESTAURADA) ---
    const handleNew = () => {
        setCurrentUnit(null);
        setIsFormModalOpen(true);
    };

    const handleView = (unit) => {
        setCurrentUnit(unit);
        setIsViewModalOpen(true);
    };

    const handleEdit = (unit) => {
        setCurrentUnit(unit);
        setIsFormModalOpen(true);
    };
    
    const handleDelete = (unit) => {
        setCurrentUnit(unit);
        setIsDeleteModalOpen(true);
    };

    const handleSaveUnit = async (unitData) => {
        const payload = { ...unitData, residente: Number(unitData.residente) };
        try {
            if (currentUnit) {
                await axios.put(`/api/unidades/${currentUnit.id}/`, payload);
            } else {
                await axios.post('/api/unidades/', payload);
            }
            setIsFormModalOpen(false);
            fetchUnits(); 
        } catch (error) {
            console.error("Error al guardar la unidad:", error);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/unidades/${currentUnit.id}/`);
            setIsDeleteModalOpen(false);
            fetchUnits(); 
        } catch (error) {
            console.error("Error al eliminar la unidad:", error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Unidades</h1>
            
            <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                    <SearchBar 
                        onSearch={setSearchTerm} 
                        placeholder="Buscar por código, placa, residente..."
                    />
                </div>
                <Button onClick={handleNew}>Nueva Unidad</Button>
            </div>

            {loading ? (
                <p>Cargando unidades...</p>
            ) : (
                <UnitsTable 
                    units={sortedUnits}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    requestSort={requestSort}
                    sortConfig={sortConfig}
                />
            )}
            
            <div className="mt-6 flex justify-center">
                <Pagination currentPage={1} totalPages={2} onPageChange={(page) => console.log(page)} />
            </div>

            {isFormModalOpen && (
                <UnitFormModal 
                    unit={currentUnit}
                    residents={residents}
                    onClose={() => setIsFormModalOpen(false)}
                    onSave={handleSaveUnit}
                />
            )}

            {isViewModalOpen && (
                <ViewUnitModal
                    unit={currentUnit}
                    onClose={() => setIsViewModalOpen(false)}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    unitName={currentUnit?.codigo}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default UnitsPage;