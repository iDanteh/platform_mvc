import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal.jsx';
import ClientsForm from '../components/ClientForm.jsx'
import '../styles/Clients_Style.css';
import { registerClient, fetchClients } from '../services/userService.js';


function Clients() {
    const [isNavHidden, setIsNavHidden] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [clients, setClients] = useState([]);

    const handleToggleNav = (isHidden) => setIsNavHidden(isHidden);

    const loadClients = async () => {
        try {
            const clientesRegistrados = await fetchClients();
            setClients(clientesRegistrados);
        } catch (error) {
            console.error("Error al cargar los clientes:", error);
        }
    };

    useEffect(() => {
        loadClients(); 
    }, []);

    const handleRegisterClient = async (formData) => {
        try {
            const response = await registerClient(formData);
            setModalMessage('Cliente registrado con éxito.');
        } catch (error) {
            setModalMessage('Error al registrar cliente. Inténtalo de nuevo.');
        } finally {
            setIsModalOpen(true);
        }
    };

    return (
        <div className={`clients ${isNavHidden ? 'expanded' : ''}`}>
            <h1>Clientes</h1>
            <ClientsForm onSubmit={handleRegisterClient} />
            <div className="clients-list">
                {clients.length > 0 ? (
                    clients.map((client) => (
                        <RegisterClient key={client.id} client={client} />
                    ))
                ) : (
                    <p>No hay clientes registrados.</p>
                )}
            </div>
            <Modal isOpen={isModalOpen} message={modalMessage} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default Clients;
