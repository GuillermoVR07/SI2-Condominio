import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componentes que crearemos a continuación
import CategoriesTable from '../components/inventory_categories/CategoriesTable';
import CategoryFormModal from '../components/inventory_categories/CategoryFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import Button from '../components/ui/Button';

const InventoryCategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Asumimos que la API para categorías es /api/categorias-inventario/
    const API_URL = '/api/categorias-inventario/';

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            if (Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleNew = () => {
        setCurrentCategory(null);
        setIsFormModalOpen(true);
    };
    const handleEdit = (category) => {
        setCurrentCategory(category);
        setIsFormModalOpen(true);
    };
    const handleDelete = (category) => {
        setCurrentCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleSave = async (formData) => {
        try {
            if (currentCategory) {
                await axios.put(`${API_URL}${currentCategory.id}/`, formData);
            } else {
                await axios.post(API_URL, formData);
            }
            setIsFormModalOpen(false);
            fetchCategories();
        } catch (error) {
            console.error("Error al guardar la categoría:", error.response?.data);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${API_URL}${currentCategory.id}/`);
            setIsDeleteModalOpen(false);
            fetchCategories();
        } catch (error) {
            console.error("Error al eliminar la categoría:", error.response?.data);
            alert("No se pudo eliminar la categoría. Es posible que esté en uso por algún ítem del inventario.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Categorías de Inventario</h1>
                <Button onClick={handleNew}>Nueva Categoría</Button>
            </div>
            {loading ? <p>Cargando categorías...</p> : (
                <CategoriesTable categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            {isFormModalOpen && (
                <CategoryFormModal category={currentCategory} onClose={() => setIsFormModalOpen(false)} onSave={handleSave} />
            )}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal unitName={`la categoría "${currentCategory?.nombre}"`} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
            )}
        </div>
    );
};

export default InventoryCategoriesPage;
