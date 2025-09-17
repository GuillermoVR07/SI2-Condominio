import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Usaremos axios para las llamadas a la API

// Importaremos los componentes que vamos a crear
import ResidentTable from '../components/residents/ResidentTable';
import Pagination from '../components/ui/Pagination';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';

// Datos de ejemplo mientras no tenemos backend
const mockResidents = [
    { id: 1, name: "Lolita O'Hara", ci: "90133164", email: "arjun.schmidt@example.org", type: "Otro" },
    { id: 2, name: "Jo Keeling", ci: "01197617", email: "mertz.stefan@example.org", type: "Propietario" },
    { id: 3, name: "Craig Schmitt", ci: "28951081", email: "queenie43@example.net", type: "Propietario" },
    { id: 4, name: "Sammy Willms", ci: "65082919", email: "glover.gudrun@example.com", type: "Otro" },
    { id: 5, name: "Kiarra Ledner", ci: "69863639", email: "darby.satterfield@example.net", type: "Propietario" },
    { id: 6, name: "Raquel Nader", ci: "45404689", email: "pollich.terrill@example.org", type: "Otro" },
    { id: 7, name: "Floyd Davis", ci: "53157449", email: "kautzer.yolanda@example.com", type: "Inquilino" },
    { id: 8, name: "Pete Kunze", ci: "32305248", email: "bertrand.kautzer@example.net", type: "Inquilino" },
    { id: 9, name: "Sasha Luettgen", ci: "92390791", email: "neil37@example.com", type: "Otro" },
    { id: 10, name: "Felton Will", ci: "18418139", email: "queenie43@example.net", type: "Inquilino" },
];


const ResidentsPage = () => {
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    // --- ESPACIO PARA LA LLAMADA A LA API ---
    useEffect(() => {
        const fetchResidents = async () => {
            setLoading(true);
            try {
                // Cuando tengas la API, esta será la llamada real.
                // La URL incluiría la página actual y el término de búsqueda.
                // const response = await axios.get(`/api/residents?page=${currentPage}&search=${searchTerm}`);
                // setResidents(response.data.residents);
                // setTotalPages(response.data.totalPages);

                // Por ahora, usamos los datos de ejemplo
                console.log(`Buscando: "${searchTerm}" en la página ${currentPage}`);
                setResidents(mockResidents);
                setTotalPages(6); // Simulamos que hay 6 páginas en total
                
            } catch (error) {
                console.error("Error al obtener los residentes:", error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchResidents();
        }, 500); // Pequeño delay para simular la búsqueda

        return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta

    }, [currentPage, searchTerm]); // Se ejecuta cada vez que cambia la página o el término de búsqueda

    const handleSearch = (query) => {
        setSearchTerm(query);
        setCurrentPage(1); // Reinicia a la primera página con cada nueva búsqueda
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de Residentes</h1>
            
            <div className="flex justify-between items-center mb-6">
                <div className="w-1/3">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <Button>Nuevo Residente</Button>
            </div>

            {loading ? (
                <p>Cargando residentes...</p>
            ) : (
                <ResidentTable residents={residents} />
            )}
            
            <div className="mt-6 flex justify-center">
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default ResidentsPage;