import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios'; // Importará la instancia configurada desde api.js
import { jwtDecode } from 'jwt-decode'; // <-- 1. IMPORTA LA NUEVA LIBRERÍA

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyTokenAndFetchUser = async () => {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                localStorage.setItem('authToken', token);
                try {
                    // --- LÓGICA MODIFICADA ---
                    // 2. Decodificamos el token para obtener el payload (que contiene el user_id)
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.user_id; // simple-jwt usa 'user_id' por defecto

                    // 3. Usamos el ID para llamar a la API de detalle de usuario que ya existe
                    const response = await axios.get(`/api/usuarios/${userId}/`);
                    
                    setUser(response.data);
                } catch (error) {
                    console.error("Token inválido o expirado. Cerrando sesión.", error);
                    // Si el token es inválido o el usuario no se encuentra, limpiamos el estado
                    setToken(null);
                }
            } else {
                // Limpia todo si no hay token
                localStorage.removeItem('authToken');
                delete axios.defaults.headers.common['Authorization'];
                setUser(null);
            }
            setLoading(false);
        };
        verifyTokenAndFetchUser();
    }, [token]);

    const login = useCallback(async (username, password) => {
        try {
            // Llama a la URL de autenticación de tu backend
            const response = await axios.post('/api/auth/token/', { username, password });
            
            // simple-jwt devuelve un 'access' token
            const accessToken = response.data.access;
            setToken(accessToken);
            // El useEffect se encargará de obtener los datos del usuario una vez que el token se establezca
            
            return true;
        } catch (error) {
            console.error("Error en el login:", error.response?.data);
            return false;
        }
    }, []);

    const logout = useCallback(() => {
        // Al poner el token en null, el useEffect se disparará y limpiará todo
        setToken(null);
    }, []);

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token && !!user // Autenticado solo si hay token Y datos de usuario
    };

    // No renderiza la app hasta que la verificación inicial del token haya terminado
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

