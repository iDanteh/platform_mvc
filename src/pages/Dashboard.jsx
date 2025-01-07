import React from 'react';
import { useNavigate } from 'react-router-dom';
import NetflixLogo from '../assets/svg/netflix-3.svg';
import OfficeLogo from '../assets/svg/office-2.svg';
import HBOLogo from '../assets/svg/hbo-4.svg';
import DisneyLogo from '../assets/svg/disney.svg';
import NortonLogo from '../assets/svg/norton-antivirus-logo.svg';
import YoutubeLogo from '../assets/svg/youtube-6.svg';
import '../styles/Dashboard_Style.css';

function Dashboard() {
    const navigate = useNavigate();

    const platforms = [
        { name: 'Netflix', logo: NetflixLogo, path: '/suscripciones' },
        { name: 'OfficeLogo', logo: OfficeLogo, path: '/suscripciones' },
        { name: 'HBO Max', logo: HBOLogo, path: '/suscripciones' },
        { name: 'Disney', logo: DisneyLogo, path: '/suscripciones' },
        { name: 'Norton', logo: NortonLogo, path: '/suscripciones' },
        { name: 'Youtube', logo: YoutubeLogo, path: '/suscripciones' },
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="dashboard">
            <h1>¡Bienvenido Wicho!</h1>
            <p>Sistema para el registro y control de suscripciones de streaming.</p>

            <div className="svg-container">
                {platforms.map((platform) => (
                    <div
                        key={platform.name}
                        className="svg-platform"
                        onClick={() => handleNavigation(platform.path)}
                    >
                        <img src={platform.logo} alt={`${platform.name}-logo`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
