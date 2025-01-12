import React, { useEffect, useState } from 'react';
import { getSubscription, sendWhatsAppMessage, updateSubscription } from '../services/suscripcionService';
import { FaWhatsapp, FaEdit  } from 'react-icons/fa';
import Modal from '../components/Modal.jsx';
import ModalUpdate from '../components/ModalUpdateSub.jsx'
import '../styles/TableSuscripciones.css';

const TableSuscripciones = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [clickedRows, setClickedRows] = useState(() => {
        const savedState = localStorage.getItem('clickedRows');
        return savedState ? JSON.parse(savedState) : {};
    });
    const [selectedSubscription, setSelectedSubscription] = useState(null); // Estado para el modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Estado para el modal de edición
    const [updatedSubscription, setUpdatedSubscription] = useState(null); // Estado para la suscripción a editar

    // Guardar estado en localStorage cada vez que se actualice
    useEffect(() => {
        const savedState = localStorage.getItem('clickedRows');
        if (savedState) {
            setClickedRows(JSON.parse(savedState));
        }
    }, []); 

    // Obtener las suscripciones desde la API
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await getSubscription();
                if (response && Array.isArray(response)) {
                    setSubscriptions(response);

                    // Enviar recordatorios automáticos si los días restantes son menores a 3
                    response.forEach((sub) => {
                        const daysRemaining = calculateDaysRemaining(sub.start_date, sub.finish_date);
                        if (daysRemaining && daysRemaining.includes('días') && parseInt(daysRemaining) < 3) {
                            handleAutoReminder(sub);
                        }
                    });
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

    // Función para enviar un recordatorio automático
    const handleAutoReminder = async (subscription) => {
        const { id_Subscription, phone_user, name_user, start_date, finish_date } = subscription;
        const phoneNumber = `521${phone_user}@c.us`;

        // Comprobar si ya se envió un recordatorio a este usuario
        const reminderKey = `reminderSent_${id_Subscription}`;
        const reminderSent = localStorage.getItem(reminderKey);

        if (reminderSent) {
            console.log(`Recordatorio ya enviado a ${name_user}`);
            return; // Si ya se envió, no hacer nada
        }

        const message = `Hola ${name_user}, te recordamos que tu suscripción está por finalizar en menos de 3 días. Fecha de fin: ${new Date(finish_date).toLocaleDateString()}.`;

        try {
            await sendWhatsAppMessage({ to: phoneNumber, message });
            console.log('Recordatorio enviado a', name_user);

            // Marcar que ya se ha enviado el recordatorio
            localStorage.setItem(reminderKey, 'true');
        } catch (error) {
            console.error('Error al enviar el recordatorio de WhatsApp:', error);
        }
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

    const handleEditClick = (subscription) => {
        console.log("Suscripción seleccionada para editar:", subscription);
        if (subscription) {
            setUpdatedSubscription(subscription); // Asegúrate de actualizar este estado
            setIsUpdateModalOpen(true); // Luego abre el modal de edición
        } else {
            console.error("No se seleccionó ninguna suscripción");
        }
    };     

    const handleUpdateSubscription = async (updatedData) => {
        try {
            const response = await updateSubscription(updatedData);
            if (response) {
                setSubscriptions((prev) =>
                    prev.map((sub) =>
                        sub.id_Subscription === updatedData.id_Subscription ? updatedData : sub
                    )
                );
                setIsUpdateModalOpen(false);
            }
        } catch (error) {
            console.error('Error al actualizar la suscripción:', error);
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
                                            className="icon-button"
                                            onClick={() => handleEditClick(sub)}
                                    >
                                            <FaEdit />
                                    </button>
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

            <ModalUpdate
                isOpen={isUpdateModalOpen}
                subscription={updatedSubscription}
                onClose={() => setIsUpdateModalOpen(false)}
                onUpdate={handleUpdateSubscription}
            />
        </div>
    );
};

export default TableSuscripciones;
