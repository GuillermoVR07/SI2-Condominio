import React from 'react';
import { useLogbook } from '../context/LogbookContext'; // Importa el hook

// Componentes
import LogbookTable from '../components/logbook/LogbookTable';

const LogbookPage = () => {
    // Obtenemos las entradas directamente del contexto
    const { entries } = useLogbook();

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Bitácora de Actividad</h1>
            </div>
            {entries.length === 0 ? (
                <p>Aún no hay actividad registrada.</p>
            ) : (
                // Pasamos las entradas a la tabla
                <LogbookTable entries={entries} />
            )}
        </div>
    );
};

export default LogbookPage;