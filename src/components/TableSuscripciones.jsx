import React, { useEffect, useState } from 'react';
import { getSubscription } from '../services/suscripcionService';
import '../styles/TableSuscripciones.css';

const TableSuscripciones = () => {
    const [subscriptions, setSubscriptions] = useState([]);

    // Obtener las suscripciones desde la API
    useEffect(() => {
        const fetchSubscriptions = async () => {
            const response = await getSubscription();
            if (response && Array.isArray(response)) {
                setSubscriptions(response);
            }
        };

        fetchSubscriptions();
    }, []);

    // Función para calcular los días restantes
    const calculateDaysRemaining = (startDate, finishDate) => {
        const start = new Date(startDate);
        const end = new Date(finishDate);
        const today = new Date();

        if (end < today) return 'Vencida';

        const remainingTime = end - today;
        const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

        return `${remainingDays} días`;
    };

    return (
        <div className='table-container'>
            <table className='subscriptions-table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Usuario</th>
                        <th>Plataforma</th>
                        <th>Perfil</th>
                        <th>Contraseña</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Estado</th>
                        <th>Días Restantes</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.length > 0 ? (
                        subscriptions.map(sub => (
                            <tr key={sub.id_Subscription}>
                                <td>{sub.id_Subscription}</td>
                                <td>{sub.fk_user}</td>
                                <td>{sub.fk_Platform}</td>
                                <td>{sub.perfil}</td>
                                <td>{sub.password}</td>
                                <td>{new Date(sub.start_date).toLocaleDateString()}</td>
                                <td>{new Date(sub.finish_date).toLocaleDateString()}</td>
                                <td>{sub.state}</td>
                                <td>{calculateDaysRemaining(sub.start_date, sub.finish_date)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No hay suscripciones registradas.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableSuscripciones;
