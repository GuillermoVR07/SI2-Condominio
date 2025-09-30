import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// Creamos el contexto
const AuthContext = createContext();

// Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

// Proveedor que envolverá toda la aplicación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true);

    // Este efecto se ejecuta una sola vez al cargar la app
    // Sirve para mantener la sesión si se recarga la página
    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            // Aunque el login es simulado, configuramos axios para futuras llamadas reales
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    // --- FUNCIÓN DE LOGIN SIMULADO ---
    const login = useCallback(async (username, password) => {
        console.log("Intentando login simulado con:", username, password);

        // Define aquí las credenciales que quieres usar para la prueba
        if (username === 'admin' && password === 'admin') {
            
            // 1. Creamos un token falso
            const fakeToken = 'este_es_un_token_falso_para_desarrollo';
            
            // 2. Creamos un objeto de usuario falso (puedes ajustar estos datos)
            const fakeUser = {
                id: 1, // Es importante que este ID exista en tu BD para crear comunicados, etc.
                username: 'admin',
                email: 'admin@example.com',
                first_name: 'Super',
                last_name: 'Usuario'
            };

            // 3. Guardamos los datos falsos en el estado y en el localStorage
            setToken(fakeToken);
            setUser(fakeUser);
            localStorage.setItem('authToken', fakeToken);
            localStorage.setItem('authUser', JSON.stringify(fakeUser));
            axios.defaults.headers.common['Authorization'] = `Bearer ${fakeToken}`;

            console.log("Login simulado exitoso.");
            return true; // Indicamos que el login fue correcto
        }

        console.log("Credenciales simuladas incorrectas.");
        return false; // Indicamos que el login falló
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        delete axios.defaults.headers.common['Authorization'];
    }, []);

    // Los valores que se compartirán con toda la aplicación
    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token && !!user
    };

    // No mostramos la app hasta que la carga inicial de sesión termine
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

