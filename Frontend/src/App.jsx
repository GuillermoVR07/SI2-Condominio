import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import Layout from './components/layout/Layout';

// Páginas
import LoginPage from './pages/LoginPage';
import CreateUserPage from './pages/CreateUserPage';
import DashboardPage from './pages/DashboardPage';
import UsersLandingPage from './pages/UsersLandingPage';
import ResidentsPage from './pages/ResidentsPage';
import EmployeesPage from './pages/EmployeesPage';
import UnitsPage from './pages/UnitsPage';
import CommunicationsLandingPage from './pages/CommunicationsLandingPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import InternalAdminLandingPage from './pages/InternalAdminLandingPage';
import FinesPage from './pages/FinesPage';
import CargosPage from './pages/CargosPage';
import CommonAreasLandingPage from './pages/CommonAreasLandingPage';
import AreasPage from './pages/AreasPage';
import ReservationsPage from './pages/ReservationsPage';
import FinancesLandingPage from './pages/FinancesLandingPage';
import PaymentsPage from './pages/PaymentsPage';
import InventoryLandingPage from './pages/InventoryLandingPage';
import InventoryCategoriesPage from './pages/InventoryCategoriesPage';
import InventoryItemsPage from './pages/InventoryItemsPage'; 

// Componente que agrupa las rutas protegidas
const ProtectedRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      
      {/* Rutas de Gestión de Usuarios */}
      <Route path="/users" element={<UsersLandingPage />} />
      <Route path="/residents" element={<ResidentsPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      
      <Route path="/units" element={<UnitsPage />} />
      <Route path="/communications" element={<CommunicationsLandingPage />} />
      <Route path="/communications/announcements" element={<AnnouncementsPage />} />
      
      {/* Rutas de Administración Interna */}
      <Route path="/internal-admin" element={<InternalAdminLandingPage />} />
      <Route path="/internal-admin/fines" element={<FinesPage />} />
      <Route path="/internal-admin/cargos" element={<CargosPage />} />
      
      {/* Rutas de Áreas Comunes */}
      <Route path="/areas-comunes" element={<CommonAreasLandingPage />} />
      <Route path="/areas-comunes/manage" element={<AreasPage />} />
      <Route path="/areas-comunes/reservas" element={<ReservationsPage />} />

      {/* Rutas de Finanzas */}
      <Route path="/finanzas" element={<FinancesLandingPage />} />
      <Route path="/finanzas/pagos" element={<PaymentsPage />} />
      
      {/* Rutas de Inventario */}
      <Route path="/inventario" element={<InventoryLandingPage />} />
      <Route path="/inventario/categorias" element={<InventoryCategoriesPage />} />
      <Route path="/inventario/items" element={<InventoryItemsPage />} />

      <Route path="/users/create" element={<CreateUserPage />} />

      {/* Cualquier otra ruta dentro de la app redirige al dashboard */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Layout>
);

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          // Si el usuario está autenticado, renderiza todas las rutas protegidas
          <Route path="/*" element={<ProtectedRoutes />} />
        ) : (
          // Si no está autenticado, solo renderiza las rutas públicas
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users/create" element={<CreateUserPage />} />
            {/* Cualquier otra ruta que intente acceder, lo redirige al login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

