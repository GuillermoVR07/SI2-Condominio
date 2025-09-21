import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import ResidentsPage from './pages/ResidentsPage';
import UnitsPage from './pages/UnitsPage';
import CommunicationsLandingPage from './pages/CommunicationsLandingPage';
import AnnouncementsPage from './pages/AnnouncementsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} /> 
          <Route path="/residents" element={<ResidentsPage />} /> 
          <Route path="/units" element={<UnitsPage />} />
          <Route path="/communications" element={<CommunicationsLandingPage />} />
          <Route path="/communications/announcements" element={<AnnouncementsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;