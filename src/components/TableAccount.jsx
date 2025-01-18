import React, { useEffect, useState } from 'react';
import { getSubscriptionNameUser } from '../services/suscripcionService';

const TableAccount = ({userName}) => {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const fetchSubscriptions = async (name) => {
            try {
                const response = await getSubscriptionNameUser(name);
                if (response && Array.isArray(response)) {
                    setSubscriptions(response);
                } else {
                    console.error('Error formato inválido');
                }
            } catch (error) {
                console.error('Error al obtener las suscripciones:', error);
            }
        };

        if (userName) {
            fetchSubscriptions(userName);
        }
    }, [userName]);    

    return (
        <div className="table-container">
            <h3>Suscipciones de { userName || '...'}</h3>
            <table className="table-accounts">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
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
    )
};
export default TableAccount;