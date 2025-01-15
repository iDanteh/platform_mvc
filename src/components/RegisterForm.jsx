import React, { useEffect, useState } from 'react';

function RegisterForm(){
    return 
    <>
        <div className='div-register-form'>
            <form>
                <label htmlFor="nombre">Nombre: </label>
                <input type="text" id='nombre'/>
                <label htmlFor="correo">Correo:</label>
                <input type="email" name="correo" id="correo" />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" />    
            </form>
            <button className='btn-register-admin'> Registrar</button>
        </div>
    </>
}
export default RegisterForm;