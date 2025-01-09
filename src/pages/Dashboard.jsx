import React from 'react';
import { useNavigate } from 'react-router-dom';
import NetflixLogo from '../assets/svg/netflix-3.svg';
import OfficeLogo from '../assets/svg/office-2.svg';
import HBOLogo from '../assets/svg/hbo-4.svg';
import DisneyLogo from '../assets/svg/disney.svg';
import NortonLogo from '../assets/svg/norton-antivirus-logo.svg';
import YoutubeLogo from '../assets/svg/youtube-6.svg';
import '../styles/Dashboard_Style.css';

function Dashboard({setSelectedPlatform}) {
    const navigate = useNavigate();

    const platforms = [
        { id: 1, name: 'Netflix', logo: NetflixLogo, path: '/suscripciones' },
        { id: 2, name: 'Office', logo: OfficeLogo, path: '/suscripciones' },
        { id: 3, name: 'HBO', logo: HBOLogo, path: '/suscripciones' },
        { id: 4, name: 'Disney', logo: DisneyLogo, path: '/suscripciones' },
        { id: 5, name: 'Norton', logo: NortonLogo, path: '/suscripciones' },
        { id: 6, name: 'Youtube', logo: YoutubeLogo, path: '/suscripciones' },
    ];

    const handleNavigation = (platform) => {
        setSelectedPlatform(platform.id);
        navigate(platform.path);
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
                        onClick={() => handleNavigation(platform)}
                    >
                        <img src={platform.logo} alt={`${platform.name}-logo`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
