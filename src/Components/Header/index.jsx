import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import sanityClient from '../../client';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';

import IG_GRADIENT from '../../Assets/socialMediaIcons/IG_gradient.png';
import SPOTIFY_GRADIENT from '../../Assets/socialMediaIcons/SPOTIFY_gradient.png';
import YOUTUBE_GRADIENT from '../../Assets/socialMediaIcons/YOUTUBE_gradient.png';

import HAMBURGER from '../../Assets/icons/burger.svg';
import CLOSE from '../../Assets/icons/close.svg';

import GRADIENT from '../../Assets/logos/gradient_logo.png';

export const Header = () => {
    const [navData, setNavData] = useState([]);
    const [logoData, setLogoData] = useState([]);
    const [linkData, setLinkData] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [width] = useState(window.innerWidth);
    const {pathname} = useLocation();

    console.log(pathname);

    const builder = ImageUrlBuilder(sanityClient);

    const urlFor = (source) => {
        return builder.image(source);
    }

    const toggleMobileMenu = () => {
        setShowDropdown(!showDropdown);
    }

    const fetchData = async () => {
        try {
            const query = `*[_type == 'header'][0]`;
            const result = await sanityClient.fetch(query);
            setNavData(result.navigation);
            setLinkData(result.links);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchLogoData = async () => {
        try {
            const query = `*[_type == 'home'][0]`;
            const result = await sanityClient.fetch(query);
            setLogoData(result.hero);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchLogoData();
    }, []);

    return (
        <>
            <header className={`header ${pathname === '/' ? 'normal' : 'abnormal'}`}>
                {width > 768 ? (
                    <nav className='nav'>
                        {navData.map((item, index) => {
                            return (
                                <a key={index} href={`/${item}`}>{item}</a>
                            )
                        })}
                    </nav>
                ) : (
                    <div className="dropdown">
                        <img src={showDropdown ? CLOSE : HAMBURGER} onClick={() => toggleMobileMenu()}/>
                        <nav className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
                            {navData.map((item, index) => {
                                return (
                                    <a key={index} href={`/${item}`}>{item}</a>
                                )
                            })}
                        </nav>
                    </div>
                )}
                {logoData && logoData.logo && pathname !== '/' && (
                    <a href='/' className='logo-container'>
                        <img 
                            className='logo' 
                            src={urlFor(logoData.logo.asset._ref).url()} 
                        />
                        <img 
                            className='logo gradient' 
                            src={GRADIENT} 
                        />
                    </a>
                )}
                <div className='links'>
                    {linkData.map((item) => {
                        return (
                            <a key={item._key} href={item.url}>
                                <img src={urlFor(item.icon.asset._ref).url()} />
                                {item.url.indexOf('instagram.com') > -1 && (<img className='gradient' src={IG_GRADIENT} />)}
                                {item.url.indexOf('spotify.com') > -1 && (<img className='gradient' src={SPOTIFY_GRADIENT} />)}
                                {item.url.indexOf('youtube.com') > -1 && (<img className='gradient' src={YOUTUBE_GRADIENT} />)}
                            </a>
                        )
                    })}
                </div>
            </header>
        </>
    )
}