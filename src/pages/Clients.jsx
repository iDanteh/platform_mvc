import React, { useState } from 'react';
import '../styles/Clients_Style.css';
import { registerClient } from '../services/userService.js';
import NavBar from '../components/NavBar';
import Modal from '../components/Modal.jsx';

function Clients() {
    const [isNavHidden, setIsNavHidden] = useState(false);
    const handleToggleNav = (isHidden) => {
        setIsNavHidden(isHidden);
    };

    // Manejo de modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [formData, setFormData] = useState({
        nombre_user: "",
        apellido_pat: "",
        apellido_mat: "",
        phone_user: "",
        email: "",
        password: ""
    });

    // Estado para almacenar las sugerencias modificadas
    const [modifiedEmail, setModifiedEmail] = useState("");
    const [modifiedPassword, setModifiedPassword] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const updatedData = { ...prevData, [name]: value };
            // Generar sugerencias solo cuando los campos nombre, apellidos y teléfono están completos
            if (updatedData.nombre_user && updatedData.apellido_pat && updatedData.apellido_mat && updatedData.phone_user) {
                generateEmailSuggestions(updatedData); // Generar sugerencias de correo
                generatePasswordSuggestions(updatedData); // Generar sugerencias de contraseña
            }
            return updatedData;
        });
    };

    // Estado para almacenar la sugerencia de correo
    const [emailSuggestion, setEmailSuggestion] = useState("");

    // Función para generar recomendaciones de correos
    const generateEmailSuggestions = (data) => {
        const { nombre_user, apellido_pat, apellido_mat, phone_user } = data;

        // Limpiar los campos para evitar errores de combinación
        if (!nombre_user || !apellido_pat || !apellido_mat || !phone_user) {
            setEmailSuggestion("");
            return;
        }

        const firstLetter = apellido_pat.charAt(0); // Obtener la primera letra del apellido paterno
        const secondLetter = apellido_mat.charAt(0); // Obtener la primera letra del apellido materno
        const randomNumbers = phone_user.slice(0, 3); // Obtener los primeros 3 dígitos del teléfono

        // Generar una sugerencia basada en el nombre, apellidos y número de teléfono
        const suggestion = `${nombre_user}.${firstLetter}${secondLetter}${randomNumbers}@gmail.com`;
        setEmailSuggestion(suggestion);
    };

    // Estado para almacenar la sugerencia de contraseña
    const [passwordSuggestion, setPasswordSuggestion] = useState("");

    // Función para generar recomendaciones de contraseñas
    const generatePasswordSuggestions = (data) => {
        const { nombre_user, apellido_pat, apellido_mat, phone_user } = data;

        // Limpiar los campos para evitar errores de combinación
        if (!nombre_user || !apellido_pat || !apellido_mat || !phone_user) {
            setPasswordSuggestion("");
            return;
        }

        const specialCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?"; // Caracteres especiales
        const firstLetter = apellido_pat.charAt(0); // Obtener la primera letra del apellido paterno
        const secondLetter = apellido_mat.charAt(0); // Obtener la primera letra del apellido materno
        const randomNumbers = phone_user.slice(3, 6) + phone_user.slice(-1); // Obtener los primeros 3 y últimos 2 dígitos del teléfono
        const randomSpecialCharacter = specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));

        // Generar una sugerencia basada en el nombre, apellidos, número de teléfono y un caracter especial
        const suggestion = `${firstLetter}${secondLetter}${randomNumbers}${randomSpecialCharacter}`;
        setPasswordSuggestion(suggestion);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Si el correo o la contraseña fueron modificados, usarlos, sino usar los generados
        const finalEmail = modifiedEmail || formData.email || emailSuggestion;
        const finalPassword = modifiedPassword || formData.password || passwordSuggestion;

        try {
            // Llama al servicio para registrar el cliente desestructurando el objeto formData
            const response = await registerClient(formData.nombre_user, formData.apellido_pat, formData.apellido_mat, formData.phone_user, finalEmail, finalPassword);
            if (response) {
                setModalMessage('Cliente registrado con éxito.');
                setIsModalOpen(true);

                // Limpiar formulario
                setFormData({
                    nombre_user: "",
                    apellido_pat: "",
                    apellido_mat: "",
                    phone_user: "",
                    email: "",
                    password: ""
                });
                setModifiedEmail("");  // Limpiar el estado de email modificado
                setModifiedPassword("");  // Limpiar el estado de contraseña modificada
            }
        } catch (error) {
            console.error('Error al registrar cliente:', error);
            setModalMessage('Error al registrar cliente. Inténtalo de nuevo.');
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <div className={`clients ${isNavHidden ? 'expanded' : ''}`}>
                <h1>Clientes</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="iNombre">Nombre:</label>
                        <input
                            type="text"
                            name="nombre_user"
                            id="iNombre"
                            value={formData.nombre_user}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="iApellidoP">Apellido Paterno:</label>
                        <input
                            type="text"
                            name="apellido_pat"
                            id="iApellidoP"
                            value={formData.apellido_pat}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="iApellidoM">Apellido Materno:</label>
                        <input
                            type="text"
                            name="apellido_mat"
                            id="iApellidoM"
                            value={formData.apellido_mat}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="telephone">Teléfono:</label>
                        <input
                            type="tel"
                            name="phone_user"
                            id="nTel"
                            placeholder="951-000-00-00"
                            value={formData.phone_user}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="iEmail">Correo:</label>
                        <input
                            type="email"
                            name="email"
                            id="iEmail"
                            placeholder="client@gmail.com"
                            value={modifiedEmail || formData.email || emailSuggestion}
                            onChange={(e) => setModifiedEmail(e.target.value)} // Permitimos editar el correo
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="iContraseña">Contraseña:</label>
                        <input
                            type="text"
                            name="password"
                            id="iContraseña"
                            placeholder="example25*"
                            value={modifiedPassword || formData.password || passwordSuggestion}
                            onChange={(e) => setModifiedPassword(e.target.value)} // Permitimos editar la contraseña
                            required
                        />
                    </div>
                    <button type="submit">Agregar</button>
                </form>

                {/* Modal para mostrar mensajes */}
                <Modal
                    isOpen={isModalOpen}
                    title=""
                    message={modalMessage}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </>
    );
}

export default Clients;
