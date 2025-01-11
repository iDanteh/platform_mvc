import React, { useEffect, useState } from 'react';
import { getSubscription, sendWhatsAppMessage } from '../services/suscripcionService';
import { FaWhatsapp } from 'react-icons/fa'; // Importar el ícono de WhatsApp
import '../styles/TableSuscripciones.css';

const TableSuscripciones = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [clickedRows, setClickedRows] = useState({}); // Estado para rastrear filas presionadas

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

    // Función para manejar el clic en el ícono
    const handleIconClick = async (subscription) => {
        const phoneNumber = `521${subscription.phone_user}@c.us`;
        const message = `Hola, información de tu suscripción:
- Usuario: ${subscription.fk_user}
- Plataforma: ${subscription.platform}
- Perfil: ${subscription.perfil}
- Contraseña: ${subscription.password}
- Fecha de Inicio: ${new Date(subscription.start_date).toLocaleDateString()}
- Fecha de Fin: ${new Date(subscription.finish_date).toLocaleDateString()}
- Estado: ${subscription.state}`;

        try {
            await sendWhatsAppMessage({ to: phoneNumber, message });
            setClickedRows((prev) => ({ ...prev, [subscription.id_Subscription]: true }));
        } catch (error) {
            console.error('Error al enviar el mensaje de WhatsApp:', error);
        }
    };

    return (
        <div className="table-container">
            <table className="subscriptions-table">
                <thead>
                    <tr>
                        <th>Teléfono</th>
                        <th>Usuario</th>
                        <th>Plataforma</th>
                        <th>Perfil</th>
                        <th>Contraseña</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Estado</th>
                        <th>Días Restantes</th>
                        <th>Acción</th> {/* Nueva columna */}
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.length > 0 ? (
                        subscriptions.map((sub) => (
                            <tr key={sub.id_Subscription}>
                                <td>{sub.phone_user}</td>
                                <td>{sub.fk_user}</td>
                                <td>{sub.platform}</td>
                                <td>{sub.perfil}</td>
                                <td>{sub.password}</td>
                                <td>{new Date(sub.start_date).toLocaleDateString()}</td>
                                <td>{new Date(sub.finish_date).toLocaleDateString()}</td>
                                <td>{sub.state}</td>
                                <td>{calculateDaysRemaining(sub.start_date, sub.finish_date)}</td>
                                <td>
                                    <button
                                        className={`icon-button ${
                                            clickedRows[sub.id_Subscription] ? 'clicked' : ''
                                        }`}
                                        onClick={() => handleIconClick(sub)}
                                    >
                                        <FaWhatsapp />
                                    </button>
                                </td>
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

export default TableSuscripciones;
