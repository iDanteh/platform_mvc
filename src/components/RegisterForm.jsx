import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function RegisterForm({onSubmit}){
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
            name_admin: "",
            email: "",
            password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormRegister = (e) => {
        e.preventDefault();
        onSubmit(formData);

        setFormData({
            nombre_user: "",
            apellido_pat: "",
            apellido_mat: "",
            phone_user: "",
            email: "",
            password: "",
        });
    }

    return (
        <>
            <div className='div-register-form'>
                <form onSubmit={handleFormRegister}>
                    <div className='div-box-admin'>
                        <label htmlFor="nombre">Nombre: </label>
                        <br />
                        <input type="text" id='nombre'/>
                    </div>
                    <br />
                    <div className='div-box-admin'>
                        <label htmlFor="correo">Correo:</label><br />
                        <input type="email" name="correo" id="correo" />
                    </div>
                    <br />
                    <div className='div-box-admin'>
                        <label htmlFor="password">Contraseña:</label><br />
                        <input type="password" name="password" id="password" />
                        {showPassword ? (
                            <FaEyeSlash
                                className="icon"
                                onClick={() => setShowPassword(false)}/>
                                ) : (
                                 <FaEye className="icon" onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                    <br />
                    <div className='div-box-admin'>
                        <label htmlFor="confirPass">Confirmación de contraseña:</label> <br />
                        <input type="password" name="confirPass" id="confirPass" />
                        {showPassword ? (
                            <FaEyeSlash
                                className="icon"
                                onClick={() => setShowPassword(false)}/>
                                ) : (
                                 <FaEye className="icon" onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                    
                </form>
                <button type="submit" className='btn-register-admin'> Registrar</button>
            </div>
        </>
    );
}
export default RegisterForm;