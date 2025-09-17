import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import ResidentsPage from './pages/ResidentsPage'; // <-- Importa tu nueva página

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Ruta para el Dashboard */}
          <Route path="/" element={<DashboardPage />} /> 

          {/* Ruta para la lista de residentes */}
          <Route path="/residents" element={<ResidentsPage />} /> 

          {/* Puedes añadir más rutas aquí en el futuro */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;