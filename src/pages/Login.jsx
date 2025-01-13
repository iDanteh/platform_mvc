import React, { useState, useEffect } from 'react';
import { TiUser } from 'react-icons/ti';
import { TbPasswordUser } from 'react-icons/tb';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { authServiceLogin, useSocket } from '../services/authService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { QRCodeSVG } from 'qrcode.react';
import '../styles/Login_Style.css';

function Login() {
    const { login } = useAuth();
    const { qrCode, isReady } = useSocket();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // ✅ Cargar correo y contraseña guardados al inicio
    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberEmail');
        const savedPassword = localStorage.getItem('rememberPassword');

        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    // ✅ Manejar el inicio de sesión
    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Por favor, llena todos los campos.');
            return;
        }

        try {
            const response = await authServiceLogin(email, password);
            if (response) {
                // ✅ Guardar las credenciales si "Recordar contraseña" está activado
                if (rememberMe) {
                    localStorage.setItem('rememberEmail', email);
                    localStorage.setItem('rememberPassword', password);
                } else {
                    localStorage.removeItem('rememberEmail');
                    localStorage.removeItem('rememberPassword');
                }

                login();
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            setError('Correo o contraseña incorrectos.');
        }
    };

    return (
        <div className='login-container'>
            <div className="form-section">
                <form onSubmit={handleLogin}>
                    <h1>Inicia sesión</h1>

                    {error && <p className="error-message">{error}</p>}

                    <div className='input-box'>
                        <label htmlFor="correo">Correo</label>
                        <input
                            type="email"
                            placeholder='ejemplo@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TiUser className='icon' />
                    </div>

                    <div className='input-box'>
                        <label htmlFor="contraseña">Contraseña</label>
                        <input
                            type="password"
                            placeholder='password123'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TbPasswordUser className='icon' />
                    </div>

                    <div className='check-box'>
                        <div className='checkbox-container'>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember">Recordar contraseña?</label>
                        </div>
                        <div className='register-link'>
                            <p>No te has registrado? <a href="/dashboard">Registrarse</a></p>
                        </div>
                    </div>

                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>

            <div className="qr-container">
                {qrCode ? (
                    <>
                        <h2>Escanea el QR para iniciar sesión con WhatsApp</h2>
                        <QRCodeSVG value={qrCode} size={256} />
                    </>
                ) : isReady ? (
                    <>
                        <h2>WhatsApp listo para enviar mensajes</h2>
                        <FaWhatsapp size={64} color="#25D366" />
                    </>
                ) : (
                    <h2>Esperando conexión con WhatsApp...</h2>
                )}
            </div>
        </div>
    );
}

export default Login;
