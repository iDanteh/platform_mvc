import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Modal from '../components/Modal.jsx';
import ClientsForm from '../components/ClientForm.jsx'
import '../styles/Clients_Style.css';
import { registerClient } from '../services/userService.js';

function Clients() {
    const [isNavHidden, setIsNavHidden] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleToggleNav = (isHidden) => setIsNavHidden(isHidden);

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
            <Modal isOpen={isModalOpen} message={modalMessage} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default Clients;
