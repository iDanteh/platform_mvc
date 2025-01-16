import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal.jsx';
import RegisterForm from '../components/RegisterForm.jsx';
import '../styles/RegisterAdmin_Style.css';
import { registerAdmin} from '../services/adminService.js';
function RegisterAdmin(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const handleRegisterAdmin = async (formData) => {
        try {
            const response = await registerAdmin(formData);
            setModalMessage('Administrador registrado con éxito.');
        } catch (error) {
            setModalMessage('Error al registrar administrador');
        } finally {
            setIsModalOpen(true);
        }
    };
    return (
        <div className='div-register-admin'>
            <h1>Registrate</h1>
            <br />
            <RegisterForm onSubmit={handleRegisterAdmin}/>
            <Modal isOpen={isModalOpen} message={modalMessage} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
export default RegisterAdmin;