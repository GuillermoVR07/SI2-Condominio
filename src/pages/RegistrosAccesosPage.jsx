import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLogbook } from '../context/LogbookContext';

// Components
import AccesosTable from '../components/accesos/AccesosTable';
import AccesoFormModal from '../components/accesos/AccesoFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal'; // Reusing
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';

const RegistrosAccesosPage = () => {
    const { user } = useAuth();
    const { addLogEntry } = useLogbook();
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState(null); // To show errors in the modal
    
    // State for modals
    const [currentRegistro, setCurrentRegistro] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // State for filtering
    const [searchTerm, setSearchTerm] = useState('');

    const API_URL = '/api/registros-accesos/';

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL);
            setRegistros(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error fetching access logs:", err);
            setError("No se pudieron cargar los registros de acceso.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Memoized filtering logic (client-side for now)
    const filteredRegistros = useMemo(() => {
        if (!searchTerm) return registros;
        const lowercasedTerm = searchTerm.toLowerCase();
        return registros.filter(registro =>
            registro.nombre_completo.toLowerCase().includes(lowercasedTerm) ||
            registro.ci?.toLowerCase().includes(lowercasedTerm) ||
            registro.tipo_persona.toLowerCase().includes(lowercasedTerm) ||
            registro.motivo?.toLowerCase().includes(lowercasedTerm)
        );
    }, [registros, searchTerm]);

    // Handlers for opening modals
    const handleNew = () => {
        setCurrentRegistro(null);
        setFormError(null); // Clear previous errors
        setIsFormModalOpen(true);
    };

    const handleEdit = (registro) => {
        setCurrentRegistro(registro);
        setFormError(null); // Clear previous errors
        setIsFormModalOpen(true);
    };

    const handleDelete = (registro) => {
        setCurrentRegistro(registro);
        setIsDeleteModalOpen(true);
    };

    // CRUD operations
    const handleSave = async (formData) => {
        const isEditing = !!currentRegistro;
        const url = isEditing ? `${API_URL}${currentRegistro.id}/` : API_URL;
        const method = isEditing ? 'put' : 'post';
        
        setFormError(null); // Reset error before new attempt

        try {
            // Note: axios automatically sets Content-Type to multipart/form-data for FormData
            await axios[method](url, formData); 
            addLogEntry(
                isEditing ? 'Registro de Acceso Editado' : 'Nuevo Registro de Acceso Creado',
                `ID: ${currentRegistro?.id || 'Nuevo'}, Persona: ${formData.get('nombre_completo')}`
            );
            setIsFormModalOpen(false);
            fetchData(); // Refresh data
        } catch (err) {
            console.error("Error saving access log:", err.response?.data || err);
            const errorData = err.response?.data;
            let errorMessage = "Ocurrió un error inesperado al guardar.";

            if (errorData) {
                // Handle DRF's non-field errors (often an array of strings)
                if (errorData.non_field_errors) {
                    errorMessage = errorData.non_field_errors.join(' ');
                } 
                // Handle simple string or array responses
                else if (Array.isArray(errorData)) {
                    errorMessage = errorData.join(' ');
                }
                // Handle field-specific errors (object)
                else if (typeof errorData === 'object') {
                    const firstErrorKey = Object.keys(errorData)[0];
                    const firstErrorMessage = errorData[firstErrorKey];
                    if(Array.isArray(firstErrorMessage)){
                        errorMessage = `${firstErrorKey}: ${firstErrorMessage[0]}`;
                    } else {
                        errorMessage = `${firstErrorKey}: ${firstErrorMessage}`;
                    }
                }
            }
            setFormError(errorMessage);
        }
    };

    const confirmDelete = async () => {
        if (!currentRegistro) return;
        try {
            await axios.delete(`${API_URL}${currentRegistro.id}/`);
            addLogEntry('Registro de Acceso Eliminado', `ID: ${currentRegistro.id}, Persona: ${currentRegistro.nombre_completo}`);
            setIsDeleteModalOpen(false);
            fetchData(); // Refresh data
        } catch (err) {
            console.error("Error deleting access log:", err);
            setError("No se pudo eliminar el registro de acceso.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Registros de Entrada y Salida</h1>
                <Button onClick={handleNew}>Nuevo Registro</Button>
            </div>
            
            <div className="mb-4">
                <SearchBar 
                    placeholder="Buscar por nombre, CI, tipo de persona..."
                    onSearch={setSearchTerm}
                />
            </div>

            {loading && <p>Cargando registros...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && !error && (
                <AccesosTable 
                    registros={filteredRegistros}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {isFormModalOpen && (
                <AccesoFormModal
                    isOpen={isFormModalOpen}
                    onClose={() => setIsFormModalOpen(false)}
                    onSave={handleSave}
                    registro={currentRegistro}
                    apiError={formError}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    unitName={`el registro de ${currentRegistro?.nombre_completo}`}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default RegistrosAccesosPage;
