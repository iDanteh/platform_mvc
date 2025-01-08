import React, { useState, useEffect } from 'react';
import SuscripcionForm from '../components/SuscripcionForm';
import useSearchUsers from '../utils/useSearchUsers.js';
import { MdPersonSearch } from "react-icons/md";
import '../styles/Suscripciones.css';

function Suscripciones() {
    const [searchQuery, setSearchQuery] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    const { searchResults, isLoading } = useSearchUsers(searchQuery);

    // Función para seleccionar un usuario
    const handleSelectUser = (user) => {
        setUserInfo(user);
        setSearchQuery('');
    };

    return (
        <div className='regSuscripcion-container'>

            {/* Buscador */}
            <div className='search-container'>
                <h1>Registro de suscripciones</h1>
                <input
                    type='text'
                    placeholder='Buscar...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <MdPersonSearch />
                {Array.isArray(searchResults) && searchResults.length > 0 && (
                    <ul className='search-results'>
                        {searchResults.map(user => (
                            <li key={user.id_User} onClick={() => handleSelectUser(user)}>
                                {user.nombre_user}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Información del usuario */}
            {userInfo && (
                <div className='user-information'>
                    <h2>Información del usuario</h2>
                    <div className='user-info'>
                        <p>Nombre: {userInfo.nombre_user}</p>
                        <p>Correo: {userInfo.email}</p>
                        <p>Teléfono: {userInfo.phone_user}</p>
                    </div>
                </div>
            )}

            {/* Formulario de suscripción */}
            <div className='form-content'>
                <SuscripcionForm />
            </div>

        </div>
    );
}

export default Suscripciones;
