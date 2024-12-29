import React, { useState, useEffect } from 'react';
import { TiUser } from 'react-icons/ti';
import { TbPasswordUser } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { authServiceLogin } from '../services/authService.js'
import { useAuth } from '../context/AuthContext.jsx';
import "../styles/Login_Style.css";

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberEmail');
        const savedPassword = localStorage.getItem('rememberPassword');

        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await authServiceLogin(email, password);
            if (response) {
                if (rememberMe) {
                    // Guarda las credenciales en localStorage
                    localStorage.setItem('rememberEmail', email);
                    localStorage.setItem('rememberPassword', password);
                } else {
                    // Limpia las credenciales guardadas
                    localStorage.removeItem('rememberEmail');
                    localStorage.removeItem('rememberPassword');
                }

                login();
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
                            <input type="checkbox" 
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}/>
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