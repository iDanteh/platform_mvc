import React, { useEffect, useState } from 'react';

const SuscripcionForm = ({ onSubmit }) => {
    return (
        <div className='form-suscripcion'>
                <form action="">
                    <label htmlFor="Plataforma">Plataforma</label>
                    <select name="platforms" id="plat-select">
                        <option value="">---Seleccionar plataforma---</option>
                        <option value="Netflix">Netflix</option>
                        <option value="Disney">Disney</option>
                        <option value="HBO">HBO</option>
                    </select>
                    <label htmlFor="Tiempo">Tiempo de suscripcion</label>
                    <input type="date" name="tiempo" id="tiempo-select" />
                    <label htmlFor="Perfil">Perfil</label>
                    <input type="text" name="perfil" id="perfil-select" />
                    <label htmlFor="Contraseña">Contraseña</label>
                    <input type="text" name="contraseña" id="contraseña-select" />

                    <button type="submit">Registrar</button>
                </form>
            </div>
    );
};

export default SuscripcionForm;