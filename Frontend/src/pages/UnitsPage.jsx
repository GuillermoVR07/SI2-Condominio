import React, { useState, useEffect } from 'react';

// Componentes que crearemos a continuación
import UnitsTable from '../components/units/UnitsTable';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';
import UnitFormModal from '../components/units/UnitFormModal';
import ViewUnitModal from '../components/units/ViewUnitModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';

// Datos de ejemplo
const mockUnits = [
    { id: 1, code: "U-214", resident: "Theresia Price", plate: "TIP-1724", brand: "Toyota", capacity: 6, status: "Activa", people: 4, pets: "No", vehicles: 2 },
    { id: 2, code: "U-339", resident: "Oliver DuBuque", plate: "QOQ-6664", brand: "Kia", capacity: 1, status: "Activa", people: 5, pets: "No", vehicles: 3 },
    { id: 3, code: "U-772", resident: "Kendall Champlin", plate: "KCR-2358", brand: "Honda", capacity: 1, status: "Activa", people: 3, pets: "Sí", vehicles: 1 },
    { id: 4, code: "U-696", resident: "Bert Hamill", plate: "YZG-5806", brand: "Ford", capacity: 3, status: "Activa", people: 5, pets: "Sí", vehicles: 2 },
    { id: 5, code: "U-593", resident: "Will Anderson", plate: "GEX-8870", brand: "Nissan", capacity: 6, status: "Activa", people: 1, pets: "Sí", vehicles: 1 },
    { id: 6, code: "U-319", resident: "Donald Abbott", plate: "WLP-1914", brand: "Ford", capacity: 5, status: "Inactiva", people: 5, pets: "No", vehicles: 1 },
];

const UnitsPage = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUnit, setCurrentUnit] = useState(null); // Para saber qué unidad estamos viendo/editando/eliminando

    // Estados para controlar la visibilidad de cada modal
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    // --- LÓGICA PARA LA API (A FUTURO) ---
    useEffect(() => {
        // Aquí llamarías a tu API para obtener las unidades
        setTimeout(() => {
            setUnits(mockUnits);
            setLoading(false);
        }, 500);
    }, []);

    // --- MANEJADORES DE ACCIONES ---

    const handleNew = () => {
        setCurrentUnit(null); // No hay unidad actual al crear una nueva
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

    const handleSaveUnit = (unitData) => {
        // Lógica para guardar (Crear o Actualizar)
        if (currentUnit) {
            // --- ESPACIO PARA API (UPDATE) ---
            console.log("Actualizando unidad:", unitData);
        } else {
            // --- ESPACIO PARA API (CREATE) ---
            console.log("Creando nueva unidad:", unitData);
        }
        setIsFormModalOpen(false); // Cierra el modal después de guardar
    };

    const confirmDelete = () => {
        // --- ESPACIO PARA API (DELETE) ---
        console.log("Eliminando unidad:", currentUnit.id);
        setIsDeleteModalOpen(false); // Cierra el modal
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Unidades</h1>
            
            <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                    <SearchBar onSearch={(query) => console.log(query)} />
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

            {/* --- MODALES --- */}
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