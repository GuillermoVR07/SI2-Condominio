import React, { useState, useEffect } from 'react';
import ModuleCard from '../components/dashboard/ModuleCard';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

// Importa los íconos que vas a usar
import { FaUsers, FaCog, FaDollarSign, FaComments, FaShieldAlt, FaChartBar, FaBook } from 'react-icons/fa';

// Datos de ejemplo (esto vendrá del backend)
const mockModules = [
  { id: 1, title: 'Usuarios', icon: <FaUsers />, color: 'blue', path: '/residents' },
  { id: 2, title: 'Administración Interna', icon: <FaCog />, color: 'gray', path: '/internal-admin' },
  { id: 3, title: 'Finanzas y Áreas Comunes', icon: <FaDollarSign />, color: 'green' },
  { id: 4, title: 'Comunicación y Atención al Residente', icon: <FaComments />, color: 'cyan', path: '/communications' },
  { id: 5, title: 'Seguridad y Accesos', icon: <FaShieldAlt />, color: 'yellow' },
  { id: 6, title: 'Comunidad y Reportes', icon: <FaChartBar />, color: 'black' },
  { id: 7, title: 'Bitácora', icon: <FaBook />, color: 'red' },
];

const DashboardPage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const fetchModules = async () => {
//     try {
//       setLoading(true);
//       // La URL que te proporcione el backend
//       const response = await axios.get('https://api.tucondominio.com/dashboard/modules');
//       setModules(response.data); // Guarda los datos de la API en el estado
//     } catch (error) {
//       console.error("Error al obtener los módulos:", error);
//     } finally {
//         setLoading(false);
//     }
//   };

//   fetchModules();
// }, []);

  useEffect(() => {
      // Simulamos una llamada a la API
      setTimeout(() => {
        setModules(mockModules);
        setLoading(false);
      }, 500); // Un pequeño retraso para simular la carga
    }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Sistema de Gestión de Condominios</h1>
      <p className="text-gray-600 mb-6">Panel principal</p>

      {loading ? (
        <p>Cargando módulos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              icon={module.icon}
              color={module.color}
              path={module.path}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;