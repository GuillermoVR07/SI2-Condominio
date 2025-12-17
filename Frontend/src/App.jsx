import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import Layout from './components/layout/Layout';

// Páginas
import LoginPage from './pages/LoginPage';
// Se elimina la importación de CreateUserPage
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
import CommunityReportsLandingPage from './pages/CommunityReportsLandingPage';
import ClaimsPage from './pages/ClaimsPage';
import SecurityLogsPage from './pages/SecurityLogsPage';
import LogbookPage from './pages/LogbookPage';
import SecurityAnalysisPage from './pages/SecurityAnalysisPage'; // Import the new page
import TareasPage from './pages/TareasPage';

// Componente que agrupa las rutas protegidas
const ProtectedRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/users" element={<UsersLandingPage />} />
      <Route path="/residents" element={<ResidentsPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/units" element={<UnitsPage />} />
      <Route path="/communications" element={<CommunicationsLandingPage />} />
      <Route path="/communications/announcements" element={<AnnouncementsPage />} />
      <Route path="/internal-admin" element={<InternalAdminLandingPage />} />
      <Route path="/internal-admin/fines" element={<FinesPage />} />
      <Route path="/internal-admin/cargos" element={<CargosPage />} />
      <Route path="/areas-comunes" element={<CommonAreasLandingPage />} />
      <Route path="/areas-comunes/manage" element={<AreasPage />} />
      <Route path="/areas-comunes/reservas" element={<ReservationsPage />} />
      <Route path="/finanzas" element={<FinancesLandingPage />} />
      <Route path="/finanzas/pagos" element={<PaymentsPage />} />
      <Route path="/inventario" element={<InventoryLandingPage />} />
      <Route path="/inventario/categorias" element={<InventoryCategoriesPage />} />
      <Route path="/inventario/items" element={<InventoryItemsPage />} />
      <Route path="/comunidad-y-reportes" element={<CommunityReportsLandingPage />} />
      <Route path="/reclamos" element={<ClaimsPage />} />
      <Route path="/registros-seguridad" element={<SecurityLogsPage />} />
      <Route path="/bitacora" element={<LogbookPage />} />
      <Route path="/security" element={<SecurityAnalysisPage />} /> {/* Add the new route */}
      <Route path="/tareas" element={<TareasPage />} />
      {/* La ruta /users/create ya no existe aquí */}
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
          <Route path="/*" element={<ProtectedRoutes />} />
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            {/* La ruta /users/create ya no es pública */}
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;