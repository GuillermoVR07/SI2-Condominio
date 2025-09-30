import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componentes
import EmployeesTable from '../components/employees/EmployeesTable';
import EmployeeFormModal from '../components/employees/EmployeeFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchEmployees = async (query = '') => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/empleados/?search=${query}`);
            if (Array.isArray(response.data)) {
                setEmployees(response.data);
            } else {
                setEmployees([]);
            }
        } catch (error) {
            console.error("Error al obtener los empleados:", error);
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchEmployees(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleNew = () => {
        setCurrentEmployee(null);
        setIsFormModalOpen(true);
    };
    const handleEdit = (employee) => {
        setCurrentEmployee(employee);
        setIsFormModalOpen(true);
    };
    const handleDelete = (employee) => {
        setCurrentEmployee(employee);
        setIsDeleteModalOpen(true);
    };

    const handleSave = async (employeeData) => {
        try {
            if (currentEmployee) {
                await axios.put(`/api/empleados/${currentEmployee.id}/`, employeeData);
            } else {
                await axios.post('/api/empleados/', employeeData);
            }
            setIsFormModalOpen(false);
            fetchEmployees(searchTerm);
        } catch (error) {
            console.error("Error al guardar el empleado:", error.response?.data);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/empleados/${currentEmployee.id}/`);
            setIsDeleteModalOpen(false);
            fetchEmployees(searchTerm);
        } catch (error) {
            console.error("Error al eliminar el empleado:", error.response?.data);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Empleados</h1>
            <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                    <SearchBar onSearch={setSearchTerm} />
                </div>
                <Button onClick={handleNew}>Nuevo Empleado</Button>
            </div>
            {loading ? <p>Cargando empleados...</p> : (
                <EmployeesTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            <div className="mt-6 flex justify-center">
                <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
            </div>
            {isFormModalOpen && (
                <EmployeeFormModal employee={currentEmployee} onClose={() => setIsFormModalOpen(false)} onSave={handleSave} />
            )}
            {isDeleteModalOpen && (
                <ConfirmDeleteModal unitName={currentEmployee?.nombre_completo} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />
            )}
        </div>
    );
};

export default EmployeesPage;
