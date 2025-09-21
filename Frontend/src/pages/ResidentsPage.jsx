import React, { useState, useEffect } from 'react';
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

    // --- FUNCIÓN PARA OBTENER DATOS (GET) CON BÚSQUEDA ---
    const fetchResidents = async (query = '') => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/residents?search=${query}`); // <-- URL dinámica para la búsqueda

            // **Programación Defensiva**
            if (Array.isArray(response.data)) {
                setResidents(response.data);
            } else {
                console.warn("La respuesta de la API para residentes no es un array. Se usará un array vacío.");
                setResidents([]);
            }
        } catch (error) {
            console.error("Error al obtener los residentes:", error);
            setResidents([]); // Evita que la app se rompa en caso de error
        } finally {
            setLoading(false);
        }
    };

    // --- useEffect CON "DEBOUNCER" PARA LA BÚSQUEDA ---
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchResidents(searchTerm);
        }, 500); // Espera 500ms después de que el usuario deja de escribir para buscar

        return () => clearTimeout(timer); // Limpia el temporizador
    }, [searchTerm]); // Se ejecuta cada vez que 'searchTerm' cambia

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
        try {
            if (currentResident) {
                // UPDATE (PUT)
                await axios.put(`/api/residents/${currentResident.id}`, residentData);
            } else {
                // CREATE (POST)
                await axios.post('/api/residents', residentData);
            }
            setIsFormModalOpen(false);
            fetchResidents(searchTerm); // Recarga los datos manteniendo el filtro de búsqueda
        } catch (error) {
            console.error("Error al guardar el residente:", error);
        }
    };

    // --- LÓGICA CRUD (DELETE) ---
    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/residents/${currentResident.id}`);
            setIsDeleteModalOpen(false);
            fetchResidents(searchTerm); // Recarga los datos manteniendo el filtro
        } catch (error) {
            console.error("Error al eliminar el residente:", error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Residentes</h1>
            
            <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                    <SearchBar onSearch={setSearchTerm} />
                </div>
                <Button onClick={handleNew}>Nuevo Residente</Button>
            </div>

            {loading ? (
                <p>Cargando residentes...</p>
            ) : (
                <ResidentTable 
                    residents={residents}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
            
            <div className="mt-6 flex justify-center">
                <Pagination 
                    currentPage={1}
                    totalPages={5} // Esto debería venir de la API en un futuro
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
                    unitName={currentResident?.name}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default ResidentsPage;
