import React, { useState, useEffect } from 'react';
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
    const [loading, setLoading] = useState(true);
    const [currentUnit, setCurrentUnit] = useState(null);

    // --- NUEVO ESTADO PARA EL TÉRMINO DE BÚSQUEDA ---
    const [searchTerm, setSearchTerm] = useState('');

    // Estados para controlar la visibilidad de cada modal (sin cambios)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    // --- FUNCIÓN fetchUnits MODIFICADA PARA ACEPTAR UN PARÁMETRO DE BÚSQUEDA ---
    const fetchUnits = async (query = '') => {
        try {
            setLoading(true);
            // La URL ahora es dinámica. Incluirá el parámetro 'search' si 'query' no está vacío.
            const response = await axios.get(`/api/units?search=${query}`); 

            // Programación Defensiva (sin cambios)
            if (Array.isArray(response.data)) {
                setUnits(response.data);
            } else {
                console.warn("La respuesta de la API para unidades no es un array. Se usará un array vacío.");
                setUnits([]);
            }
        } catch (error) {
            console.error("Error al obtener las unidades:", error);
            setUnits([]);
        } finally {
            setLoading(false);
        }
    };

    // --- useEffect MODIFICADO PARA MANEJAR LA BÚSQUEDA CON "DEBOUNCING" ---
    // Este efecto se ejecuta cuando el componente carga y cada vez que 'searchTerm' cambia.
    useEffect(() => {
        // Se crea un temporizador que esperará 500ms antes de ejecutar la búsqueda.
        const timer = setTimeout(() => {
            fetchUnits(searchTerm);
        }, 500); // 500ms = medio segundo

        // Función de limpieza: si el usuario sigue escribiendo, el temporizador anterior se cancela.
        return () => clearTimeout(timer);
    }, [searchTerm]); // El array de dependencias asegura que esto se ejecute solo cuando 'searchTerm' cambie.

    // --- MANEJADORES DE ACCIONES (sin cambios en su lógica interna) ---

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

    // --- FUNCIÓN PARA GUARDAR MODIFICADA ---
    const handleSaveUnit = async (unitData) => {
        try {
            if (currentUnit) {
                await axios.put(`/api/units/${currentUnit.id}`, unitData);
            } else {
                await axios.post('/api/units', unitData);
            }
            setIsFormModalOpen(false);
            // Recarga los datos manteniendo el filtro de búsqueda actual
            await fetchUnits(searchTerm); 
        } catch (error) {
            console.error("Error al guardar la unidad:", error);
        }
    };

    // --- FUNCIÓN PARA ELIMINAR MODIFICADA ---
    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/units/${currentUnit.id}`);
            setIsDeleteModalOpen(false);
            // Recarga los datos manteniendo el filtro de búsqueda actual
            await fetchUnits(searchTerm); 
        } catch (error) {
            console.error("Error al eliminar la unidad:", error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Unidades</h1>
            
            <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                    {/* El SearchBar ahora actualiza el estado 'searchTerm' directamente */}
                    <SearchBar onSearch={setSearchTerm} />
                </div>
                <Button onClick={handleNew}>Nueva Unidad</Button>
            </div>

            {loading ? (
                <p>Cargando unidades...</p>
            ) : (
                <UnitsTable 
                    units={units}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
            
            <div className="mt-6 flex justify-center">
                <Pagination currentPage={1} totalPages={2} onPageChange={(page) => console.log(page)} />
            </div>

            {/* --- MODALES (sin cambios) --- */}
            {isFormModalOpen && (
                <UnitFormModal 
                    unit={currentUnit}
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
                    unitName={currentUnit?.code}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default UnitsPage;
