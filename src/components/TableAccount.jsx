import React, { useEffect, useState } from 'react';
import useSearchSubs from '../utils/useSearchSubs'; // Importa el hook aquí

const TableAccount = ({ userName,userPassword}) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const { searchResults, isLoading, error } = useSearchSubs(userName);

    useEffect(() => {
        if (searchResults && Array.isArray(searchResults)) {
            setSubscriptions(searchResults);
        }
    }, [searchResults]);

    return (
        <div className="table-container">
            <h3>Suscripciones de {userName || '...'}</h3>
            {isLoading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            <table className="table-accounts">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Contraseña Correo</th>
                        <th>Plataforma</th>
                        <th>Perfil</th>
                        <th>Contraseña</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.length > 0 ? (
                        subscriptions.map((sub) => (
                            <tr key={sub.id_Subscription}>
                                <td>{sub.name_user}</td>
                                <td>{sub.email}</td>
                                <td>{userPassword}</td>
                                <td>{sub.platform}</td>
                                <td>{sub.perfil}</td>
                                <td>{sub.password}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">No hay suscripciones registradas.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableAccount;
