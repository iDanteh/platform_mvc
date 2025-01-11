import React, { useEffect, useState } from 'react';
import { getSubscription, sendWhatsAppMessage } from '../services/suscripcionService';
import { FaWhatsapp } from 'react-icons/fa';
import Modal from '../components/Modal.jsx';
import '../styles/TableSuscripciones.css';

const TableSuscripciones = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [clickedRows, setClickedRows] = useState(() => {
        const savedState = localStorage.getItem('clickedRows');
        return savedState ? JSON.parse(savedState) : {};
    });

    const [selectedSubscription, setSelectedSubscription] = useState(null); // Estado para el modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Guardar estado en localStorage cada vez que se actualice
    useEffect(() => {
        localStorage.setItem('clickedRows', JSON.stringify(clickedRows));
    }, [clickedRows]);

    // Obtener las suscripciones desde la API
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await getSubscription();
                if (response && Array.isArray(response)) {
                    setSubscriptions(response);
                }
            } catch (error) {
                console.error('Error al obtener suscripciones:', error);
            }
        };
    
        fetchSubscriptions();
    }, []);

    const handleIconClick = (subscription) => {
        setSelectedSubscription(subscription);
        setIsModalOpen(true);
    };

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

    // Función para confirmar el envío del mensaje
    const handleConfirmSendMessage = async () => {
        if (selectedSubscription) {
            const { id_Subscription, phone_user, fk_user, platform, perfil, password, start_date, finish_date, state, name_user } = selectedSubscription;

            const phoneNumber = `521${phone_user}@c.us`;
            const message = `Hola ${name_user}, aquí tienes la información de tu suscripción:
                - Usuario: ${fk_user}
                - Plataforma: ${platform}
                - Perfil: ${perfil}
                - Contraseña: ${password}
                - Fecha de Inicio: ${new Date(start_date).toLocaleDateString()}
                - Fecha de Fin: ${new Date(finish_date).toLocaleDateString()}
                - Estado: ${state}`;

            try {
                await sendWhatsAppMessage({ to: phoneNumber, message });
                setClickedRows((prev) => {
                    const updatedRows = { ...prev, [id_Subscription]: true };
                    localStorage.setItem('clickedRows', JSON.stringify(updatedRows)); // Actualizar localStorage
                    return updatedRows;
                });
            } catch (error) {
                console.error('Error al enviar el mensaje de WhatsApp:', error);
            } finally {
                setIsModalOpen(false); // Cerrar el modal
                setSelectedSubscription(null);
            }
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
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.length > 0 ? (
                        subscriptions.map((sub) => (
                            <tr key={sub.id_Subscription}>
                                <td>{sub.phone_user}</td>
                                <td>{sub.name_user}</td>
                                <td>{sub.platform}</td>
                                <td>{sub.perfil}</td>
                                <td>{sub.password}</td>
                                <td>{new Date(sub.start_date).toLocaleDateString()}</td>
                                <td>{new Date(sub.finish_date).toLocaleDateString()}</td>
                                <td>{sub.state}</td>
                                <td>{calculateDaysRemaining(sub.start_date, sub.finish_date)}</td>
                                <td>
                                <button
                                        className={`icon-button ${clickedRows[sub.id_Subscription] ? 'clicked' : ''}`}
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

            <Modal
                isOpen={isModalOpen}
                title="Confirmar Envío"
                message="¿Deseas enviar un mensaje de WhatsApp a este usuario?"
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmSendMessage}
                showConfirmButton={true}
                confirmText="Enviar"
            />
        </div>
    );
};

export default TableSuscripciones;
