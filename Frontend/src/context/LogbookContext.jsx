import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const LogbookContext = createContext();

export const useLogbook = () => {
    return useContext(LogbookContext);
};

export const LogbookProvider = ({ children }) => {
    // 1. MODIFICACIÓN: La función de useState ahora intenta cargar los datos iniciales
    // desde localStorage. Esto se ejecuta solo una vez.
    const [entries, setEntries] = useState(() => {
        try {
            const savedEntries = localStorage.getItem('logbookEntries');
            return savedEntries ? JSON.parse(savedEntries) : [];
        } catch (error) {
            console.error("Error al cargar la bitácora desde localStorage:", error);
            return [];
        }
    });

    const { user } = useAuth();

    // 2. NUEVO useEffect: Este efecto se ejecuta CADA VEZ que el estado 'entries' cambia.
    // Su única función es guardar la lista actualizada en localStorage.
    useEffect(() => {
        try {
            localStorage.setItem('logbookEntries', JSON.stringify(entries));
        } catch (error) {
            console.error("Error al guardar la bitácora en localStorage:", error);
        }
    }, [entries]); // El array de dependencias asegura que se ejecute solo cuando 'entries' cambie

    // La función para añadir entradas no cambia su lógica interna
    const addLogEntry = useCallback((action, details = '') => {
        const newEntry = {
            id: Date.now(),
            fecha_hora: new Date().toISOString(),
            usuario_nombre: user?.username || 'Sistema',
            accion: action,
            detalles: details,
        };
        // Al llamar a setEntries, se disparará el useEffect de guardado automático
        setEntries(prevEntries => [newEntry, ...prevEntries]);
    }, [user]); // Depende de 'user' para obtener el nombre de usuario

    const value = {
        entries,
        addLogEntry,
    };

    return (
        <LogbookContext.Provider value={value}>
            {children}
        </LogbookContext.Provider>
    );
};