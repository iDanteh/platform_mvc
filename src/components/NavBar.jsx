import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar_Style.css';

function NavBar() {

    return (
        <>
            <div className='navbar'>
                <h2>NavBar</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to='/dashboard'>Dashboard</Link>
                        </li>
                        <li>
                            <Link to='/clients'>Clientes</Link>
                        </li>
                        <li>
                            <Link to='/suscriptions'>Suscripciones</Link>
                        </li>
                        <li>
                            <Link to='/logout'>Cerrar Sesión</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default NavBar;