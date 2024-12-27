import React, { useState } from 'react';
import { TiUser } from 'react-icons/ti';
import { TbPasswordUser } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService.js'
import "../styles/Login_Style.css";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await login(email, password);
            if(response) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
        }
    };

    return (
        <>
            <div className='login-container'>
                <form onSubmit={handleLogin}>
                    <h1>Inicia sesión</h1>

                    <div className='input-box'>
                        <label htmlFor="correo">Correo</label>
                        <input type="email" 
                        placeholder='ejemplo@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                        <TiUser className='icon'/>
                    </div>

                    <div className='input-box'>
                        <label htmlFor="contraseña">Contraseña</label>
                        <input type="password" 
                        placeholder='password123'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                        <TbPasswordUser className='icon'/>
                    </div>

                    <div className='check-box'>
                        <div className='checkbox-container'>
                            <input type="checkbox" name="remember" id="" />
                            <label htmlFor="remember">Recordar contraseña?</label>
                        </div>
                        <div className='register-link'>
                            <p>No te has registrado? <a href="/dashboard">Registrarse</a></p>
                        </div>
                    </div>

                    <button type="submit">Iniciar sesión</button>

                </form>
        </div>
        </>
    );
}

export default Login;