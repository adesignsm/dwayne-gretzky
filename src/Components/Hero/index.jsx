import { useEffect, useState } from 'react';

import './index.css';

import DesktopLogo from '../../Assets/logos/desktop_logo.png';
import MobileLogo from '../../Assets/logos/mobile_logo.png';

export const Hero = () => {
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    const isMobile = width <= 768;

    return (
        <>
            <div className="hero">
                <div className='logo'>
                    <img src={!isMobile ? DesktopLogo : MobileLogo} />
                </div>
            </div>
        </>
    )
}