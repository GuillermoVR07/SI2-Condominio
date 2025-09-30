import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {
    const [userType, setUserType] = useState('residente');
    const [cargos, setCargos] = useState([]);
    const [formData, setFormData] = useState({
        // Datos del Usuario
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        first_name: '',
        last_name: '',
        // Datos del Residente
        residente_nombre: '',
        residente_apellido: '',
        residente_ci: '',
        residente_email: '',
        residente_tipo: 'Propietario',
        // Datos del Empleado
        empleado_nombre: '',
        empleado_apellido: '',
        empleado_ci: '',
        empleado_telefono: '',
        empleado_direccion: '',
        empleado_cargo: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Carga los cargos de empleado cuando el componente se monta
    useEffect(() => {
        const fetchCargos = async () => {
            try {
                // CORRECCIÓN: Usamos la URL correcta de tu API
                const response = await axios.get('/api/cargos-empleado/');
                
                // Programación defensiva para asegurar que la respuesta sea un array
                if (Array.isArray(response.data)) {
                    setCargos(response.data);
                    // Establece un valor por defecto para el cargo si hay cargos disponibles
                    if (response.data.length > 0) {
                        setFormData(prev => ({ ...prev, empleado_cargo: response.data[0].id }));
                    }
                } else {
                    console.warn("La respuesta de /api/cargos-empleado/ no es un array.");
                    setCargos([]);
                }
            } catch (err) {
                console.error("Error al obtener los cargos:", err);
                setCargos([]); // En caso de error, usamos un array vacío para no romper el formulario
            }
        };
        fetchCargos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.passwordConfirm) {
            setError({ detail: "Las contraseñas no coinciden." });
            return;
        }

        const payload = {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            residente: null,
            empleado: null,
        };

        if (userType === 'residente') {
            payload.residente = {
                nombre: formData.residente_nombre,
                apellido: formData.residente_apellido,
                ci: formData.residente_ci,
                email: formData.residente_email,
                tipo_residente: formData.residente_tipo,
            };
        } else if (userType === 'empleado') {
            payload.empleado = {
                nombre: formData.empleado_nombre,
                apellido: formData.empleado_apellido,
                ci: formData.empleado_ci,
                telefono: formData.empleado_telefono,
                direccion: formData.empleado_direccion,
                cargo: parseInt(formData.empleado_cargo, 10),
            };
        }

        try {
            await axios.post('/api/usuarios/', payload);
            alert('¡Usuario creado con éxito!');
            navigate('/login');
        } catch (err) {
            console.error("Error al crear el usuario:", err.response?.data);
            setError(err.response?.data || { detail: "Ocurrió un error inesperado." });
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Crear Nuevo Usuario</h1>

            {/* Selector de Tipo de Usuario */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Usuario</label>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input type="radio" name="userType" value="residente" checked={userType === 'residente'} onChange={() => setUserType('residente')} className="form-radio" />
                        <span className="ml-2">Residente</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="userType" value="empleado" checked={userType === 'empleado'} onChange={() => setUserType('empleado')} className="form-radio" />
                        <span className="ml-2">Empleado</span>
                    </label>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* --- SECCIÓN DE DATOS DE USUARIO (COMÚN) --- */}
                <div className="p-4 border rounded-md">
                    <h2 className="text-lg font-semibold mb-4">Datos de la Cuenta</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="username" value={formData.username} onChange={handleChange} placeholder="Nombre de usuario" required className="p-2 border rounded" />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email de la cuenta" required className="p-2 border rounded" />
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required className="p-2 border rounded" />
                        <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} placeholder="Confirmar contraseña" required className="p-2 border rounded" />
                        <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Nombres" className="p-2 border rounded" />
                        <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Apellidos" className="p-2 border rounded" />
                    </div>
                </div>

                {/* --- SECCIÓN DINÁMICA PARA RESIDENTE --- */}
                {userType === 'residente' && (
                    <div className="p-4 border rounded-md">
                        <h2 className="text-lg font-semibold mb-4">Datos del Residente</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="residente_nombre" value={formData.residente_nombre} onChange={handleChange} placeholder="Nombre del Residente" required className="p-2 border rounded" />
                            <input name="residente_apellido" value={formData.residente_apellido} onChange={handleChange} placeholder="Apellido del Residente" required className="p-2 border rounded" />
                            <input name="residente_ci" value={formData.residente_ci} onChange={handleChange} placeholder="CI del Residente" required className="p-2 border rounded" />
                            <input type="email" name="residente_email" value={formData.residente_email} onChange={handleChange} placeholder="Email del Residente" required className="p-2 border rounded" />
                            <select name="residente_tipo" value={formData.residente_tipo} onChange={handleChange} className="p-2 border rounded">
                                <option value="Propietario">Propietario</option>
                                <option value="Inquilino">Inquilino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* --- SECCIÓN DINÁMICA PARA EMPLEADO --- */}
                {userType === 'empleado' && (
                     <div className="p-4 border rounded-md">
                        <h2 className="text-lg font-semibold mb-4">Datos del Empleado</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="empleado_nombre" value={formData.empleado_nombre} onChange={handleChange} placeholder="Nombre del Empleado" required className="p-2 border rounded" />
                            <input name="empleado_apellido" value={formData.empleado_apellido} onChange={handleChange} placeholder="Apellido del Empleado" required className="p-2 border rounded" />
                            <input name="empleado_ci" value={formData.empleado_ci} onChange={handleChange} placeholder="CI del Empleado" required className="p-2 border rounded" />
                            <input name="empleado_telefono" value={formData.empleado_telefono} onChange={handleChange} placeholder="Teléfono" className="p-2 border rounded" />
                            <input name="empleado_direccion" value={formData.empleado_direccion} onChange={handleChange} placeholder="Dirección" className="p-2 border rounded" />
                            <select name="empleado_cargo" value={formData.empleado_cargo} onChange={handleChange} className="p-2 border rounded" required>
                                <option value="" disabled>Seleccione un cargo...</option>
                                {cargos.map(cargo => (
                                    <option key={cargo.id} value={cargo.id}>{cargo.cargo}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* --- Errores y Botón de Envío --- */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{JSON.stringify(error)}</span>
                    </div>
                )}
                
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-600">
                        Crear Usuario
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUserPage;

