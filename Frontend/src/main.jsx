import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx'; // Importa el AuthProvider
import './services/api.js'; // Mantén tu import de la configuración de Axios

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider envuelve a App para darle a toda la app
        acceso al contexto de autenticación */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);

