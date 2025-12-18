import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import './services/api.js'; 
import { LogbookProvider } from './context/LogbookContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <LogbookProvider>
        <App />
      </LogbookProvider>
    </AuthProvider>
  </React.StrictMode>,
);

