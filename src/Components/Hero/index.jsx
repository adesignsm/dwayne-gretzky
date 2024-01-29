import './index.css';

import DesktopLogo from '../../Assets/logos/desktop_logo.png';

export const Hero = () => {
    return (
        <>
            <div className="hero">
                <div className='logo'>
                    <img src={DesktopLogo} />
                </div>
            </div>
        </>
    )
}