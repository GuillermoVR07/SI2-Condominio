import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componentes
import FinesTable from '../components/fines/FinesTable';
import FineFormModal from '../components/fines/FineFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import Button from '../components/ui/Button';

const FinesPage = () => {
    const [fines, setFines] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [currentFine, setCurrentFine] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Función centralizada para obtener los datos de la API
    const fetchFines = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/fines');

            // Comprueba si la respuesta de la API es realmente un array.
            if (Array.isArray(response.data)) {
                setFines(response.data); // Si es un array, guárdalo.
            } else {
                console.warn("La respuesta de la API no es un array. Se usará un array vacío.");
                setFines([]); // Si no, guarda un array vacío para evitar el error.
            }

        } catch (error) {
            console.error("Error al obtener las multas:", error);
            setFines([]); // Si hay un error de red, también usa un array vacío.
        } finally {
            setLoading(false);
        }
    };

    // useEffect se ejecuta solo una vez cuando el componente se monta
    useEffect(() => {
        fetchFines();
    }, []);

    const handleNew = () => {
        setCurrentFine(null);
        setIsFormModalOpen(true);
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
        try {
            if (currentFine) {
                // 2. LLAMADA PUT PARA ACTUALIZAR UNA MULTA EXISTENTE
                await axios.put(`/api/fines/${currentFine.id}`, formData);
            } else {
                // 3. LLAMADA POST PARA CREAR UNA NUEVA MULTA
                await axios.post('/api/fines', formData);
            }
            setIsFormModalOpen(false);
            fetchFines(); // Vuelve a cargar los datos para ver los cambios
        } catch (error) {
            console.error("Error al guardar la multa:", error);
        }
    };

    const confirmDelete = async () => {
        try {
            // 4. LLAMADA DELETE PARA ELIMINAR UNA MULTA
            await axios.delete(`/api/fines/${currentFine.id}`);
            setIsDeleteModalOpen(false);
            fetchFines(); // Vuelve a cargar los datos para ver los cambios
        } catch (error) {
            console.error("Error al eliminar la multa:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Panel de Multas</h1>
                <p className="text-sm text-gray-500">Inicio / Multas</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-700">Tabla Multas</h2>
                    <Button onClick={handleNew}>Nueva Multa</Button>
                </div>

                {loading ? (
                    <p>Cargando multas...</p>
                ) : (
                    <FinesTable fines={fines} onEdit={handleEdit} onDelete={handleDelete} />
                )}
            </div>

            {isFormModalOpen && (
                <FineFormModal
                    fine={currentFine}
                    onClose={() => setIsFormModalOpen(false)}
                    onSave={handleSave}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    unitName={`la multa de ${currentFine?.user} por ${currentFine?.reason}`}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default FinesPage;