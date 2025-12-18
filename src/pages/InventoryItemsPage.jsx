import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componentes
import ItemsTable from '../components/inventory_items/ItemsTable';
import ItemFormModal from '../components/inventory_items/ItemFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const InventoryItemsPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentItem, setCurrentItem] = useState(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { user } = useAuth();

    // --- LÍNEA CORREGIDA ---
    // La URL correcta según tu urls.py es /api/inventario/
    const API_URL = '/api/inventario/';

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            if (Array.isArray(response.data)) {
                setItems(response.data);
            } else {
                setItems([]);
            }
        } catch (error) {
            console.error("Error al obtener los ítems del inventario:", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleNew = () => {
        setCurrentItem(null);
        setIsFormModalOpen(true);
    };
    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsFormModalOpen(true);
    };
    const handleDelete = (item) => {
        setCurrentItem(item);
        setIsDeleteModalOpen(true);
    };

    const handleSave = async (formData) => {
        const dataToSend = { ...formData, user: user.id };
        try {
            if (currentItem) {
                await axios.put(`${API_URL}${currentItem.id}/`, dataToSend);
            } else {
                await axios.post(API_URL, dataToSend);
            }
            setIsFormModalOpen(false);
            fetchItems();
        } catch (error) {
            console.error("Error al guardar el ítem:", error.response?.data);
            alert("Error al guardar. Revise la consola para más detalles.");
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${API_URL}${currentItem.id}/`);
            setIsDeleteModalOpen(false);
            fetchItems();
        } catch (error) {
            console.error("Error al eliminar el ítem:", error.response?.data);
            alert("No se pudo eliminar el ítem.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Ítems de Inventario</h1>
                <Button onClick={handleNew}>Nuevo Ítem</Button>
            </div>
            {loading ? <p>Cargando ítems...</p> : (
                <ItemsTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            {isFormModalOpen && (
                <ItemFormModal item={currentItem} onClose={() => setIsFormModalOpen(false)} onSave={handleSave} />
            )}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal unitName={`el ítem "${currentItem?.nombre}"`} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
            )}
        </div>
    );
};

export default InventoryItemsPage;

