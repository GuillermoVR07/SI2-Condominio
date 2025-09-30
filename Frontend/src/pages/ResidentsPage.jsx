import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Componentes
import ResidentTable from '../components/residents/ResidentTable';
import ResidentFormModal from '../components/residents/ResidentFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal'; // Reutilizamos este modal
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';

const ResidentsPage = () => {
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentResident, setCurrentResident] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Estados para controlar la visibilidad de los modales
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // --- FUNCIÓN PARA OBTENER TODOS LOS DATOS (GET) ---
    const fetchResidents = async () => {
        try {
            setLoading(true);
            // Se obtienen todos los residentes sin filtro
            const response = await axios.get(`/api/residentes/`); 

            if (Array.isArray(response.data)) {
                setResidents(response.data);
            } else {
                console.warn("La respuesta de la API para residentes no es un array. Se usará un array vacío.");
                setResidents([]);
            }
        } catch (error) {
            console.error("Error al obtener los residentes:", error);
            setResidents([]);
        } finally {
            setLoading(false);
        }
    };

    // Carga inicial de datos
    useEffect(() => {
        fetchResidents();
    }, []);

    // --- LÓGICA DE FILTRADO EN EL CLIENTE ---
    const filteredResidents = useMemo(() => {
        if (!searchTerm) {
            return residents; // Si no hay búsqueda, devuelve todos los residentes
        }
        const term = searchTerm.toLowerCase();
        return residents.filter(resident => 
            resident.nombre_completo?.toLowerCase().includes(term) ||
            resident.ci?.toLowerCase().includes(term) ||
            resident.email?.toLowerCase().includes(term)
        );
    }, [residents, searchTerm]); // Se recalcula cuando cambian los residentes o el término de búsqueda

    // --- MANEJADORES DE ACCIONES ---

    const handleNew = () => {
        setCurrentResident(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (resident) => {
        setCurrentResident(resident);
        setIsFormModalOpen(true);
    };

    const handleDelete = (resident) => {
        setCurrentResident(resident);
        setIsDeleteModalOpen(true);
    };

    // --- LÓGICA CRUD (CREATE/POST, UPDATE/PUT) ---
    const handleSave = async (residentData) => {
        const payload = {
            nombre: residentData.nombre,
            apellido: residentData.apellido,
            ci: residentData.ci,
            email: residentData.email,
            tipo_residente: residentData.tipo_residente,
        };

        try {
            if (currentResident) {
                await axios.put(`/api/residentes/${currentResident.id}/`, payload);
            } else {
                await axios.post('/api/residentes/', payload);
            }
            setIsFormModalOpen(false);
            fetchResidents(); // Recarga todos los datos para tener la lista actualizada
        } catch (error) {
            console.error("Error al guardar el residente:", error);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/residentes/${currentResident.id}/`);
            setIsDeleteModalOpen(false);
            fetchResidents(); // Recarga todos los datos
        } catch (error) {
            console.error("Error al eliminar el residente:", error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Residentes</h1>
            
            <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                    <SearchBar 
                        onSearch={setSearchTerm} 
                        placeholder="Buscar por nombre, CI o email..."
                    />
                </div>
                <Button onClick={handleNew}>Nuevo Residente</Button>
            </div>

            {loading ? (
                <p>Cargando residentes...</p>
            ) : (
                <ResidentTable 
                    residents={filteredResidents} // Se pasa la lista filtrada a la tabla
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
            
            <div className="mt-6 flex justify-center">
                <Pagination 
                    currentPage={1}
                    totalPages={2} 
                    onPageChange={(page) => console.log(`Cambiando a la página ${page}`)}
                />
            </div>

            {/* --- Modales --- */}
            {isFormModalOpen && (
                <ResidentFormModal
                    resident={currentResident}
                    onClose={() => setIsFormModalOpen(false)}
                    onSave={handleSave}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    unitName={currentResident?.nombre_completo} // Usamos nombre_completo
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default ResidentsPage;