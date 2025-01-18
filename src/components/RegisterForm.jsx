import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = ({onSubmit}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
            name_admin: "",
            email: "",
            password: "",
    });
    const [confirmarContraseña, setConfirmPassword] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleConfirmarContra = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleFormRegister = (e) => {
        e.preventDefault();

        if(formData.password !== confirmarContraseña){
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }
        setErrorMessage("");
        onSubmit(formData);

        setFormData({
            name_admin: "",
            email: "",
            password: "",
        });
        setConfirmPassword("");
    };

    return (
            <div className='div-register-form'>
                <form onSubmit={handleFormRegister}>
                    <div className='div-box-admin'>
                        <label htmlFor="nombre">Nombre: </label>
                        <br />
                        <input type="text" id='nombre' name='name_admin' value={formData.name_admin} onChange={handleChange} required/>
                    </div>
                    <br />
                    <div className='div-box-admin'>
                        <label htmlFor="correo">Correo:</label><br />
                        <input type="email" name="email" id="correo" value={formData.email} onChange={handleChange} required/>
                    </div>
                    <br />
                    <div className='div-box-admin'>
                        <label htmlFor="password">Contraseña:</label><br />
                        <div className='password-div'>
                            <input type={showPassword ? "text" : "password"} name="password" id="password" value={formData.password} onChange={handleChange} required/>
                            {showPassword ? (
                                <FaEyeSlash
                                    className="icon"
                                    onClick={() => setShowPassword(false)}/>
                                    ) : (
                                <FaEye className="icon" onClick={() => setShowPassword(true)} />
                            )}
                        </div>
                        
                    </div>
                    <br />
                    <div className='div-box-admin'>
                        <label htmlFor="confirPass">Confirmación de contraseña:</label> <br />
                        <div className='password-div'>
                            <input type={showPassword ? "text" : "password"} name="confirPass" id="confirPass" value={confirmarContraseña} onChange={handleConfirmarContra} required/>
                            {showPassword ? (
                                <FaEyeSlash
                                    className="icon"
                                    onClick={() => setShowPassword(false)}/>
                                    ) : (
                                    <FaEye className="icon" onClick={() => setShowPassword(true)} />
                            )}
                        </div>
                        
                    </div>
                    <br />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className='btn-register-admin'> Registrar</button>
                </form>
            </div>
    );
};

export default RegisterForm;