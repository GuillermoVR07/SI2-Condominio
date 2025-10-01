import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLogbook } from '../context/LogbookContext';
// Componentes
import EmployeesTable from '../components/employees/EmployeesTable';
import EmployeeFormModal from '../components/employees/EmployeeFormModal';
import ConfirmDeleteModal from '../components/units/ConfirmDeleteModal';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';

const EmployeesPage = () => {
    const { addLogEntry } = useLogbook();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fetchEmployees = useCallback(async () => {
        try {
            setLoading(true);
            const orderingDirection = sortConfig.direction === 'ascending' ? '' : '-';
            const ordering = `${orderingDirection}${sortConfig.key}`;

            const response = await axios.get(`/api/empleados/`, {
                params: {
                    search: searchTerm,
                    ordering: ordering
                }
            });
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
    }, [searchTerm, sortConfig]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchEmployees();
        }, 500);
        return () => clearTimeout(timer);
    }, [fetchEmployees]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

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
                addLogEntry('Editó Empleado', `ID: ${currentEmployee.id}, Nombre: ${employeeData.nombre} ${employeeData.apellido}`);
            } else {
                await axios.post('/api/empleados/', employeeData);
                addLogEntry('Creó Nuevo Empleado', `Nombre: ${employeeData.nombre} ${employeeData.apellido}, CI: ${employeeData.ci}`);
            }
            setIsFormModalOpen(false);
            fetchEmployees();
        } catch (error) {
            console.error("Error al guardar el empleado:", error.response?.data);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/empleados/${currentEmployee.id}/`);
            addLogEntry('Eliminó Empleado', `ID: ${currentEmployee.id}, Nombre: ${currentEmployee.nombre_completo}`);
            setIsDeleteModalOpen(false);
            fetchEmployees();
        } catch (error) {
            console.error("Error al eliminar el empleado:", error.response?.data);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Empleados</h1>
            <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                    <SearchBar onSearch={setSearchTerm} placeholder="Buscar por nombre o CI..." />
                </div>
                <Button onClick={handleNew}>Nuevo Empleado</Button>
            </div>
            {loading ? <p>Cargando empleados...</p> : (
                <EmployeesTable 
                    employees={employees} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                    requestSort={requestSort}
                    sortConfig={sortConfig}
                />
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

