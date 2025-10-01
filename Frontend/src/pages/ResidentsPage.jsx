import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useLogbook } from '../context/LogbookContext';
// Componentes
import ResidentTable from '../components/residents/ResidentTable';
import ResidentFormModal from '../components/residents/ResidentFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';
import { useAuth } from '../context/AuthContext';

const ResidentsPage = () => {
    const { addLogEntry } = useLogbook();
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentResident, setCurrentResident] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { user } = useAuth();

    // --- FUNCIÓN PARA OBTENER TODOS LOS DATOS (GET) ---
    const fetchResidents = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/residentes/`);
            if (Array.isArray(response.data)) {
                setResidents(response.data);
            } else {
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

    // --- LÓGICA DE BÚSQUEDA EN EL FRONTEND ---
    const filteredResidents = useMemo(() => {
        if (!searchTerm) {
            return residents; // Sin búsqueda, muestra todos
        }
        const term = searchTerm.toLowerCase();
        return residents.filter(resident => 
            resident.nombre_completo?.toLowerCase().includes(term) ||
            resident.ci?.toLowerCase().includes(term)
        );
    }, [residents, searchTerm]); // Se recalcula si la lista o la búsqueda cambian

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
        // NOTA: Tu backend espera 'nombre' y 'apellido' separados.
        // El formulario de creación de User usa 'first_name' y 'last_name'.
        // Aquí asumimos que el modal envía 'nombre' y 'apellido'.
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
                addLogEntry('Editó Residente', `Nombre: ${residentData.nombre} ${residentData.apellido}, CI: ${residentData.ci}`);
            } else {
                // Asumimos que POST a /api/residentes/ también crea el User asociado.
                await axios.post('/api/residentes/', payload);
                addLogEntry('Creó Nuevo Residente', `Nombre: ${residentData.nombre} ${residentData.apellido}, CI: ${residentData.ci}`);
            }
            setIsFormModalOpen(false);
            fetchResidents(); // Recarga los datos
        } catch (error) {
            console.error("Error al guardar el residente:", error.response?.data);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/residentes/${currentResident.id}/`);
            addLogEntry('Eliminó Residente', `ID: ${currentResident.id}, Nombre: ${currentResident.nombre_completo}`);
            setIsDeleteModalOpen(false);
            fetchResidents(); // Recarga los datos
        } catch (error) {
            console.error("Error al eliminar el residente:", error.response?.data);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Residentes</h1>
            <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                    <SearchBar onSearch={setSearchTerm} placeholder="Buscar por nombre o CI..." />
                </div>
                <Button onClick={handleNew}>Nuevo Residente</Button>
            </div>
            {loading ? <p>Cargando residentes...</p> : (
                <ResidentTable residents={filteredResidents} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            <div className="mt-6 flex justify-center">
                <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
            </div>
            {isFormModalOpen && (
                <ResidentFormModal resident={currentResident} onClose={() => setIsFormModalOpen(false)} onSave={handleSave} />
            )}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal unitName={currentResident?.nombre_completo} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
            )}
        </div>
    );
};

export default ResidentsPage;

