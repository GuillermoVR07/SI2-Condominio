import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLogbook } from '../context/LogbookContext';

// Components
import TareasTable from '../components/tareas/TareasTable';
import TareaFormModal from '../components/tareas/TareaFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';

const TareasPage = () => {
    const { user } = useAuth();
    const { addLogEntry } = useLogbook();
    const [tareas, setTareas] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State for modals
    const [currentTarea, setCurrentTarea] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // State for filtering
    const [searchTerm, setSearchTerm] = useState('');

    const API_URL = '/api/tareas/';

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch tasks and employees in parallel
            const [tareasRes, empleadosRes] = await Promise.all([
                axios.get(API_URL),
                axios.get('/api/empleados/')
            ]);
            
            setTareas(Array.isArray(tareasRes.data) ? tareasRes.data : []);
            setEmpleados(Array.isArray(empleadosRes.data) ? empleadosRes.data : []);

        } catch (err) {
            console.error("Error fetching data:", err);
            setError("No se pudieron cargar los datos. Por favor, intente más tarde.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Memoized filtering logic
    const filteredTareas = useMemo(() => {
        if (!searchTerm) return tareas;
        const lowercasedTerm = searchTerm.toLowerCase();
        return tareas.filter(tarea =>
            tarea.titulo.toLowerCase().includes(lowercasedTerm) ||
            tarea.descripcion.toLowerCase().includes(lowercasedTerm) ||
            tarea.empleado_asignado_nombre?.toLowerCase().includes(lowercasedTerm) ||
            tarea.estado.toLowerCase().includes(lowercasedTerm)
        );
    }, [tareas, searchTerm]);

    // Handlers for opening modals
    const handleNew = () => {
        setCurrentTarea(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (tarea) => {
        setCurrentTarea(tarea);
        setIsFormModalOpen(true);
    };

    const handleDelete = (tarea) => {
        setCurrentTarea(tarea);
        setIsDeleteModalOpen(true);
    };

    // CRUD operations
    const handleSave = async (formData) => {
        const isEditing = !!currentTarea;
        const url = isEditing ? `${API_URL}${currentTarea.id}/` : API_URL;
        const method = isEditing ? 'put' : 'post';

        try {
            await axios[method](url, formData);
            addLogEntry(
                isEditing ? 'Tarea Editada' : 'Nueva Tarea Creada',
                `ID: ${currentTarea?.id || 'Nuevo'}, Título: ${formData.titulo}`
            );
            setIsFormModalOpen(false);
            fetchData(); // Refresh data
        } catch (err) {
            console.error("Error saving task:", err.response?.data || err);
            setError("No se pudo guardar la tarea.");
        }
    };

    const confirmDelete = async () => {
        if (!currentTarea) return;
        try {
            await axios.delete(`${API_URL}${currentTarea.id}/`);
            addLogEntry('Tarea Eliminada', `ID: ${currentTarea.id}, Título: ${currentTarea.titulo}`);
            setIsDeleteModalOpen(false);
            fetchData(); // Refresh data
        } catch (err) {
            console.error("Error deleting task:", err);
            setError("No se pudo eliminar la tarea.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Tareas</h1>
                <Button onClick={handleNew}>Nueva Tarea</Button>
            </div>
            
            <div className="mb-4">
                <SearchBar 
                    placeholder="Buscar por título, empleado, estado..."
                    onSearch={setSearchTerm}
                />
            </div>

            {loading && <p>Cargando tareas...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && !error && (
                <TareasTable 
                    tareas={filteredTareas}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {isFormModalOpen && (
                <TareaFormModal
                    isOpen={isFormModalOpen}
                    onClose={() => setIsFormModalOpen(false)}
                    onSave={handleSave}
                    tarea={currentTarea}
                    empleados={empleados}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    unitName={`la tarea "${currentTarea?.titulo}"`}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default TareasPage;
